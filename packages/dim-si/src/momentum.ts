/**
 * Momentum units (M·L·T⁻¹).
 *
 * SI unit: newton second (N·s).
 *
 * @example Creating a momentum
 * ```ts
 * import { newtonSecond } from "@isentropic/dim-si/momentum";
 *
 * const impulse = newtonSecond(50);
 * ```
 *
 * @module
 */

import type { Momentum as MomentumDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { momentum } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI momentum quantity. */
export type Momentum = Linear<MomentumDim, Si>;

/** Newton second (N·s) — SI unit of momentum. */
export const newtonSecond: BaseUnit<MomentumDim> = si.unit(momentum);
