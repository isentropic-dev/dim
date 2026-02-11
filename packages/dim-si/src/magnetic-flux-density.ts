/**
 * Magnetic flux density units (M·T⁻²·I⁻¹).
 *
 * SI unit: tesla (T).
 *
 * @example
 * ```ts
 * import { tesla } from "@isentropic/dim-si/magnetic-flux-density";
 *
 * const field = tesla(1.5);
 * ```
 *
 * @module
 */

import type { MagneticFluxDensity } from "@isentropic/dim-isq";
import { magneticFluxDensity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { MagneticFluxDensity } from "@isentropic/dim-isq";

/** Tesla (T) — SI unit of magnetic flux density. */
export const tesla: BaseUnit<MagneticFluxDensity> = si.unit(
  magneticFluxDensity,
);
