# RelationalStats

Python toolkit for applied and statistical social network analysis.

RelationalStats provides practical APIs for workflows inspired by R `sna`, `ergm`, `tergm` / `stergm`, and `linkprediction`, while keeping methodological boundaries explicit: equivalence, approximation, validation status, and future work are documented instead of hidden.

## Package status

- Published package: `relationalstats`
- Current public release: `0.1.0a1`
- Runtime: Python `>=3.10`
- License: MIT
- Main areas: link prediction, QAPLogit, ERGM approximation, STERGM approximation

## Documentation sections

<div class="hr-card-grid">

<a class="hr-card" href="./package">
  <span class="hr-icon relationalstats-icon-package" aria-hidden="true"></span>
  <span class="hr-card-title">Package README</span>
  <span class="hr-card-desc">Read the public package overview, installation flow, quick usage examples, tests, and release notes.</span>
</a>

<a class="hr-card" href="./reference/docs/">
  <span class="hr-icon relationalstats-icon-docs" aria-hidden="true"></span>
  <span class="hr-card-title">Documentation Index</span>
  <span class="hr-card-desc">Browse the synchronized documentation snapshot from the RelationalStats repository.</span>
</a>

<a class="hr-card" href="./reference/docs/linkprediction/">
  <span class="hr-icon relationalstats-icon-linkprediction" aria-hidden="true"></span>
  <span class="hr-card-title">Link Prediction</span>
  <span class="hr-card-desc">Explore proximity metrics, ProxFun, metric formulas, validation notes, and scalability boundaries.</span>
</a>

<a class="hr-card" href="./reference/docs/qap/">
  <span class="hr-icon relationalstats-icon-qap" aria-hidden="true"></span>
  <span class="hr-card-title">QAP</span>
  <span class="hr-card-desc">Review QAPLogit, binary dyadic outcomes, node-label permutations, formulas, and R validation plans.</span>
</a>

<a class="hr-card" href="./reference/docs/ergm/">
  <span class="hr-icon relationalstats-icon-ergm" aria-hidden="true"></span>
  <span class="hr-card-title">ERGM Approximation</span>
  <span class="hr-card-desc">Understand the initial dyadic-logistic ERGM-inspired approximation, terms, GOF, and limitations.</span>
</a>

<a class="hr-card" href="./reference/docs/stergm/">
  <span class="hr-icon relationalstats-icon-stergm" aria-hidden="true"></span>
  <span class="hr-card-title">STERGM Approximation</span>
  <span class="hr-card-desc">Review separable temporal dyadic construction, formation and dissolution approximations, and validation notes.</span>
</a>

<a class="hr-card" href="./reference/docs/methodology/equivalence-vs-approximation">
  <span class="hr-icon relationalstats-icon-methodology" aria-hidden="true"></span>
  <span class="hr-card-title">Methodology</span>
  <span class="hr-card-desc">Track equivalence versus approximation, reproducibility, validation boundaries, and transparent claims.</span>
</a>

<a class="hr-card" href="./reference/examples/">
  <span class="hr-icon relationalstats-icon-examples" aria-hidden="true"></span>
  <span class="hr-card-title">Examples</span>
  <span class="hr-card-desc">Run public, synthetic, reusable examples for link prediction, QAP, ERGM, and STERGM workflows.</span>
</a>

<a class="hr-card" href="./reference/notebooks/">
  <span class="hr-icon relationalstats-icon-notebooks" aria-hidden="true"></span>
  <span class="hr-card-title">Notebooks</span>
  <span class="hr-card-desc">Review the public notebook policy and keep private, solved, or non-public material out of the repository.</span>
</a>

<a class="hr-card" href="./releases">
  <span class="hr-icon relationalstats-icon-releases" aria-hidden="true"></span>
  <span class="hr-card-title">Releases</span>
  <span class="hr-card-desc">Track documentation releases for the GitHub Pages version of RelationalStats.</span>
</a>

</div>

## Quick install

```bash
pip install relationalstats
```

For local development from the source repository:

```bash
python3.10 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[dev,test]"
```

## Repository

- Source repository: [HubertRonald/relationalstats](https://github.com/HubertRonald/relationalstats?utm_source=chatgpt.com)
- PyPI package: [relationalstats](https://pypi.org/project/relationalstats/?utm_source=chatgpt.com)