/**
 * Acceleration units (L·T⁻²).
 *
 * SI unit: meter per second squared (m/s²).
 *
 * @module
 */

import type { Acceleration } from "@isentropic/dim-isq";
import { acceleration } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { Acceleration } from "@isentropic/dim-isq";

/** Meter per second squared (m/s²) — SI unit of acceleration. */
export const meterPerSecondSquared: BaseUnit<Acceleration> = si.unit(
  acceleration,
);
