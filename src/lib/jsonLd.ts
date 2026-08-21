/**
 * Serialise structured data for embedding in a `<script>` tag.
 *
 * `JSON.stringify` does not escape `<`, so a string containing a script-closing
 * sequence ends the tag early and everything after it is parsed as HTML.
 * Nothing on this site currently contains that — every field comes from
 * authored content in the repo, not from user input — but the distance between
 * "not exploitable" and "exploitable" is one citation label with an angle
 * bracket in it, and the fix costs one pass.
 *
 * U+2028 and U+2029 are escaped for a related reason: they are legal inside a
 * JSON string but are LINE TERMINATORS in JavaScript source, so a raw one can
 * end a statement early. They are written here as escape sequences rather than
 * literal characters, which is not fussiness — the first draft of this file
 * used the literal characters and broke its own parse.
 *
 * A JSON parser reads the escapes back as the same characters, so consumers see
 * identical data.
 */
export function serialiseJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
