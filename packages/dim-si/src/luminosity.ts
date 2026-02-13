/**
 * Luminous intensity units (J).
 *
 * SI base unit: candela (cd).
 *
 * @example Creating a luminous intensity
 * ```ts
 * import { candela } from "@isentropic/dim-si/luminosity";
 *
 * const intensity = candela(100);
 * ```
 *
 * @module
 */

import type { Luminosity as LuminosityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { luminosity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI luminosity quantity. */
export type Luminosity = Linear<LuminosityDim, Si>;

/** Candela (cd) — SI unit of luminous intensity. */
export const candela: BaseUnit<LuminosityDim> = si.unit(luminosity);
