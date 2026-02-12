/**
 * Electric charge units (I·T).
 *
 * SI unit: coulomb (C).
 *
 * @example Computing charge from current and time
 * ```ts
 * import { coulomb } from "@isentropic/dim-si/charge";
 * import { ampere } from "@isentropic/dim-si/current";
 * import { second } from "@isentropic/dim-si/time";
 * import { multiply, valueIn } from "@isentropic/dim-si/ops";
 *
 * const charge = multiply(ampere(2), second(5));
 * valueIn(charge, coulomb);  // 10
 * ```
 *
 * @module
 */

import type { Charge } from "@isentropic/dim-isq";
import { charge } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { Charge } from "@isentropic/dim-isq";

/** Coulomb (C) — SI unit of electric charge. */
export const coulomb: BaseUnit<Charge> = si.unit(charge);
