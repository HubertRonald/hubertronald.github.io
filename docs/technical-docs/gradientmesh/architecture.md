
# Architecture

GradientMesh is intentionally small.

It is structured as a Gideros/Lua graphics utility with:

* a core mesh-generation module;
* sample scenes;
* source assets;
* rendered documentation screenshots;
* a Gideros project file;
* a sample launcher.

## Repository structure

```text
GradientMesh/
├── docs/images/            # Rendered examples and visual outputs
├── Samples/                # Gideros sample scenes
├── Sources/                # Images, fonts, and source assets
├── main.lua                # Sample selector
├── GradientMesh.lua        # Core gradient mesh utility
├── GradientMesh.gproj      # Gideros project file
├── LICENSE
└── README.md
```

## Responsibility map

```mermaid
flowchart TD
    A["main.lua<br/>sample launcher"] --> B["Samples / examples<br/>visual scenes"]
    B --> C["GradientMesh.lua<br/>core mesh utility"]
    C --> D["Gideros Mesh API<br/>vertices, indices, colors,<br/>texture coordinates"]
    D --> E["Rendered visual output"]

    F["Sources / assets<br/>images, fonts, textures"] --> B
    E --> G["docs/images<br/>README screenshots"]

    classDef gmNode fill:#ffffff,stroke:#111827,color:#111827,stroke-width:1.4px;
    classDef gmCore fill:#fff7ed,stroke:#f97316,color:#111827,stroke-width:1.8px;
    classDef gmOutput fill:#f0fdf4,stroke:#16a34a,color:#111827,stroke-width:1.8px;

    class A,B,F gmNode;
    class C,D gmCore;
    class E,G gmOutput;
```

## Core module

The main reusable unit is:

```text
GradientMesh.lua
```

It is responsible for generating geometry and assigning rendering data such as:

* vertices;
* triangle indices;
* colors;
* alpha values;
* texture coordinates;
* optional radial holes;
* optional antialiasing rings.

## Examples and samples

Examples demonstrate the intended use cases:

* gradient overlays;
* texture masking;
* hexagon portrait masks;
* radial shapes with holes and deformation;
* radial splash masks.

## Visual documentation

Rendered examples live in the GradientMesh repository under:

```text
docs/images/
```

The GitHub Pages documentation references those images through the source repository instead of duplicating them locally.
