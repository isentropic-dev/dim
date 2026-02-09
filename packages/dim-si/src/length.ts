/**
 * Length units (L).
 *
 * SI base unit: meter (m).
 *
 * @module
 */

import type { Length } from "@isentropic/dim-isq";
import { length } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";
import { CENTI, KILO, MICRO, MILLI, NANO, PICO } from "./prefixes.ts";

export type { Length } from "@isentropic/dim-isq";

/** Meter (m) — SI unit of length. */
export const meter: BaseUnit<Length> = si.unit(length);

/** Kilometer (km) — 1000 meters. */
export const kilometer: ScaledUnit<Length> = meter.scaled(KILO);

/** Centimeter (cm) — 0.01 meters. */
export const centimeter: ScaledUnit<Length> = meter.scaled(CENTI);

/** Millimeter (mm) — 0.001 meters. */
export const millimeter: ScaledUnit<Length> = meter.scaled(MILLI);

/** Micrometer (μm) — 10⁻⁶ meters. */
export const micrometer: ScaledUnit<Length> = meter.scaled(MICRO);

/** Nanometer (nm) — 10⁻⁹ meters. */
export const nanometer: ScaledUnit<Length> = meter.scaled(NANO);

/** Picometer (pm) — 10⁻¹² meters. */
export const picometer: ScaledUnit<Length> = meter.scaled(PICO);
