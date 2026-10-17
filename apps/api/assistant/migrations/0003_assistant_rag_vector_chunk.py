# Generated manually for Jev RAG v2 hybrid vector chunk storage

from django.db import migrations, models

CREATE_SQL = """
DO $$
BEGIN
    BEGIN
        CREATE EXTENSION IF NOT EXISTS vector;
        CREATE TABLE IF NOT EXISTS assistant_rag_vector_chunk (
            chunk_id TEXT PRIMARY KEY,
            source_id TEXT NOT NULL,
            source_type TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            locale VARCHAR(8) NOT NULL DEFAULT 'vi',
            source_url TEXT NOT NULL,
            content_hash CHAR(64) NOT NULL,
            embedding vector(1536) NOT NULL,
            published BOOLEAN NOT NULL DEFAULT FALSE,
            metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
    EXCEPTION WHEN undefined_file OR feature_not_supported THEN
        CREATE TABLE IF NOT EXISTS assistant_rag_vector_chunk (
            chunk_id TEXT PRIMARY KEY,
            source_id TEXT NOT NULL,
            source_type TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            locale VARCHAR(8) NOT NULL DEFAULT 'vi',
            source_url TEXT NOT NULL,
            content_hash CHAR(64) NOT NULL,
            embedding JSONB NOT NULL,
            published BOOLEAN NOT NULL DEFAULT FALSE,
            metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
    END;
END $$;
CREATE INDEX IF NOT EXISTS ix_rag_vector_source ON assistant_rag_vector_chunk(source_id);
CREATE INDEX IF NOT EXISTS ix_rag_vector_fts ON assistant_rag_vector_chunk USING GIN
  (to_tsvector('simple', title || ' ' || content));
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS assistant_rag_vector_chunk;
"""


class Migration(migrations.Migration):
    dependencies = [
        ("assistant", "0002_alter_assistantknowledgechunk_entity_type"),
    ]

    operations = [
        migrations.CreateModel(
            name="AssistantRagVectorChunk",
            fields=[
                ("chunk_id", models.CharField(max_length=255, primary_key=True, serialize=False)),
                ("source_id", models.CharField(db_index=True, max_length=255)),
                ("source_type", models.CharField(max_length=64)),
                ("title", models.CharField(max_length=255)),
                ("content", models.TextField()),
                ("locale", models.CharField(default="vi", max_length=8)),
                ("source_url", models.CharField(max_length=512)),
                ("content_hash", models.CharField(max_length=64)),
                ("published", models.BooleanField(default=False)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "RAG Vector Chunk",
                "verbose_name_plural": "RAG Vector Chunks",
                "db_table": "assistant_rag_vector_chunk",
                "managed": False,
            },
        ),
        migrations.RunSQL(
            sql=CREATE_SQL,
            reverse_sql=REVERSE_SQL,
        ),
    ]
