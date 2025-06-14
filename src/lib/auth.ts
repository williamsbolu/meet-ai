import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { db } from "@/db";
// Our auth config was a bit different from the docs because of the auth-schema.ts file which i deleted and moved its contents to my main schema files. Thats why i added the schema directly also to the adapter to avoid errors

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});

// ? When you use the import * as syntax in React: You're importing everything that's exported from the @/db/schema module as a single object named schema
