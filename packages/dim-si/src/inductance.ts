/**
 * Electrical inductance units (M·L²·T⁻²·I⁻²).
 *
 * SI unit: henry (H).
 *
 * @module
 */

import type { Inductance } from "@isentropic/dim-isq";
import { inductance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

export type { Inductance } from "@isentropic/dim-isq";

/** Henry (H) — SI unit of inductance. */
export const henry: BaseUnit<Inductance> = si.unit(inductance);

/** Millihenry (mH) — 10⁻³ henrys. */
export const millihenry: ScaledUnit<Inductance> = henry.scaled(MILLI);

/** Microhenry (μH) — 10⁻⁶ henrys. */
export const microhenry: ScaledUnit<Inductance> = henry.scaled(MICRO);
