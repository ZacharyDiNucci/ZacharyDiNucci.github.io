import { BlogPost, Project, Testimonial } from '@/lib/types'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'

// Function to read project file
const readProjectFile = async (filePath: string): Promise<Project> => {
  const projectData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(projectData)
}

// Function to get all projects
const getAllProjects = async (): Promise<Project[]> => {
  try {
    const projectsPath = path.join(process.cwd(), '/content/projects')
    const projectsName = await fs.readdir(projectsPath)

    const projects = await Promise.all(
      projectsName.map(async (projectName) => {
        const filePath = path.join(projectsPath, projectName)
        const projectDetails = await readProjectFile(filePath)
        return projectDetails
      }),
    )

    // Sort projects by priority
    projects.sort((a, b) => a.priority - b.priority)

    return projects
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

const getAllBlogs = async () => {
  try {
    const postsPath = path.join(process.cwd(), '/content/blogs')
    const postsFilename = await fs.readdir(postsPath)

    const posts = await Promise.all(
      postsFilename
        .filter((file) => path.extname(file) === '.mdx')
        .map(async (file) => {
          const filePath = path.join(postsPath, file)
          const fileContent = await fs.readFile(filePath, 'utf8')
          const { data, content } = matter(fileContent)

          return { ...data, readingTime: readingTime(content).text, body: content } as BlogPost
        }),
    )

    posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())

    return posts
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

const getOneBlog = async (slug: string) => {
  const posts = await getAllBlogs()
  return posts.find((post) => post.slug === slug)
}

async function getAdjacentBlogs(slug: string) {
  // Ensure only frontmatter is used (exclude content)
  const posts = await getAllBlogs()

  const currentIndex = posts.findIndex((post) => post.slug === slug)
  if (currentIndex === -1) {
    throw new Error(`Blog with slug "${slug}" not found.`)
  }

  const previousBlog = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextBlog = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null

  return { previousBlog, nextBlog }
}

const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const testimonialsPath = path.join(process.cwd(), '/content/testimonials')
    const testimonialsName = await fs.readdir(testimonialsPath)

    const testimonials = await Promise.all(
      testimonialsName.map(async (projectName) => {
        const filePath = path.join(testimonialsPath, projectName)
        const projectDetails = await fs.readFile(filePath, 'utf8')
        return JSON.parse(projectDetails)
      }),
    )

    // Sort testimonials by date
    testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return testimonials
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

export { getAdjacentBlogs, getAllBlogs, getAllProjects, getOneBlog, getAllTestimonials }
