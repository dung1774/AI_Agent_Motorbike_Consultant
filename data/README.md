# Xe X data

`structured/` is the source for catalog facts such as price, range, battery,
charging time, variants, and specifications. Populate it only from verified
sources and retain source/update metadata.

`raw/` contains trusted long-form FAQ, warranty, charging, manual, and policy
documents for RAG. RAG must not be the primary source for structured catalog
values.

`processed/` is reserved for reproducible generated artifacts. Do not commit
credentials, real customer PII, local databases, or large vector-store files.
