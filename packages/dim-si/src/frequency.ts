/**
 * Frequency units (T⁻¹).
 *
 * SI unit: hertz (Hz).
 *
 * Note: becquerel (radioactive decay rate) shares this dimension
 * with hertz (cycles per second). This is intentional per SI.
 *
 * @module
 */

import type { Frequency } from "@isentropic/dim-isq";
import { frequency } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
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
