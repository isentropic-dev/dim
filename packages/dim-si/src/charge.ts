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

import type { Charge as ChargeDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { charge } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI charge quantity. */
export type Charge = Linear<ChargeDim, Si>;

/** Coulomb (C) — SI unit of electric charge. */
export const coulomb: BaseUnit<ChargeDim> = si.unit(charge);
