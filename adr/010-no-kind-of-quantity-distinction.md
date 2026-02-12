# ADR 010: No Kind-of-Quantity Distinction

## Status

Accepted

## Context

Some SI derived units share the same dimensional formula but represent different
physical concepts:

| Units            | Dimension | Concepts                                   |
| ---------------- | --------- | ------------------------------------------ |
| hertz, becquerel | T⁻¹       | Cycles per second vs. radioactive decays/s |
| gray, sievert    | L²·T⁻²    | Absorbed dose vs. equivalent dose          |

A "kind-of-quantity" system would make these distinct types despite sharing
dimensions, preventing accidental mixing (e.g., adding a frequency to a
radioactive activity).

Approaches considered:

1. **Kind-of-quantity tagging**: Brand each quantity with a "kind" in addition
   to its dimension. Hertz and becquerel would both have dimension T⁻¹ but
   different kind tags, making them type-incompatible. This is the approach
   taken by libraries like Boost.Units (C++).

2. **Pure dimensional analysis**: Types are determined solely by their
   dimensional formula. Units with the same dimension are type-compatible. This
   matches how SI itself defines these units — hertz and becquerel are
   explicitly acknowledged as dimensionally identical.

The kind-of-quantity approach adds significant complexity:

- Every quantity type gains an additional type parameter
- Arithmetic rules must define how kinds combine (what kind does
  `frequency × time` produce?)
- Kind propagation through multiply/divide is ambiguous — there's no universal
  algebra for kinds
- Users defining custom quantities must choose or create kinds

Meanwhile, the actual risk of accidentally mixing hertz and becquerel in
practice is low — they appear in different domains with different variable names
and contexts.

## Decision

Use pure dimensional analysis with no kind-of-quantity distinction. Units that
share a dimensional formula are type-compatible.

Dimensionally identical units (hertz/becquerel, gray/sievert) are documented as
intentional aliases in their module-level JSDoc and tested explicitly:

```ts
// Both have dimension T⁻¹, both are BaseUnit<Frequency>
export const hertz: BaseUnit<Frequency> = si.unit(frequency);
export const becquerel: BaseUnit<Frequency> = si.unit(frequency);
```

## Consequences

### Positive

- Simpler type system — dimension is the only type-level concern
- No ambiguity in how kinds propagate through arithmetic
- Matches SI's own definitions, where these aliases are explicit
- No additional type parameters on quantities, units, or operations

### Negative

- Cannot prevent mixing dimensionally identical but physically distinct
  quantities (e.g., adding a frequency to a radioactive activity)
- Users expecting Boost.Units-style kind safety will find this less strict

### Neutral

- The dimensional aliases are few (2 pairs in standard SI) and well-documented
- Users who need kind-level safety can achieve it by convention (distinct
  variable names, code review) or by defining separate quantity systems
