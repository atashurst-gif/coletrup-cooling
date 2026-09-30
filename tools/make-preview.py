"""Convert dist-preview/ (absolute /paths) into a relative-path bundle for artifact hosting."""
import re, os, sys, json
root = 'dist-preview'
files = []
for d, _, fs in os.walk(root):
    for f in fs:
        files.append(os.path.relpath(os.path.join(d, f), root))
htmls = [f for f in files if f.endswith('.html')]

def rewrite(html, prefix):
    def attr(m):
        a, path = m.group(1), m.group(2)
        rest = ''
        mm = re.match(r'^([^?#]*)([?#].*)?$', path)
        base, rest = mm.group(1), mm.group(2) or ''
        if base == '/':
            return f'{a}="{prefix}index.html{rest}"'
        if re.search(r'\.[A-Za-z0-9]+$', base):        # a file
            return f'{a}="{prefix}{base[1:]}{rest}"'
        if base.endswith('/'):                          # a route
            return f'{a}="{prefix}{base[1:]}index.html{rest}"'
        return m.group(0)
    html = re.sub(r'\b(href|src|content|action)="(/[^"]*)"', attr, html)
    html = re.sub(r'srcset="([^"]*)"', lambda m: 'srcset="' + re.sub(r'(^|,\s*)/', lambda k: k.group(1) + prefix, m.group(1)) + '"', html)
    html = html.replace('url(/', f'url({prefix}')
    return html

for f in htmls:
    p = os.path.join(root, f)
    html = open(p, encoding='utf-8').read()
    depth = f.count('/')
    prefix = '../' * depth
    html = rewrite(html, prefix)
    if f == 'index.html':
        # Root page is wrapped in the host's skeleton: strip document wrappers, keep head elements + body content
        head = re.search(r'<head>(.*?)</head>', html, re.S).group(1)
        body = re.search(r'<body[^>]*>(.*)</body>', html, re.S).group(1)
        head = re.sub(r'<meta charset="utf-8">|<meta name="viewport"[^>]*>', '', head)
        head = re.sub(r'<title>.*?</title>', '', head)
        html = '<title>Coletrup Cooling</title>\n' + head + '\n' + body
    open(p, 'w', encoding='utf-8').write(html)

others = sorted(f for f in files if f != 'index.html')
json.dump(others, open('/tmp/claude-0/-home-claude/1f819917-8096-5d4e-8eb3-6271fb89cd98/scratchpad/preview-files.json', 'w'))
print(len(htmls), 'html rewritten;', len(others), 'supporting files')
# sanity: no remaining absolute references
left = 0
for f in htmls:
    h = open(os.path.join(root, f), encoding='utf-8').read()
    for m in re.finditer(r'\b(href|src)="(/[^"]*)"', h):
        left += 1; print('LEFT', f, m.group(0)[:80])
    if 'url(/' in h or re.search(r'srcset="[^"]*(^|,\s*)/', h): left += 1; print('LEFT css/srcset', f)
print('remaining absolute refs:', left)
