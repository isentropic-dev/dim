/**
 * Ready-to-use SI units with compile-time dimensional analysis.
 *
 * Provides the {@linkcode si} unit system and pre-defined units for all ISQ
 * base and common derived quantities. Units are organized into per-quantity
 * modules (e.g., `@isentropic/dim-si/length`, `@isentropic/dim-si/energy`)
 * and include SI prefixes and accepted non-SI units (liter, bar, hour, etc.).
 *
 * - Arithmetic and unit conversion: `@isentropic/dim-si/ops`
 * - SI prefix constants for custom scaling: `@isentropic/dim-si/prefixes`
 * - Scalar (dimensionless) quantities: `@isentropic/dim-si/scalar`
 *
 * The {@linkcode si} instance can also create custom units beyond those
 * pre-defined in this package.
 *
 * @module
 */

export { type Si, si } from "./system.ts";
