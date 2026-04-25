import { MetadataRoute } from 'next'
import { PROJECTS } from '@/constants'
import { getPostSlugs } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://umairrx.dev'

  const staticRoutes = [
    '',
    '/work',
    '/blogs',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutes = getPostSlugs()
    .filter((slug) => slug.endsWith('.mdx'))
    .map((slug) => ({
      url: `${baseUrl}/blogs/${slug.replace(/\.mdx$/, '')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
