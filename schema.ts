import { pgTable, text, integer, timestamp, boolean, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const projectsTable = pgTable("projects", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  appName: text("app_name").notNull(),
  lastApkUrl: text("last_apk_url"),
  lastApkBuiltAt: timestamp("last_apk_built_at", { withTimezone: true }),
  apkBuildCount: integer("apk_build_count").notNull().default(0),
  ownerNote: text("owner_note"),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const filesTable = pgTable("project_files", {
  id: varchar("id", { length: 32 }).primaryKey(),
  projectId: varchar("project_id", { length: 32 }).notNull().references(() => projectsTable.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  content: text("content").notNull(),
  mimeType: text("mime_type").notNull(),
  isBinary: boolean("is_binary").notNull().default(false),
  size: integer("size").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const projectsRelations = relations(projectsTable, ({ many }) => ({ files: many(filesTable) }));
export const filesRelations = relations(filesTable, ({ one }) => ({
  project: one(projectsTable, { fields: [filesTable.projectId], references: [projectsTable.id] }),
}));

export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;
export type ProjectFile = typeof filesTable.$inferSelect;
export type NewProjectFile = typeof filesTable.$inferInsert;

