/**
 * Velocity units (L·T⁻¹).
 *
 * SI unit: meter per second (m/s).
 *
 * @example Computing velocity from distance and time
 * ```ts
 * import { meterPerSecond } from "@isentropic/dim-si/velocity";
 * import { kilometer } from "@isentropic/dim-si/length";
 * import { hour } from "@isentropic/dim-si/time";
 * import { divide, valueIn } from "@isentropic/dim-si/ops";
 *
 * const speed = divide(kilometer(100), hour(1));
 * valueIn(speed, meterPerSecond);  // ~27.78
 * ```
 *
 * @module
 */

import type { Velocity as VelocityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { velocity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI velocity quantity. */
export type Velocity = Linear<VelocityDim, Si>;

/** Meter per second (m/s) — SI unit of velocity. */
export const meterPerSecond: BaseUnit<VelocityDim> = si.unit(velocity);
