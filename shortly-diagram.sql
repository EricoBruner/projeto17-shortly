CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL
);

CREATE TABLE "links" (
  "id" serial PRIMARY KEY,
  "url" text UNIQUE NOT NULL,
  "short_url" text UNIQUE NOT NULL,
  "visit_count" integer NOT NULL DEFAULT 0,
  "user_id" integer NOT NULL
);

CREATE TABLE "sessions" (
  "id" serial PRIMARY KEY,
  "token" text UNIQUE NOT NULL,
  "user_id" integer NOT NULL 
);

ALTER TABLE "links" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
