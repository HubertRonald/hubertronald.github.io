# Architecture

VersoVector is organized as a layered NLP/MLOps system.

The public repository shows the technical foundation without exposing production-only configuration.

## High-level architecture

```mermaid
flowchart TD
    Input["Poems / lyric-like fragments / reflective text"] --> Cleaning["Cleaning & preprocessing"]
    Cleaning --> Features["Feature pipeline<br/>Count / TF-IDF / custom features"]
    Features --> Supervised["Supervised branch<br/>multilabel tag prediction"]
    Features --> Unsupervised["Unsupervised branch<br/>similarity / topics / clustering"]
    Supervised --> Integration["Integration layer"]
    Unsupervised --> Integration
    Integration --> Bundle["Model bundle<br/>artifacts/model_bundle"]
    Bundle --> Inference["PoemAnalyzer<br/>Python inference layer"]
    Inference --> API["FastAPI service"]
    Inference --> Frontend["Gradio frontend"]
    API --> FutureProduct["Future product API"]
    Frontend --> Demo["Portfolio demo experience"]
```

## Repository layers

```text
VersoVector/
├── apps/
│   └── frontend/
├── artifacts/
├── configs/
├── data/
├── docs/
├── figs/
├── infra/
│   └── gcp-cloud-run-blueprint/
├── modules/
├── notebook/
├── services/
│   ├── api/
│   ├── frontend/
│   └── compose.yaml
├── src/
│   └── versovector/
├── tests/
└── utils/
```

## Main responsibilities

| Layer | Responsibility |
|---|---|
| `notebook/` | Exploratory and analytical pipeline |
| `modules/` | Reusable analytical components |
| `src/versovector/training/` | Scripted training and artifact generation |
| `src/versovector/inference/` | Model bundle loading and inference |
| `src/versovector/api/` | FastAPI serving layer |
| `apps/frontend/` | Gradio user-facing demo |
| `services/` | Local Dockerized API and frontend services |
| `infra/gcp-cloud-run-blueprint/` | Sanitized Google Cloud deployment blueprint |
| `tests/` | Unit and integration testing |

## Public architecture boundary

```mermaid
flowchart LR
    Public["Public Portfolio Layer"] --> Docs["Documentation"]
    Public --> Notebooks["Clean notebooks"]
    Public --> Tests["Tests"]
    Public --> API["API skeleton"]
    Public --> Frontend["Demo frontend"]
    Public --> Blueprint["Sanitized GCP blueprint"]

    Private["Private Product Layer"] --> Secrets["Secrets"]
    Private --> Billing["Billing"]
    Private --> Auth["Authentication"]
    Private --> LicensedData["Licensed datasets"]
    Private --> ProdInfra["Production infrastructure state"]
    Private --> AdvancedLogic["Commercial recommendation logic"]

    Public -. "informs" .-> Private
```

## Design principles

- Keep training and inference separated.
- Avoid retraining inside the serving layer.
- Package trained artifacts into a model bundle.
- Keep public infrastructure examples sanitized.
- Keep copyrighted or licensed content out of the public repository unless redistribution is allowed.
- Use the public repo as a credible technical portfolio, not as the full production product.