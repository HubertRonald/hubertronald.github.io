# API Overview

LuaSF exposes a stable public facade:

```lua
local stats = require("luasf")
```

Compatibility entry points are also available:

```lua
local stats = require("LuaSF")
local stats = require("LuaStat")
```

## Descriptive statistics

| Legacy name | Modern alias | Description |
|---|---|---|
| `sumF(array)` | `sum(array)` | Sum of numeric values |
| `avF(array)` | `mean(array)` | Arithmetic mean |
| `stvF(array)` | `stddev(array)` | Sample standard deviation using `n - 1` |
| `frecuencyF(array)` | `frequency(array)` | Frequency distribution |

> `frecuencyF` keeps the original spelling for backward compatibility.

## Additional descriptive helpers

| Function | Description |
|---|---|
| `variance(array)` | Sample variance using `n - 1` |
| `median(array)` | Median value |
| `min(array)` | Minimum value |
| `max(array)` | Maximum value |
| `quantile(array, q)` | Quantile using linear interpolation |
| `mode(array)` | Most frequent value |
| `range(array)` | Difference between maximum and minimum |
| `iqr(array)` | Interquartile range |
| `percentile(array, p)` | Percentile where `p` is between `0` and `100` |
| `summary(array)` | Summary table with count, min, max, mean, median, variance, and stddev |

## Shape statistics

| Function | Description |
|---|---|
| `central_moment(array, order)` | Central moment using denominator `n` |
| `skewness(array)` | Standardized third central moment |
| `kurtosis(array)` | Pearson kurtosis |
| `excess_kurtosis(array)` | Fisher-style excess kurtosis |

## Bivariate statistics

| Function | Description |
|---|---|
| `covariance(x, y)` | Sample covariance using `n - 1` |
| `correlation(x, y)` | Pearson correlation coefficient |
| `pearson(x, y)` | Alias for `correlation(x, y)` |

## Probability helpers

| Function | Description |
|---|---|
| `factorial(n)` | Factorial of a non-negative integer |
| `permutations(n, r)` | Ordered selections without repetition |
| `combinations(n, r)` | Unordered selections without repetition |
| `permutations_with_repetition(n, r)` | Ordered selections with repetition |
| `combinations_with_repetition(n, r)` | Unordered selections with repetition |
| `permutations_without_repetition(n, r)` | Alias for `permutations(n, r)` |
| `combinations_without_repetition(n, r)` | Alias for `combinations(n, r)` |
| `multiset_permutations(counts)` | Distinct arrangements of repeated item counts |
| `nPr(n, r)` | Alias for `permutations(n, r)` |
| `nCr(n, r)` | Alias for `combinations(n, r)` |

## Sampling utilities

| Function | Description |
|---|---|
| `choice(array)` | Returns one random item from an array |
| `shuffle(array)` | Returns a shuffled copy of an array |
| `sample(array, n)` | Returns `n` random items without replacement |
| `weighted_choice(items, weights)` | Returns one random item using weights |
| `set_rng(rng_function)` | Sets a custom random number generator |
| `reset_rng()` | Restores Lua's default random number generator |

## Random variables and distributions

| Legacy name | Modern alias | Description |
|---|---|---|
| `nomalVA(mu, sig)` | `normal(mu, sig)` | Normal random variable |
| `normalVA(mu, sig)` | `normal(mu, sig)` | Normal random variable |
| `normal_inv_D(p, mu, sig)` | `inverse_normal(p, mu, sig)` | Approximate inverse normal value |
| `bernoulliVA(p)` | `bernoulli(p)` | Bernoulli random variable |
| `unifVA(min, max)` | `uniform(min, max)` | Uniform random variable |
| `expoVA(beta)` | `exponential(beta)` | Exponential random variable |
| `weibullVA(alpha, beta)` | `weibull(alpha, beta)` | Weibull random variable |
| `erlangVA(n, lambda)` | `erlang(n, lambda)` | Erlang random variable |
| `trianVA(a, b, c)` | `triangular(a, b, c)` | Triangular random variable |
| `binomialVA(n, p)` | `binomial(n, p)` | Binomial random variable |
| `geometricVA(p)` | `geometric(p)` | Geometric random variable |
| `poissonVA(lambda)` | `poisson(lambda)` | Poisson random variable |
| `chiSquareVA(n)` | `chi_square(n)` | Chi-square random variable |
| `studentTVA(df)` | `student_t(df)` | Student's t random variable |
| `gamVA(alpha, lambda)` | `gamma(alpha, lambda)` | Gamma random variable |
| `lognoVA(m, s)` | `lognormal(m, s)` | Log-normal random variable |
| `lognoRandVA(m, s)` | `lognormal(m, s)` | Log-normal random variable |

## Simple regression summaries

| Function | Description |
|---|---|
| `simple_linear_regression(x, y)` | Formula-based simple linear regression summary |
| `predict(model, x)` | Predicts one value or a list of values |
| `fitted_values(model)` | Returns fitted values from a regression model |
| `residuals(model)` | Returns residuals from a regression model |

LuaSF reports coefficients, R, R², sums of squares, mean squared error, residual standard error, standard errors, t statistics, and an ANOVA-style summary.

It does not provide p-values, confidence intervals, multiple regression, non-linear regression, optimization-based modeling, or machine learning workflows.