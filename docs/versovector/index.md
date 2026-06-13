# VersoVector

**VersoVector** is a public NLP/MLOps repository for exploring emotional-semantic patterns in poetic and lyrical language.

The project explores whether computational language models can detect emotional, thematic, and semantic relationships in poems in a way that supports human literary interpretation.

It combines two complementary learning approaches:

- **Unsupervised learning**: clustering poems by style, tone, topic, or semantic proximity.
- **Supervised learning**: classifying poems by emotion, theme, or poetic tone.

The central research question is:

> Can a language model perceive the emotion behind a poem, as a human reader does?

## What this documentation is for

This documentation helps a reader:

- clone the public repository;
- prepare the local environment;
- understand the notebook sequence;
- understand the model topology;
- reproduce the main analytical pipeline;
- inspect generated outputs;
- understand how model artifacts are packaged;
- run the local API/frontend foundation when the model bundle is available.

## Repository focus

The public repository demonstrates:

- text cleaning and preprocessing;
- `FeatureUnion`-based feature representation;
- `CountVectorizer`, `TfidfVectorizer`, and `DictVectorizer`;
- supervised multilabel tag prediction;
- unsupervised similarity, topic modeling, clustering, and projections;
- integration of supervised and unsupervised outputs;
- model bundle generation;
- Python inference abstractions;
- FastAPI serving foundation;
- Gradio frontend foundation;
- Docker-based local services;
- tests and reproducibility-oriented structure.

## Recommended reading order

1. [Local Setup](./setup)
2. [Dataset](./data)
3. [Notebook Guide](./notebooks)
4. [Model Topology](./model-topology)
5. [Pipeline](./pipeline)
6. [Architecture](./architecture)
7. [Results Guide](./results)
8. [Serving & Demo](./serving)

## Source repository

- GitHub: [HubertRonald/VersoVector](https://github.com/HubertRonald/VersoVector)
- Original model topology source: [docs/model_topology.md](https://github.com/HubertRonald/VersoVector/blob/main/docs/model_topology.md)

## Future direction

This public repository may later support a hosted product demo, but this documentation focuses on the reproducible public project: how to run it, inspect it, and understand its results.