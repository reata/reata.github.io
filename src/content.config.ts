import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    image: z.string(), // path relative to public/images/, e.g. "message_bus.jpg"
    path: z.string(), // original URL path, e.g. "/blog/post-name/"
  }),
});

export const collections = { posts };
