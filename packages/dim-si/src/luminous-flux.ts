/**
 * Luminous flux units (J).
 *
 * SI unit: lumen (lm).
 *
 * @example Creating a luminous flux
 * ```ts
 * import { lumen } from "@isentropic/dim-si/luminous-flux";
 *
 * const output = lumen(800);
 * ```
 *
 * @module
 */

import type { LuminousFlux as LuminousFluxDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { luminousFlux } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI luminous flux quantity. */
export type LuminousFlux = Linear<LuminousFluxDim, Si>;

/** Lumen (lm) — SI unit of luminous flux. */
export const lumen: BaseUnit<LuminousFluxDim> = si.unit(luminousFlux);
