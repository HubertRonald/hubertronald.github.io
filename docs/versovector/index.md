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

<div class="hr-card-grid">

<a class="hr-card" href="./setup">
  <span class="hr-icon vv-icon-setup" aria-hidden="true"></span>
  <span class="hr-card-title">Local Setup</span>
  <span class="hr-card-desc">Prepare Python, dependencies, notebooks, and local tooling.</span>
</a>

<a class="hr-card" href="./data">
  <span class="hr-icon vv-icon-data" aria-hidden="true"></span>
  <span class="hr-card-title">Dataset</span>
  <span class="hr-card-desc">Download PoetryFoundationData.csv and place it under data/.</span>
</a>

<a class="hr-card" href="./notebooks">
  <span class="hr-icon vv-icon-notebook" aria-hidden="true"></span>
  <span class="hr-card-title">Notebook Guide</span>
  <span class="hr-card-desc">Run the notebooks in the correct order and understand each stage.</span>
</a>

<a class="hr-card" href="./model-topology">
  <span class="hr-icon vv-icon-topology" aria-hidden="true"></span>
  <span class="hr-card-title">Model Topology</span>
  <span class="hr-card-desc">See how supervised and unsupervised learning branches connect.</span>
</a>

<a class="hr-card" href="./pipeline">
  <span class="hr-icon vv-icon-pipeline" aria-hidden="true"></span>
  <span class="hr-card-title">Pipeline</span>
  <span class="hr-card-desc">Follow the flow from raw poems to integrated outputs.</span>
</a>

<a class="hr-card" href="./architecture">
  <span class="hr-icon vv-icon-architecture" aria-hidden="true"></span>
  <span class="hr-card-title">Architecture</span>
  <span class="hr-card-desc">Understand repository layers, model bundle, inference, and services.</span>
</a>

<a class="hr-card" href="./results">
  <span class="hr-icon vv-icon-results" aria-hidden="true"></span>
  <span class="hr-card-title">Results Guide</span>
  <span class="hr-card-desc">Learn how to read predictions, topics, clusters, and visual outputs.</span>
</a>

<a class="hr-card" href="./serving">
  <span class="hr-icon vv-icon-serving" aria-hidden="true"></span>
  <span class="hr-card-title">Serving & Demo</span>
  <span class="hr-card-desc">Run the local API/frontend foundation when artifacts are ready.</span>
</a>

</div>

## Source repository

- GitHub: [HubertRonald/VersoVector](https://github.com/HubertRonald/VersoVector)
- Original model topology source: [docs/model_topology.md](https://github.com/HubertRonald/VersoVector/blob/main/docs/model_topology.md)

## Future direction

This public repository may later support a hosted product demo, but this documentation focuses on the reproducible public project: how to run it, inspect it, and understand its results.