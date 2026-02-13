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

import type { Frequency as FrequencyDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { frequency } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { GIGA, KILO, MEGA } from "./prefixes.ts";

/** An SI frequency quantity. */
export type Frequency = Linear<FrequencyDim, Si>;

/** Hertz (Hz) — SI unit of frequency. */
export const hertz: BaseUnit<FrequencyDim> = si.unit(frequency);

/** Becquerel (Bq) — SI unit of radioactivity (same dimension as hertz). */
export const becquerel: BaseUnit<FrequencyDim> = si.unit(frequency);

/** Kilohertz (kHz) — 1000 hertz. */
export const kilohertz: ScaledUnit<FrequencyDim> = hertz.scaled(KILO);

/** Megahertz (MHz) — 10⁶ hertz. */
export const megahertz: ScaledUnit<FrequencyDim> = hertz.scaled(MEGA);

/** Gigahertz (GHz) — 10⁹ hertz. */
export const gigahertz: ScaledUnit<FrequencyDim> = hertz.scaled(GIGA);
