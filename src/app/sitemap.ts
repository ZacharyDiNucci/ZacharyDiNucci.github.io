import { getAllBlogs } from '@/services'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!
  const blogsPageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`
  const blogs = await getAllBlogs()

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // main blog page url
    {
      url: blogsPageUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.7,
    },
    // blog details pages
    ...(blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.7,
    })) as MetadataRoute.Sitemap),
  ]
}
