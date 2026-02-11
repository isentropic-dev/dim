/**
 * Catalytic activity units (N·T⁻¹).
 *
 * SI unit: katal (kat).
 *
 * @example
 * ```ts
 * import { katal } from "@isentropic/dim-si/catalytic-activity";
 *
 * const activity = katal(0.1);
 * ```
 *
 * @module
 */

import type { CatalyticActivity } from "@isentropic/dim-isq";
import { catalyticActivity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { CatalyticActivity } from "@isentropic/dim-isq";

/** Katal (kat) — SI unit of catalytic activity. */
export const katal: BaseUnit<CatalyticActivity> = si.unit(catalyticActivity);
