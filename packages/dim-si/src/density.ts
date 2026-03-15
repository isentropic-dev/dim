/**
 * Density units (M·L⁻³).
 *
 * SI unit: kilogram per cubic meter (kg/m³).
 *
 * @example Converting between density units
 * ```ts
 * import { gramPerCubicCentimeter, gramPerLiter, kilogramPerCubicMeter } from "@isentropic/dim-si/density";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const water = kilogramPerCubicMeter(1000);
 * valueIn(water, gramPerLiter);            // 1000
 * valueIn(water, gramPerCubicCentimeter);  // 1
 * ```
 *
 * @module
 */

import type { Density as DensityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { density } from "@isentropic/dim-isq";
import { roundScale } from "@isentropic/dim-unit";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { gram } from "./mass.ts";
import { centimeter } from "./length.ts";
import { liter } from "./volume.ts";

/** An SI density quantity. */
export type Density = Linear<DensityDim, Si>;

/** Kilogram per cubic meter (kg/m³) — SI unit of density. */
export const kilogramPerCubicMeter: BaseUnit<DensityDim> = si.unit(density);

/** Gram per liter (g/L) — numerically equivalent to kg/m³. */
export const gramPerLiter: ScaledUnit<DensityDim> = kilogramPerCubicMeter
  .scaled(gram.scale / liter.scale);

/** Gram per cubic centimeter (g/cm³) — 1000 kg/m³. */
export const gramPerCubicCentimeter: ScaledUnit<DensityDim> =
  kilogramPerCubicMeter.scaled(
    roundScale(gram.scale / centimeter.scale ** 3),
  );
