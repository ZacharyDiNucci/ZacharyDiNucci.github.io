import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			coverImage: image().optional(),
			tech: z.array(z.string()).optional(),
			genre: z.string().optional(),
			liveUrl: z.string().optional(),
			githubUrl: z.string().optional(),
			youtubeId: z.string().optional(),
			thumbnailUrl: z.string().optional(),
			media: z.array(z.object({
				type: z.enum(['youtube', 'image']),
				src: z.string(),
			})).optional(),
			featured: z.boolean().optional().default(false),
			status: z.enum(['completed', 'in-progress', 'archived']).optional().default('completed'),
		}),
});

export const collections = { blog, projects };
