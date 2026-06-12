# Releases

LuaSF follows small, focused releases.

## Latest reference release

The current documentation is aligned with the LuaSF release line that includes:

- Probability and combinatorics helpers
- Shape statistics helpers
- Bivariate statistics helpers
- Sampling utilities
- Student's t random variable
- Formula-based simple regression summaries

## Version highlights

### v0.8.0

Simple regression summaries and Student's t random variable.

Added:

```lua
stats.studentTVA(df)
stats.student_t(df)
stats.t_student(df)

stats.simple_linear_regression(x, y)
stats.predict(model, x)
stats.fitted_values(model)
stats.residuals(model)
```

Scope note:

LuaSF includes formula-based simple regression summaries, but intentionally does not provide machine learning workflows, optimization-based modeling, multiple regression, or non-linear regression fitting.

### v0.7.0

Probability and combinatorics helpers.

Added:

```lua
stats.factorial(n)
stats.permutations(n, r)
stats.combinations(n, r)
stats.permutations_with_repetition(n, r)
stats.combinations_with_repetition(n, r)
stats.multiset_permutations(counts)
stats.nPr(n, r)
stats.nCr(n, r)
```

### v0.6.0

Shape statistics helpers.

Added:

```lua
stats.central_moment(array, order)
stats.skewness(array)
stats.kurtosis(array)
stats.excess_kurtosis(array)
```

### v0.5.0

Modular source layout and bivariate statistics helpers.

Added:

```lua
stats.covariance(x, y)
stats.correlation(x, y)
stats.pearson(x, y)
```

## Links

- [LuaSF repository](https://github.com/HubertRonald/LuaSF)
- [LuaSF releases](https://github.com/HubertRonald/LuaSF/releases)
- [LuaSF changelog](https://github.com/HubertRonald/LuaSF/blob/master/CHANGELOG.md)