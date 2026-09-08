
# How It Works

GradientMesh treats a 2D gradient as a geometry and interpolation problem.

Instead of drawing a static bitmap gradient, it builds mesh vertices, assigns colors to those vertices, and lets the renderer interpolate color values across triangles.

## Rectangular gradient mesh

For a rectangular gradient, the mesh is built as a regular grid:

```text
v1 ----- v2 ----- v3
 | \      | \      |
 |  \     |  \     |
v4 ----- v5 ----- v6
 | \      | \      |
 |  \     |  \     |
v7 ----- v8 ----- v9
```

Each grid cell is split into two triangles:

```text
(v1, v2, v5)
(v1, v5, v4)
```

If a rectangle has width $w$, height $h$, and anchor point $(a_x, a_y)$, a vertex at normalized grid coordinates $(u_i, v_j)$ can be written as:

$$
P_{ij} = \left( (u_i - a_x)w,\ (v_j - a_y)h \right)
$$

For each cell, the two triangles can be represented as:

$$
T_1 = (P_{ij}, P_{i+1,j}, P_{i+1,j+1})
$$

$$
T_2 = (P_{ij}, P_{i+1,j+1}, P_{i,j+1})
$$

## Color interpolation

Inside a triangle, the renderer interpolates vertex colors.

Conceptually, a simple two-color gradient can be written as:

$$
C(t) = (1 - t)C_0 + tC_1
$$

where:

$$
0 \leq t \leq 1
$$

For a triangle, this idea generalizes through barycentric interpolation.

If a point inside a triangle has barycentric weights $\lambda_1$, $\lambda_2$, and $\lambda_3$, then:

$$
\lambda_1 + \lambda_2 + \lambda_3 = 1
$$

and the interpolated color is:

$$
C(P) = \lambda_1 C_1 + \lambda_2 C_2 + \lambda_3 C_3
$$

That is the small trick behind the visual result: the Lua code builds the geometry, while the rendering pipeline does the smooth color blending.

## Radial and polygon gradients

For circular and polygon-based gradients, the library creates rings of vertices around a center point.

A radial vertex can be described as:

$$
P_{ij} =
\left(
c_x + s_x \cdot p^x_j \cdot r \cdot \cos(\theta_i),
c_y + s_y \cdot p^y_j \cdot r \cdot \sin(\theta_i)
\right)
$$

where:

* $(c_x, c_y)$ is the center point;
* $s_x$ and $s_y$ are scale factors from `scalePolygon`;
* $r$ is the base radius;
* $p^x_j$ and $p^y_j$ are normalized radial percentages for the current color stop;
* $\theta_i$ is the angular position of the current polygon vertex.

For a regular polygon with $n$ edges, the angle of each vertex is:

$$
\theta_i = \frac{\pi}{2} + \frac{(2i - 1)\pi}{n} + \rho
$$

where $\rho$ is the mesh rotation angle from `rotationMesh`, expressed in radians.

This is why the same function can produce circles, ellipses, regular polygons, rotated polygons, and radial texture masks: changing $n$, $r$, $s_x$, $s_y$, and $\rho$ changes the generated mesh.

## Inner holes

When `hole = true`, the radial mesh starts from an inner radius instead of the center.

If $r_{\text{in}}$ is the inner radius and $r$ is the outer radius, the normalized inner position is:

$$
p_{\text{in}} = \frac{r_{\text{in}}}{r}
$$

For multiple radial color stops, the intermediate percentages can be distributed between the inner and outer radius:

$$
p_j = \frac{r_{\text{in}}}{r} + j \cdot \frac{r - r_{\text{in}}}{m r}, \qquad j = 1, 2, \ldots, m
$$

where $m$ is the number of color stops.

This creates donut-like gradients and ring-shaped meshes while keeping the same polygon construction logic.

## Antialiasing ring

When `jaggedFree = true`, the mesh adds a thin outer fade ring.

Conceptually, it creates one ring close to the edge:

$$
p_{\text{fade}} = \frac{r - \delta}{r}
$$

and another one at the final boundary:

$$
p_{\text{outer}} = 1
$$

Then the outer alpha fades toward zero:

$$
\alpha_{\text{outer}} = 0
$$

This soft transparent ring helps reduce jagged polygon edges.

## Texture coordinates

When a texture is attached, the mesh also generates texture coordinates.

For a rectangular mesh, texture coordinates follow the same normalized grid idea:

$$
U_{ij} = d_x u_i + a_x(t_w - d_x)
$$

$$
V_{ij} = d_y v_j + a_y(t_h - d_y)
$$

where:

* $t_w$ and $t_h$ are the texture width and height;
* $d_x$ and $d_y$ are the visible texture dimensions after scaling;
* $a_x$ and $a_y$ are the texture anchor values.

For polygon meshes, the texture coordinates follow the same radial idea as the geometric vertices, which is what allows image textures to be clipped, rotated, and tinted by polygon geometry.
