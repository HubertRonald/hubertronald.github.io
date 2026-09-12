# Sources & Provenance

## Independence and editorial boundary

This repository is an independently curated synthesis of a defined public
source corpus. It is not the official roadmap of any company or platform,
not a certification, and not a universal definition of the FDE role.

The intellectual boundary is deliberate:

- **Source corpus** — supplies important FDE concepts, topic coverage,
  role framing, and learning themes.
- **Editorial synthesis** — reconciles overlaps and differences across
  those sources into one vendor-neutral field guide.
- **Original presentation** — prose, editorial organization, diagram
  concepts, human-directed visual composition, annotations, and final
  curated visual artifacts are specific to this project where not
  otherwise attributed. No claim is made to ownership of underlying
  source concepts.


## Primary Source Corpus

The following three resources are the primary source corpus for v0.1.0. Reference markers are used sparingly in major sections: **[R]** roadmap.sh, **[T]** thecoder8890, **[A]** Awesome-FDE-Roadmap.

### [R] roadmap.sh — Forward Deployed Engineer

<https://roadmap.sh/forward-deployed-engineer>

- `source_type`: `dynamic_web_roadmap`
- `accessed`: `2026-09-01`
- **Living-source note:** The roadmap.sh reference is a living resource. This synthesis reflects the version reviewed on the access date above.
- Reuse boundary: this guide links to and synthesizes the public roadmap; it does not redistribute the roadmap.sh content.

### [T] thecoder8890 — forward-deployed-engineer-roadmap

<https://github.com/thecoder8890/forward-deployed-engineer-roadmap>

- `branch`: `main`
- `commit_sha`: `9623f4c6bdd84e6778598808d49a2057822df735`
- `accessed`: `2026-09-01`
- `license`: `ZERO PUBLIC LICENSE v1.0 (March 2026)` — custom permissive license; no SPDX identifier assumed.

### [A] pierpaolo28 — Awesome-FDE-Roadmap

<https://github.com/pierpaolo28/Awesome-FDE-Roadmap>

- `branch`: `main`
- `commit_sha`: `5a08410dc9b23f882b6d162976b602ad5b9e224e`
- `accessed`: `2026-09-01`
- `license`: `MIT`

For the detailed provenance record, see [`../SOURCES.yml`](https://github.com/HubertRonald/fde-roadmap/blob/f896c19d182f8df03918f2c73a402e27a80ded16/SOURCES.yml). The section-by-section source mapping is maintained below.

## Source Map

It is a **provenance map**, not a claim that every source uses the same labels or assigns the same importance to each topic.

## Source registry

| ID | Source | Version reviewed | License / reuse boundary |
|---|---|---|---|
| **[R]** | roadmap.sh — Forward Deployed Engineer | Dynamic web roadmap, accessed `2026-09-01` | Public web resource; roadmap.sh states website content may not be redistributed. No open-source reuse right is assumed. |
| **[T]** | thecoder8890/forward-deployed-engineer-roadmap | `main` @ `9623f4c6bdd84e6778598808d49a2057822df735` | `ZERO PUBLIC LICENSE v1.0 (March 2026)`, custom permissive license. |
| **[A]** | pierpaolo28/Awesome-FDE-Roadmap | `main` @ `5a08410dc9b23f882b6d162976b602ad5b9e224e` | MIT. |

Full machine-readable metadata is in [`../SOURCES.yml`](https://github.com/HubertRonald/fde-roadmap/blob/f896c19d182f8df03918f2c73a402e27a80ded16/SOURCES.yml).

## Coverage vocabulary

The table uses qualitative source-coverage terms:

- **Strong** — clearly developed or given substantial explicit treatment.
- **Present** — clearly represented, but not necessarily a major organizing section.
- **Partial** — relevant material exists, but the guide combines or extends it with other sources.
- **Not explicit** — not found as an explicit FDE topic in the reviewed material; no absence claim is made beyond this review.
- **Role variant** — represented as one type of FDE work rather than universal core.

These labels describe **traceability**, not quality scores.

## Field Guide → source corpus map

| Field Guide area | [R] roadmap.sh | [T] thecoder8890 | [A] Awesome-FDE-Roadmap | Treatment here |
|---|---|---|---|---|
| **Role definition / mission** | Strong — role/responsibility and transition topics | Strong — customer-embedded production delivery and role variability | Strong — hybrid engineering/data/consulting persona | Synthesized working definition; explicitly non-canonical |
| **Engineering foundations** | Strong — programming, Git, API, backend/frontend, SQL and system topics | Strong — core SWE layer and explicit foundation phase | Partial — engineering tools and prerequisites appear, but the curriculum is more data/cloud weighted | Vendor-neutral core foundation |
| **Data & systems foundations** | Strong — data engineering, pipelines, SQL, distributed/system topics | Strong — data engineering, databases, systems and integration coverage | Strong — data engineering is a major curriculum phase | Synthesized core concepts |
| **Cloud, security & operations** | Strong — cloud providers, containers, Kubernetes, Terraform, CI/CD, observability, security | Strong — cloud/ops, security, deployment and operating concerns | Strong — major cloud architecture/security/observability material, often GCP-specific | Architectural concepts retained; vendor prescription removed |
| **Forward delivery / discovery** | Strong — discovery/scoping, requirements, technical scoping, enterprise workflow, feedback topics | Strong — discovery, implementation, rollout/operations, repeatable patterns | Strong — consulting mindset, discovery, requirements translation, value scoping | Normalized into Discover → Frame → Prototype → Integrate → Deploy → Iterate |
| **Product & customer fluency** | Strong — stakeholder, communication, business, product-feedback topics | Strong — client-facing execution, communication, product sense | Strong — strategic consulting/customer problem framing | Synthesized core capability |
| **AI / model delivery** | Strong — LLM, RAG, agents, evaluation, model deployment and MLOps topics | Present / role-dependent — AI depth is conditional and one FDE variant | Strong — Applied AI is a large dedicated area | Optional depth track, not universal core |
| **Learning progression** | Strong — native roadmap structure across a broad topic graph | Strong — explicit phased readiness path and timelines | Strong — phased curriculum from data through cloud/consulting plus specialist modules | Reorganized into eight stages; not copied from any single sequence |
| **Role comparison / variants** | Partial — transitions from adjacent roles and role context | Strong — explicit role-type matrix and employer examples | Partial — direct SWE-vs-FDE comparison and hybrid-role framing | Editorial qualitative comparison; no empirical scoring |
| **Tradeoffs** | Strong — explicit scope/speed/quality tradeoff topic | Strong — delivery and system-design tradeoffs are explicit | Partial — value scoping, pragmatism and consulting decisions support the theme | Five-pair editorial framing; underlying tensions credited to corpus |
| **Capstone / proof artifacts** | Present — build/deploy/operations topics support artifact-based practice | Strong — capstone and output-artifact guidance is explicit | Partial — case-study, artifact, interview and applied-project framing | Synthesized evidence checklist |
| **Edge / air-gapped / constrained deployment** | Not explicit in the reviewed FDE topic set | Role variant — field deployment is identified, but not as a universal edge curriculum | Strong — explicit Air-Gapped & Tactical Edge section | Optional specialization only |
| **Vendor-specific implementation** | Multi-cloud and generic topics coexist | Mostly generic concepts with implementation examples | Strongly GCP-oriented in parts | De-vendored in core; provider names used only as examples |

## Roadmap synthesis conclusion

The three sources agree most strongly on the need to combine **engineering foundations, systems/cloud awareness, customer-facing discovery, production deployment, and iterative delivery**. They diverge in sequencing, role depth, and vendor emphasis.

The canonical guide therefore uses:

1. **Stages 0–5 as core capabilities** because those themes recur broadly across the corpus.
2. **Stage 6 as role-specific depth** because AI, data-platform, cloud/platform, enterprise integration, and constrained-environment work vary substantially by employer.
3. **Stage 7 as proof** because a field-oriented roadmap should end in deployed evidence rather than topic completion.

The exact eight-stage organization, stage names, captions, and evidence prompts are editorial organization authored for this guide. The underlying FDE themes are treated as synthesized source concepts, not claimed as inventions.

## Dynamic-source rule

roadmap.sh is intentionally recorded as a living web source. Future revisions should update its access date and re-check topic coverage rather than pretending the `2026-09-01` review permanently represents the website.

The two GitHub repositories are pinned to immutable commit SHAs so future contributors can identify the exact revisions that influenced the v0.1.0 draft.
