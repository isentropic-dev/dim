/**
 * Angular velocity units (T⁻¹).
 *
 * SI unit: radian per second (rad/s).
 *
 * Note: angular velocity shares this dimension with frequency
 * (hertz). This is intentional per SI — the type system cannot
 * distinguish them.
 *
 * @example Converting RPM to radians per second
 * ```ts
 * import { radianPerSecond, revolutionPerMinute } from "@isentropic/dim-si/angular-velocity";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const engine = revolutionPerMinute(3000);
 * valueIn(engine, radianPerSecond);  // ~314.16
 * ```
 *
 * @module
 */

import type { AngularVelocity as AngularVelocityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { angularVelocity } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI angular velocity quantity. */
export type AngularVelocity = Linear<AngularVelocityDim, Si>;

/** Radian per second (rad/s) — SI unit of angular velocity. */
export const radianPerSecond: BaseUnit<AngularVelocityDim> = si.unit(
  angularVelocity,
);

/** Revolution per minute (rpm) — 2π/60 rad/s. */
export const revolutionPerMinute: ScaledUnit<AngularVelocityDim> =
  radianPerSecond.scaled(2 * Math.PI / 60);
