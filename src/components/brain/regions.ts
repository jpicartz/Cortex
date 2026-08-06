import type { Region } from '@/content/schema';

/**
 * Geometry for the brain schematic.
 *
 * A mid-sagittal view — the brain sliced down the middle — with anterior
 * (front) on the LEFT. That view is chosen deliberately over a lateral one:
 * the structures this app talks about most, the amygdala and hippocampus, are
 * deep. A side view would have to draw them showing through the cortex, which
 * is a small lie. In mid-sagittal they are honestly visible.
 *
 * Deliberately schematic rather than a medical illustration: positions are
 * right, the rendering is a clean line diagram in the app's own weight. A
 * stylised diagram reads as intentional; a poor attempt at realism reads as
 * amateur.
 *
 * Region blobs are kept small relative to the silhouette on purpose — the
 * outline should stay legible as a brain, not become a background for circles.
 */

export const VIEWBOX = { width: 360, height: 300 } as const;

export type Shape =
  /** Filled blob — for compact nuclei. */
  | { kind: 'ellipse'; cx: number; cy: number; rx: number; ry: number }
  /** Stroked path — for tracts, arcs and networks that are not blobs. */
  | { kind: 'stroke'; d: string; width?: number };

/** The static silhouette. Never highlighted; it is the ground, not a region. */
export const OUTLINE = {
  /**
   * Cerebrum, mid-sagittal, facing left. Two features do the work of making
   * this read as a brain rather than a cloud: the underside dips forward for
   * the temporal lobe, and it notches inward at the back so the cerebellum
   * nests *into* the mass instead of floating beside it.
   */
  cerebrum:
    'M50 134C50 98 66 72 94 58C128 42 186 42 226 58C268 74 306 106 312 142C315 164 304 178 286 180C274 182 264 180 256 178C248 176 240 174 228 174L214 174C200 188 190 196 174 200C148 208 118 202 96 190C70 176 50 158 50 134Z',
  /** Corpus callosum — the signature arc of a mid-sagittal section. */
  callosum: 'M100 148C108 122 140 106 180 106C214 106 240 120 248 144',
  /**
   * Medial sulci, fanning out from the callosum. This is the cue that sells
   * the view: a smooth interior reads as an outline of something, a fanned
   * one reads as a brain sliced down the middle.
   */
  sulci:
    'M96 98C118 86 144 82 168 86M178 80C202 80 226 88 244 102M88 130C84 114 88 100 98 90M262 124C276 134 286 148 290 164M134 68C152 60 174 58 194 60',
  /** Cerebellum, nested into the notch under the occipital lobe. */
  cerebellum:
    'M234 180C258 177 282 185 289 199C295 212 286 224 268 226C250 228 237 219 235 205C234 194 234 185 234 180Z',
  /** Its foliation, hinted rather than drawn. */
  cerebellumFolia: 'M240 191C255 188 273 192 282 199M239 205C254 202 271 206 280 213',
  /** Brainstem descending toward the spinal cord. */
  brainstem: 'M215 176C218 191 220 203 223 215',
} as const;

type RegionGeometry = {
  shapes: Shape[];
  /** Where a leader line should terminate when this region is labelled. */
  anchor: { x: number; y: number };
};

export const REGION_GEOMETRY: Record<Region, RegionGeometry> = {
  // Cortical areas are arcs that follow the cortex; nuclei are dots; pathways
  // are lines. That grammar is the diagram's whole legibility — a reader can
  // tell a structure from a route without reading a legend.
  prefrontal: {
    shapes: [{ kind: 'stroke', d: 'M60 142C55 114 63 90 84 72', width: 12 }],
    anchor: { x: 46, y: 106 },
  },
  dlpfc: {
    shapes: [{ kind: 'stroke', d: 'M94 64C114 53 138 50 160 52', width: 11 }],
    anchor: { x: 122, y: 46 },
  },
  vlpfc: {
    shapes: [{ kind: 'stroke', d: 'M60 150C65 169 79 183 99 189', width: 11 }],
    anchor: { x: 62, y: 208 },
  },
  acc: {
    shapes: [{ kind: 'stroke', d: 'M106 146C116 122 146 107 180 105', width: 10 }],
    anchor: { x: 144, y: 100 },
  },
  amygdala: {
    shapes: [{ kind: 'ellipse', cx: 142, cy: 171, rx: 8, ry: 7 }],
    anchor: { x: 138, y: 192 },
  },
  hippocampus: {
    shapes: [{ kind: 'stroke', d: 'M154 176C170 184 186 184 200 176', width: 8 }],
    anchor: { x: 182, y: 196 },
  },
  'ventral-striatum': {
    shapes: [{ kind: 'ellipse', cx: 128, cy: 152, rx: 7, ry: 6.5 }],
    anchor: { x: 122, y: 140 },
  },
  scn: {
    shapes: [{ kind: 'ellipse', cx: 146, cy: 185, rx: 4.5, ry: 4 }],
    anchor: { x: 152, y: 204 },
  },
  limbic: {
    shapes: [
      { kind: 'stroke', d: 'M106 146C116 122 146 107 180 105', width: 10 },
      { kind: 'ellipse', cx: 142, cy: 171, rx: 8, ry: 7 },
      { kind: 'stroke', d: 'M154 176C170 184 186 184 200 176', width: 8 },
    ],
    anchor: { x: 128, y: 196 },
  },
  dmn: {
    shapes: [
      { kind: 'stroke', d: 'M62 136C58 112 66 92 82 78', width: 11 },
      { kind: 'stroke', d: 'M268 92C292 106 306 128 303 150', width: 11 },
      { kind: 'stroke', d: 'M86 92C140 70 220 74 272 98', width: 1.8 },
    ],
    anchor: { x: 300, y: 172 },
  },
  'reward-path': {
    shapes: [
      { kind: 'ellipse', cx: 202, cy: 186, rx: 6, ry: 5.5 },
      { kind: 'ellipse', cx: 130, cy: 155, rx: 7, ry: 6.5 },
      { kind: 'stroke', d: 'M196 183C177 173 156 164 139 159', width: 2.2 },
      { kind: 'stroke', d: 'M124 148C114 138 102 128 92 120', width: 2.2 },
    ],
    anchor: { x: 204, y: 204 },
  },
  vagus: {
    shapes: [{ kind: 'stroke', d: 'M222 198C229 224 233 245 235 273', width: 3.5 }],
    anchor: { x: 250, y: 264 },
  },
};
