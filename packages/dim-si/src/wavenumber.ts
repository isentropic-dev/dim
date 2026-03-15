/**
 * Wavenumber units (L⁻¹).
 *
 * SI unit: reciprocal meter (m⁻¹).
 *
 * @example Creating a wavenumber
 * ```ts
 * import { reciprocalMeter } from "@isentropic/dim-si/wavenumber";
 *
 * const k = reciprocalMeter(100);
 * ```
 *
 * @module
 */

import type { Wavenumber as WavenumberDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { wavenumber } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI wavenumber quantity. */
export type Wavenumber = Linear<WavenumberDim, Si>;

/** Reciprocal meter (m⁻¹) — SI unit of wavenumber. */
export const reciprocalMeter: BaseUnit<WavenumberDim> = si.unit(wavenumber);
