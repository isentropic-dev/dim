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

import type { Illuminance as IlluminanceDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { illuminance } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI illuminance quantity. */
export type Illuminance = Linear<IlluminanceDim, Si>;

/** Lux (lx) — SI unit of illuminance. */
export const lux: BaseUnit<IlluminanceDim> = si.unit(illuminance);
