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

const THEMEBOOKS = [
  "Adaptation",
  "Bastion",
  "Conjuration",
  "Destiny",
  "Divination",
  "Enclave",
  "Esoterica",
  "Expression",
  "Familiar",
  "Mobility",
  "Relic",
  "Subversion",
  "Defining Event",
  "Defining Relationship",
  "Mission",
  "Personality",
  "Possessions",
  "Routine",
  "Struggle",
  "Tradition",
  "Training",
  "Turf",
  "Shrouding",
  "Advanced Art",
  "Unit",
] as const;

const characters = defineCollection({
  loader: glob({ pattern: "**/*.toml", base: "./src/content/characters" }),
  schema: z.object({
    name: z.string(),
    mythos: z.string(),
    logos: z.string(),
    build_up: z.number().min(0).max(5).step(1),
    moments_of_evolution: z.array(z.string()),
    themes: z.array(
      z.object({
        type: z.enum(["Mythos", "Logos", "Mist"]),
        themebook: z.enum(THEMEBOOKS),
        title: z.string(),
        core_sentence: z.string(),
        attention: z.number().min(0).max(3).step(1),
        fade_crack: z.number().min(0).max(3).step(1),
        power_tags: z.array(
          z.tuple([
            z.enum(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]),
            z.string(),
          ]),
        ),
        weakness_tags: z.array(
          z.tuple([z.enum(["A", "B", "C", "D"]), z.string()]),
        ),
        improvements: z.array(
          z.object({
            name: z.string(),
            description: z.string(),
          }),
        ),
      }),
    ),
  }),
});

export const collections = { episodes, characters };
