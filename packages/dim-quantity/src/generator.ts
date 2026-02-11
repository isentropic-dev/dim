/**
 * Types and utilities for generating quantity system files.
 *
 * @module
 */

import type { Exp } from "./exponents.generated.ts";

/**
 * Specification for generating a quantity system module.
 *
 * Describes the base dimensions, base quantities, and derived quantities
 * that {@linkcode generateQuantitySystem} uses to produce a complete
 * TypeScript source file.
 *
 * @typeParam Dims The tuple of base dimension symbols.
 *
 * @example
 * ```ts
 * import { defineQuantitySpec } from "@isentropic/dim-quantity/generate";
 *
 * const spec = defineQuantitySpec({
 *   name: "mech",
 *   dims: ["L", "M", "T"],
 *   quantities: {
 *     base: { length: "L", mass: "M", time: "T" },
 *     derived: {
 *       velocity: { L: 1, T: -1 },
 *       force: { L: 1, M: 1, T: -2 },
 *     },
 *   },
 * });
 * ```
 */
export interface QuantitySpec<
  Dims extends readonly string[] = readonly string[],
> {
  /** Name of the system (used for variable names). */
  name: string;
  /** Base dimension symbols. */
  dims: Dims;
  /** Quantity definitions. */
  quantities: {
    /** Base quantities: name → dimension symbol. */
    base: Record<string, Dims[number]>;
    /** Derived quantities: name → partial dimension record. */
    derived: Record<string, Partial<Record<Dims[number], Exp>>>;
  };
  /** Optional hint for regeneration command in generated file header. */
  regenHint?: string;
}

/**
 * Create a {@linkcode QuantitySpec} with validated dimension symbols.
 *
 * This is a pass-through identity function that provides type checking —
 * TypeScript will error if quantity definitions reference dimension symbols
 * not present in `dims`.
 *
 * @param spec The quantity system specification.
 * @returns The same spec, unchanged.
 */
export function defineQuantitySpec<const Dims extends readonly string[]>(
  spec: QuantitySpec<Dims>,
): QuantitySpec<Dims> {
  return spec;
}

/** Sort dimension entries by a reference dims order, falling back to key order. */
function sortedDimEntries(
  dim: Partial<Record<string, Exp>>,
  dims?: readonly string[],
): [string, Exp][] {
  const entries = Object.entries(dim).filter(([_, v]) =>
    v !== undefined && v !== 0
  ) as [string, Exp][];
  if (dims) {
    const order = new Map(dims.map((d, i) => [d, i]));
    entries.sort((a, b) =>
      (order.get(a[0]) ?? Infinity) - (order.get(b[0]) ?? Infinity)
    );
  }
  return entries;
}

/** Format a dimension as a human-readable formula (e.g., "L·T⁻¹"). */
function formatDimension(
  dim: Partial<Record<string, Exp>>,
  dims?: readonly string[],
): string {
  const superscripts: Record<string, string> = {
    "-": "⁻",
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
  };

  const toSuperscript = (n: number): string =>
    String(n).split("").map((c) => superscripts[c] ?? c).join("");

  const parts: string[] = [];
  for (const [key, exp] of sortedDimEntries(dim, dims)) {
    if (exp === 1) {
      parts.push(key);
    } else {
      parts.push(`${key}${toSuperscript(exp)}`);
    }
  }

  return parts.length > 0 ? parts.join("·") : "dimensionless";
}

/** Format a partial dimension as TypeScript object literal. */
function formatDimLiteral(
  dim: Partial<Record<string, Exp>>,
  separator = ", ",
  dims?: readonly string[],
): string {
  const entries = sortedDimEntries(dim, dims)
    .map(([k, v]) => `${k}: ${v}`)
    .join(separator);
  return `{ ${entries} }`;
}

/** Capitalize the first letter of a string. */
function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Generate a complete TypeScript module from a {@linkcode QuantitySpec}.
 *
 * The output includes imports, system definition, and typed factory exports
 * for all base and derived quantities. Write the returned string to a file.
 *
 * @param spec The quantity system specification.
 * @returns The generated TypeScript source code as a string.
 *
 * @example
 * ```ts
 * import { defineQuantitySpec, generateQuantitySystem } from "@isentropic/dim-quantity/generate";
 *
 * const spec = defineQuantitySpec({
 *   name: "mech",
 *   dims: ["L", "M", "T"],
 *   quantities: {
 *     base: { length: "L", mass: "M", time: "T" },
 *     derived: { velocity: { L: 1, T: -1 } },
 *   },
 * });
 *
 * const source = generateQuantitySystem(spec);
 * await Deno.writeTextFile("mech.generated.ts", source);
 * ```
 */
export function generateQuantitySystem(spec: QuantitySpec): string {
  const { name, dims, quantities } = spec;
  const dimsType = dims.map((d) => `"${d}"`).join(" | ");
  const dimsArray = `[${dims.map((d) => `"${d}"`).join(", ")}]`;

  const lines: string[] = [];

  // Header
  lines.push(`/**`);
  lines.push(` * ${capitalize(name)} quantity system.`);
  lines.push(` *`);
  lines.push(` * THIS FILE IS GENERATED. DO NOT EDIT DIRECTLY.`);
  lines.push(
    ` * ${spec.regenHint ?? "Regenerate with your generation command."}`,
  );
  lines.push(` *`);
  lines.push(` * @module`);
  lines.push(` */`);
  lines.push(``);

  // Imports
  lines.push(
    `import { defineQuantitySystem, type Exp, type QuantityFactory, type QuantitySystem, type WithDefaults } from "@isentropic/dim-quantity";`,
  );
  lines.push(``);

  // System definition
  lines.push(
    `/** The ${dims.length} base dimension symbols for the ${name.toUpperCase()} system: ${
      dims.join(", ")
    }. */`,
  );
  lines.push(`export const ${name}Dims = ${dimsArray} as const;`);
  lines.push(``);
  lines.push(
    `/** Tuple type of the ${name.toUpperCase()} base dimension symbols. */`,
  );
  lines.push(`export type ${capitalize(name)}Dims = typeof ${name}Dims;`);
  lines.push(``);
  lines.push(
    `/** The ${name.toUpperCase()} quantity system. Use to create custom quantity factories beyond the pre-defined exports. */`,
  );
  lines.push(
    `export const ${name}: QuantitySystem<${
      capitalize(name)
    }Dims> = defineQuantitySystem(${name}Dims);`,
  );
  lines.push(``);

  // Dimension helper type
  lines.push(`/** Shorthand for defining dimension types in this system. */`);
  lines.push(
    `type D<T extends Partial<Record<${dimsType}, Exp>>> = WithDefaults<typeof ${name}.dims, T>;`,
  );
  lines.push(``);

  // Scalar
  lines.push(`// === Scalar ===`);
  lines.push(``);
  lines.push(`/** Dimensionless quantity. */`);
  lines.push(`export type Scalar = D<Record<never, never>>;`);
  lines.push(``);

  // Base quantities
  lines.push(`// === Base Quantities ===`);
  lines.push(``);

  for (const [qtyName, dimSymbol] of Object.entries(quantities.base)) {
    const typeName = capitalize(qtyName);
    lines.push(`/** ${typeName} (${dimSymbol}) */`);
    lines.push(`export type ${typeName} = D<{ ${dimSymbol}: 1 }>;`);
    lines.push(
      `export const ${qtyName}: QuantityFactory<${typeName}> = ${name}.base("${dimSymbol}");`,
    );
    lines.push(``);
  }

  // Derived quantities
  lines.push(`// === Derived Quantities ===`);
  lines.push(``);

  for (const [qtyName, dim] of Object.entries(quantities.derived)) {
    const typeName = capitalize(qtyName);
    const formula = formatDimension(dim, dims);
    const literal = formatDimLiteral(dim, ", ", dims);

    const runtimeLiteral = formatDimLiteral(dim, ", ", dims);
    lines.push(`/** ${typeName} (${formula}) */`);
    lines.push(`export type ${typeName} = D<${literal}>;`);
    lines.push(
      `export const ${qtyName}: QuantityFactory<${typeName}> = ${name}.factory(${runtimeLiteral});`,
    );
    lines.push(``);
  }

  return lines.join("\n");
}
