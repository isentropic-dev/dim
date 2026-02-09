/**
 * Electrical conductance units (M⁻¹·L⁻²·T³·I²).
 *
 * SI unit: siemens (S).
 *
 * @module
 */

import type { Conductance } from "@isentropic/dim-isq";
import { conductance } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { Conductance } from "@isentropic/dim-isq";

/** Siemens (S) — SI unit of electrical conductance. */
export const siemens: BaseUnit<Conductance> = si.unit(conductance);
