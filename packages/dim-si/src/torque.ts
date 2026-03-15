/**
 * Torque units (M·L²·T⁻²).
 *
 * SI unit: newton meter (N·m).
 *
 * Note: torque shares this dimension with energy (joule). This is
 * intentional per SI — the type system cannot distinguish them.
 *
 * @example Creating a torque
 * ```ts
 * import { newtonMeter } from "@isentropic/dim-si/torque";
 *
 * const tau = newtonMeter(50);
 * ```
 *
 * @module
 */

import type { Torque as TorqueDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { torque } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI torque quantity. */
export type Torque = Linear<TorqueDim, Si>;

/** Newton meter (N·m) — SI unit of torque. */
export const newtonMeter: BaseUnit<TorqueDim> = si.unit(torque);
