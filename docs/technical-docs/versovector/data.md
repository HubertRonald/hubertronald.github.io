# Dataset

VersoVector expects the main poetry dataset to be available locally under the repository `data/` directory.

## Expected file

```text
data/PoetryFoundationData.csv
```

This file is not committed to the public repository.

It should be downloaded locally before running the notebook pipeline.

## Source

The dataset used by the public repository is:

```text
tgdivy/poetry-foundation-poems
```

Kaggle page:

```text
https://www.kaggle.com/datasets/tgdivy/poetry-foundation-poems/data
```

The dataset contains poems from Poetry Foundation with metadata such as poem title, poet, poem text, and tags.

## Why the dataset is not versioned

The public repository avoids committing raw dataset files and heavy generated artifacts.

This keeps the repository lightweight and makes the data acquisition step explicit for reproducibility.

Expected local-only files include:

```text
data/PoetryFoundationData.csv
artifacts/
figs/
*.joblib
*.pkl
*.npy
*.npz
```

## Option 1: Manual download

Download the dataset from Kaggle and place the CSV here:

```text
VersoVector/data/PoetryFoundationData.csv
```

Then run the notebook sequence starting from:

```text
notebook/01_cleaning_pipeline.ipynb
```

## Option 2: Download with kagglehub

Install `kagglehub`:

```bash
pip install kagglehub
```

Then run:

```python
import os
import ssl
import shutil
from pathlib import Path

import kagglehub

# SSL workaround for local environments with certificate issues.
# Do not use this workaround in CI or production environments.
if not os.environ.get("CI"):
    ssl._create_default_https_context = ssl._create_unverified_context

here: Path = Path.cwd().absolute()
data_dir: Path = here / "data"
data_dir.mkdir(exist_ok=True)

target_file: Path = data_dir / "PoetryFoundationData.csv"

if not target_file.is_file():
    downloaded_path = Path(
        kagglehub.dataset_download(
            "tgdivy/poetry-foundation-poems"
        )
    )

    if downloaded_path.is_file():
        source_file = downloaded_path
    else:
        source_file = downloaded_path / "PoetryFoundationData.csv"

    shutil.copyfile(source_file, target_file)
    print("Dataset ready at:", target_file)
else:
    print("Dataset already exists at:", target_file)
```

## Expected project layout after download

```text
VersoVector/
├── data/
|   ├── vallejo_poems_en.csv
│   └── PoetryFoundationData.csv
├── notebook/
│   ├── 01_cleaning_pipeline.ipynb
│   ├── 02_feature_pipeline.ipynb
│   ├── 03_embeddings_supervised.ipynb
│   ├── 04_embeddings_unsupervised.ipynb
│   ├── 05_supervised_unsupervised_integration.ipynb
│   └── 06_visualizations.ipynb
└── src/
```

## Next step

After placing the dataset in `data/`, continue with:

```text
notebook/01_cleaning_pipeline.ipynb
```

The cleaning notebook prepares the processed corpus used by the rest of the pipeline.