# Visual Rationale

## Repository identity

The canonical repository identity is **`fde-roadmap`** and the public title is **Forward Deployed Engineer Roadmap**.

**Independent Visual Field Guide** remains the editorial descriptor. The visual system therefore supports a roadmap-first public identity while preserving the field-guide framing in the narrative.

## Current visual status

The seven PNGs currently checked into `src/img/` are the **accepted final visual set for v0.1.0** and are consumed by `README.md`.

This repository does not assert the current PNGs' production provider, model, generation method, prompt, seed, generation date, or production workflow.

No roadmap structure, source corpus, source SHA, source license, citation model, or FDE claim is changed by this final visual-asset freeze.

## Visual-family reference

The visual-family benchmark is the public SparkWork architecture diagram:

<https://github.com/HubertRonald/SparkWork/blob/main/figs/sparkwork_architecture.png>

The FDE diagrams use it only as **visual-system inspiration**. They do not copy SparkWork topology, node names, Spark-specific content, logos, runtime structure, or brand identity.

The compatible visual philosophy is:

- clear technical boundaries;
- numbered stages where sequence matters;
- icon-supported recognition;
- restrained semantic color;
- clean connectors with explicit direction;
- balanced whitespace;
- calm technical hierarchy;
- architecture-documentation rather than presentation-deck composition.

> The diagrams do not copy SparkWork topology or content. They reuse a compatible visual philosophy for technical consistency across Hubert Ronald's public engineering artifacts.

## Shared visual system

### Canvas

- Primary canvas: very light cool gray / soft neutral off-white.
- Surfaces: white or lightly tinted technical zones.
- Avoid warm beige / notebook styling.
- Use a restrained navy technical rail or equivalent hierarchy device rather than a green identity rule.

### Semantic palette

| Role | Preferred family | Usage |
|---|---|---|
| Architecture / system | Deep navy | system boundaries, neutral technical core |
| Software / core path | Blue | engineering foundations, main execution path |
| Data / integration | Soft cyan | information flow, interfaces, data movement |
| Customer / feedback / specialization | Indigo / violet | human interface, feedback, role-specific depth |
| Delivery / proof | Warm amber | deployment, decisions, field evidence |
| Supporting context | Slate / graphite | infrastructure context, secondary information |

The family must remain restrained. Most figures should use one primary family, one secondary signal color, and neutrals. Additional colors appear only when a real semantic distinction requires them.

Green / teal must not become the dominant repository visual identity.

### Typography

Use one clean sans-serif family with a strong hierarchy:

1. figure title;
2. short subtitle;
3. zone / system label;
4. node title;
5. compact micro-annotation;
6. provenance footer.

Labels must remain comfortably readable when GitHub displays the image around **700–900 px wide**. Long-form explanation belongs in the README rather than inside figures.

### Icon language

Use simple line or restrained duotone technical icons for concepts such as:

- code;
- API / integration;
- cloud / runtime;
- database / data;
- AI / model;
- customer / workflow;
- deployment;
- observability;
- security;
- feedback;
- field evidence.

Icons support recognition rather than decorate empty space. Do not use emojis. Do not make the diagram family dependent on AWS, Google Cloud, Azure, Spark, or other vendor logos.

### System boundaries

Architecture-style zones should make clear:

- what belongs together;
- what crosses a boundary;
- what is a capability;
- what is a delivery stage;
- what is contextual input;
- what produces an outcome;
- where feedback returns.

Useful region labels include:

- `FIELD CONTEXT`;
- `FDE CAPABILITY SYSTEM`;
- `TECHNICAL SYSTEM`;
- `FIELD INTERFACE`;
- `FORWARD DELIVERY PIPELINE`;
- `FIELD LEARNING CHANNEL`;
- `CORE PATH`;
- `OPTIONAL DEPTH TRACKS`;
- `CORE FDE CAPABILITIES`;
- `SPECIALIZE`;
- `PROVE IN THE FIELD`.

### Connectors

Connectors are first-class explanatory elements.

Rules:

- consistent reading direction;
- clean orthogonal or gently curved paths;
- consistent arrowheads;
- minimal crossings;
- no connectors through text;
- blue/cyan for technical or integration flow;
- indigo/violet for feedback or return paths;
- amber for deployment or proof transitions;
- slate for contextual input.

Avoid decorative loops, ambiguous arrows, and visual motion that does not explain the model.

## Visual provenance boundary

The seven checked-in PNGs are the accepted final visual artifacts for v0.1.0. Their production provider and production method are not asserted here.

The conceptual claims represented in the diagrams remain traceable to the primary source corpus. Visual presentation does not make any production provider a conceptual source and does not imply provider endorsement.

## Diagram specifications and target rationale

### `fde-roadmap-overview.png`

**Prior weakness:** the early version behaved like independent capability cards plus a small process row.

**Final target:** a genuine system map showing field context flowing into Engineering, Systems, and Data/AI; those domains meet at explicit integration/decision interfaces, connect to Delivery and Product/Customer, produce a deployed outcome, and return field feedback to discovery.

**Question answered:** _What does an FDE connect?_

### `fde-skill-pillars.png`

**Prior weakness:** five skill boxes around a central label.

**Final target:** an architectural capability topology with a central **Interface Layer**, a bounded technical system, a separate field-interface zone, and explicit interfaces between technical domains and customer/outcome context.

**Message:** FDE leverage is strongest at interfaces, not in isolated skill boxes.

### `fde-delivery-loop.png`

**Prior weakness:** sequential cards with a decorative return curve.

**Final target:** a technical delivery pipeline with numbered stages, directional flow, an explicit deployed-evidence signal, and a separate **Field Learning Channel** that returns evidence to discovery.

**Message:** feedback is part of the operating system, not decorative closure.

### `fde-learning-path.png`

**Prior weakness:** a curriculum-style list.

**Final target:** a real learning roadmap: **Core Path** Stages 0–5 → a bounded **Optional Depth Tracks** lane → **Field Evidence**.

**Message:** specialization is selective, not mandatory breadth across every track.

### `fde-role-comparison.png`

**Final target:** a calm qualitative matrix with a restrained FDE reference-row highlight and text labels only: `CORE`, `COMMON`, `VARIABLE`, `OCCASIONAL`.

**Message:** responsibility tendency only; no quantitative score and no claim that one role is better.

### `fde-core-tradeoffs.png`

**Prior weakness:** positioned slider markers could imply measured or preferred values.

**Final target:** bidirectional **decision axes** with no universal marker or optimum. Each axis contains a decision question.

**Message:** the defensible operating position changes with context.

### `fde-roadmap-stages.png`

**Final target:** the strongest standalone roadmap artifact: a bounded Stage 0–5 core path, a clearly separated Stage 6 specialization zone, and Stage 7 proof-in-the-field zone.

**Message:** where to start, what stays core, where specialization begins, and how field evidence closes the roadmap.

## Image dimensions and README-scale review

Target working dimensions:

- most diagrams: approximately `1600 × 900`;
- role comparison matrix: approximately `1600 × 1040` where the extra vertical space improves legibility;

Final production PNGs should be lossless or visually lossless and should avoid oversized files without visual benefit.

Every candidate must be checked at approximately **800 px wide** before approval. Titles, zone labels, node labels, qualitative categories, connector direction, and provenance must remain understandable at normal GitHub README scale.

## Provenance footer

Every final production PNG must include a quiet, consistent footer:

> Independent editorial synthesis · Primary references: roadmap.sh/FDE · thecoder8890/FDE-roadmap · pierpaolo28/Awesome-FDE-Roadmap

The footer preserves the approved attribution boundary:

- **source corpus** → FDE themes, roadmap topics, and role framing;
- **editorial synthesis** → organization, reconciliation, and interpretation;
- **original visual presentation** → human-directed diagram intent, composition, annotations, selection, and final curated presentation.

A newly generated visual does **not** make the underlying FDE concepts conceptually original.

## Accessibility and contrast

The final system should preserve:

- dark navy/graphite text on cool light surfaces;
- strong text/background contrast;
- semantic color that is not the only carrier of meaning;
- textual qualitative labels in the role comparison;
- endpoint labels and decision questions rather than scored positions in tradeoffs;
- restrained caption density;
- readable core labels at README scale;
- no dependence on decorative icon detail for comprehension.

## Final visual acceptance gates

The final seven production images must be re-reviewed after integration.

| Gate | Required result | Validation intent |
|---|---|---|
| Green dominance | **PASS** | Navy/blue/indigo/cyan/slate family is dominant; green/teal is not the identity. |
| SparkWork-family technical character | **PASS** | Technical boundaries, hierarchy, icon-supported nodes, clean connectors, and whitespace are present without copying Spark content. |
| Legibility at README width | **PASS** | Every image remains understandable around 800 px wide. |
| Diagram diversity | **PASS** | System map, topology, pipeline, roadmap, matrix, and decision axes use appropriate distinct grammars. |
| Technical feel | **PASS** | Figures read as engineering/system artifacts rather than consulting slides. |
| Provenance | **PASS** | Every final figure carries the approved source-corpus footer. |
| Qualitative claims | **PASS** | Role comparison and tradeoffs do not imply empirical scoring or a universal optimum. |
