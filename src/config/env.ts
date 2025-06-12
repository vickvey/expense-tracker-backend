import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

// Load env file based on current NODE_ENV
expand(
  config({
    // path: `.env.${process.env.NODE_ENV || "development"}.local`,
    path: '.env'
  })
);

// Utility to handle booleans like "true" / "false"
const stringBoolean = z
  .coerce.string()
  .transform((val) => val === "true")
  .default("false");

// Define and validate your full schema
const EnvSchema = z.object({
  // Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5500),

  // Database
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_URI: z.string().url(),

  // JWT
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().or(z.coerce.number()),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

let parsedEnv: EnvSchema;

try {
  parsedEnv = EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "❌ Missing or invalid environment variables:\n";
    message += error.issues.map((issue) => `- ${issue.path[0]}: ${issue.message}`).join("\n");
    console.error(message);
    process.exit(1);
  } else {
    console.error("Unknown env validation error:", error);
    process.exit(1);
  }
}

export const env = parsedEnv;
