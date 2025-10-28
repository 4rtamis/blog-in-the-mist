import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const episodes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/episodes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    series: z.string(),
    season: z.number(),
    episode: z.number(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    locations: z.array(z.string()).optional(),
    characters: z.array(z.string()).optional(),
  }),
});

export const collections = { episodes };
