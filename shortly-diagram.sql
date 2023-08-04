CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL
);

CREATE TABLE "links" (
  "id" serial PRIMARY KEY,
  "url" text UNIQUE NOT NULL,
  "shortUrl" text UNIQUE NOT NULL,
  "visitCount" integer NOT NULL DEFAULT 0,
  "user_id" integer NOT NULL
);

ALTER TABLE "links" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
