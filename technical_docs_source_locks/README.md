# Technical Docs source locks

This directory is owned by the normalized Technical Docs lifecycle runner.

A successful synchronized publication writes one deterministic JSON lock per source using `technical_docs_source_lock.schema.json`. Locks record the requested ref and the immutable resolved Git commit SHA. Fetch and dry-run operations do not modify this directory.

Historical generated documentation that predates R-TD4 is not assigned a fabricated SHA. Its first provenance lock is created only after a source fetch has resolved a real commit and the staged output has passed ownership and publication gates.
