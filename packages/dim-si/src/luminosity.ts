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

import type { Luminosity } from "@isentropic/dim-isq";
import { luminosity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { Luminosity } from "@isentropic/dim-isq";

/** Candela (cd) — SI unit of luminous intensity. */
export const candela: BaseUnit<Luminosity> = si.unit(luminosity);
