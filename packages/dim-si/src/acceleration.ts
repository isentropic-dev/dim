/**
 * Acceleration units (L·T⁻²).
 *
 * SI unit: meter per second squared (m/s²).
 *
 * @example Creating an acceleration
 * ```ts
 * import { meterPerSecondSquared } from "@isentropic/dim-si/acceleration";
 *
 * const gravity = meterPerSecondSquared(9.81);
 * ```
 *
 * @module
 */

import type { Acceleration as AccelerationDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { acceleration } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI acceleration quantity. */
export type Acceleration = Linear<AccelerationDim, Si>;

/** Meter per second squared (m/s²) — SI unit of acceleration. */
export const meterPerSecondSquared: BaseUnit<AccelerationDim> = si.unit(
  acceleration,
);
