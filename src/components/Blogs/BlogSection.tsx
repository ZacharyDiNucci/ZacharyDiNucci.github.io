import { BlogPost } from '@/lib/types'
import SectionHeading from '../SectionHeading/SectionHeading'
import Divider from '../UI/Divider'
import BlogCard from './BlogCard'

interface BlogSectionProps {
  posts: BlogPost[]
}

const BlogSection = async ({ posts }: BlogSectionProps) => {
  return (
    <section id="blogs">
      <SectionHeading title="// Latest Blogs" />

      <div className="my-8 grid grid-cols-1 gap-8 md:my-12 lg:grid-cols-[60%_1fr]">
        <BlogCard key={posts[0].slug} index={0} post={posts[0]} large />
        <div>
          <SectionHeading title="// Other Blogs" className="mb-7 [&>h2]:text-[20px]!" />
          {posts.slice(1).map((post, idx) => (
            <div key={post.slug}>
              <BlogCard index={idx} post={post} />
              {idx < posts.length - 2 && <Divider />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
