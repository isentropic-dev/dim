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
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { ampere, milliampere } from "./current.ts";
import { hour } from "./time.ts";

/** An SI charge quantity. */
export type Charge = Linear<ChargeDim, Si>;

/** Coulomb (C) — SI unit of electric charge. */
export const coulomb: BaseUnit<ChargeDim> = si.unit(charge);

/** Ampere-hour (Ah) — 3600 coulombs. */
export const ampereHour: ScaledUnit<ChargeDim> = coulomb.scaled(
  ampere.scale * hour.scale,
);

/** Milliampere-hour (mAh) — 3.6 coulombs. */
export const milliampereHour: ScaledUnit<ChargeDim> = coulomb.scaled(
  milliampere.scale * hour.scale,
);
