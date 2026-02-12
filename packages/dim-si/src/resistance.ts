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

import type { Resistance } from "@isentropic/dim-isq";
import { resistance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { KILO, MEGA, MILLI } from "./prefixes.ts";

export type { Resistance } from "@isentropic/dim-isq";

/** Ohm (Ω) — SI unit of electrical resistance. */
export const ohm: BaseUnit<Resistance> = si.unit(resistance);

/** Milliohm (mΩ) — 10⁻³ ohms. */
export const milliohm: ScaledUnit<Resistance> = ohm.scaled(MILLI);

/** Kilohm (kΩ) — 1000 ohms. */
export const kilohm: ScaledUnit<Resistance> = ohm.scaled(KILO);

/** Megohm (MΩ) — 10⁶ ohms. */
export const megohm: ScaledUnit<Resistance> = ohm.scaled(MEGA);
