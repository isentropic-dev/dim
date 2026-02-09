/**
 * Absorbed dose units (L²·T⁻²).
 *
 * SI unit: gray (Gy).
 *
 * Note: gray (absorbed radiation dose) and sievert (equivalent dose)
 * share this dimension. This is intentional per SI.
 *
 * @module
 */

import type { AbsorbedDose } from "@isentropic/dim-isq";
import { absorbedDose } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { AbsorbedDose } from "@isentropic/dim-isq";

/** Gray (Gy) — SI unit of absorbed dose. */
export const gray: BaseUnit<AbsorbedDose> = si.unit(absorbedDose);

/** Sievert (Sv) — SI unit of equivalent dose (same dimension as gray). */
export const sievert: BaseUnit<AbsorbedDose> = si.unit(absorbedDose);
