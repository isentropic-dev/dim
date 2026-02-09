/**
 * Electrical resistance units (M·L²·T⁻³·I⁻²).
 *
 * SI unit: ohm (Ω).
 *
 * @module
 */

import type { Resistance } from "@isentropic/dim-isq";
import { resistance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
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
