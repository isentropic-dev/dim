/**
 * Electrical inductance units (M·L²·T⁻²·I⁻²).
 *
 * SI unit: henry (H).
 *
 * @example Converting between inductance units
 * ```ts
 * import { henry, microhenry, millihenry } from "@isentropic/dim-si/inductance";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const coil = millihenry(10);
 * valueIn(coil, microhenry);  // 10000
 * valueIn(coil, henry);       // 0.01
 * ```
 *
 * @module
 */

import type { Inductance as InductanceDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { inductance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

/** An SI inductance quantity. */
export type Inductance = Linear<InductanceDim, Si>;

/** Henry (H) — SI unit of inductance. */
export const henry: BaseUnit<InductanceDim> = si.unit(inductance);

/** Millihenry (mH) — 10⁻³ henrys. */
export const millihenry: ScaledUnit<InductanceDim> = henry.scaled(MILLI);

/** Microhenry (μH) — 10⁻⁶ henrys. */
export const microhenry: ScaledUnit<InductanceDim> = henry.scaled(MICRO);
