/**
 * Magnetic flux density units (M·T⁻²·I⁻¹).
 *
 * SI unit: tesla (T).
 *
 * @example Creating a magnetic flux density
 * ```ts
 * import { tesla } from "@isentropic/dim-si/magnetic-flux-density";
 *
 * const field = tesla(1.5);
 * ```
 *
 * @module
 */

import type { MagneticFluxDensity as MagneticFluxDensityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { magneticFluxDensity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI magnetic flux density quantity. */
export type MagneticFluxDensity = Linear<MagneticFluxDensityDim, Si>;

/** Tesla (T) — SI unit of magnetic flux density. */
export const tesla: BaseUnit<MagneticFluxDensityDim> = si.unit(
  magneticFluxDensity,
);
