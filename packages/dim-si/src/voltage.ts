/**
 * Voltage units (M·L²·T⁻³·I⁻¹).
 *
 * SI unit: volt (V).
 *
 * @module
 */

import type { Voltage } from "@isentropic/dim-isq";
import { voltage } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";
import { KILO, MILLI } from "./prefixes.ts";

export type { Voltage } from "@isentropic/dim-isq";

/** Volt (V) — SI unit of voltage. */
export const volt: BaseUnit<Voltage> = si.unit(voltage);

/** Millivolt (mV) — 10⁻³ volts. */
export const millivolt: ScaledUnit<Voltage> = volt.scaled(MILLI);

/** Kilovolt (kV) — 1000 volts. */
export const kilovolt: ScaledUnit<Voltage> = volt.scaled(KILO);
