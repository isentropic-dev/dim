/**
 * Velocity units (L·T⁻¹).
 *
 * SI unit: meter per second (m/s).
 *
 * @example
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

import type { Velocity } from "@isentropic/dim-isq";
import { velocity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { Velocity } from "@isentropic/dim-isq";

/** Meter per second (m/s) — SI unit of velocity. */
export const meterPerSecond: BaseUnit<Velocity> = si.unit(velocity);
