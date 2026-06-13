# Local Setup

This page describes how to prepare a local environment for the public VersoVector repository.

## Clone the repository

```bash
git clone https://github.com/HubertRonald/VersoVector.git
cd VersoVector
```

## Python version

The project was developed with Python 3.10.

A recommended setup is:

```bash
python3.10 -m venv .venv
source .venv/bin/activate
```

On Windows:

```powershell
py -3.10 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

## Install dependencies

Upgrade packaging tools:

```bash
python -m pip install --upgrade pip setuptools wheel
```

Install base dependencies:

```bash
pip install -r requirements.txt
```

For notebooks and development tools:

```bash
pip install -r requirements-dev.txt
```

## spaCy model

The preprocessing pipeline uses spaCy. Install the required English model:

```bash
python -m spacy download en_core_web_lg
```

## Optional UMAP dependencies

UMAP is optional because it may require additional compiled dependencies in some local environments.

```bash
pip install -r requirements-umap.txt
```

If UMAP installation fails, the project can still be inspected through the remaining notebooks and t-SNE/projection alternatives where available.

## Jupyter kernel

Optional but recommended:

```bash
python -m ipykernel install --user \
  --name versovector-py310 \
  --display-name "Python 3.10.11 (VersoVector)"
```

## Clean generated files

Generated cache and heavy artifacts should not be committed.

```bash
find . -type d -name "__pycache__" -exec rm -rf {} +
```

Generated model artifacts are expected to be rebuilt locally instead of versioned in Git.