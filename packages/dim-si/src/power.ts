/**
 * Power units (M·L²·T⁻³).
 *
 * SI unit: watt (W).
 *
 * @module
 */

import type { Power } from "@isentropic/dim-isq";
import { power } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";
import { GIGA, KILO, MEGA, MILLI, TERA } from "./prefixes.ts";

export type { Power } from "@isentropic/dim-isq";

/** Watt (W) — SI unit of power. */
export const watt: BaseUnit<Power> = si.unit(power);

/** Milliwatt (mW) — 10⁻³ watts. */
export const milliwatt: ScaledUnit<Power> = watt.scaled(MILLI);

/** Kilowatt (kW) — 1000 watts. */
export const kilowatt: ScaledUnit<Power> = watt.scaled(KILO);

/** Megawatt (MW) — 10⁶ watts. */
export const megawatt: ScaledUnit<Power> = watt.scaled(MEGA);

/** Gigawatt (GW) — 10⁹ watts. */
export const gigawatt: ScaledUnit<Power> = watt.scaled(GIGA);

/** Terawatt (TW) — 10¹² watts. */
export const terawatt: ScaledUnit<Power> = watt.scaled(TERA);
