import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const interviews = pgTable("interviews", {
  id: serial("id").primaryKey(),
  candidateName: text("candidate_name").notNull(),
  candidatePhoto: text("candidate_photo").notNull(),
  position: text("position").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(),
  roomName: text("room_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  interviewId: integer("interview_id").notNull(),
  name: text("name").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertInterviewSchema = createInsertSchema(interviews).omit({
  id: true,
  createdAt: true,
});

export const insertParticipantSchema = createInsertSchema(participants).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertInterview = z.infer<typeof insertInterviewSchema>;
export type Interview = typeof interviews.$inferSelect;

export type InsertParticipant = z.infer<typeof insertParticipantSchema>;
export type Participant = typeof participants.$inferSelect;
