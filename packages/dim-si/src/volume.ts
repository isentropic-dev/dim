/**
 * Volume units (L³).
 *
 * SI unit: cubic meter (m³).
 *
 * @example Converting between volume units
 * ```ts
 * import { liter, milliliter } from "@isentropic/dim-si/volume";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const bottle = liter(1.5);
 * valueIn(bottle, milliliter);  // 1500
 * ```
 *
 * @module
 */

import type { Volume as VolumeDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { volume } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

/** An SI volume quantity. */
export type Volume = Linear<VolumeDim, Si>;

/** Cubic meter (m³) — SI unit of volume. */
export const cubicMeter: BaseUnit<VolumeDim> = si.unit(volume);

/** Liter (L) — 0.001 cubic meters. */
export const liter: ScaledUnit<VolumeDim> = cubicMeter.scaled(MILLI);

/** Milliliter (mL) — 10⁻³ liters. */
export const milliliter: ScaledUnit<VolumeDim> = liter.scaled(MILLI);

/** Microliter (μL) — 10⁻⁶ liters. */
export const microliter: ScaledUnit<VolumeDim> = liter.scaled(MICRO);
