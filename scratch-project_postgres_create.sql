CREATE TABLE "public.users" (
	"_id" serial NOT NULL,
	"name" serial NOT NULL,
	"email" serial NOT NULL,
	"password" serial NOT NULL,
	"timezone" time with time zone NOT NULL,
	"phone_number" bigint NOT NULL,
	"darkmode_setting" BOOLEAN NOT NULL DEFAULT 'true',
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.habits" (
	"_id" bigint NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "habits_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.users_habits_join" (
	"_id" serial NOT NULL,
	"users_id" bigint NOT NULL,
	"habits_id" bigint NOT NULL,
	"days_missed" bigint NOT NULL,
	"days_since_missed" bigint NOT NULL,
	"total_days" bigint NOT NULL,
	"completed_today" BOOLEAN NOT NULL DEFAULT 'false',
	"text_notifications_setting" BOOLEAN NOT NULL DEFAULT 'true',
	"push_notifications_setting" BOOLEAN NOT NULL DEFAULT 'true',
	CONSTRAINT "users_habits_join_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.friends_join" (
	"_id" serial NOT NULL,
	"friend_a" serial NOT NULL,
	"friend_b" serial NOT NULL,
	CONSTRAINT "friends_join_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.calendar" (
	"_id" serial NOT NULL,
	"day" bigint NOT NULL,
	"user_habits_join_id" bigint NOT NULL,
	CONSTRAINT "calendar_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.videos" (
	"_id" bigint NOT NULL,
	"recorded_by_id" bigint NOT NULL,
	"recorded_for_id" bigint NOT NULL,
	"filename" varchar NOT NULL,
	CONSTRAINT "videos_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "habits" ADD CONSTRAINT "habits_fk0" FOREIGN KEY ("name") REFERENCES ""("");

ALTER TABLE "users_habits_join" ADD CONSTRAINT "users_habits_join_fk0" FOREIGN KEY ("users_id") REFERENCES "users"("_id");
ALTER TABLE "users_habits_join" ADD CONSTRAINT "users_habits_join_fk1" FOREIGN KEY ("habits_id") REFERENCES "habits"("_id");

ALTER TABLE "friends_join" ADD CONSTRAINT "friends_join_fk0" FOREIGN KEY ("friend_a") REFERENCES "users"("_id");
ALTER TABLE "friends_join" ADD CONSTRAINT "friends_join_fk1" FOREIGN KEY ("friend_b") REFERENCES "users"("_id");

ALTER TABLE "calendar" ADD CONSTRAINT "calendar_fk0" FOREIGN KEY ("user_habits_join_id") REFERENCES "users_habits_join"("_id");

ALTER TABLE "videos" ADD CONSTRAINT "videos_fk0" FOREIGN KEY ("recorded_by_id") REFERENCES "users"("_id");
ALTER TABLE "videos" ADD CONSTRAINT "videos_fk1" FOREIGN KEY ("recorded_for_id") REFERENCES "users"("_id");

