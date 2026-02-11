/**
 * Magnetic flux units (M·L²·T⁻²·I⁻¹).
 *
 * SI unit: weber (Wb).
 *
 * @example
 * ```ts
 * import { weber } from "@isentropic/dim-si/magnetic-flux";
 *
 * const flux = weber(0.5);
 * ```
 *
 * @module
 */

import type { MagneticFlux } from "@isentropic/dim-isq";
import { magneticFlux } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { MagneticFlux } from "@isentropic/dim-isq";

/** Weber (Wb) — SI unit of magnetic flux. */
export const weber: BaseUnit<MagneticFlux> = si.unit(magneticFlux);
