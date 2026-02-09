import { assertEquals, assertStringIncludes } from "@std/assert";
import { defineQuantitySystem, type DimOf } from "./src/mod.ts";
import { add, divide, multiply, scale, subtract } from "./src/ops.ts";
import {
  defineQuantitySpec,
  generateQuantitySystem,
  type QuantitySpec,
} from "./src/generator.ts";

// === Setup ===

type Equals<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false;

const sys = defineQuantitySystem(["L", "T"]);

const length = sys.factory({ L: 1, T: 0 });
const time = sys.factory({ L: 0, T: 1 });
const velocity = sys.factory({ L: 1, T: -1 });
const area = sys.factory({ L: 2, T: 0 });

// Partial dimension factories (missing keys default to 0)
const lengthPartial = sys.factory({ L: 1 });

// Base dimension factories
const lengthBase = sys.base("L");
const timeBase = sys.base("T");

// === Tests ===

Deno.test("factory: extract dimension type", () => {
  const _lengthCheck: Equals<DimOf<typeof length>, { L: 1; T: 0 }> = true;
  const _timeCheck: Equals<DimOf<typeof time>, { L: 0; T: 1 }> = true;
});

Deno.test("base: creates factory with single dimension", () => {
  // Type-level: base factory has correct dimension type
  const _lengthCheck: Equals<DimOf<typeof lengthBase>, { L: 1; T: 0 }> = true;
  const _timeCheck: Equals<DimOf<typeof timeBase>, { L: 0; T: 1 }> = true;

  // Runtime: equivalent to explicit factory
  assertEquals(lengthBase(5), length(5));
  assertEquals(timeBase(5), time(5));

  // Works with operations
  assertEquals(divide(lengthBase(10), timeBase(2)), velocity(5));
});

Deno.test("factory: partial dimensions default to zero", () => {
  // Type-level: partial factory has same dimension type as explicit
  const _partialLength: Equals<DimOf<typeof lengthPartial>, { L: 1; T: 0 }> =
    true;

  // Runtime: quantities are interchangeable
  assertEquals(lengthPartial(5), length(5));
  assertEquals(add(length(2), lengthPartial(3)), length(5));
  assertEquals(divide(lengthPartial(10), time(2)), velocity(5));
});

Deno.test("operations: add and subtract", () => {
  assertEquals(add(length(2), length(2)), length(4));
  assertEquals(subtract(length(4), length(2)), length(2));
});

Deno.test("operations: multiply and divide", () => {
  assertEquals(divide(length(10), time(2)), velocity(5));
  assertEquals(multiply(velocity(5), time(2)), length(10));
  assertEquals(divide(length(10), length(10)), sys.scalar(1));
  assertEquals(multiply(length(10), length(10)), area(100));
});

Deno.test("operations: scale", () => {
  assertEquals(scale(length(2), 2), length(4));
});

// Compile-time type safety checks
function _compileTimeChecks() {
  // @ts-expect-error: cannot add different dimensions
  add(length(2), time(10));

  // @ts-expect-error: cannot subtract different dimensions
  subtract(length(2), time(10));

  // Partial and explicit factories are type-compatible
  add(length(1), lengthPartial(1));
  subtract(lengthPartial(1), length(1));

  // Cross-system operations are rejected
  const otherSys = defineQuantitySystem(["M"]);
  const mass = otherSys.base("M");

  // @ts-expect-error: cannot multiply quantities from different systems
  multiply(length(2), mass(3));

  // @ts-expect-error: cannot divide quantities from different systems
  divide(length(2), mass(3));

  // QuantitySpec validates dimension symbols against dims
  defineQuantitySpec({
    name: "valid",
    dims: ["L", "T"],
    quantities: {
      base: { length: "L", time: "T" },
      derived: { velocity: { L: 1, T: -1 } },
    },
  });

  defineQuantitySpec({
    name: "invalid-base",
    dims: ["L", "T"],
    quantities: {
      // @ts-expect-error: "X" is not a valid dimension symbol
      base: { length: "X" },
      derived: {},
    },
  });

  defineQuantitySpec({
    name: "invalid-derived",
    dims: ["L", "T"],
    quantities: {
      base: {},
      // @ts-expect-error: "X" is not a valid dimension symbol
      derived: { area: { X: 2 } },
    },
  });
}

// === Generator Tests ===

const testSpec: QuantitySpec = {
  name: "test",
  dims: ["L", "T"],
  quantities: {
    base: {
      length: "L",
      time: "T",
    },
    derived: {
      velocity: { L: 1, T: -1 },
      area: { L: 2 },
    },
  },
};

Deno.test("generator: includes header comment", () => {
  const output = generateQuantitySystem(testSpec);
  assertStringIncludes(output, "THIS FILE IS GENERATED");
  assertStringIncludes(output, "Regenerate with your generation command.");
});

Deno.test("generator: imports from dim-quantity", () => {
  const output = generateQuantitySystem(testSpec);
  assertStringIncludes(output, 'from "@isentropic/dim-quantity"');
  assertStringIncludes(output, "defineQuantitySystem");
  assertStringIncludes(output, "QuantityFactory");
  assertStringIncludes(output, "WithDefaults");
});

Deno.test("generator: defines system and dims", () => {
  const output = generateQuantitySystem(testSpec);
  assertStringIncludes(output, 'export const testDims = ["L", "T"] as const');
  assertStringIncludes(output, "export type TestDims = typeof testDims");
  assertStringIncludes(
    output,
    "export const test: QuantitySystem<TestDims> = defineQuantitySystem(testDims)",
  );
});

Deno.test("generator: base quantities use system.base()", () => {
  const output = generateQuantitySystem(testSpec);
  assertStringIncludes(output, "export type Length = D<{ L: 1 }>");
  assertStringIncludes(
    output,
    'export const length: QuantityFactory<Length> = test.base("L")',
  );
  assertStringIncludes(output, "export type Time = D<{ T: 1 }>");
  assertStringIncludes(
    output,
    'export const time: QuantityFactory<Time> = test.base("T")',
  );
});

Deno.test("generator: derived quantities use system.factory()", () => {
  const output = generateQuantitySystem(testSpec);
  assertStringIncludes(output, "export type Velocity = D<{ L: 1, T: -1 }>");
  assertStringIncludes(
    output,
    "export const velocity: QuantityFactory<Velocity> = test.factory({ L: 1, T: -1 })",
  );
  assertStringIncludes(output, "export type Area = D<{ L: 2 }>");
  assertStringIncludes(
    output,
    "export const area: QuantityFactory<Area> = test.factory({ L: 2 })",
  );
});

Deno.test("generator: doc comments include dimension formulas", () => {
  const output = generateQuantitySystem(testSpec);
  assertStringIncludes(output, "/** Length (L) */");
  assertStringIncludes(output, "/** Time (T) */");
  assertStringIncludes(output, "/** Velocity (L·T⁻¹) */");
  assertStringIncludes(output, "/** Area (L²) */");
});

Deno.test("generator: includes D<> helper type", () => {
  const output = generateQuantitySystem(testSpec);
  assertStringIncludes(
    output,
    'type D<T extends Partial<Record<"L" | "T", Exp>>>',
  );
  assertStringIncludes(output, "WithDefaults<typeof test.dims, T>");
});

Deno.test("generator: includes scalar type", () => {
  const output = generateQuantitySystem(testSpec);
  assertStringIncludes(output, "export type Scalar = D<Record<never, never>>");
});
