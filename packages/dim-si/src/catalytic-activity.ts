/**
 * Catalytic activity units (N·T⁻¹).
 *
 * SI unit: katal (kat).
 *
 * @module
 */

import type { CatalyticActivity } from "@isentropic/dim-isq";
import { catalyticActivity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { CatalyticActivity } from "@isentropic/dim-isq";

/** Katal (kat) — SI unit of catalytic activity. */
export const katal: BaseUnit<CatalyticActivity> = si.unit(catalyticActivity);
