/**
 * Mass units (M).
 *
 * SI base unit: kilogram (kg).
 *
 * @example Converting between mass units
 * ```ts
 * import { gram, kilogram, tonne } from "@isentropic/dim-si/mass";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const weight = tonne(2);
 * valueIn(weight, kilogram);  // 2000
 * valueIn(weight, gram);      // 2_000_000
 * ```
 *
 * @module
 */

import type { Mass as MassDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { mass } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { KILO, MICRO, MILLI, NANO } from "./prefixes.ts";

/** An SI mass quantity. */
export type Mass = Linear<MassDim, Si>;

/** Kilogram (kg) — SI unit of mass. */
export const kilogram: BaseUnit<MassDim> = si.unit(mass);

/** Gram (g) — 0.001 kilograms. */
export const gram: ScaledUnit<MassDim> = kilogram.scaled(MILLI);

/** Milligram (mg) — 10⁻³ grams. */
export const milligram: ScaledUnit<MassDim> = gram.scaled(MILLI);

/** Microgram (μg) — 10⁻⁶ grams. */
export const microgram: ScaledUnit<MassDim> = gram.scaled(MICRO);

/** Nanogram (ng) — 10⁻⁹ grams. */
export const nanogram: ScaledUnit<MassDim> = gram.scaled(NANO);

/** Tonne (t) — 1000 kilograms. */
export const tonne: ScaledUnit<MassDim> = kilogram.scaled(KILO);
