CREATE TABLE article_views (
  slug       TEXT PRIMARY KEY,
  count      BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
