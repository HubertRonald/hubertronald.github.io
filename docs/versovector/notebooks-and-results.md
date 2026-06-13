# Notebooks & Results

The public repository can use notebook outputs as portfolio evidence, but outputs should be curated carefully.

## What should be rendered in documentation

Good candidates for Markdown documentation:

- cleaned pipeline overview tables;
- model comparison summary tables;
- selected tag prediction examples using safe/public-domain or synthetic text;
- cluster distribution charts;
- topic summary tables;
- UMAP or t-SNE projection images;
- architecture diagrams;
- model topology diagrams;
- API response examples with synthetic input.

## What should not be rendered publicly

Avoid publishing:

- full copyrighted lyrics;
- licensed datasets;
- private prompts;
- sensitive model artifacts;
- private evaluation sets;
- raw user-provided text;
- screenshots containing proprietary material;
- cloud project identifiers;
- API keys or secrets.

## Recommended documentation assets

Create a public-safe image directory in the GitHub Pages repository:

```text
docs/public/images/versovector/
```

Suggested files:

```text
docs/public/images/versovector/pipeline-overview.svg
docs/public/images/versovector/embedding-projection.png
docs/public/images/versovector/topic-summary.png
docs/public/images/versovector/frontend-preview.png
docs/public/images/versovector/api-response-example.png
```

Then reference them from Markdown:

```md
![VersoVector embedding projection](/images/versovector/embedding-projection.png)
```

## Recommended notebook export strategy

From notebooks, export only curated static outputs.

Example:

```python
fig.savefig(
    "../figs/public/embedding_projection.png",
    dpi=160,
    bbox_inches="tight"
)
```

Then manually copy reviewed images into:

```text
docs/public/images/versovector/
```

## Suggested result table

A public result table can show the type of outputs without exposing private data:

| Output | Public-safe example |
|---|---|
| Predicted tags | `melancholy`, `memory`, `loss`, `longing` |
| Similarity neighbors | Synthetic or public-domain examples only |
| Topic labels | Human-readable topic summaries |
| Cluster ID | Numeric cluster with interpretation |
| Projection metadata | 2D coordinates without raw copyrighted text |

## Public demo policy

Notebook results should support the technical story without turning the documentation into a dataset dump.

The documentation should explain the method, the architecture, and selected outputs.
It should not redistribute copyrighted or licensed corpora.