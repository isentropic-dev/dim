/**
 * Mass units (M).
 *
 * SI base unit: kilogram (kg).
 *
 * @module
 */

import type { Mass } from "@isentropic/dim-isq";
import { mass } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";
import { KILO, MICRO, MILLI, NANO } from "./prefixes.ts";

export type { Mass } from "@isentropic/dim-isq";

/** Kilogram (kg) — SI unit of mass. */
export const kilogram: BaseUnit<Mass> = si.unit(mass);

/** Gram (g) — 0.001 kilograms. */
export const gram: ScaledUnit<Mass> = kilogram.scaled(MILLI);

/** Milligram (mg) — 10⁻³ grams. */
export const milligram: ScaledUnit<Mass> = gram.scaled(MILLI);

/** Microgram (μg) — 10⁻⁶ grams. */
export const microgram: ScaledUnit<Mass> = gram.scaled(MICRO);

/** Nanogram (ng) — 10⁻⁹ grams. */
export const nanogram: ScaledUnit<Mass> = gram.scaled(NANO);

/** Tonne (t) — 1000 kilograms. */
export const tonne: ScaledUnit<Mass> = kilogram.scaled(KILO);
