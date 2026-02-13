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

import type { Voltage as VoltageDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { voltage } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { KILO, MILLI } from "./prefixes.ts";

/** An SI voltage quantity. */
export type Voltage = Linear<VoltageDim, Si>;

/** Volt (V) — SI unit of voltage. */
export const volt: BaseUnit<VoltageDim> = si.unit(voltage);

/** Millivolt (mV) — 10⁻³ volts. */
export const millivolt: ScaledUnit<VoltageDim> = volt.scaled(MILLI);

/** Kilovolt (kV) — 1000 volts. */
export const kilovolt: ScaledUnit<VoltageDim> = volt.scaled(KILO);
