/**
 * Electrical capacitance units (M⁻¹·L⁻²·T⁴·I²).
 *
 * SI unit: farad (F).
 *
 * @example Converting between capacitance units
 * ```ts
 * import { microfarad, nanofarad, picofarad } from "@isentropic/dim-si/capacitance";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const cap = microfarad(4.7);
 * valueIn(cap, nanofarad);   // 4700
 * valueIn(cap, picofarad);   // 4_700_000
 * ```
 *
 * @module
 */

import type { Capacitance } from "@isentropic/dim-isq";
import { capacitance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { MICRO, NANO, PICO } from "./prefixes.ts";

export type { Capacitance } from "@isentropic/dim-isq";

/** Farad (F) — SI unit of capacitance. */
export const farad: BaseUnit<Capacitance> = si.unit(capacitance);

/** Microfarad (μF) — 10⁻⁶ farads. */
export const microfarad: ScaledUnit<Capacitance> = farad.scaled(MICRO);

/** Nanofarad (nF) — 10⁻⁹ farads. */
export const nanofarad: ScaledUnit<Capacitance> = farad.scaled(NANO);

/** Picofarad (pF) — 10⁻¹² farads. */
export const picofarad: ScaledUnit<Capacitance> = farad.scaled(PICO);
