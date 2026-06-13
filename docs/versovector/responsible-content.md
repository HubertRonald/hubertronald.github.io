# Responsible Content

VersoVector deals with poetic, lyrical, and reflective language.

That makes content governance important from the beginning.

## Public repository rule

The public repository should avoid redistributing full copyrighted lyrics or licensed corpora unless redistribution is explicitly allowed.

Public examples should prefer:

- public-domain poetry;
- synthetic text;
- short user-provided snippets;
- metadata-only examples;
- generated toy examples;
- properly licensed datasets;
- summarized outputs instead of full source texts.

## Production rule

A production version should rely on one or more of the following:

- licensed content;
- public-domain texts;
- user-provided text;
- metadata enrichment;
- short excerpts where legally appropriate;
- integrations with platforms that already manage rights.

## What the public repo should not include

Do not publish:

- full copyrighted lyrics;
- proprietary datasets;
- paid corpus dumps;
- API keys;
- private prompts;
- private ranking rules;
- production configuration;
- user data;
- secrets;
- commercial recommendation logic.

## Safe examples

Prefer examples like:

```text
A short reflective text written specifically for the demo.
```

or:

```text
A public-domain poem with confirmed reuse status.
```

or:

```text
Synthetic text designed to test emotional and semantic behavior.
```

## Documentation principle

The public documentation should show how the system works without exposing material that belongs in a private product repository.