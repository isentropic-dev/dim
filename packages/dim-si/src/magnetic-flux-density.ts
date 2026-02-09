/**
 * Magnetic flux density units (M·T⁻²·I⁻¹).
 *
 * SI unit: tesla (T).
 *
 * @module
 */

import type { MagneticFluxDensity } from "@isentropic/dim-isq";
import { magneticFluxDensity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { MagneticFluxDensity } from "@isentropic/dim-isq";

/** Tesla (T) — SI unit of magnetic flux density. */
export const tesla: BaseUnit<MagneticFluxDensity> = si.unit(
  magneticFluxDensity,
);
