/**
 * Velocity units (L·T⁻¹).
 *
 * SI unit: meter per second (m/s).
 *
 * @module
 */

import type { Velocity } from "@isentropic/dim-isq";
import { velocity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { Velocity } from "@isentropic/dim-isq";

/** Meter per second (m/s) — SI unit of velocity. */
export const meterPerSecond: BaseUnit<Velocity> = si.unit(velocity);
