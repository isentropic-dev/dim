/**
 * Specific volume units (M⁻¹·L³).
 *
 * SI unit: cubic meter per kilogram (m³/kg).
 *
 * @example Creating a specific volume
 * ```ts
 * import { cubicMeterPerKilogram } from "@isentropic/dim-si/specific-volume";
 *
 * const sv = cubicMeterPerKilogram(0.001);
 * ```
 *
 * @module
 */

import type { SpecificVolume as SpecificVolumeDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { specificVolume } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI specific volume quantity. */
export type SpecificVolume = Linear<SpecificVolumeDim, Si>;

/** Cubic meter per kilogram (m³/kg) — SI unit of specific volume. */
export const cubicMeterPerKilogram: BaseUnit<SpecificVolumeDim> = si.unit(
  specificVolume,
);
