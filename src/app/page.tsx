import { skillList } from '@/appData'
import BlogSection from '@/components/Blogs/BlogSection'
import ContactSection from '@/components/Contact/ContactSection'
import Hero from '@/components/Hero/Hero'
import ProjectSection from '@/components/Projects/ProjectSection'
import ServiceSection from '@/components/Services/ServiceSection'
import Skills from '@/components/Skills/Skills'
import TestimonialSection from '@/components/Testimonials/TestimonialSection'
import { getAllBlogs, getAllProjects, getAllTestimonials } from '@/services'

export default async function Home() {
  const projects = await getAllProjects()
  const testimonials = await getAllTestimonials()

  const posts = await getAllBlogs()
  const latestPosts = posts.slice(0, 4)

  return (
    <main>
      <Hero />
      <Skills skills={skillList} />
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <ProjectSection projects={projects} />
        <ServiceSection />
        <BlogSection posts={latestPosts} />
        <TestimonialSection testimonials={testimonials} />
        <ContactSection />
      </div>
    </main>
  )
}
