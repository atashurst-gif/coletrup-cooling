/**
 * Quote form behaviour: stepping, validation, enquiry ID, attribution,
 * submission (Netlify Forms / webhook) and confirmation.
 *
 * Moving between steps (there is no "Continue" button):
 *  - Steps made of option cards (radios) move on as soon as an option is chosen: a click or
 *    tap on a card, Space or Enter on the focused option, or activation by assistive tech.
 *    Arrow keys only move between the options, so keyboard users can look before choosing.
 *  - Typed steps (the postcode) move on with the arrow button beside the box, or Enter.
 *
 * NOTE: a click on a card reaches the hidden radio as a browser-made click whose `detail`
 * is 0, exactly like a keyboard click — so never use `detail` to tell the two apart.
 */

const UK_POSTCODE = /^(GIR ?0AA|[A-PR-UWYZ][A-HK-Y]?[0-9][0-9A-Z]? ?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
const UK_PHONE = /^(\+44\s?|0)(\d\s?){9,10}$/;

/** How long the chosen card stays highlighted before the next step appears (ms). */
const ADVANCE_DELAY = 200;
/** After a step appears, option and arrow clicks are ignored for this long (ms) so the second
 *  click of an accidental double-click cannot answer the next question as well. */
const SETTLE = 350;

/** Wording used in the notification email's subject line. */
const LABELS: Record<string, string> = {
  'air-conditioning': 'Air conditioning',
  refrigeration: 'Refrigeration',
  repair: 'Repair',
  'servicing-maintenance': 'Servicing / maintenance',
  residential: 'Residential',
  commercial: 'Commercial',
};

function makeEnquiryId(prefix: string): string {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(5);
  (crypto.getRandomValues ? crypto : { getRandomValues: (a: Uint8Array) => a.map(() => Math.floor(Math.random() * 256)) }).getRandomValues(bytes);
  const rnd = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  return `${prefix}-${ymd}-${rnd}`;
}

function setupForm(form: HTMLFormElement) {
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-step]'));
  const back = form.querySelector<HTMLButtonElement>('[data-back]')!;
  const nextButtons = Array.from(form.querySelectorAll<HTMLButtonElement>('[data-next]'));
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const progress = form.querySelector<HTMLElement>('[data-progress]')!;
  const bar = form.querySelector<HTMLElement>('[data-progress-bar]')!;
  const progressText = form.querySelector<HTMLElement>('[data-progress-text]')!;
  const formError = form.querySelector<HTMLElement>('[data-form-error]')!;
  const panel = form.parentElement!;
  const confirmation = panel.querySelector<HTMLElement>('[data-confirmation]')!;
  const provider = form.dataset.provider;
  const disabled = form.dataset.disabled === 'true';
  const prefix = form.dataset.prefix || 'CC';
  const preview = form.dataset.preview === 'true';

  let current = 0;
  let started = false;
  let shownAt = -Infinity; // when the current step appeared
  let advanceTimer = 0;
  let arrowNav = false; // true while an arrow key is moving between options
  const enquiryId = makeEnquiryId(prefix);

  // Options always start unselected in the stepped form: with no Continue button, a card that
  // is already selected gives no obvious way forward. (Without JavaScript the page defaults stay.)
  form.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((r) => (r.checked = false));
  (form.querySelector('[data-field="enquiry_id"]') as HTMLInputElement).value = enquiryId;

  const setField = (name: string, value: string) => {
    const el = form.querySelector<HTMLInputElement>(`[data-field="${name}"]`);
    if (el) el.value = value || '';
  };
  const fillAttribution = () => {
    const a = window.ccAttribution ? window.ccAttribution() : {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'landing_page', 'referrer'].forEach((k) =>
      setField(k, a[k] || ''),
    );
    setField('submitted_from', location.pathname);
    setField('submitted_at', new Date().toISOString());
  };
  /** Subject of the notification email, e.g. "Website enquiry - Repair, Commercial - CC-261005-K7M4Q". */
  const subjectLine = () => {
    const picked = (name: string) => form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value || '';
    const what = [LABELS[picked('service')], LABELS[picked('customer_type')]].filter(Boolean).join(', ');
    return `Website enquiry${what ? ` - ${what}` : ''} - ${enquiryId}`;
  };

  const showError = (name: string, show: boolean) => {
    const el = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (el) el.hidden = !show;
    form.querySelectorAll<HTMLInputElement>(`[name="${name}"]`).forEach((i) => i.setAttribute('aria-invalid', show ? 'true' : 'false'));
  };

  const validateStep = (idx: number): boolean => {
    const step = steps[idx];
    let ok = true;
    const radios = step.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    if (radios.length) {
      const name = radios[0].name;
      const checked = step.querySelector<HTMLInputElement>('input[type="radio"]:checked');
      showError(name, !checked);
      ok = Boolean(checked);
    }
    step.querySelectorAll<HTMLInputElement>('input:not([type="radio"]):not([type="hidden"])').forEach((input) => {
      const v = input.value.trim();
      let valid = v.length > 0;
      if (valid && input.name === 'postcode') valid = UK_POSTCODE.test(v.replace(/\s+/g, ' '));
      if (valid && input.name === 'phone') valid = UK_PHONE.test(v.replace(/[\s()-]/g, (m) => (m === ' ' ? ' ' : '')).replace(/\s+/g, ''));
      if (valid && input.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      showError(input.name, !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      const first = step.querySelector<HTMLElement>('[aria-invalid="true"], input');
      first?.focus();
    }
    return ok;
  };

  const render = () => {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === current));
    form.dataset.current = String(current + 1);
    back.hidden = current === 0;
    submit.classList.toggle('is-visible', current === steps.length - 1);
    bar.style.width = `${((current + 1) / steps.length) * 100}%`;
    progressText.textContent = `Step ${current + 1} of ${steps.length}`;
    progress.hidden = false;
    formError.hidden = true;
  };

  /** Show a step and put the keyboard focus on its chosen (or first) field. */
  const show = (idx: number) => {
    window.clearTimeout(advanceTimer);
    advanceTimer = 0;
    current = idx;
    shownAt = performance.now();
    render();
    const step = steps[current];
    (step.querySelector<HTMLElement>('input:checked') ?? step.querySelector<HTMLElement>('input'))?.focus({ preventScroll: true });
    step.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  const settled = () => performance.now() - shownAt >= SETTLE;

  const trackStart = () => {
    if (started) return;
    started = true;
    window.ccTrack?.('quote_form_start', { enquiry_id: enquiryId });
  };

  form.addEventListener('focusin', trackStart, { once: true });
  form.addEventListener('change', trackStart, { once: true });

  const goNext = () => {
    window.clearTimeout(advanceTimer);
    advanceTimer = 0;
    if (current >= steps.length - 1 || !validateStep(current)) return;
    const step = steps[current];
    const checked = step.querySelector<HTMLInputElement>('input:checked');
    const text = step.querySelector<HTMLInputElement>('input:not([type=radio])');
    window.ccTrack?.('quote_form_step', { step: current + 1, value: checked?.value || (text?.name === 'postcode' ? 'postcode' : '') });
    show(current + 1);
  };
  /** Move on shortly after an option is chosen, so the chosen card is seen to light up first. */
  const queueAdvance = (from: number) => {
    if (advanceTimer || from !== current) return;
    advanceTimer = window.setTimeout(() => {
      advanceTimer = 0;
      if (from === current) goNext();
    }, ADVANCE_DELAY);
  };

  // Typed steps: the arrow button beside the box
  nextButtons.forEach((b) =>
    b.addEventListener('click', () => {
      if (settled()) goNext();
    }),
  );
  back.addEventListener('click', () => show(Math.max(current - 1, 0)));

  // Option steps: choosing an option moves straight on
  steps.forEach((s, i) => {
    s.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((r) => {
      r.addEventListener('keydown', (e) => {
        if (!e.key.startsWith('Arrow')) return;
        arrowNav = true; // the browser now selects the neighbouring option and fires a click on it
        window.setTimeout(() => (arrowNav = false), 60);
      });
      r.addEventListener('click', (e) => {
        if (arrowNav) {
          arrowNav = false; // this click came from the arrow key: just a move between options
          return;
        }
        if (i !== current) return;
        if (!settled()) {
          e.preventDefault(); // stray second click straight after the step appeared: leave it unanswered
          return;
        }
        queueAdvance(i);
      });
    });
  });
  form.querySelectorAll<HTMLInputElement>('input').forEach((i) =>
    i.addEventListener('input', () => {
      if (i.getAttribute('aria-invalid') === 'true') showError(i.name, false);
    }),
  );
  form.addEventListener('keydown', (e) => {
    const t = e.target as HTMLInputElement;
    if (e.key !== 'Enter' || t.tagName !== 'INPUT') return;
    if (e.repeat) {
      e.preventDefault(); // a held-down Enter must not run through the steps or send the form
      return;
    }
    if (current >= steps.length - 1) return; // last step: Enter sends the form as usual
    e.preventDefault();
    if (t.type === 'radio') {
      if (!settled()) return;
      t.checked = true; // Enter chooses the focused option
    }
    goNext();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (let i = 0; i <= current; i++) {
      if (!validateStep(i)) {
        current = i;
        render();
        return;
      }
    }
    if (disabled) {
      formError.textContent = "Online quote requests aren't available yet — please WhatsApp or call us.";
      formError.hidden = false;
      return;
    }
    fillAttribution();
    setField('subject', subjectLine());
    submit.disabled = true;
    submitLabel.textContent = 'Sending…';
    formError.hidden = true;

    const data = new FormData(form);
    const postcodeArea = String(data.get('postcode') || '').trim().toUpperCase().split(/\s+/)[0].replace(/\d.*$/, '') || '';
    try {
      let res: Response;
      if (preview) {
        await new Promise((r) => setTimeout(r, 500));
        res = new Response('ok', { status: 200 });
      } else if (provider === 'webhook') {
        const payload: Record<string, string> = {};
        data.forEach((v, k) => (payload[k] = String(v)));
        res = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      } else {
        res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
        });
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      window.ccTrack?.('quote_form_complete', {
        enquiry_id: enquiryId,
        service: String(data.get('service') || ''),
        customer_type: String(data.get('customer_type') || ''),
        postcode_area: postcodeArea,
      });

      // Confirmation
      form.hidden = true;
      confirmation.hidden = false;
      const ref = confirmation.querySelector<HTMLElement>('[data-ref]');
      if (ref) ref.textContent = enquiryId;
      const wa = confirmation.querySelector<HTMLAnchorElement>('[data-wa-link]');
      if (wa && wa.href.startsWith('https://wa.me/')) {
        const base = wa.href.split('?')[0];
        wa.href = `${base}?text=${encodeURIComponent(`Hi Coletrup Cooling, I've just sent a quote request. My reference is ${enquiryId}.`)}`;
      }
      confirmation.focus({ preventScroll: true });
      confirmation.scrollIntoView({ block: 'center', behavior: 'smooth' });
    } catch (err) {
      submit.disabled = false;
      submitLabel.textContent = 'Request your quote';
      formError.textContent = "Sorry — we couldn't send that just now. Please try again, or WhatsApp or call us instead.";
      formError.hidden = false;
      console.error('[quote-form]', err);
    }
  });

  render();
}

export function initQuoteForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-quote-form]').forEach(setupForm);
}
