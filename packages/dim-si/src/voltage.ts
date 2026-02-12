/**
 * Voltage units (M·L²·T⁻³·I⁻¹).
 *
 * SI unit: volt (V).
 *
 * @example Converting between voltage units
 * ```ts
 * import { kilovolt, millivolt, volt } from "@isentropic/dim-si/voltage";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const supply = volt(3.3);
 * valueIn(supply, millivolt);  // 3300
 * ```
 *
 * @module
 */

import type { Voltage } from "@isentropic/dim-isq";
import { voltage } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { KILO, MILLI } from "./prefixes.ts";

export type { Voltage } from "@isentropic/dim-isq";

/** Volt (V) — SI unit of voltage. */
export const volt: BaseUnit<Voltage> = si.unit(voltage);

/** Millivolt (mV) — 10⁻³ volts. */
export const millivolt: ScaledUnit<Voltage> = volt.scaled(MILLI);

/** Kilovolt (kV) — 1000 volts. */
export const kilovolt: ScaledUnit<Voltage> = volt.scaled(KILO);
