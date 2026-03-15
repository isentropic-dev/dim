/**
 * Molar mass units (M·N⁻¹).
 *
 * SI unit: kilogram per mole (kg/mol).
 *
 * @example Converting between molar mass units
 * ```ts
 * import { gramPerMole, kilogramPerMole } from "@isentropic/dim-si/molar-mass";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const water = gramPerMole(18.015);
 * valueIn(water, kilogramPerMole);  // 0.018015
 * ```
 *
 * @module
 */

import type { MolarMass as MolarMassDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { molarMass } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { MILLI } from "./prefixes.ts";

/** An SI molar mass quantity. */
export type MolarMass = Linear<MolarMassDim, Si>;

/** Kilogram per mole (kg/mol) — SI unit of molar mass. */
export const kilogramPerMole: BaseUnit<MolarMassDim> = si.unit(molarMass);

/** Gram per mole (g/mol) — 10⁻³ kg/mol. */
export const gramPerMole: ScaledUnit<MolarMassDim> = kilogramPerMole.scaled(
  MILLI,
);
