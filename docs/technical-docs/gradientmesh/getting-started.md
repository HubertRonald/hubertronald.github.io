
# Getting Started

This guide explains how to use GradientMesh inside a Gideros project.

## Requirements

GradientMesh is designed for:

* Lua;
* Gideros;
* the Gideros `Mesh` rendering API;
* local project files copied into a Gideros project.

## Installation

Copy the core source file into your Gideros project.

Depending on the current repository structure, the reusable module may appear as one of these paths:

```text
GradientMesh.lua
```

or:

```text
src/gradient_mesh.lua
```

Then require it from a scene, example file, or `main.lua`.

```lua
local GradientMesh = require "GradientMesh"
```

or, if you keep it under `src/`:

```lua
local GradientMesh = require "src/gradient_mesh"
```

For the public repository documentation, `GradientMesh.lua` is treated as the main source file, while `src/gradient_mesh.lua` is documented as an optional local organization pattern.


## Quick start

Create a simple rectangular gradient:

```lua
local GradientMesh = require "GradientMesh"

local gradient = GradientMesh.new()

gradient:rectangle({
    color = {
        0x0f2027,
        0x203a43,
        0x2c5364
    },
    alpha = {1, 1, 1},
    dimension = {320, 180},
    anchor = {0.5, 0.5},
    position = {160, 240},
    way = "lr"
})

stage:addChild(gradient)
```

## Radial example

```lua
local GradientMesh = require "GradientMesh"

local glow = GradientMesh.new()

glow:circle({
    radius = 180,
    edges = 96,
    color = {
        0x833ab4,
        0xfd1d1d,
        0xfcb045
    },
    position = {240, 240},
    way = "co",
    jaggedFree = true
})

stage:addChild(glow)
```

## Regular polygon example

```lua
local GradientMesh = require "GradientMesh"

local polygon = GradientMesh.new()

polygon:regularPolygon({
    edges = 6,
    radius = 160,
    color = {
        0x4776e6,
        0x8e54e9
    },
    position = {240, 240},
    scalePolygon = {1, 1},
    rotationMesh = 0,
    jaggedFree = true
})

stage:addChild(polygon)
```

## Running examples

The repository includes a simple sample launcher in `main.lua`.

Uncomment the sample you want to run:

```lua
--------------------------------------------------------------------------------
-- Gideros Gradient Mesh examples
--------------------------------------------------------------------------------
-- require "examples/gradient_overlay"
-- require "examples/texture_mask_rotated_mesh"
-- require "examples/hexagon_portrait_texture_mask"
-- require "examples/radial_shapes_hole_deform"
require "examples/radial_gradient_splash_masks"
```

## Recommended first run

Start with:

```lua
require "Samples/radial_gradient_splash_masks"
```

Then try:

```lua
require "Samples/gradient_overlay"
```

This gives you one pure procedural mesh example and one texture-overlay example.

## Notes

If you copy the examples into a different folder such as `examples/`, update the `require` paths accordingly.

For example:

```lua
require "examples/radial_gradient_splash_masks"
```

Both naming conventions are valid as long as they match your local Gideros project structure.
