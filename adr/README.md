# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the dim
project.

## What is an ADR?

An ADR is a document that captures an important architectural decision made
along with its context and consequences.

## Format

Each ADR follows this structure:

- **Title**: Short noun phrase (e.g., "Explicit Dimension Types")
- **Status**: Proposed, Accepted, Deprecated, or Superseded
- **Context**: What is the issue that we're seeing that motivates this decision?
- **Decision**: What is the change that we're proposing and/or doing?
- **Consequences**: What becomes easier or more difficult because of this
  decision?

## Index

| ADR                                             | Title                                          | Status     |
| ----------------------------------------------- | ---------------------------------------------- | ---------- |
| [001](001-explicit-dimension-types.md)          | Explicit Dimension Types for JSR Compatibility | Superseded |
| [002](002-quantity-codegen.md)                  | Quantity Codegen                               | Accepted   |
| [003](003-floating-point-precision.md)          | Floating Point Precision and Base Unit Storage | Accepted   |
| [004](004-unit-system-branding.md)              | Unit System Branding for Cross-System Safety   | Accepted   |
| [005](005-bounded-exponent-range.md)            | Bounded Exponent Range via Lookup Tables       | Accepted   |
| [006](006-linear-affine-type-state.md)          | Linear/Affine Type-State Distinction           | Accepted   |
| [007](007-layered-package-architecture.md)      | Layered Package Architecture                   | Accepted   |
| [008](008-dual-api-free-functions-and-chain.md) | Dual API — Free Functions and Fluent Chain     | Accepted   |
| [009](009-per-quantity-module-exports.md)       | Per-Quantity Module Exports                    | Accepted   |
| [010](010-no-kind-of-quantity-distinction.md)   | No Kind-of-Quantity Distinction                | Accepted   |
