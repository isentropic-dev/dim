/**
 * Mass flow rate units (M·T⁻¹).
 *
 * SI unit: kilogram per second (kg/s).
 *
 * @example Creating a mass flow rate
 * ```ts
 * import { kilogramPerSecond } from "@isentropic/dim-si/mass-flow-rate";
 *
 * const flow = kilogramPerSecond(0.5);
 * ```
 *
 * @module
 */

import type { MassFlowRate as MassFlowRateDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { massFlowRate } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI mass flow rate quantity. */
export type MassFlowRate = Linear<MassFlowRateDim, Si>;

/** Kilogram per second (kg/s) — SI unit of mass flow rate. */
export const kilogramPerSecond: BaseUnit<MassFlowRateDim> = si.unit(
  massFlowRate,
);
