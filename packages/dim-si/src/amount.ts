/**
 * Amount of substance units (N).
 *
 * SI base unit: mole (mol).
 *
 * @example Converting between mole and millimole
 * ```ts
 * import { millimole, mole } from "@isentropic/dim-si/amount";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const substance = mole(0.5);
 * valueIn(substance, millimole);  // 500
 * ```
 *
 * @module
 */

import type { Amount } from "@isentropic/dim-isq";
import { amount } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

export type { Amount } from "@isentropic/dim-isq";

/** Mole (mol) — SI unit of amount of substance. */
export const mole: BaseUnit<Amount> = si.unit(amount);

/** Millimole (mmol) — 10⁻³ moles. */
export const millimole: ScaledUnit<Amount> = mole.scaled(MILLI);

/** Micromole (μmol) — 10⁻⁶ moles. */
export const micromole: ScaledUnit<Amount> = mole.scaled(MICRO);
