/**
 * Frequency units (T⁻¹).
 *
 * SI unit: hertz (Hz).
 *
 * Note: becquerel (radioactive decay rate) shares this dimension
 * with hertz (cycles per second). This is intentional per SI.
 *
 * @example Converting between frequency units
 * ```ts
 * import { gigahertz, hertz, megahertz } from "@isentropic/dim-si/frequency";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const clock = gigahertz(3.2);
 * valueIn(clock, megahertz);  // 3200
 * valueIn(clock, hertz);      // 3_200_000_000
 * ```
 *
 * @module
 */

import type { Frequency } from "@isentropic/dim-isq";
import { frequency } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { GIGA, KILO, MEGA } from "./prefixes.ts";

export type { Frequency } from "@isentropic/dim-isq";

/** Hertz (Hz) — SI unit of frequency. */
export const hertz: BaseUnit<Frequency> = si.unit(frequency);

/** Becquerel (Bq) — SI unit of radioactivity (same dimension as hertz). */
export const becquerel: BaseUnit<Frequency> = si.unit(frequency);

/** Kilohertz (kHz) — 1000 hertz. */
export const kilohertz: ScaledUnit<Frequency> = hertz.scaled(KILO);

/** Megahertz (MHz) — 10⁶ hertz. */
export const megahertz: ScaledUnit<Frequency> = hertz.scaled(MEGA);

/** Gigahertz (GHz) — 10⁹ hertz. */
export const gigahertz: ScaledUnit<Frequency> = hertz.scaled(GIGA);
