/**
 * Force units (M·L·T⁻²).
 *
 * SI unit: newton (N).
 *
 * @module
 */

import type { Force } from "@isentropic/dim-isq";
import { force } from "@isentropic/dim-isq";
import type { BaseUnit } from "./system.ts";
import { si } from "./system.ts";

export type { Force } from "@isentropic/dim-isq";

/** Newton (N) — SI unit of force. */
export const newton: BaseUnit<Force> = si.unit(force);
