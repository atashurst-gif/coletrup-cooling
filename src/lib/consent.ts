/**
 * Consent state — shared by the cookie banner and the tracking layer.
 * Stored in localStorage; a custom event notifies listeners of changes.
 */
const KEY = 'cc_consent_v1';

export function getConsent(): boolean | null {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'granted') return true;
    if (v === 'denied') return false;
  } catch {}
  return null;
}

export function setConsent(granted: boolean) {
  try {
    localStorage.setItem(KEY, granted ? 'granted' : 'denied');
  } catch {}
  window.dispatchEvent(new CustomEvent('cc:consent', { detail: { granted } }));
}
