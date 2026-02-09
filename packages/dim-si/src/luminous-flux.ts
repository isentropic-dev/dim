/**
 * Luminous flux units (J).
 *
 * SI unit: lumen (lm).
 *
 * @module
 */

import type { LuminousFlux } from "@isentropic/dim-isq";
import { luminousFlux } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { LuminousFlux } from "@isentropic/dim-isq";

/** Lumen (lm) — SI unit of luminous flux. */
export const lumen: BaseUnit<LuminousFlux> = si.unit(luminousFlux);
