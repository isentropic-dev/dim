/**
 * Illuminance units (J·L⁻²).
 *
 * SI unit: lux (lx).
 *
 * @example Creating an illuminance
 * ```ts
 * import { lux } from "@isentropic/dim-si/illuminance";
 *
 * const brightness = lux(500);
 * ```
 *
 * @module
 */

import type { Illuminance } from "@isentropic/dim-isq";
import { illuminance } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { Illuminance } from "@isentropic/dim-isq";

/** Lux (lx) — SI unit of illuminance. */
export const lux: BaseUnit<Illuminance> = si.unit(illuminance);
