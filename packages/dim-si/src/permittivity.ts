/**
 * Permittivity units (M⁻¹·L⁻³·T⁴·I²).
 *
 * SI unit: farad per meter (F/m).
 *
 * @example Creating a permittivity
 * ```ts
 * import { faradPerMeter } from "@isentropic/dim-si/permittivity";
 *
 * const vacuum = faradPerMeter(8.854e-12);
 * ```
 *
 * @module
 */

import type { Permittivity as PermittivityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { permittivity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI permittivity quantity. */
export type Permittivity = Linear<PermittivityDim, Si>;

/** Farad per meter (F/m) — SI unit of permittivity. */
export const faradPerMeter: BaseUnit<PermittivityDim> = si.unit(permittivity);
