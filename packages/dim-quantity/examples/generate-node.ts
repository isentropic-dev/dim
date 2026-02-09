/**
 * Example: Generate a quantity system in Node/Bun.
 *
 * Usage:
 *   npx jsr add @isentropic/dim-quantity
 *   npx tsx generate-node.ts
 */

import {
  generateQuantitySystem,
  type QuantitySpec,
} from "@isentropic/dim-quantity/generate";
import { writeFileSync } from "node:fs";

const spec: QuantitySpec = {
  name: "mechanics",
  dims: ["L", "M", "T"],
  quantities: {
    base: {
      length: "L",
      mass: "M",
      time: "T",
    },
    derived: {
      velocity: { L: 1, T: -1 },
      acceleration: { L: 1, T: -2 },
      force: { M: 1, L: 1, T: -2 },
    },
  },
};

writeFileSync("./mechanics.generated.ts", generateQuantitySystem(spec));
console.log("Generated mechanics.generated.ts");
