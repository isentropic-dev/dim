/**
 * Concentration units (N·L⁻³).
 *
 * SI unit: mole per cubic meter (mol/m³).
 *
 * @example Converting between concentration units
 * ```ts
 * import { molePerCubicMeter, molePerLiter } from "@isentropic/dim-si/concentration";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const c = molePerLiter(1);
 * valueIn(c, molePerCubicMeter);  // 1000
 * ```
 *
 * @module
 */

import type { Concentration as ConcentrationDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { concentration } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { KILO } from "./prefixes.ts";

/** An SI concentration quantity. */
export type Concentration = Linear<ConcentrationDim, Si>;

/** Mole per cubic meter (mol/m³) — SI unit of concentration. */
export const molePerCubicMeter: BaseUnit<ConcentrationDim> = si.unit(
  concentration,
);

/** Mole per liter (mol/L) — 1000 mol/m³. */
export const molePerLiter: ScaledUnit<ConcentrationDim> = molePerCubicMeter
  .scaled(KILO);
