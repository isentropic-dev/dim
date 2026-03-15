/**
 * Angular acceleration units (T⁻²).
 *
 * SI unit: radian per second squared (rad/s²).
 *
 * @example Creating an angular acceleration
 * ```ts
 * import { radianPerSecondSquared } from "@isentropic/dim-si/angular-acceleration";
 *
 * const alpha = radianPerSecondSquared(5);
 * ```
 *
 * @module
 */

import type { AngularAcceleration as AngularAccelerationDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { angularAcceleration } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI angular acceleration quantity. */
export type AngularAcceleration = Linear<AngularAccelerationDim, Si>;

/** Radian per second squared (rad/s²) — SI unit of angular acceleration. */
export const radianPerSecondSquared: BaseUnit<AngularAccelerationDim> = si.unit(
  angularAcceleration,
);
