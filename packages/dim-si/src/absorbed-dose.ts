/**
 * Absorbed dose units (L²·T⁻²).
 *
 * SI unit: gray (Gy).
 *
 * Note: gray (absorbed radiation dose) and sievert (equivalent dose)
 * share this dimension. This is intentional per SI.
 *
 * @example Creating dose quantities
 * ```ts
 * import { gray, sievert } from "@isentropic/dim-si/absorbed-dose";
 *
 * const dose = gray(0.5);
 * const equivalent = sievert(0.5);
 * ```
 *
 * @module
 */

import type { AbsorbedDose as AbsorbedDoseDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { absorbedDose } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI absorbed dose quantity. */
export type AbsorbedDose = Linear<AbsorbedDoseDim, Si>;

/** Gray (Gy) — SI unit of absorbed dose. */
export const gray: BaseUnit<AbsorbedDoseDim> = si.unit(absorbedDose);

/** Sievert (Sv) — SI unit of equivalent dose (same dimension as gray). */
export const sievert: BaseUnit<AbsorbedDoseDim> = si.unit(absorbedDose);
