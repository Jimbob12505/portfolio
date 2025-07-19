import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vatsal.online'
  
  // Base URLs for your portfolio sections
  const baseUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ]

  // Try to fetch dynamic content from your API
  let dynamicUrls: MetadataRoute.Sitemap = []
  
  try {
    // Fetch projects and blog posts from your API
    const [projectsRes, blogRes] = await Promise.allSettled([
      fetch(`${baseUrl}/api/projects`),
      fetch(`${baseUrl}/api/blog`)
    ])

    // Add project URLs if available
    if (projectsRes.status === 'fulfilled' && projectsRes.value.ok) {
      const projects = await projectsRes.value.json()
      const projectUrls = projects.map((project: any) => ({
        url: `${baseUrl}/#projects`,
        lastModified: new Date(project.updatedAt || project.createdAt || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
      dynamicUrls.push(...projectUrls)
    }

    // Add blog post URLs if available
    if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
      const blogPosts = await blogRes.value.json()
      const blogUrls = blogPosts.map((post: any) => ({
        url: `${baseUrl}/#blog`,
        lastModified: new Date(post.updatedAt || post.createdAt || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
      dynamicUrls.push(...blogUrls)
    }
  } catch (error) {
    console.error('Error fetching dynamic content for sitemap:', error)
  }

  return [...baseUrls, ...dynamicUrls]
} 