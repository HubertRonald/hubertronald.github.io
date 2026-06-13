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

## Recommended learning path

Start here if you want to clone the repository, reproduce the notebooks, and understand how the model pipeline is assembled.

<div class="vv-path-grid">

<a class="vv-path-card" href="./setup">
  <img class="vv-path-icon" src="/icons/versovector/setup.svg" alt="" />
  <strong>Local Setup</strong>
  <small>Prepare Python, dependencies, notebooks, and local tooling.</small>
</a>

<a class="vv-path-card" href="./data">
  <img class="vv-path-icon" src="/icons/versovector/data.svg" alt="" />
  <strong>Dataset</strong>
  <small>Download PoetryFoundationData.csv and place it under data/.</small>
</a>

<a class="vv-path-card" href="./notebooks">
  <img class="vv-path-icon" src="/icons/versovector/notebook.svg" alt="" />
  <strong>Notebook Guide</strong>
  <small>Run the notebooks in the correct order and understand each stage.</small>
</a>

<a class="vv-path-card" href="./model-topology">
  <img class="vv-path-icon" src="/icons/versovector/topology.svg" alt="" />
  <strong>Model Topology</strong>
  <small>See how supervised and unsupervised learning branches connect.</small>
</a>

<a class="vv-path-card" href="./pipeline">
  <img class="vv-path-icon" src="/icons/versovector/pipeline.svg" alt="" />
  <strong>Pipeline</strong>
  <small>Follow the flow from raw poems to integrated outputs.</small>
</a>

<a class="vv-path-card" href="./architecture">
  <img class="vv-path-icon" src="/icons/versovector/architecture.svg" alt="" />
  <strong>Architecture</strong>
  <small>Understand repository layers, model bundle, inference, and services.</small>
</a>

<a class="vv-path-card" href="./results">
  <img class="vv-path-icon" src="/icons/versovector/results.svg" alt="" />
  <strong>Results Guide</strong>
  <small>Learn how to read predictions, topics, clusters, and visual outputs.</small>
</a>

<a class="vv-path-card" href="./serving">
  <img class="vv-path-icon" src="/icons/versovector/serving.svg" alt="" />
  <strong>Serving & Demo</strong>
  <small>Run the local API/frontend foundation when artifacts are ready.</small>
</a>

</div>

## Source repository

- GitHub: [HubertRonald/VersoVector](https://github.com/HubertRonald/VersoVector)
- Original model topology source: [docs/model_topology.md](https://github.com/HubertRonald/VersoVector/blob/main/docs/model_topology.md)

## Future direction

This public repository may later support a hosted product demo, but this documentation focuses on the reproducible public project: how to run it, inspect it, and understand its results.