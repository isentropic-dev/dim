/**
 * Electric field strength units (M·L·T⁻³·I⁻¹).
 *
 * SI unit: volt per meter (V/m).
 *
 * @example Creating an electric field strength
 * ```ts
 * import { voltPerMeter } from "@isentropic/dim-si/electric-field-strength";
 *
 * const field = voltPerMeter(1000);
 * ```
 *
 * @module
 */

import type { ElectricFieldStrength as ElectricFieldStrengthDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { electricFieldStrength } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI electric field strength quantity. */
export type ElectricFieldStrength = Linear<ElectricFieldStrengthDim, Si>;

/** Volt per meter (V/m) — SI unit of electric field strength. */
export const voltPerMeter: BaseUnit<ElectricFieldStrengthDim> = si.unit(
  electricFieldStrength,
);
