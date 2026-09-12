
# API Reference

This page summarizes the main public configuration options documented in the GradientMesh README.

## Module import

```lua
local GradientMesh = require "GradientMesh"
```

or, if the file is placed under `src/`:

```lua
local GradientMesh = require "src/gradient_mesh"
```

## Constructor

```lua
local mesh = GradientMesh.new()
```

## Rectangle gradient

```lua
mesh:rectangle({
    color = {0x0f2027, 0x203a43, 0x2c5364},
    alpha = {1, 1, 1},
    dimension = {320, 180},
    anchor = {0.5, 0.5},
    position = {160, 240},
    way = "lr"
})
```

## Circle gradient

```lua
mesh:circle({
    radius = 180,
    edges = 96,
    color = {0x833ab4, 0xfd1d1d, 0xfcb045},
    position = {240, 240},
    way = "co",
    jaggedFree = true
})
```

## Regular polygon gradient

```lua
mesh:regularPolygon({
    edges = 6,
    radius = 160,
    color = {0x4776e6, 0x8e54e9},
    position = {240, 240},
    scalePolygon = {1, 1},
    rotationMesh = 0,
    jaggedFree = true
})
```

## Configuration options

| Option         | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `color`        | List of colors assigned to gradient stops.                      |
| `alpha`        | Optional alpha values per color stop.                           |
| `dimension`    | Width and height for rectangular gradients.                     |
| `radius`       | Radius for circles and regular polygons.                        |
| `edges`        | Number of polygon edges. Higher values create smoother circles. |
| `position`     | Mesh position on stage.                                         |
| `anchor`       | Anchor point for rectangular gradients.                         |
| `way`          | Gradient direction: `tb`, `bt`, `lr`, `rl`, `co`, `oc`.         |
| `hole`         | Enables an inner hole for radial shapes.                        |
| `rIn`          | Inner radius when `hole` is enabled.                            |
| `scalePolygon` | Deforms polygon or circle proportions.                          |
| `rotation`     | Rotates the full mesh object.                                   |
| `rotationMesh` | Rotates only the mesh vertices.                                 |
| `texture`      | Optional texture configuration.                                 |
| `jaggedFree`   | Adds a soft transparent ring to reduce jagged edges.            |
| `colorOn`      | Enables or disables mesh color assignment.                      |

## Direction values

| Value | Meaning            |
| ----- | ------------------ |
| `tb`  | Top to bottom.     |
| `bt`  | Bottom to top.     |
| `lr`  | Left to right.     |
| `rl`  | Right to left.     |
| `co`  | Center to outside. |
| `oc`  | Outside to center. |

## Notes

When `hole = true`, the radial mesh starts from an inner radius instead of the center.

The center is not filled by mesh triangles, so the hole remains transparent and shows whatever is behind it.
