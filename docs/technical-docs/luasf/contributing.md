# Contributing

LuaSF values simplicity, compatibility, readability, and practical examples.

## Project goals

LuaSF aims to provide:

- Basic descriptive statistics
- Summary statistics helpers
- Shape statistics helpers
- Bivariate statistics helpers
- Probability and combinatorics helpers
- Pseudo-random variable generation
- Sampling utilities
- Formula-based statistical summaries
- A small and readable Lua codebase
- Compatibility with the existing public API

## Scope boundaries

Good fits for LuaSF:

- Descriptive statistics
- Shape statistics
- Bivariate statistics
- Probability helpers
- Random variable generation
- Sampling and simulation utilities
- Formula-based statistical summaries

Currently out of scope:

- Machine learning pipelines
- Optimization-based model training
- Non-linear regression fitting
- Deep learning
- Native dependencies
- Large framework-style APIs

## Branch naming

Recommended branch names:

```text
feature/short-description
fix/short-description
docs/short-description
test/short-description
```

Examples:

```text
feature/add-skewness-kurtosis
fix/triangular-random-variable
docs/improve-api
test/add-distribution-ranges
```

## Commit messages

Use clear and direct commit messages:

```text
Add bivariate statistics helpers
Add covariance and correlation example
Fix triangular random variable implementation
Improve README examples
Update LuaRocks rockspec draft
```

## Pull request checklist

Before opening a pull request, check:

- Existing public API remains compatible.
- Tests pass locally.
- Examples still run.
- New functions include simple documentation.
- New behavior includes at least one test.
- New modules are included in the rockspec draft when needed.
- Code remains readable and dependency-light.