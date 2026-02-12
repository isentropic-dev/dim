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

import type { Inductance } from "@isentropic/dim-isq";
import { inductance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

export type { Inductance } from "@isentropic/dim-isq";

/** Henry (H) — SI unit of inductance. */
export const henry: BaseUnit<Inductance> = si.unit(inductance);

/** Millihenry (mH) — 10⁻³ henrys. */
export const millihenry: ScaledUnit<Inductance> = henry.scaled(MILLI);

/** Microhenry (μH) — 10⁻⁶ henrys. */
export const microhenry: ScaledUnit<Inductance> = henry.scaled(MICRO);
