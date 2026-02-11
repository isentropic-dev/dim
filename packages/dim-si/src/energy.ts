/**
 * Energy units (M·L²·T⁻²).
 *
 * SI unit: joule (J).
 *
 * @example
 * ```ts
 * import { joule, kilowattHour, megajoule } from "@isentropic/dim-si/energy";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const energy = kilowattHour(1);
 * valueIn(energy, joule);     // 3_600_000
 * valueIn(energy, megajoule); // 3.6
 * ```
 *
 * @module
 */

import type { Energy } from "@isentropic/dim-isq";
import { energy } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { KILO, MEGA } from "./prefixes.ts";
import { kilowatt } from "./power.ts";
import { hour } from "./time.ts";

export type { Energy } from "@isentropic/dim-isq";

/** Joule (J) — SI unit of energy. */
export const joule: BaseUnit<Energy> = si.unit(energy);

/** Kilojoule (kJ) — 1000 joules. */
export const kilojoule: ScaledUnit<Energy> = joule.scaled(KILO);

/** Megajoule (MJ) — 10⁶ joules. */
export const megajoule: ScaledUnit<Energy> = joule.scaled(MEGA);

/** Kilowatt-hour (kWh) — 3.6 megajoules. */
// 1 kWh = 1 kW × 1 hour = 3.6 MJ
export const kilowattHour: ScaledUnit<Energy> = joule.scaled(
  kilowatt.scale * hour.scale,
);
