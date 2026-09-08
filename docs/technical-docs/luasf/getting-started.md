# Getting Started

## Installation

### Option 1: LuaRocks

```bash
luarocks install luasf
```

Then use:

```lua
local stats = require("luasf")

print(stats.sum({1, 2, 3})) -- 6
```

### Option 2: Copy the single-file entry point

Copy `LuaSF.lua` into your project and load it with:

```lua
local stats = require("LuaSF")
```

### Option 3: Legacy compatibility entry point

Older examples may use:

```lua
local stats = require("LuaStat")
```

This remains supported for compatibility.

### Option 4: Development source module

During development, load the implementation from `src/`:

```lua
local stats = require("src.luasf")
```

## Quick start

```lua
local stats = require("luasf")

local values = {1, 2, 3, 4, 5}

print(stats.sum(values))           -- 15
print(stats.mean(values))          -- 3
print(stats.stddev(values))        -- sample standard deviation
print(stats.median(values))        -- 3
print(stats.variance(values))      -- sample variance
print(stats.summary(values).count) -- 5

print(stats.factorial(5))          -- 120
print(stats.combinations(5, 2))    -- 10
```

## Legacy aliases

LuaSF preserves older public names:

```lua
local stats = require("LuaSF")

local values = {1, 2, 3, 4, 5}

print(stats.sumF(values)) -- 15
print(stats.avF(values))  -- 3
print(stats.stvF(values)) -- sample standard deviation
```

## Running tests

Install `luaunit`:

```bash
luarocks install --local luaunit
eval "$(luarocks path --local)"
```

Run tests:

```bash
lua spec/test_bivariate.lua
lua spec/test_distributions.lua
lua spec/test_probability.lua
lua spec/test_regression.lua
lua spec/test_sampling.lua
lua spec/test_shape.lua
lua spec/test_stats.lua
lua spec/test_student_t.lua
```