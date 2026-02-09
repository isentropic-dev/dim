/**
 * Amount of substance units (N).
 *
 * SI base unit: mole (mol).
 *
 * @module
 */

import type { Amount } from "@isentropic/dim-isq";
import { amount } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

export type { Amount } from "@isentropic/dim-isq";

/** Mole (mol) — SI unit of amount of substance. */
export const mole: BaseUnit<Amount> = si.unit(amount);

/** Millimole (mmol) — 10⁻³ moles. */
export const millimole: ScaledUnit<Amount> = mole.scaled(MILLI);

/** Micromole (μmol) — 10⁻⁶ moles. */
export const micromole: ScaledUnit<Amount> = mole.scaled(MICRO);
