/**
 * Electrical resistance units (M·L²·T⁻³·I⁻²).
 *
 * SI unit: ohm (Ω).
 *
 * @example Converting between resistance units
 * ```ts
 * import { kilohm, megohm, ohm } from "@isentropic/dim-si/resistance";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const pullup = kilohm(4.7);
 * valueIn(pullup, ohm);  // 4700
 * ```
 *
 * @module
 */

import type { Resistance as ResistanceDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { resistance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { KILO, MEGA, MILLI } from "./prefixes.ts";

/** An SI resistance quantity. */
export type Resistance = Linear<ResistanceDim, Si>;

/** Ohm (Ω) — SI unit of electrical resistance. */
export const ohm: BaseUnit<ResistanceDim> = si.unit(resistance);

/** Milliohm (mΩ) — 10⁻³ ohms. */
export const milliohm: ScaledUnit<ResistanceDim> = ohm.scaled(MILLI);

/** Kilohm (kΩ) — 1000 ohms. */
export const kilohm: ScaledUnit<ResistanceDim> = ohm.scaled(KILO);

/** Megohm (MΩ) — 10⁶ ohms. */
export const megohm: ScaledUnit<ResistanceDim> = ohm.scaled(MEGA);
