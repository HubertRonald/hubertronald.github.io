# Notebook Guide

VersoVector is notebook-first for exploration and validation.

The notebooks should be read and executed in order because each stage depends on outputs from the previous one.

Before running the notebooks, review the [Model Topology](./model-topology). It explains how the feature union, supervised branch, unsupervised branch, and integration stage connect across the full workflow.

## Before running notebooks

Make sure the dataset exists at:

```text
data/vallejo_poems_en.csv
data/PoetryFoundationData.csv
```

See [Dataset](./data) for download instructions.

The first notebook, `01_cleaning_pipeline.ipynb`, expects this raw CSV and produces the processed corpus used by the following notebooks.

## Notebook sequence

| Step | Notebook | Purpose | Related topology stage |
|---:|---|---|---|
| 1 | `01_cleaning_pipeline.ipynb` | Clean raw poetry data and generate the processed corpus | Original poems → preprocessing |
| 2 | `02_feature_pipeline.ipynb` | Fit and inspect the shared feature pipeline | FeatureUnion, CountVectorizer, TF-IDF, DictVectorizer |
| 3 | `03_embeddings_supervised.ipynb` | Train and evaluate supervised multilabel tag prediction | StackingClassifier + OneVsRest |
| 4 | `04_embeddings_unsupervised.ipynb` | Generate similarity, topics, clustering, and projections | LDA, clustering, similarity, PCA/t-SNE/UMAP |
| 5 | `05_supervised_unsupervised_integration.ipynb` | Combine supervised and unsupervised outputs | Results integration |
| 6 | `06_visualizations.ipynb` | Build final visualizations and interpretation assets | Final interpretation |

## Recommended execution order

```text
01_cleaning_pipeline.ipynb
  ↓
02_feature_pipeline.ipynb
  ↓
03_embeddings_supervised.ipynb
  ↓
04_embeddings_unsupervised.ipynb
  ↓
05_supervised_unsupervised_integration.ipynb
  ↓
06_visualizations.ipynb
```

## Viewing notebooks

Some notebook outputs may not render fully on GitHub, especially HTML diagrams or rich model visualizations.

Use nbviewer when needed:

- [01 Cleaning Pipeline](https://nbviewer.org/github/HubertRonald/VersoVector/blob/main/notebook/01_cleaning_pipeline.ipynb)
- [02 Feature Pipeline](https://nbviewer.org/github/HubertRonald/VersoVector/blob/main/notebook/02_feature_pipeline.ipynb)
- [03 Supervised Embeddings](https://nbviewer.org/github/HubertRonald/VersoVector/blob/main/notebook/03_embeddings_supervised.ipynb)
- [04 Unsupervised Embeddings](https://nbviewer.org/github/HubertRonald/VersoVector/blob/main/notebook/04_embeddings_unsupervised.ipynb)
- [05 Supervised + Unsupervised Integration](https://nbviewer.org/github/HubertRonald/VersoVector/blob/main/notebook/05_supervised_unsupervised_integration.ipynb)
- [06 Visualizations](https://nbviewer.org/github/HubertRonald/VersoVector/blob/main/notebook/06_visualizations.ipynb)

## What to inspect

When reviewing the notebooks, focus on:

- how the text is cleaned and normalized;
- how the feature pipeline is built;
- how sparse matrices are handled;
- how the supervised branch predicts poetic tags;
- how clustering and topics are generated;
- how semantic neighbors are computed;
- how supervised and unsupervised results are joined;
- what final visualizations reveal.

## Expected local artifacts

The notebooks and scripts may generate artifacts under:

```text
artifacts/
data/
figs/
```

Heavy binary artifacts are not expected to be committed to Git.
They should be regenerated locally.