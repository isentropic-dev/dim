/**
 * Magnetic flux units (M·L²·T⁻²·I⁻¹).
 *
 * SI unit: weber (Wb).
 *
 * @example Creating a magnetic flux
 * ```ts
 * import { weber } from "@isentropic/dim-si/magnetic-flux";
 *
 * const flux = weber(0.5);
 * ```
 *
 * @module
 */

import type { MagneticFlux as MagneticFluxDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { magneticFlux } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI magnetic flux quantity. */
export type MagneticFlux = Linear<MagneticFluxDim, Si>;

/** Weber (Wb) — SI unit of magnetic flux. */
export const weber: BaseUnit<MagneticFluxDim> = si.unit(magneticFlux);
