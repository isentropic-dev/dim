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

import type { Area as AreaDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { area } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI area quantity. */
export type Area = Linear<AreaDim, Si>;

/** Square meter (m²) — SI unit of area. */
export const squareMeter: BaseUnit<AreaDim> = si.unit(area);

/** Hectare (ha) — 10000 square meters. */
export const hectare: ScaledUnit<AreaDim> = squareMeter.scaled(10000);
