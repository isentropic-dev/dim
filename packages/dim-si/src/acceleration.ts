/**
 * Acceleration units (L·T⁻²).
 *
 * SI unit: meter per second squared (m/s²).
 *
 * @example
 * ```ts
 * import { meterPerSecondSquared } from "@isentropic/dim-si/acceleration";
 *
 * const gravity = meterPerSecondSquared(9.81);
 * ```
 *
 * @module
 */

import type { Acceleration } from "@isentropic/dim-isq";
import { acceleration } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { Acceleration } from "@isentropic/dim-isq";

/** Meter per second squared (m/s²) — SI unit of acceleration. */
export const meterPerSecondSquared: BaseUnit<Acceleration> = si.unit(
  acceleration,
);
