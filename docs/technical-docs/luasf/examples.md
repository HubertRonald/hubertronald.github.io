# Examples

## Summary statistics

```lua
local stats = require("luasf")

local values = {10, 12, 14, 15, 18, 20}
local result = stats.summary(values)

print("Count:", result.count)
print("Min:", result.min)
print("Max:", result.max)
print("Mean:", result.mean)
print("Median:", result.median)
print("Variance:", result.variance)
print("Stddev:", result.stddev)
```

## Covariance and correlation

```lua
local stats = require("luasf")

local study_hours = {1, 2, 3, 4, 5}
local exam_scores = {50, 55, 65, 70, 80}

print(stats.covariance(study_hours, exam_scores))
print(stats.correlation(study_hours, exam_scores))
```

## Dice simulation

```lua
local stats = require("luasf")

local rolls = {}

for i = 1, 10000 do
  rolls[i] = stats.rand(1, 6) + stats.rand(1, 6)
end

local frequencies = stats.frequency(rolls)

for i = 1, #frequencies.counts do
  print("Frequency - Sum Number:", frequencies.values[i], frequencies.counts[i])
end
```

## Probability helpers

```lua
local stats = require("luasf")

print(stats.factorial(5))       -- 120
print(stats.permutations(5, 2)) -- 20
print(stats.combinations(5, 2)) -- 10

print(stats.nPr(5, 2))          -- 20
print(stats.nCr(5, 2))          -- 10
```

## Random choice and sampling

```lua
local stats = require("luasf")

local names = {"Lua", "Python", "R"}

print(stats.choice(names))

local selected = stats.sample(names, 2)

for i = 1, #selected do
  print(selected[i])
end
```

## Weighted choice

```lua
local stats = require("luasf")

local items = {"low", "medium", "high"}
local weights = {1, 2, 7}

print(stats.weighted_choice(items, weights))
```

## Deterministic custom RNG

```lua
local stats = require("luasf")

stats.set_rng(function()
  return 0.0
end)

print(stats.choice({"first", "second", "third"})) -- first

stats.reset_rng()
```

## Simple linear regression summary

```lua
local stats = require("luasf")

local x = {1, 2, 3, 4, 5}
local y = {2, 4, 5, 4, 5}

local model = stats.simple_linear_regression(x, y)

print(model.slope)
print(model.intercept)
print(model.r_squared)

local prediction = stats.predict(model, 6)
print(prediction)
```