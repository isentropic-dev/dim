# Contributing to dim

Thanks for wanting to contribute! This guide exists to save both of us time.

## The One Rule

**You must understand your code.** If you can't explain what your changes do and
how they interact with the rest of the system, your PR will be closed.

Using AI to write code is fine. You can gain understanding by interrogating an
agent with access to the codebase until you grasp all edge cases and effects of
your changes. What's not fine is submitting agent-generated slop without that
understanding.

If you use an agent, run it from the `dim` root directory so it picks up
`AGENTS.md` automatically. Your agent must follow the rules and guidelines in
that file.

## Before You Start

If in doubt, open an issue first. This is especially true for non-trivial
changes — it avoids wasted effort on things that won't be accepted.

## Before Submitting a PR

```bash
deno fmt --check  # must pass with no errors
deno lint         # must pass with no errors
deno test         # must pass
```

Do not edit `CHANGELOG.md`. Changelog entries are added by maintainers.

## Philosophy

dim is minimal and layered. If your change adds runtime overhead, bloats the
type system unnecessarily, or conflates quantities with units, it will likely be
rejected. Review the [ADRs](adr/) for documented design decisions before
proposing changes that touch core abstractions.

## Questions?

Open an issue.
