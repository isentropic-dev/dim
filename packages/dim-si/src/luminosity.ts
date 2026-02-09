/**
 * Luminous intensity units (J).
 *
 * SI base unit: candela (cd).
 *
 * @module
 */

import type { Luminosity } from "@isentropic/dim-isq";
import { luminosity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { Luminosity } from "@isentropic/dim-isq";

/** Candela (cd) — SI unit of luminous intensity. */
export const candela: BaseUnit<Luminosity> = si.unit(luminosity);
