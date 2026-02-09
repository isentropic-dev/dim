/**
 * Electric charge units (I·T).
 *
 * SI unit: coulomb (C).
 *
 * @module
 */

import type { Charge } from "@isentropic/dim-isq";
import { charge } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { Charge } from "@isentropic/dim-isq";

/** Coulomb (C) — SI unit of electric charge. */
export const coulomb: BaseUnit<Charge> = si.unit(charge);
