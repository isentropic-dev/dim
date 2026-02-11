/**
 * Temperature units (Θ).
 *
 * SI base unit: kelvin (K). Celsius and Fahrenheit are affine units
 * with offsets from absolute zero.
 *
 * Use the unit directly for absolute temperatures, and `.delta` for
 * temperature differences.
 *
 * @example
 * ```ts
 * import { celsius, fahrenheit, kelvin } from "@isentropic/dim-si/temperature";
 * import { add, subtract, valueIn } from "@isentropic/dim-si/ops";
 *
 * // Absolute temperatures
 * const boiling = celsius(100);
 * valueIn(boiling, kelvin);      // 373.15
 * valueIn(boiling, fahrenheit);  // 212
 *
 * // Temperature differences use .delta
 * const diff = subtract(celsius(25), celsius(20));
 * valueIn(diff, celsius.delta);  // 5
 *
 * const heated = add(celsius(20), celsius.delta(10));
 * valueIn(heated, celsius);  // 30
 * ```
 *
 * @module
 */

import type { Temperature } from "@isentropic/dim-isq";
import { temperature } from "@isentropic/dim-isq";
import type { AffineUnit, BaseUnit } from "./types.ts";
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
