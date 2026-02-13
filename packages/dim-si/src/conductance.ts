/**
 * Electrical conductance units (M⁻¹·L⁻²·T³·I²).
 *
 * SI unit: siemens (S).
 *
 * @example Creating a conductance
 * ```ts
 * import { siemens } from "@isentropic/dim-si/conductance";
 *
 * const conductance = siemens(0.5);
 * ```
 *
 * @module
 */

import type { Conductance as ConductanceDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { conductance } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI conductance quantity. */
export type Conductance = Linear<ConductanceDim, Si>;

/** Siemens (S) — SI unit of electrical conductance. */
export const siemens: BaseUnit<ConductanceDim> = si.unit(conductance);
