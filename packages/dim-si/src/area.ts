/**
 * Area units (L²).
 *
 * SI unit: square meter (m²).
 *
 * @example Converting hectares to square meters
 * ```ts
 * import { hectare, squareMeter } from "@isentropic/dim-si/area";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const field = hectare(2);
 * valueIn(field, squareMeter);  // 20000
 * ```
 *
 * @module
 */

import type { Area } from "@isentropic/dim-isq";
import { area } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";

export type { Area } from "@isentropic/dim-isq";

/** Square meter (m²) — SI unit of area. */
export const squareMeter: BaseUnit<Area> = si.unit(area);

/** Hectare (ha) — 10000 square meters. */
export const hectare: ScaledUnit<Area> = squareMeter.scaled(10000);
