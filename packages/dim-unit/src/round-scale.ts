/**
 * Round a computed scale factor to eliminate IEEE 754 composition noise.
 *
 * When composing scale factors from unit properties (e.g.,
 * `gram.scale / centimeter.scale ** 3`), floating-point arithmetic can
 * introduce small errors — `0.01 ** 3` produces `1.0000000000000002e-6`
 * instead of `1e-6`. This function rounds to 15 significant digits,
 * which preserves all meaningful precision while eliminating these
 * artifacts.
 *
 * Use this when passing a computed expression to `.scaled()`. Do not
 * use it on values that are already the best float64 approximation of
 * the intended number (e.g., `1000 / 3600` for km/h) — rounding can
 * make those less accurate.
 *
 * @param scale - The computed scale factor to round
 * @returns The rounded scale factor
 *
 * @example Cleaning up composition noise
 * ```ts
 * import { roundScale } from "@isentropic/dim-unit";
 *
 * // Without roundScale: 0.01 ** 3 = 1.0000000000000002e-6
 * // With roundScale: exactly 1e-6
 * const factor = roundScale(gram.scale / centimeter.scale ** 3); // 1000
 * const unit = baseUnit.scaled(factor);
 * ```
 */
export function roundScale(scale: number): number {
  return parseFloat(scale.toPrecision(15));
}
