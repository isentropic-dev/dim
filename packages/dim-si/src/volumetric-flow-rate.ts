/**
 * Volumetric flow rate units (L³·T⁻¹).
 *
 * SI unit: cubic meter per second (m³/s).
 *
 * @example Converting between flow rate units
 * ```ts
 * import { cubicMeterPerSecond, literPerMinute, literPerSecond } from "@isentropic/dim-si/volumetric-flow-rate";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const flow = cubicMeterPerSecond(1);
 * valueIn(flow, literPerSecond);  // 1000
 * valueIn(flow, literPerMinute);  // 60000
 * ```
 *
 * @module
 */

import type { VolumetricFlowRate as VolumetricFlowRateDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { volumetricFlowRate } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { liter } from "./volume.ts";
import { minute } from "./time.ts";

/** An SI volumetric flow rate quantity. */
export type VolumetricFlowRate = Linear<VolumetricFlowRateDim, Si>;

/** Cubic meter per second (m³/s) — SI unit of volumetric flow rate. */
export const cubicMeterPerSecond: BaseUnit<VolumetricFlowRateDim> = si.unit(
  volumetricFlowRate,
);

/** Liter per second (L/s) — 10⁻³ m³/s. */
export const literPerSecond: ScaledUnit<VolumetricFlowRateDim> =
  cubicMeterPerSecond.scaled(liter.scale);

/** Liter per minute (L/min) — 10⁻³/60 m³/s. */
export const literPerMinute: ScaledUnit<VolumetricFlowRateDim> =
  cubicMeterPerSecond.scaled(liter.scale / minute.scale);
