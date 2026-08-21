import { describe, expect, it } from 'vitest';

import { serialiseJsonLd } from './jsonLd';

describe('serialiseJsonLd', () => {
  it('neutralises a script-closing sequence', () => {
    const out = serialiseJsonLd({ name: 'oops </script><img src=x onerror=alert(1)>' });
    expect(out).not.toContain('</script>');
    expect(out).toContain('\\u003c');
  });

  it('escapes the JS line terminators that are legal in JSON', () => {
    const out = serialiseJsonLd({ name: 'a b c' });
    expect(out).not.toContain(' ');
    expect(out).not.toContain(' ');
  });

  it('still parses back to the identical object', () => {
    const data = {
      '@type': 'Article',
      headline: 'Ansiedad <em>y</em> respiración',
      citation: [{ name: 'A </script> B', url: 'https://example.test/x?a=1&b=2' }],
    };
    expect(JSON.parse(serialiseJsonLd(data))).toEqual(data);
  });
});
