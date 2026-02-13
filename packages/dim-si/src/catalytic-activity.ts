/**
 * Catalytic activity units (N·T⁻¹).
 *
 * SI unit: katal (kat).
 *
 * @example Creating a catalytic activity
 * ```ts
 * import { katal } from "@isentropic/dim-si/catalytic-activity";
 *
 * const activity = katal(0.1);
 * ```
 *
 * @module
 */

import type { CatalyticActivity as CatalyticActivityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { catalyticActivity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI catalytic activity quantity. */
export type CatalyticActivity = Linear<CatalyticActivityDim, Si>;

/** Katal (kat) — SI unit of catalytic activity. */
export const katal: BaseUnit<CatalyticActivityDim> = si.unit(catalyticActivity);
