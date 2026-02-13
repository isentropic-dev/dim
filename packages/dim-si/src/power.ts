/**
 * Power units (M·L²·T⁻³).
 *
 * SI unit: watt (W).
 *
 * @example Converting between power units
 * ```ts
 * import { kilowatt, megawatt, watt } from "@isentropic/dim-si/power";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const output = megawatt(1.5);
 * valueIn(output, kilowatt);  // 1500
 * valueIn(output, watt);      // 1_500_000
 * ```
 *
 * @module
 */

import type { Power as PowerDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { power } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { GIGA, KILO, MEGA, MILLI, TERA } from "./prefixes.ts";

/** An SI power quantity. */
export type Power = Linear<PowerDim, Si>;

/** Watt (W) — SI unit of power. */
export const watt: BaseUnit<PowerDim> = si.unit(power);

/** Milliwatt (mW) — 10⁻³ watts. */
export const milliwatt: ScaledUnit<PowerDim> = watt.scaled(MILLI);

/** Kilowatt (kW) — 1000 watts. */
export const kilowatt: ScaledUnit<PowerDim> = watt.scaled(KILO);

/** Megawatt (MW) — 10⁶ watts. */
export const megawatt: ScaledUnit<PowerDim> = watt.scaled(MEGA);

/** Gigawatt (GW) — 10⁹ watts. */
export const gigawatt: ScaledUnit<PowerDim> = watt.scaled(GIGA);

/** Terawatt (TW) — 10¹² watts. */
export const terawatt: ScaledUnit<PowerDim> = watt.scaled(TERA);
