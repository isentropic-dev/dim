/**
 * Permeability units (M·L·T⁻²·I⁻²).
 *
 * SI unit: henry per meter (H/m).
 *
 * @example Creating a permeability
 * ```ts
 * import { henryPerMeter } from "@isentropic/dim-si/permeability";
 *
 * const vacuum = henryPerMeter(1.2566e-6);
 * ```
 *
 * @module
 */

import type { Permeability as PermeabilityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { permeability } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI permeability quantity. */
export type Permeability = Linear<PermeabilityDim, Si>;

/** Henry per meter (H/m) — SI unit of permeability. */
export const henryPerMeter: BaseUnit<PermeabilityDim> = si.unit(permeability);
