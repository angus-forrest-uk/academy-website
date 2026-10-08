
import { z } from "astro/zod";
import { load } from "js-yaml";

export function readYaml<Schema extends z.ZodType>(raw: string, schema: Schema, file: string): z.infer<Schema> {
  const result = schema.safeParse(load(raw));
  if (result.success) return result.data;

  const problems = result.error.issues.map((issue) => `  ${issue.path.join(".") || "(top)"}: ${issue.message}`);
  throw new Error(`${file} is not valid:\n${problems.join("\n")}`);
}
