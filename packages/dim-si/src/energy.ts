/**
 * Energy units (M·L²·T⁻²).
 *
 * SI unit: joule (J).
 *
 * @example Converting between energy units
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

import type { Energy as EnergyDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { energy } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { KILO, MEGA } from "./prefixes.ts";
import { kilowatt } from "./power.ts";
import { hour } from "./time.ts";

/** An SI energy quantity. */
export type Energy = Linear<EnergyDim, Si>;

/** Joule (J) — SI unit of energy. */
export const joule: BaseUnit<EnergyDim> = si.unit(energy);

/** Kilojoule (kJ) — 1000 joules. */
export const kilojoule: ScaledUnit<EnergyDim> = joule.scaled(KILO);

/** Megajoule (MJ) — 10⁶ joules. */
export const megajoule: ScaledUnit<EnergyDim> = joule.scaled(MEGA);

/** Kilowatt-hour (kWh) — 3.6 megajoules. */
// 1 kWh = 1 kW × 1 hour = 3.6 MJ
export const kilowattHour: ScaledUnit<EnergyDim> = joule.scaled(
  kilowatt.scale * hour.scale,
);
