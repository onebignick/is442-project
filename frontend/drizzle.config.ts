import { defineConfig } from "drizzle-kit";
import "./envConfig";

export default defineConfig({
        dialect: "postgresql",
        dbCredentials: {
                url: process.env.POSTGRES_URL as string
        },
        schema: "./src/schema.ts",
        tablesFilter: ["is442_*"]
});