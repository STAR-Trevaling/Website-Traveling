# Generated manually for Vietnamese Unaccent Full-Text Search on PostgreSQL

from django.db import migrations

CREATE_SQL = """
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION f_unaccent(text)
  RETURNS text AS
$$
SELECT public.unaccent('public.unaccent', $1)
$$  LANGUAGE sql IMMUTABLE PARALLEL SAFE;

CREATE INDEX IF NOT EXISTS ix_rag_vector_fts_unaccent ON assistant_rag_vector_chunk USING GIN
  (to_tsvector('simple', f_unaccent(title || ' ' || content)));
"""

REVERSE_SQL = """
DROP INDEX IF EXISTS ix_rag_vector_fts_unaccent;
DROP FUNCTION IF EXISTS f_unaccent(text);
"""


class Migration(migrations.Migration):
    dependencies = [
        ("assistant", "0003_assistant_rag_vector_chunk"),
    ]

    operations = [
        migrations.RunSQL(
            sql=CREATE_SQL,
            reverse_sql=REVERSE_SQL,
        ),
    ]
