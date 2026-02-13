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

import type { Capacitance as CapacitanceDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { capacitance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, NANO, PICO } from "./prefixes.ts";

/** An SI capacitance quantity. */
export type Capacitance = Linear<CapacitanceDim, Si>;

/** Farad (F) — SI unit of capacitance. */
export const farad: BaseUnit<CapacitanceDim> = si.unit(capacitance);

/** Microfarad (μF) — 10⁻⁶ farads. */
export const microfarad: ScaledUnit<CapacitanceDim> = farad.scaled(MICRO);

/** Nanofarad (nF) — 10⁻⁹ farads. */
export const nanofarad: ScaledUnit<CapacitanceDim> = farad.scaled(NANO);

/** Picofarad (pF) — 10⁻¹² farads. */
export const picofarad: ScaledUnit<CapacitanceDim> = farad.scaled(PICO);
