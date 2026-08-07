/**
 * A cortical pyramidal neuron, in the spirit of Santiago Ramón y Cajal's ink
 * plates from the 1890s.
 *
 * Why this and not a particle network: a drifting constellation of dots joined
 * by lines is the single most generic "neuroscience" visual there is, and it
 * depicts nothing. Cajal drew what he actually saw down a microscope, and those
 * plates are still reproduced today because they are beautiful. A single neuron
 * drawn honestly is both more distinctive and more true.
 *
 * It also happens to be the right shape for scroll: a line drawing itself IS a
 * continuous function of one number, so there is nothing to fake.
 *
 * Anatomy, top to bottom — apical tuft, apical trunk with oblique branches,
 * the pyramid-shaped soma that names the cell, basal dendrites, then the axon
 * descending with collaterals. Paths are ordered top-to-bottom so the stagger
 * draws downward with the reader.
 */

export const CAJAL_VIEWBOX = { width: 400, height: 1200 } as const;

export const CAJAL_PATHS: readonly string[] = [
  // ── Apical tuft: the fine spray that fans out in the top cortical layer ──
  'M162 70C166 86 170 100 176 118',
  'M202 78C194 92 186 104 176 118',
  'M110 138C118 154 124 168 130 186',
  'M96 166C108 172 118 178 130 186',
  'M286 142C278 158 272 172 266 190',
  'M300 170C288 176 278 182 266 190',
  'M176 118C180 140 183 158 186 182',
  'M130 186C138 200 146 212 158 224',
  'M266 190C258 204 250 216 238 228',

  // ── Convergence onto the apical trunk ──
  'M186 182C190 210 196 236 197 268',
  'M158 224C172 238 186 250 197 268',
  'M238 228C224 242 210 252 197 268',

  // ── Apical trunk, with the oblique branches that come off it at intervals ──
  'M197 268C196 296 198 322 198 366',
  'M198 366C184 372 172 378 158 386',
  'M198 366C212 372 224 378 238 386',
  'M198 366C199 410 197 450 198 490',
  'M198 490C184 496 172 502 158 510',
  'M198 490C212 496 224 502 238 510',
  'M198 490C199 520 200 545 200 566',

  // ── The soma. Triangular, which is where "pyramidal" comes from. ──
  'M200 566C210 578 218 590 220 604C221 614 214 620 200 620C186 620 179 614 180 604C182 590 190 578 200 566Z',

  // ── Basal dendrites: shorter, bushier, spreading below the cell body ──
  'M186 618C172 634 158 646 142 658',
  'M142 658C132 670 126 680 118 692',
  'M142 658C130 664 120 668 108 672',
  'M214 618C228 634 242 646 258 658',
  'M258 658C268 670 274 680 282 692',
  'M258 658C270 664 280 668 292 672',
  'M196 622C190 642 186 658 182 676',
  'M204 622C210 642 214 658 218 676',

  // ── The axon. One long process, sparsely branched — the output. ──
  'M200 620C201 660 199 700 200 748',
  'M200 748C186 754 176 760 164 768',
  'M200 748C201 790 199 820 200 856',
  'M200 856C214 862 224 868 236 876',
  'M200 856C201 900 199 930 200 964',
  'M200 964C186 970 176 976 164 984',
  'M200 964C200 1010 200 1080 200 1148',
  'M200 1148C192 1156 186 1162 178 1170',
  'M200 1148C208 1156 214 1162 222 1170',
] as const;
