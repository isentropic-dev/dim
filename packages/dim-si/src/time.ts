/**
 * Time units (T).
 *
 * SI base unit: second (s).
 *
 * @module
 */

import type { Time } from "@isentropic/dim-isq";
import { time } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, MILLI, NANO, PICO } from "./prefixes.ts";

export type { Time } from "@isentropic/dim-isq";

/** Second (s) — SI unit of time. */
export const second: BaseUnit<Time> = si.unit(time);

/** Millisecond (ms) — 10⁻³ seconds. */
export const millisecond: ScaledUnit<Time> = second.scaled(MILLI);

/** Microsecond (μs) — 10⁻⁶ seconds. */
export const microsecond: ScaledUnit<Time> = second.scaled(MICRO);

/** Nanosecond (ns) — 10⁻⁹ seconds. */
export const nanosecond: ScaledUnit<Time> = second.scaled(NANO);

/** Picosecond (ps) — 10⁻¹² seconds. */
export const picosecond: ScaledUnit<Time> = second.scaled(PICO);

/** Minute (min) — 60 seconds. */
export const minute: ScaledUnit<Time> = second.scaled(60);

/** Hour (h) — 3600 seconds. */
export const hour: ScaledUnit<Time> = second.scaled(3600);

/** Day (d) — 86400 seconds. */
export const day: ScaledUnit<Time> = second.scaled(86400);
