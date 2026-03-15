/**
 * Kinematic viscosity units (L²·T⁻¹).
 *
 * SI unit: square meter per second (m²/s).
 *
 * @example Creating a kinematic viscosity
 * ```ts
 * import { squareMeterPerSecond } from "@isentropic/dim-si/kinematic-viscosity";
 *
 * const water = squareMeterPerSecond(1e-6);
 * ```
 *
 * @module
 */

import type { KinematicViscosity as KinematicViscosityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { kinematicViscosity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI kinematic viscosity quantity. */
export type KinematicViscosity = Linear<KinematicViscosityDim, Si>;

/** Square meter per second (m²/s) — SI unit of kinematic viscosity. */
export const squareMeterPerSecond: BaseUnit<KinematicViscosityDim> = si.unit(
  kinematicViscosity,
);
