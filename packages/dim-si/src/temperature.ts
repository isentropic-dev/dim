/**
 * Temperature units (Θ).
 *
 * SI base unit: kelvin (K). Celsius and Fahrenheit are affine units.
 *
 * @module
 */

import type { Temperature } from "@isentropic/dim-isq";
import { temperature } from "@isentropic/dim-isq";
import type { AffineUnit, BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { Temperature } from "@isentropic/dim-isq";

/** Kelvin (K) — SI unit of thermodynamic temperature. */
export const kelvin: BaseUnit<Temperature> = si.unit(temperature);

/**
 * Celsius (°C) — temperature offset from kelvin by 273.15.
 *
 * Celsius is an affine unit. Use `.delta` for temperature differences:
 * ```ts
 * const rise = celsius.delta(10);  // 10°C temperature difference
 * const newTemp = add(celsius(20), rise);  // 30°C
 * ```
 */
export const celsius: AffineUnit<Temperature> = kelvin.offset(273.15);

/**
 * Fahrenheit (°F) — temperature with scale 5/9 and offset from kelvin.
 *
 * Fahrenheit is an affine unit. Use `.delta` for temperature differences:
 * ```ts
 * const rise = fahrenheit.delta(18);  // 18°F difference = 10°C difference
 * ```
 */
// Fahrenheit to Kelvin: K = (°F + 459.67) × 5/9
// 459.67 is the offset in Rankine scale (0°R = 0K, 0°F = 459.67°R)
export const fahrenheit: AffineUnit<Temperature> = kelvin.scaled(5 / 9).offset(
  459.67 * 5 / 9,
);
