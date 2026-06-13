# Results Guide

This page explains how to read and discuss VersoVector results from the public repository.

The goal is not to publish every notebook output, but to guide a technical reader through the most relevant evidence.

## Result categories

| Result type | Where to inspect it | What it shows |
|---|---|---|
| Cleaned corpus | `01_cleaning_pipeline.ipynb` | Text normalization and metadata readiness |
| Feature pipeline | `02_feature_pipeline.ipynb` | Count, TF-IDF, custom features, sparse matrices |
| Supervised predictions | `03_embeddings_supervised.ipynb` | Multilabel emotional or thematic tag prediction |
| Similarity neighbors | `04_embeddings_unsupervised.ipynb` | Semantically close poems |
| Topics | `04_embeddings_unsupervised.ipynb` | Latent thematic signals |
| Clusters | `04_embeddings_unsupervised.ipynb` | Emergent poem groupings |
| Integrated table | `05_supervised_unsupervised_integration.ipynb` | Combined supervised and unsupervised view |
| Visual assets | `06_visualizations.ipynb` | Final plots and interpretation figures |

## Recommended outputs to render in this documentation

Good candidates:

- feature pipeline diagram;
- supervised metric summary table;
- tag distribution chart;
- topic summary table;
- cluster distribution chart;
- UMAP or t-SNE projection;
- similarity-neighbor example using safe short text;
- integrated result sample with limited columns.

## Recommended image location

Use:

```text
docs/public/images/versovector/
```

Example files:

```text
docs/public/images/versovector/feature-pipeline.png
docs/public/images/versovector/supervised-metrics.png
docs/public/images/versovector/topic-summary.png
docs/public/images/versovector/cluster-projection.png
docs/public/images/versovector/integrated-results-sample.png
```

Then reference them:

```md
![VersoVector cluster projection](/images/versovector/cluster-projection.png)
```

## Suggested result narrative

When presenting results, use this structure:

```text
Input text
  ↓
Cleaned representation
  ↓
Feature vector
  ↓
Predicted tags
  ↓
Nearest semantic neighbors
  ↓
Dominant topic
  ↓
Cluster/projection position
  ↓
Interpretation
```

## Example interpretation pattern

```text
The model predicts tags associated with memory, loss, and longing.

The nearest-neighbor results suggest that the text is semantically close to poems containing similar emotional vocabulary.

The topic model associates the text with terms related to time, absence, and inner conflict.

The projection places the poem near a cluster of emotionally introspective texts.
```

## Public documentation note

Use curated outputs.

Avoid turning the documentation into a raw dataset dump.
When including examples, prefer short excerpts, synthetic examples, public-domain texts, or summarized model outputs.