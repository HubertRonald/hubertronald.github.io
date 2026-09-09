export interface PortfolioProject {
  id: string
  name: string
  tagline: string
  summary: string
  repository: string | null
  documentation: string | null
  release: string | null
  stages: string[]
  evidence: string[]
  notSupported: string[]
  contributionBoundary: string
  statusNote: string
  releaseScope: string | null
  acceptedLimitations: string[]
}

export interface JourneyStage {
  number: string
  id: string
  name: string
  primary: string[]
  supporting: string[]
  bridge: string[]
  boundary: string
}

export const portfolioProjects: Record<string, PortfolioProject> = {
  "VersoVector": {
    "id": "VersoVector",
    "name": "VersoVector",
    "tagline": "Emotional-semantic NLP and local MLOps system with packaged inference and a sanitized cloud blueprint.",
    "summary": "VersoVector combines supervised and unsupervised NLP workflows, reproducible training, model artifacts, packaged inference, FastAPI, Gradio, tests, Docker services, optional MLflow tracking, and a sanitized cloud deployment blueprint. It is retained as primary ML/NLP/MLOps evidence, while the future VersoVector Platform remains outside the frozen scope.",
    "repository": "https://github.com/HubertRonald/VersoVector",
    "documentation": "/technical-docs/versovector/",
    "release": "https://github.com/HubertRonald/VersoVector/releases/tag/v0.9.0-atlas-readiness-remediation",
    "stages": [
      "ML / NLP & MLOps",
      "Cloud Data Architecture"
    ],
    "evidence": [
      "supervised ML/NLP",
      "unsupervised semantic analysis",
      "reproducible training",
      "model artifacts and inference package",
      "FastAPI",
      "Gradio",
      "tests",
      "Docker/Compose",
      "optional MLflow",
      "sanitized cloud deployment blueprint"
    ],
    "notSupported": [
      "current production deployment",
      "future VersoVector Platform capabilities"
    ],
    "contributionBoundary": "Individual portfolio project; primary-author evidence is preserved.",
    "statusNote": "Local execution / blueprint evidence; no current production deployment.",
    "releaseScope": null,
    "acceptedLimitations": [
      "No current production deployment is claimed.",
      "Cloud deployment is a sanitized blueprint unless separately frozen as deployed."
    ]
  },
  "MIAD-RAG-RealEstate": {
    "id": "MIAD-RAG-RealEstate",
    "name": "MIAD-RAG-RealEstate",
    "tagline": "Academic team RAG project with an individually evidenced 2026 GCP modernization.",
    "summary": "An academic group real-estate RAG project combining FAISS retrieval and Gemini generation. Atlas preserves the team outcome separately from the individually evidenced GCP modernization across backend/indexer/frontend integration, BigQuery, Cloud Storage, Cloud Run, Terraform, IAM and CI/CD.",
    "repository": "https://github.com/HubertRonald/MIAD-RAG-RealEstate",
    "documentation": null,
    "release": null,
    "stages": [
      "Cloud Data Architecture",
      "AI-native Products & Platforms"
    ],
    "evidence": [
      "RAG architecture",
      "FAISS retrieval",
      "Gemini generation/embeddings",
      "FastAPI",
      "Streamlit",
      "BigQuery",
      "Cloud Storage",
      "Cloud Run",
      "Terraform",
      "IAM",
      "Secret Manager",
      "Artifact Registry",
      "IAP"
    ],
    "notSupported": [
      "sole authorship",
      "verified final RAGAS metric without frozen evidence",
      "current live application"
    ],
    "contributionBoundary": "Original academic outcome is team work; 2026 GCP modernization and integration are individually evidenced.",
    "statusNote": "Historical/project deployment evidence exists; current live application is not frozen as verified.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Exact academic start/end dates are not fully recovered.",
      "Final RAGAS results and current-live status must remain evidence-gated."
    ]
  },
  "RetainAI": {
    "id": "RetainAI",
    "name": "RetainAI",
    "tagline": "Release-scoped AI-native decision-intelligence product evidence.",
    "summary": "RetainAI is frozen strictly at release v0.4.0-alpha.1 as AI-native product and decision-intelligence evidence. Later roadmap work—including later RAG, AI Advisor, Gemini/Bedrock runtime, drift monitoring and automated retraining ideas—is outside this freeze.",
    "repository": "https://github.com/HubertRonald/RetainAI",
    "documentation": "/retainai/",
    "release": "https://github.com/HubertRonald/RetainAI/releases/tag/v0.4.0-alpha.1",
    "stages": [
      "ML / NLP & MLOps",
      "AI-native Products & Platforms"
    ],
    "evidence": [
      "AI-native product framing",
      "decision intelligence",
      "responsible deployment framing",
      "release-scoped reproducible evidence"
    ],
    "notSupported": [
      "post-v0.4.0-alpha.1 roadmap capabilities",
      "autonomous employment decisions",
      "causal explanation claims",
      "unverified fairness or performance metrics"
    ],
    "contributionBoundary": "Frozen release contribution boundary only; no later roadmap is absorbed.",
    "statusNote": "Release-scoped evidence; current-live status not inferred.",
    "releaseScope": "v0.4.0-alpha.1",
    "acceptedLimitations": [
      "Freeze is intentionally release-scoped to v0.4.0-alpha.1.",
      "Current live endpoints are not evidence of the frozen release unless release-pinned."
    ]
  },
  "AI-CLI-Cloud": {
    "id": "AI-CLI-Cloud",
    "name": "AI-CLI-Cloud",
    "tagline": "Pre-release developer-enablement foundation for AI CLI and cloud tooling in a reproducible workspace.",
    "summary": "AI-CLI-Cloud is frozen at the published v0.1.0 pre-release foundation: Dev Container workspace, AI CLI installation flow, cloud tooling and credential-aware boundaries. Formal full runtime, cross-platform and history-aware security validation remain accepted G1 limitations.",
    "repository": "https://github.com/HubertRonald/AI-CLI-Cloud",
    "documentation": null,
    "release": "https://github.com/HubertRonald/AI-CLI-Cloud/releases/tag/v0.1.0",
    "stages": [
      "Reproducible Development Environments",
      "Cloud Data Architecture",
      "AI-native Products & Platforms"
    ],
    "evidence": [
      "Dev Container foundation",
      "AI CLI installation flow",
      "AWS CLI",
      "Google Cloud CLI",
      "GitHub CLI",
      "Docker CLI",
      "Terraform",
      "credential-aware mounts"
    ],
    "notSupported": [
      "universally validated cross-platform environment",
      "fully validated cloud authentication matrix",
      "production platform"
    ],
    "contributionBoundary": "Developer-enablement foundation; no cloud resources are implied as deployed by the repository.",
    "statusNote": "Developer workstation foundation, not a production platform.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Formal full runtime validation incomplete.",
      "Cross-platform validation incomplete.",
      "History-aware security validation incomplete."
    ]
  },
  "AppMarkowitz": {
    "id": "AppMarkowitz",
    "name": "AppMarkowitz",
    "tagline": "Mean-variance portfolio analysis with constrained optimization and a reproducible validation path.",
    "summary": "A later reproducible applied-mathematics project demonstrating logarithmic returns, covariance modeling, portfolio sampling, constrained optimization and efficient-frontier analysis. It remains distinct from ModeloMarkowitz: the relationship is conceptual antecedent only, not shared history or dependency.",
    "repository": "https://github.com/HubertRonald/AppMarkowitz",
    "documentation": null,
    "release": null,
    "stages": [
      "Applied Mathematics, Simulation & Data Science"
    ],
    "evidence": [
      "applied portfolio mathematics",
      "constrained optimization",
      "efficient frontier",
      "reproducible validation",
      "local CLI"
    ],
    "notSupported": [
      "production trading system",
      "investment-performance guarantee",
      "same codebase as ModeloMarkowitz",
      "direct dependency on ModeloMarkowitz",
      "continuous Git history with ModeloMarkowitz"
    ],
    "contributionBoundary": "Individual applied-mathematics project; ModeloMarkowitz is only a conceptual antecedent.",
    "statusNote": "No live application.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Evaluation remains educational/in-sample.",
      "No transaction costs, slippage, taxes or production execution are modeled."
    ]
  },
  "LegacyBigDataLab": {
    "id": "LegacyBigDataLab",
    "name": "LegacyBigDataLab",
    "tagline": "Sanitized 2026 reconstruction of a historical distributed-data laboratory.",
    "summary": "LegacyBigDataLab preserves evidence of a 2023 Hadoop/Hive/Sqoop-oriented data laboratory through a 2026 sanitized public reconstruction. Original historical Git metadata, private/real data and infrastructure details are not redistributed; synthetic fixtures and reconstruction validation are kept separate from the historical runtime.",
    "repository": "https://github.com/HubertRonald/LegacyBigDataLab",
    "documentation": null,
    "release": null,
    "stages": [
      "Distributed Data Systems"
    ],
    "evidence": [
      "Hadoop ecosystem",
      "Hive",
      "Impala",
      "Sqoop",
      "Kerberos",
      "Docker",
      "historical distributed ingestion flow",
      "sanitized synthetic reconstruction"
    ],
    "notSupported": [
      "2026 public Git as original historical Git",
      "verified original cluster scale",
      "verified original performance results",
      "modern production deployment"
    ],
    "contributionBoundary": "2026 reconstruction curation is individually attributable; historical file-level operator/authorship is not fully preserved.",
    "statusNote": "Historical runtime/configuration evidence; 2026 reconstruction validation is not the original runtime.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Public repository is a 2026 sanitized reconstruction, not original Git history.",
      "Historical runtime was not reproduced.",
      "Original cluster topology/performance are not preserved.",
      "Custom historical source with unresolved rights was excluded."
    ]
  },
  "relationalstats": {
    "id": "relationalstats",
    "name": "relationalstats",
    "tagline": "Python toolkit for statistical social-network analysis with explicit approximation boundaries.",
    "summary": "A 2026 alpha Python package implementing network link prediction, QAP and documented ERGM/STERGM approximation workflows. It is strategic modern statistical software evidence, not proof of earlier historical R roots.",
    "repository": "https://github.com/HubertRonald/relationalstats",
    "documentation": "/technical-docs/relationalstats/",
    "release": null,
    "stages": [
      "Applied Mathematics, Simulation & Data Science"
    ],
    "evidence": [
      "network link prediction",
      "QAP logistic workflow",
      "ERGM dyadic-logistic approximation",
      "STERGM separable approximation",
      "Python package engineering"
    ],
    "notSupported": [
      "full MCMC-MLE equivalence to the R ergm ecosystem",
      "historical R implementation",
      "pre-2026 repository-backed history"
    ],
    "contributionBoundary": "Public 2026 repository contribution; LICENSE-holder alias equivalence is not inferred.",
    "statusNote": "Package/library evidence, not deployment.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Alpha-stage package.",
      "ERGM/STERGM functions are explicitly approximations rather than full ecosystem equivalence."
    ]
  },
  "GenderMovieClassification": {
    "id": "GenderMovieClassification",
    "name": "Movie Genre Classification — Historical ML + Serverless Extension",
    "tagline": "Historical multilabel movie-genre ML project with a separately bounded AWS serverless extension.",
    "summary": "The repository name is preserved as GenderMovieClassification while the canonical presentation corrects the task to movie genre classification. Atlas retains collaborative academic modeling evidence and a separately bounded individual AWS serverless extension; historical deployment does not imply a current live endpoint.",
    "repository": "https://github.com/HubertRonald/GenderMovieClassification",
    "documentation": null,
    "release": null,
    "stages": [
      "ML / NLP & MLOps"
    ],
    "evidence": [
      "multilabel text classification",
      "historical ML pipeline",
      "serialized inference artifact",
      "AWS Lambda/API Gateway serverless extension"
    ],
    "notSupported": [
      "gender classification task",
      "sole authorship of collaborative academic modeling",
      "current live deployment"
    ],
    "contributionBoundary": "Collaborative academic modeling is separated from the later individual AWS serverless extension.",
    "statusNote": "Historical serverless deployment evidence only.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Historical model/runtime constraints remain.",
      "Historical deployment is not current-live evidence."
    ]
  },
  "HackDayIAMindsInsuranceCarrier": {
    "id": "HackDayIAMindsInsuranceCarrier",
    "name": "HackDayIAMindsInsuranceCarrier",
    "tagline": "Cloud/AI hackathon prototype retained with live-runtime and historical-branch limitations.",
    "summary": "A strategic cloud/AI prototype whose final public main state is frozen after remediation. A historical non-main dev branch retains obsolete conflict-marked material; current active Gemini/Cloud Run/production deployment was not reverified and is not claimed.",
    "repository": "https://github.com/HubertRonald/HackDayIAMindsInsuranceCarrier",
    "documentation": null,
    "release": null,
    "stages": [
      "Cloud Data Architecture",
      "AI-native Products & Platforms"
    ],
    "evidence": [
      "cloud/AI prototype",
      "public main remediation state",
      "historical deployment architecture evidence"
    ],
    "notSupported": [
      "current active production deployment",
      "current active Gemini runtime",
      "current active Cloud Run runtime"
    ],
    "contributionBoundary": "Preserve the final handoff contribution boundary; repository ownership is not sole project authorship.",
    "statusNote": "Historical/project runtime evidence only; current active runtime unverified.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Historical non-main dev branch retains obsolete conflict-marked workflow material.",
      "Current live deployment/full cloud runtime was not reverified.",
      "Historical frontend audit warning remains accepted."
    ]
  },
  "LuaSF": {
    "id": "LuaSF",
    "name": "LuaSF",
    "tagline": "Pure-Lua statistics library preserving historical library engineering and later package/community evolution.",
    "summary": "LuaSF preserves 2017–2018 Lua statistics/probability library engineering, later outside contribution and compatibility maintenance, and a 2026 LuaRocks revival. The README's earlier-origin statement is kept separate from commit-backed public history.",
    "repository": "https://github.com/HubertRonald/LuaSF",
    "documentation": "/technical-docs/luasf/",
    "release": null,
    "stages": [
      "Creative Software & Product Instinct"
    ],
    "evidence": [
      "Lua statistics/probability library",
      "LuaRocks distribution",
      "backward compatibility",
      "outside contributor history"
    ],
    "notSupported": [
      "repository-backed 2014 start date",
      "machine-learning framework",
      "optimization library",
      "full statistical inference suite"
    ],
    "contributionBoundary": "HubertRonald is creator/maintainer; sharpobject has verified merged fixes; proposal/feedback contributors are not reclassified as code co-authors.",
    "statusNote": "Library/package distribution, not deployment.",
    "releaseScope": null,
    "acceptedLimitations": [
      "README suggests an earlier origin, but preserved public Git inspected begins in 2017.",
      "Scope remains intentionally lightweight."
    ]
  },
  "MIAD-ANS-ENV": {
    "id": "MIAD-ANS-ENV",
    "name": "MIAD-ANS-ENV",
    "tagline": "Historical reproducible analytics environment with a separately documented 2026 validation.",
    "summary": "A historical geospatial/data-science development environment built around Docker, Dev Containers, Jupyter and explicit dependency management. Atlas separates the original work from the 2026 reconstruction/validation and accepts the EOL Python/Debian runtime as a limitation.",
    "repository": "https://github.com/HubertRonald/MIAD-ANS-ENV",
    "documentation": null,
    "release": null,
    "stages": [
      "Reproducible Development Environments"
    ],
    "evidence": [
      "Docker/Dev Container analytics environment",
      "Jupyter",
      "geospatial Python stack",
      "2026 reproducibility validation"
    ],
    "notSupported": [
      "production deployment",
      "modern supported runtime",
      "2026 validation as original historical execution"
    ],
    "contributionBoundary": "Historical individual repository work plus separate 2026 remediation/validation.",
    "statusNote": "Developer/analytics environment, not production deployment.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Python 3.7 and Debian Buster-era runtime are EOL.",
      "2026 validation is separate from the original work."
    ]
  },
  "MIAD-DSA-2515-M35-MLflow": {
    "id": "MIAD-DSA-2515-M35-MLflow",
    "name": "MIAD-DSA-2515-M35-MLflow",
    "tagline": "Academic MLflow experiment-tracking evidence with explicit production boundaries.",
    "summary": "This project demonstrates MLflow experiment tracking, logging and comparison in an academic context, while separating shared source material from later individual continuation. It is retained as focused MLOps evidence rather than a claim of production registry, serving or CI/CD.",
    "repository": "https://github.com/HubertRonald/MIAD-DSA-2515-M35-MLflow",
    "documentation": null,
    "release": null,
    "stages": [
      "ML / NLP & MLOps"
    ],
    "evidence": [
      "MLflow tracking",
      "experiment logging",
      "run comparison"
    ],
    "notSupported": [
      "production Model Registry",
      "production model serving",
      "production CI/CD"
    ],
    "contributionBoundary": "Shared academic source is separated from later individual continuation.",
    "statusNote": "No production serving claim.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Shared academic-source attribution must remain separate from later individual continuation."
    ]
  },
  "PentahoPostgreSQLETLLab": {
    "id": "PentahoPostgreSQLETLLab",
    "name": "PentahoPostgreSQLETLLab",
    "tagline": "Historical ETL laboratory combining Pentaho and PostgreSQL with an explicit third-party subtree boundary.",
    "summary": "PentahoPostgreSQLETLLab is retained as historical data-integration/ETL evidence. The bundled build/docker-pentaho-server subtree and upstream server artifacts retain separate attribution and licensing and must not be attributed to HubertRonald.",
    "repository": "https://github.com/HubertRonald/PentahoPostgreSQLETLLab",
    "documentation": null,
    "release": null,
    "stages": [
      "Reproducible Development Environments"
    ],
    "evidence": [
      "ETL/data integration laboratory",
      "PostgreSQL",
      "Pentaho tooling",
      "containerized local environment"
    ],
    "notSupported": [
      "authorship of bundled upstream server artifacts",
      "ownership of build/docker-pentaho-server upstream material",
      "production ETL platform"
    ],
    "contributionBoundary": "Project-level work is separated from the attributed third-party docker-pentaho-server subtree.",
    "statusNote": "Historical/local laboratory; no production claim.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Third-party build/docker-pentaho-server subtree retains separate attribution/license boundary."
    ]
  },
  "PostgreSQLPgAdmin": {
    "id": "PostgreSQLPgAdmin",
    "name": "PostgreSQLPgAdmin",
    "tagline": "Local reproducible PostgreSQL and pgAdmin environment preserved with a historical credential boundary.",
    "summary": "A reproducible local PostgreSQL + pgAdmin environment retained as developer/data-platform evidence. The current tree is sanitized, while historical credentials in preserved Git history remain an accepted limitation; the environment is not classified as production-suitable.",
    "repository": "https://github.com/HubertRonald/PostgreSQLPgAdmin",
    "documentation": null,
    "release": null,
    "stages": [
      "Reproducible Development Environments"
    ],
    "evidence": [
      "PostgreSQL",
      "pgAdmin",
      "local reproducible database environment",
      "containerized developer workflow"
    ],
    "notSupported": [
      "production-suitable database platform",
      "absence of historical credentials from preserved history"
    ],
    "contributionBoundary": "Repository contribution as documented by the final handoff.",
    "statusNote": "Local environment only.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Historical credentials existed in preserved Git history.",
      "production_suitable is false."
    ]
  },
  "SparkWork": {
    "id": "SparkWork",
    "name": "SparkWork",
    "tagline": "Local reproducible PySpark environment demonstrating DataFrame and Spark SQL workflows.",
    "summary": "SparkWork preserves PySpark, DataFrame and Spark SQL practice in a reproducible local Spark environment. Its Atlas boundary is deliberately local: it is not evidence of a multi-node distributed cluster.",
    "repository": "https://github.com/HubertRonald/SparkWork",
    "documentation": null,
    "release": null,
    "stages": [
      "Reproducible Development Environments",
      "Distributed Data Systems"
    ],
    "evidence": [
      "PySpark",
      "Spark DataFrame",
      "Spark SQL",
      "local reproducible Spark execution"
    ],
    "notSupported": [
      "multi-node distributed cluster",
      "production Spark platform"
    ],
    "contributionBoundary": "Repository contribution as documented by the final handoff.",
    "statusNote": "Local Spark execution only.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Execution is local/reproducible rather than a verified multi-node cluster."
    ]
  },
  "VehiclePricePrediction": {
    "id": "VehiclePricePrediction",
    "name": "VehiclePricePrediction",
    "tagline": "Historical supervised-regression and serverless-serving evidence for vehicle price prediction.",
    "summary": "A historical ML project combining mixed-type preprocessing, a stacking regression pipeline, model serialization and an AWS serverless serving path. Atlas preserves only source-supported metrics and does not reinterpret an empty GridSearch parameter grid as hyperparameter optimization.",
    "repository": "https://github.com/HubertRonald/VehiclePricePrediction",
    "documentation": null,
    "release": null,
    "stages": [
      "ML / NLP & MLOps"
    ],
    "evidence": [
      "supervised regression",
      "mixed-type preprocessing",
      "stacking ensemble",
      "model serialization",
      "AWS Lambda/API Gateway serving architecture"
    ],
    "notSupported": [
      "hyperparameter optimization from an empty GridSearch param_grid",
      "current live service",
      "production-grade model serving"
    ],
    "contributionBoundary": "Use the latest project handoff for exact contribution wording; do not infer beyond it.",
    "statusNote": "Historical/serverless evidence; current-live status not claimed.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Exact chronology fields were not recovered into the Global Freeze input set.",
      "Only verified metrics may be quoted downstream."
    ]
  },
  "clcR": {
    "id": "clcR",
    "name": "clcR",
    "tagline": "Small R utility bringing a clc-style console-clearing idiom to RStudio and terminal workflows.",
    "summary": "A compact historical R utility associated with a public knowledge-sharing explanation, translating MATLAB/Octave interaction habits into R/RStudio. It is retained as community/language-root evidence, not as an R package.",
    "repository": "https://github.com/HubertRonald/clcR",
    "documentation": null,
    "release": null,
    "stages": [
      "Applied Mathematics, Simulation & Data Science"
    ],
    "evidence": [
      "R console-clear utility",
      "RStudio interaction",
      "community knowledge sharing",
      "MATLAB/Octave clc inspiration"
    ],
    "notSupported": [
      "R package",
      "CRAN publication",
      "cross-platform guarantee",
      "R framework"
    ],
    "contributionBoundary": "Visible public repository author; no broader sole-authorship claim is made.",
    "statusNote": "Utility only.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Not structured as an R package.",
      "No CRAN publication evidence.",
      "Cross-platform behavior was not broadly validated."
    ]
  },
  "ModeloMarkowitz": {
    "id": "ModeloMarkowitz",
    "name": "ModeloMarkowitz",
    "tagline": "Historical community example of Markowitz portfolio mathematics with an explicitly bounded CVXOPT provenance chain.",
    "summary": "A 2020 educational/community Markowitz implementation covering returns, covariance, simulated portfolios, Sharpe comparison and a CVXOPT-based efficient frontier. Final provenance remediation documents the CVXOPT Risk-return attribution, mixed GPL/MIT boundary and external stocks.csv input contract without reconstructing the historical dataset.",
    "repository": "https://github.com/HubertRonald/ModeloMarkowitz",
    "documentation": null,
    "release": null,
    "stages": [
      "Applied Mathematics, Simulation & Data Science"
    ],
    "evidence": [
      "Markowitz mean-variance analysis",
      "simulated portfolios",
      "Sharpe comparison",
      "CVXOPT efficient frontier",
      "community explanation"
    ],
    "notSupported": [
      "production trading system",
      "recovered original stocks.csv",
      "same codebase as AppMarkowitz",
      "direct dependency on AppMarkowitz",
      "continuous Git history with AppMarkowitz"
    ],
    "contributionBoundary": "Repository author is visible; adapted CVXOPT example code is explicitly attributed and separately licensed.",
    "statusNote": "Educational/community example.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Exact historical CVXOPT version remains unresolved.",
      "Historical stocks.csv was not recovered or redistributed.",
      "Historical dataset redistribution rights remain unresolved.",
      "Full historical execution against the original dataset was not performed."
    ]
  },
  "AzureCLI": {
    "id": "AzureCLI",
    "name": "AzureCLI",
    "tagline": "Containerized Azure CLI environment retained as historical cloud-tooling evidence.",
    "summary": "A compact 2023 developer-enablement utility for running Azure CLI through Docker Compose with selected extensions and host-mounted state. It evidences local/containerized Azure CLI tooling, not Azure architecture or a verified cloud deployment.",
    "repository": "https://github.com/HubertRonald/AzureCLI",
    "documentation": null,
    "release": null,
    "stages": [
      "Reproducible Development Environments"
    ],
    "evidence": [
      "containerized Azure CLI",
      "selected CLI extensions",
      "Docker Compose developer workflow"
    ],
    "notSupported": [
      "Azure cloud architecture",
      "verified Azure resource provisioning",
      "verified cloud deployment",
      "current live Azure infrastructure"
    ],
    "contributionBoundary": "Visible commit history uses Ronald Mendoza; broader identity equivalence is not inferred from names alone.",
    "statusNote": "Configured local tooling; no deployment evidence.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Runtime was not revalidated in 2026.",
      "Identity-equivalence details in rendered Git history remain unresolved."
    ]
  },
  "RenameFiles": {
    "id": "RenameFiles",
    "name": "RenameFiles",
    "tagline": "Dependency-free CLI for structured screenshot renaming with dry-run preview.",
    "summary": "A small Python filesystem utility built for predictable sequential renaming in notes/README/notebook workflows. It is retained as pragmatic historical automation with explicit limitations around collision handling, ordering and rollback.",
    "repository": "https://github.com/HubertRonald/RenameFiles",
    "documentation": null,
    "release": null,
    "stages": [
      "Reproducible Development Environments"
    ],
    "evidence": [
      "CLI argument parsing",
      "file filtering",
      "sequential rename",
      "dry-run preview"
    ],
    "notSupported": [
      "recursive renaming",
      "collision-safe transactional renaming",
      "deterministic ordering across filesystems",
      "rollback system"
    ],
    "contributionBoundary": "Visible repository contribution; sample images and generated .gitignore retain separate provenance.",
    "statusNote": "Local utility only.",
    "releaseScope": null,
    "acceptedLimitations": [
      "No collision preflight.",
      "No recursive mode.",
      "No deterministic sort.",
      "No rollback."
    ]
  },
  "TemplateDockerDjango": {
    "id": "TemplateDockerDjango",
    "name": "TemplateDockerDjango",
    "tagline": "Docker/Django template for reproducible host-container development workflows.",
    "summary": "A 2023 guide/application skeleton showing how a generated Django project can be developed through Docker Compose volume mapping while remaining editable on the host. It is historical environment evidence, not a production Django application.",
    "repository": "https://github.com/HubertRonald/TemplateDockerDjango",
    "documentation": null,
    "release": null,
    "stages": [
      "Reproducible Development Environments"
    ],
    "evidence": [
      "Django bootstrap workflow",
      "host/container volume mapping",
      "Docker Compose development environment"
    ],
    "notSupported": [
      "production Django application",
      "production deployment",
      "database-backed application",
      "CI/CD"
    ],
    "contributionBoundary": "Repository guide/workflow contribution is separated from framework-generated Django boilerplate.",
    "statusNote": "Development template only.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Generated Django application boilerplate is intentionally not treated as original custom implementation.",
      "Runtime was not revalidated in 2026."
    ]
  },
  "liasoft-site": {
    "id": "liasoft-site",
    "name": "Liasoft",
    "tagline": "Creative software origins preserved through a lightweight 2026 public archive.",
    "summary": "Liasoft is the Creative Roots narrative anchor. The liasoft-site repository is a 2026 preservation/publishing layer that curates earlier games and creative experiments; repository chronology is not treated as the brand's start date or as proof that all linked code/assets live inside this repository.",
    "repository": "https://github.com/HubertRonald/liasoft-site",
    "documentation": "https://liasoft.hubertronald.dev/",
    "release": null,
    "stages": [
      "Creative Software & Product Instinct"
    ],
    "evidence": [
      "creative identity/archive context",
      "legacy game catalogue",
      "Gideros/visual experiment links",
      "creative software narrative anchor"
    ],
    "notSupported": [
      "liasoft-site is the original historical Liasoft implementation",
      "Liasoft began in 2026",
      "liasoft-site contains all historical games/source",
      "sole ownership of every historical asset"
    ],
    "contributionBoundary": "Authorship applies to the current archive/site customizations and copy, not every linked game, asset or third-party frontend component.",
    "statusNote": "Static archive/context site; not a live application claim.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Repository history begins in 2026 and is not the brand start date.",
      "Image-by-image historical asset provenance is not fully resolved.",
      "Third-party generated frontend components retain separate terms."
    ]
  },
  "GradientMesh": {
    "id": "GradientMesh",
    "name": "GradientMesh",
    "tagline": "Historical Lua/Gideros gradient-mesh experiment demonstrating geometry and color interpolation.",
    "summary": "GradientMesh preserves 2017–2018 graphics programming around procedural meshes, vertex/color interpolation and multiple gradient forms, with a separate 2026 documentation/provenance refresh. Limited provenance for some historical demonstration assets is accepted and explicitly separated from source-code licensing.",
    "repository": "https://github.com/HubertRonald/GradientMesh",
    "documentation": "/technical-docs/gradientmesh/",
    "release": null,
    "stages": [
      "Creative Software & Product Instinct"
    ],
    "evidence": [
      "procedural mesh generation",
      "geometry/interpolation",
      "color interpolation",
      "Lua/Gideros creative computation"
    ],
    "notSupported": [
      "machine learning",
      "simulation engine",
      "production graphics engine",
      "blanket ownership of limited-provenance visual assets"
    ],
    "contributionBoundary": "Historical source contribution separated from external tutorials/resources and limited-provenance assets.",
    "statusNote": "Historical graphics experiment.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Some retained historical demonstration assets have incomplete upstream provenance.",
      "Historical runtime was not reproduced."
    ]
  },
  "GiderosScalesTest": {
    "id": "GiderosScalesTest",
    "name": "GiderosScalesTest",
    "tagline": "Historical Gideros experiment in logical screen dimensions, letterbox scaling and device adaptation.",
    "summary": "A small Lua/Gideros visual harness preserving early work with logical dimensions, scale modes and mobile device adaptation. Expected PNG runtime assets are incomplete in the current tree and are accepted as a historical limitation; no rebuild is required.",
    "repository": "https://github.com/HubertRonald/GiderosScalesTest",
    "documentation": null,
    "release": null,
    "stages": [
      "Creative Software & Product Instinct"
    ],
    "evidence": [
      "logical dimensions",
      "portrait orientation",
      "letterbox scaling",
      "mobile/UI adaptation"
    ],
    "notSupported": [
      "automated test suite",
      "production UI framework",
      "complete runtime asset set"
    ],
    "contributionBoundary": "Visible history is owner-authored; no broader originality forensic claim is made.",
    "statusNote": "Historical visual test harness.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Expected historical PNG runtime assets are absent.",
      "Runtime was not reproduced.",
      "No explicit reusable repository license was verified in CUR-C."
    ]
  },
  "Clock_Ellipse": {
    "id": "Clock_Ellipse",
    "name": "Clock_Ellipse",
    "tagline": "Compact Gideros ellipse-and-needle animation driven by trigonometry.",
    "summary": "A preserved 2014 Lua/Gideros sample showing parametric ellipse geometry, Shape rendering and frame-driven animation. It is Creative Roots evidence of mathematical graphics, not a real wall clock or a mathematical simulation.",
    "repository": "https://github.com/HubertRonald/Clock_Ellipse",
    "documentation": null,
    "release": null,
    "stages": [
      "Creative Software & Product Instinct"
    ],
    "evidence": [
      "parametric ellipse",
      "sin/cos/radian conversion",
      "Gideros Shape rendering",
      "frame-driven animation"
    ],
    "notSupported": [
      "real-time wall clock",
      "mathematical simulation",
      "production graphics engine"
    ],
    "contributionBoundary": "README creator credit separated from external mathematical reference.",
    "statusNote": "Historical graphics sample.",
    "releaseScope": null,
    "acceptedLimitations": [
      "Runtime was not reproduced.",
      "License text is custom/non-SPDX historical permission."
    ]
  }
}

export const portfolioRoles = {
  "featured": [
    "VersoVector",
    "MIAD-RAG-RealEstate",
    "RetainAI"
  ],
  "primary": [
    "AI-CLI-Cloud",
    "AppMarkowitz",
    "LegacyBigDataLab",
    "relationalstats"
  ],
  "supporting": [
    "GenderMovieClassification",
    "HackDayIAMindsInsuranceCarrier"
  ],
  "journeyEvidence": [
    "LuaSF",
    "MIAD-ANS-ENV",
    "MIAD-DSA-2515-M35-MLflow",
    "PentahoPostgreSQLETLLab",
    "PostgreSQLPgAdmin",
    "SparkWork",
    "VehiclePricePrediction"
  ],
  "community": [
    "clcR",
    "ModeloMarkowitz"
  ],
  "historical": [
    "AzureCLI",
    "RenameFiles",
    "TemplateDockerDjango"
  ],
  "creative": [
    "liasoft-site",
    "GradientMesh",
    "GiderosScalesTest",
    "Clock_Ellipse"
  ]
} as const

export const journeyStages: JourneyStage[] = [
  {
    "number": "01",
    "id": "stage-01",
    "name": "Creative Software & Product Instinct",
    "primary": [
      "liasoft-site"
    ],
    "supporting": [
      "GradientMesh",
      "GiderosScalesTest",
      "Clock_Ellipse"
    ],
    "bridge": [
      "LuaSF"
    ],
    "boundary": "Liasoft is the creative-origin anchor; the 2026 site is a preservation layer and does not absorb the technical or authorship claims of linked projects."
  },
  {
    "number": "02",
    "id": "stage-02",
    "name": "Applied Mathematics, Simulation & Data Science",
    "primary": [
      "AppMarkowitz",
      "relationalstats"
    ],
    "supporting": [
      "ModeloMarkowitz",
      "clcR"
    ],
    "bridge": [],
    "boundary": "AppMarkowitz and ModeloMarkowitz are separate projects connected only as a conceptual antecedent; relationalstats is 2026 Python network-statistical software, not proof of older R roots."
  },
  {
    "number": "03",
    "id": "stage-03",
    "name": "Reproducible Development Environments",
    "primary": [
      "MIAD-ANS-ENV",
      "AI-CLI-Cloud"
    ],
    "supporting": [
      "PostgreSQLPgAdmin",
      "SparkWork",
      "TemplateDockerDjango"
    ],
    "bridge": [],
    "boundary": "EOL or local-only environments remain valid historical evidence; local reproducibility is not promoted into production or universal cross-platform claims."
  },
  {
    "number": "04",
    "id": "stage-04",
    "name": "Distributed Data Systems",
    "primary": [
      "LegacyBigDataLab"
    ],
    "supporting": [
      "SparkWork"
    ],
    "bridge": [],
    "boundary": "LegacyBigDataLab is a 2026 sanitized reconstruction of historical evidence, not original Git history. SparkWork is local Spark and is not multi-node-cluster evidence."
  },
  {
    "number": "05",
    "id": "stage-05",
    "name": "Cloud Data Architecture",
    "primary": [
      "MIAD-RAG-RealEstate"
    ],
    "supporting": [
      "HackDayIAMindsInsuranceCarrier",
      "AI-CLI-Cloud",
      "VersoVector"
    ],
    "bridge": [],
    "boundary": "Tooling and blueprints are not equivalent to a currently deployed architecture; current-live claims remain evidence-gated."
  },
  {
    "number": "06",
    "id": "stage-06",
    "name": "ML / NLP & MLOps",
    "primary": [
      "VersoVector"
    ],
    "supporting": [
      "GenderMovieClassification",
      "VehiclePricePrediction",
      "MIAD-DSA-2515-M35-MLflow",
      "RetainAI"
    ],
    "bridge": [],
    "boundary": "Historical deployment, empty search grids and experiment tracking do not become production-serving or optimization claims."
  },
  {
    "number": "07",
    "id": "stage-07",
    "name": "AI-native Products & Platforms",
    "primary": [
      "RetainAI",
      "MIAD-RAG-RealEstate"
    ],
    "supporting": [
      "HackDayIAMindsInsuranceCarrier"
    ],
    "bridge": [
      "AI-CLI-Cloud"
    ],
    "boundary": "RetainAI is release-locked to v0.4.0-alpha.1; no later roadmap capabilities enter the frozen evidence model. Current live runtimes are not inferred."
  }
]

export const archiveRecords = [
  {
    "project_id": "FoulJob",
    "repository": "https://github.com/HubertRonald/FoulJob",
    "canonical_name": "FoulJob",
    "atlas_class": "archive",
    "representation": "archive_entry",
    "reason": "Archived because third-party game/media asset provenance debt is unresolved and the Builder Journey remains sufficient without it.",
    "gate_class": "G2",
    "known_debt": [
      "Third-party game/media asset provenance and redistribution boundary incomplete."
    ],
    "future_promotion_requires_review": true
  },
  {
    "project_id": "LuaHMF",
    "repository": "https://github.com/HubertRonald/LuaHMF",
    "canonical_name": "LuaHMF",
    "atlas_class": "archive",
    "representation": "archive_entry",
    "reason": "Archived as a minor Lua math utility because stronger Lua library evidence exists and the credited 'paulogp - Initial work' boundary remains unresolved.",
    "gate_class": "G2",
    "known_debt": [
      "Initial-work provenance/license boundary unresolved; do not claim sole original authorship."
    ],
    "future_promotion_requires_review": true
  },
  {
    "project_id": "ProceduralCave",
    "repository": "https://github.com/HubertRonald/ProceduralCave",
    "canonical_name": "ProceduralCave",
    "atlas_class": "archive",
    "representation": "archive_entry",
    "reason": "Archived because the adapted upstream code licensing/permission chain remains unresolved; procedural generation is not required for the minimum Builder Journey.",
    "gate_class": "G2",
    "known_debt": [
      "Exact upstream adapted-code licensing chain unresolved.",
      "tile.png provenance unresolved."
    ],
    "future_promotion_requires_review": true
  },
  {
    "project_id": "RepData_PeerAssessment1",
    "repository": "https://github.com/HubertRonald/RepData_PeerAssessment1",
    "canonical_name": "RepData_PeerAssessment1",
    "atlas_class": "archive",
    "representation": "archive_entry",
    "reason": "Archived coursework with useful reproducible-report context but insufficient distinctiveness for the main Atlas.",
    "gate_class": "G2",
    "known_debt": [
      "Coursework/starter-material boundary.",
      "Independent dataset terms not fully verified.",
      "Exact owner-authored line-level diff not reconstructed."
    ],
    "future_promotion_requires_review": true
  },
  {
    "project_id": "tiny_etl_mock_data",
    "repository": "https://github.com/HubertRonald/tiny_etl_mock_data",
    "canonical_name": "tiny_etl_mock_data",
    "atlas_class": "archive",
    "representation": "archive_entry",
    "reason": "Authentic but redundant mock/synthetic file-based data-preparation utility; stronger data-engineering evidence exists in Atlas.",
    "gate_class": "G2",
    "known_debt": [
      "Scope is a mock/synthetic preparation utility, not an end-to-end warehouse pipeline."
    ],
    "future_promotion_requires_review": true
  }
] as const

export const atlasSections = [
  ['featured', 'Featured'],
  ['primary-evidence', 'Primary Evidence'],
  ['supporting-evidence', 'Supporting Evidence'],
  ['journey-evidence', 'Journey Evidence'],
  ['community', 'Community'],
  ['creative-roots', 'Creative Roots'],
  ['historical-foundations', 'Historical Foundations'],
  ['archive-gateway', 'Archive Gateway']
] as const

export const featuredPresentation = {
  VersoVector: { family: 'ML / NLP / MLOps depth', variant: 'technical-dossier', cta: 'Technical Docs' },
  'MIAD-RAG-RealEstate': { family: 'RAG + cloud + full-stack AI delivery', variant: 'architecture-boundary', cta: 'Project Profile' },
  RetainAI: { family: 'AI-native product / decision intelligence', variant: 'release-system', cta: 'Technical Docs' }
} as const

export const homeFeaturedCopy = {
  en: {
    common: {
      technicalDocs: 'Technical Docs',
      projectProfile: 'Project Profile',
      repository: 'Repository'
    },
    projects: {
      VersoVector: {
        family: 'ML / NLP / MLOps depth',
        tagline: 'Emotional-semantic NLP and local MLOps system with packaged inference and a sanitized cloud blueprint.',
        facts: ['supervised ML/NLP', 'unsupervised semantic analysis', 'reproducible training', 'model artifacts and inference package'],
        evidencePath: 'Evidence path',
        flow: ['Train', 'Package', 'Infer'],
        terminal: 'Local serving + API boundary',
        status: 'Local execution / blueprint evidence; no current production deployment.'
      },
      'MIAD-RAG-RealEstate': {
        family: 'RAG + cloud + full-stack AI delivery',
        tagline: 'Academic team RAG project with an individually evidenced 2026 GCP modernization.',
        architectureTitle: 'Architecture evidence',
        application: 'Application',
        ragService: 'RAG service',
        cloudModernization: 'Cloud modernization',
        deliveryControls: 'Delivery controls',
        teamLabel: 'Academic team outcome',
        teamText: 'Original academic RAG outcome is team work.',
        individualLabel: 'Individually evidenced',
        individualText: '2026 GCP modernization and integration.'
      },
      RetainAI: {
        family: 'AI-native product / decision intelligence',
        tagline: 'Release-scoped AI-native decision-intelligence product evidence.',
        releaseScope: 'Release scope',
        scopeNote: 'Frozen portfolio evidence is limited to this release. Later roadmap capabilities stay outside the Atlas scope.',
        evidence: ['AI-native product framing', 'decision intelligence', 'responsible deployment framing', 'release-scoped reproducible evidence'],
        notClaimed: 'Not claimed here',
        notSupported: ['post-v0.4.0-alpha.1 roadmap capabilities', 'autonomous employment decisions']
      }
    }
  },
  es: {
    common: {
      technicalDocs: 'Documentación técnica',
      projectProfile: 'Perfil del proyecto',
      repository: 'Repositorio'
    },
    projects: {
      VersoVector: {
        family: 'Profundidad ML / NLP / MLOps',
        tagline: 'Sistema de NLP semántico-emocional y MLOps local con inferencia empaquetada y un blueprint cloud sanitizado.',
        facts: ['ML/NLP supervisado', 'análisis semántico no supervisado', 'entrenamiento reproducible', 'artefactos de modelo y paquete de inferencia'],
        evidencePath: 'Ruta de evidencia',
        flow: ['Entrenar', 'Empaquetar', 'Inferir'],
        terminal: 'Servicio local + límite de API',
        status: 'Evidencia de ejecución local / blueprint; no se declara despliegue actual en producción.'
      },
      'MIAD-RAG-RealEstate': {
        family: 'RAG + cloud + entrega AI full-stack',
        tagline: 'Proyecto académico de RAG en equipo con una modernización GCP 2026 evidenciada individualmente.',
        architectureTitle: 'Evidencia de arquitectura',
        application: 'Aplicación',
        ragService: 'Servicio RAG',
        cloudModernization: 'Modernización cloud',
        deliveryControls: 'Controles de entrega',
        teamLabel: 'Resultado del equipo académico',
        teamText: 'El resultado académico RAG original es trabajo en equipo.',
        individualLabel: 'Evidencia individual',
        individualText: 'Modernización e integración GCP de 2026.'
      },
      RetainAI: {
        family: 'Producto AI-native / inteligencia de decisiones',
        tagline: 'Evidencia de producto AI-native e inteligencia de decisiones acotada a una release.',
        releaseScope: 'Alcance de release',
        scopeNote: 'La evidencia congelada del portafolio se limita a esta release. Las capacidades posteriores del roadmap quedan fuera del alcance Atlas.',
        evidence: ['marco de producto AI-native', 'inteligencia de decisiones', 'marco de despliegue responsable', 'evidencia reproducible acotada a la release'],
        notClaimed: 'No declarado en este alcance',
        notSupported: ['capacidades del roadmap posteriores a v0.4.0-alpha.1', 'decisiones de empleo autónomas']
      }
    }
  }
} as const

export const homeJourneyCopy = {
  en: {
    stages: [
      'Creative Software & Product Instinct',
      'Applied Mathematics, Simulation & Data Science',
      'Reproducible Development Environments',
      'Distributed Data Systems',
      'Cloud Data Architecture',
      'ML / NLP & MLOps',
      'AI-native Products & Platforms'
    ],
    action: 'Open Builder Journey'
  },
  es: {
    stages: [
      'Software creativo e instinto de producto',
      'Matemática aplicada, simulación y ciencia de datos',
      'Entornos de desarrollo reproducibles',
      'Sistemas de datos distribuidos',
      'Arquitectura de datos en la nube',
      'ML / NLP y MLOps',
      'Productos y plataformas AI-native'
    ],
    action: 'Abrir Builder Journey'
  }
} as const

export const portfolioFooterCopy = {
  en: {
    navigation: 'Navigation', resources: 'Resources', profiles: 'Profiles', sites: 'Sites',
    caseStudies: 'Case Studies', archive: 'Archive', liasoftItch: 'Liasoft on itch.io',
    bottom: 'Built with care. Evidence first.'
  },
  es: {
    navigation: 'Navegación', resources: 'Recursos', profiles: 'Perfiles', sites: 'Sitios',
    caseStudies: 'Casos de estudio', archive: 'Archivo', liasoftItch: 'Liasoft en itch.io',
    bottom: 'Construido con cuidado. Evidencia primero.'
  }
} as const

export const homeCopy = {
  en: {
    lang: 'en', alternateHref: '/es/', greeting: "Hi there! I'm Rony.",
    title: 'I build evidence systems that turn complexity into clarity and action.',
    identity: 'Data & Cloud Architect · Data/ML Platform Engineer · AI-native Builder',
    summary: 'From creative software and applied mathematics to data platforms, cloud architecture, ML/NLP and AI-native products.',
    principles: 'Evidence first · Systems thinking · Built with users · Measurable impact',
    deliveryLabel: 'Delivery loop',
    deliverySteps: ['Discover', 'Design', 'Build', 'Deploy', 'Validate', 'Iterate'],
    primaryAction: 'Explore Project Atlas', featuredEyebrow: 'Featured', featuredTitle: 'Three projects. Three different kinds of evidence.',
    featuredDescription: 'Selected work presented according to what each project actually proves—not as interchangeable cards.',
    nextEyebrow: 'Where can I go next?', nextTitle: 'Choose the depth you need.',
    journeyEyebrow: 'Builder Journey', journeyTitle: 'A progression from creative software to AI-native systems.',
    journeyDescription: 'Seven stages connect the portfolio without turning the site into a chronology dump.',
    creativeEyebrow: 'Creative Roots', creativeTitle: 'The software instinct came before the cloud stack.',
    creativeBody: 'Liasoft anchors early interactive software, mobile experiments, Lua/Gideros work and computational graphics. The main portfolio keeps that history compact and points to its own archive.',
    creativeAction: 'Visit Creative Archive'
  },
  es: {
    lang: 'es', alternateHref: '/', greeting: 'Hola, soy Rony.',
    title: 'Construyo sistemas de evidencia que convierten complejidad en claridad y acción.',
    identity: 'Data & Cloud Architect · Data/ML Platform Engineer · AI-native Builder',
    summary: 'De software creativo y matemática aplicada a plataformas de datos, arquitectura cloud, ML/NLP y productos AI-native.',
    principles: 'Evidencia primero · Pensamiento sistémico · Construido con usuarios · Impacto medible',
    deliveryLabel: 'Ciclo de entrega',
    deliverySteps: ['Descubrir', 'Diseñar', 'Construir', 'Desplegar', 'Validar', 'Iterar'],
    primaryAction: 'Explorar Project Atlas', featuredEyebrow: 'Destacados', featuredTitle: 'Tres proyectos. Tres tipos distintos de evidencia.',
    featuredDescription: 'Trabajo seleccionado según lo que cada proyecto demuestra, no como tarjetas intercambiables.',
    nextEyebrow: '¿A dónde puedo ir ahora?', nextTitle: 'Elige el nivel de profundidad que necesitas.',
    journeyEyebrow: 'Builder Journey', journeyTitle: 'Una progresión desde software creativo hasta sistemas AI-native.',
    journeyDescription: 'Siete etapas conectan el portafolio sin convertir el sitio en una cronología extensa.',
    creativeEyebrow: 'Raíces creativas', creativeTitle: 'El instinto de construir software llegó antes que el stack cloud.',
    creativeBody: 'Liasoft ancla software interactivo temprano, experimentos móviles, trabajo con Lua/Gideros y gráficos computacionales. El portafolio principal mantiene esa historia compacta y enlaza su archivo propio.',
    creativeAction: 'Visitar archivo creativo'
  }
} as const
