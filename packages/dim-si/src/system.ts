/**
 * SI unit system definition.
 *
 * Re-exported from the package root (`@isentropic/dim-si`).
 */

import { isq, type IsqDims } from "@isentropic/dim-isq";
import { defineUnitSystem, type UnitSystem } from "@isentropic/dim-unit";

/** The SI unit system name (used as type brand). */
export type Si = "si";

/** The SI unit system. */
export const si: UnitSystem<IsqDims, Si> = defineUnitSystem("si", isq);
