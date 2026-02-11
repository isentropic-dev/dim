/**
 * Volume units (L³).
 *
 * SI unit: cubic meter (m³).
 *
 * @example
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

import type { Volume } from "@isentropic/dim-isq";
import { volume } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

export type { Volume } from "@isentropic/dim-isq";

/** Cubic meter (m³) — SI unit of volume. */
export const cubicMeter: BaseUnit<Volume> = si.unit(volume);

/** Liter (L) — 0.001 cubic meters. */
export const liter: ScaledUnit<Volume> = cubicMeter.scaled(MILLI);

/** Milliliter (mL) — 10⁻³ liters. */
export const milliliter: ScaledUnit<Volume> = liter.scaled(MILLI);

/** Microliter (μL) — 10⁻⁶ liters. */
export const microliter: ScaledUnit<Volume> = liter.scaled(MICRO);
