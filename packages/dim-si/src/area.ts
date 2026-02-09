/**
 * Area units (L²).
 *
 * SI unit: square meter (m²).
 *
 * @module
 */

import type { Area } from "@isentropic/dim-isq";
import { area } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";

export type { Area } from "@isentropic/dim-isq";

/** Square meter (m²) — SI unit of area. */
export const squareMeter: BaseUnit<Area> = si.unit(area);

/** Hectare (ha) — 10000 square meters. */
export const hectare: ScaledUnit<Area> = squareMeter.scaled(10000);
