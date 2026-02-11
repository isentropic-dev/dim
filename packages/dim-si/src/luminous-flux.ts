/**
 * Luminous flux units (J).
 *
 * SI unit: lumen (lm).
 *
 * @example
 * ```ts
 * import { lumen } from "@isentropic/dim-si/luminous-flux";
 *
 * const output = lumen(800);
 * ```
 *
 * @module
 */

import type { LuminousFlux } from "@isentropic/dim-isq";
import { luminousFlux } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { LuminousFlux } from "@isentropic/dim-isq";

/** Lumen (lm) — SI unit of luminous flux. */
export const lumen: BaseUnit<LuminousFlux> = si.unit(luminousFlux);
