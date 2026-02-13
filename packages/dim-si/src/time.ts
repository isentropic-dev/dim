/**
 * Time units (T).
 *
 * SI base unit: second (s).
 *
 * @example Converting between time units
 * ```ts
 * import { hour, minute, second } from "@isentropic/dim-si/time";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const duration = hour(1.5);
 * valueIn(duration, minute);  // 90
 * valueIn(duration, second);  // 5400
 * ```
 *
 * @module
 */

import type { Time as TimeDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { time } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, MILLI, NANO, PICO } from "./prefixes.ts";

/** An SI time quantity. */
export type Time = Linear<TimeDim, Si>;

/** Second (s) — SI unit of time. */
export const second: BaseUnit<TimeDim> = si.unit(time);

/** Millisecond (ms) — 10⁻³ seconds. */
export const millisecond: ScaledUnit<TimeDim> = second.scaled(MILLI);

/** Microsecond (μs) — 10⁻⁶ seconds. */
export const microsecond: ScaledUnit<TimeDim> = second.scaled(MICRO);

/** Nanosecond (ns) — 10⁻⁹ seconds. */
export const nanosecond: ScaledUnit<TimeDim> = second.scaled(NANO);

/** Picosecond (ps) — 10⁻¹² seconds. */
export const picosecond: ScaledUnit<TimeDim> = second.scaled(PICO);

/** Minute (min) — 60 seconds. */
export const minute: ScaledUnit<TimeDim> = second.scaled(60);

/** Hour (h) — 3600 seconds. */
export const hour: ScaledUnit<TimeDim> = second.scaled(3600);

/** Day (d) — 86400 seconds. */
export const day: ScaledUnit<TimeDim> = second.scaled(86400);
