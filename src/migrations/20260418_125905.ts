import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`news_and_events_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`news_and_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`news_and_events_images_order_idx\` ON \`news_and_events_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`news_and_events_images_parent_id_idx\` ON \`news_and_events_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`news_and_events_images_image_idx\` ON \`news_and_events_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`news_and_events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'news' NOT NULL,
  	\`event_name\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`news_and_events_updated_at_idx\` ON \`news_and_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`news_and_events_created_at_idx\` ON \`news_and_events\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`imagekit_file_id\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`imagekit_thumbnail_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`imagekit_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`imagekit_a_i_tags\` text;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`news_and_events_id\` integer REFERENCES news_and_events(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_and_events_id_idx\` ON \`payload_locked_documents_rels\` (\`news_and_events_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`news_and_events_images\`;`)
  await db.run(sql`DROP TABLE \`news_and_events\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`people_id\` integer,
  	\`projects_id\` integer,
  	\`publications_id\` integer,
  	\`research_areas_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`publications_id\`) REFERENCES \`publications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`research_areas_id\`) REFERENCES \`research_areas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "people_id", "projects_id", "publications_id", "research_areas_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "people_id", "projects_id", "publications_id", "research_areas_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_people_id_idx\` ON \`payload_locked_documents_rels\` (\`people_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_publications_id_idx\` ON \`payload_locked_documents_rels\` (\`publications_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_research_areas_id_idx\` ON \`payload_locked_documents_rels\` (\`research_areas_id\`);`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`imagekit_file_id\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`imagekit_thumbnail_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`imagekit_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`imagekit_a_i_tags\`;`)
}
