
# GradientMesh

Procedural gradient meshes for Gideros, written in Lua.

GradientMesh is a small creative-coding utility for generating clean gradients, radial meshes, polygon-based color interpolation, texture masking, and playful visual experiments for 2D graphics.

Instead of drawing a flat bitmap gradient, the library builds mesh vertices, assigns colors to those vertices, and lets the Gideros renderer interpolate colors across triangles.

## Preview

The examples below show two main use cases for **Gideros Gradient Mesh**: applying procedural gradients over image textures, and generating clean gradient-based background shapes directly from mesh geometry.

### Gradient overlays

These examples use a source image as a texture and blend it with a generated gradient mesh. This is useful for hero images, game menus, splash screens, atmospheric backgrounds, and visual experiments where the image should keep its structure while gaining a stronger color mood.

<p align="center">
  <img src="https://raw.githubusercontent.com/HubertRonald/GradientMesh/master/assets/images/landscapes/pexels-photo-89432.png" width="32%" alt="Original landscape image">
  <img src="https://raw.githubusercontent.com/HubertRonald/GradientMesh/master/docs/images/gradient-mesh-big-rainbow.png" width="32%" alt="Landscape image with Big Rainbow gradient overlay">
  <img src="https://raw.githubusercontent.com/HubertRonald/GradientMesh/master/docs/images/gradient-mesh-big-rainbow-fog.png" width="32%" alt="Landscape image with soft Big Rainbow Fog gradient overlay">
</p>

### Gradient backgrounds and shapes

These examples focus on pure gradient surfaces generated with mesh vertices and interpolated colors. They are useful for UI cards, menu backgrounds, decorative panels, abstract scenes, and quick visual prototyping inside Gideros.

<p align="center">
  <img src="https://raw.githubusercontent.com/HubertRonald/GradientMesh/master/docs/images/gradient-mesh-royal-blue.png" width="32%" alt="Royal Blue gradient mesh background">
  <img src="https://raw.githubusercontent.com/HubertRonald/GradientMesh/master/docs/images/gradient-mesh-firewatch.png" width="32%" alt="Firewatch gradient mesh background">
  <img src="https://raw.githubusercontent.com/HubertRonald/GradientMesh/master/docs/images/gradient-mesh-mango.png" width="32%" alt="Mango gradient mesh background">
</p>

> These screenshots are generated examples. For a cleaner portfolio presentation, the visuals are intentionally kept simple: the image carries the gradient result, while names and descriptions live in the documentation instead of being embedded inside the screenshots.

## What this documentation covers

<div class="hr-card-grid">

<a class="hr-card" href="./getting-started">
  <span class="hr-icon gradientmesh-icon-setup" aria-hidden="true"></span>
  <span class="hr-card-title">Getting Started</span>
  <span class="hr-card-desc">Copy the Lua source into a Gideros project, require the module, and run the first mesh examples.</span>
</a>

<a class="hr-card" href="./examples">
  <span class="hr-icon gradientmesh-icon-examples" aria-hidden="true"></span>
  <span class="hr-card-title">Examples</span>
  <span class="hr-card-desc">Review gradient overlays, texture masks, radial shapes, splash masks, and generated visual outputs.</span>
</a>

<a class="hr-card" href="./how-it-works">
  <span class="hr-icon gradientmesh-icon-how-it-works" aria-hidden="true"></span>
  <span class="hr-card-title">How It Works</span>
  <span class="hr-card-desc">Understand the mesh construction idea behind rectangular, radial, polygon, and texture-based gradients.</span>
</a>

<a class="hr-card" href="./api-reference">
  <span class="hr-icon gradientmesh-icon-api-reference" aria-hidden="true"></span>
  <span class="hr-card-title">API Reference</span>
  <span class="hr-card-desc">Browse the core options such as color, alpha, radius, edges, direction, texture, holes, and antialiasing.</span>
</a>

<a class="hr-card" href="./architecture">
  <span class="hr-icon gradientmesh-icon-architecture" aria-hidden="true"></span>
  <span class="hr-card-title">Architecture</span>
  <span class="hr-card-desc">See how source code, examples, rendered screenshots, and the Gideros project file fit together.</span>
</a>

<a class="hr-card" href="./releases">
  <span class="hr-icon gradientmesh-icon-releases" aria-hidden="true"></span>
  <span class="hr-card-title">Releases</span>
  <span class="hr-card-desc">Track documentation releases for the GitHub Pages version of GradientMesh.</span>
</a>

</div>

## Main use cases

GradientMesh is useful for:

* gradient cards and backgrounds;
* radial color fields;
* regular polygons;
* circles and ellipse-like shapes;
* textured gradient masks;
* experimental 2D visual effects.

## Repository

* Source repository: [HubertRonald/GradientMesh](https://github.com/HubertRonald/GradientMesh)
* Runtime target: Gideros
* Language: Lua
* License: MIT
  EOF

cat > docs/gradientmesh/getting-started.md <<'EOF'

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
require "examples/radial_gradient_splash_masks"
```

Then try:

```lua
require "examples/gradient_overlay"
```

This gives you one pure procedural mesh example and one texture-overlay example.
