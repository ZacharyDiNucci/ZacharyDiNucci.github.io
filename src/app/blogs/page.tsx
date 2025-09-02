import HorizontalBlogCard from '@/components/Blogs/HorizontalBlogCard'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import Divider from '@/components/UI/Divider'
import { getAllBlogs } from '@/services'

const Page = async () => {
  const posts = await getAllBlogs()

  return (
    <main className="mx-auto mt-8 max-w-[1200px] px-4 md:my-[3.75rem]">
      <SectionHeading title="// My Coding Blogs" />

      <div className="my-8 md:my-12">
        {posts.map((post, idx) => (
          <div key={post.slug}>
            <HorizontalBlogCard post={post} index={idx} />
            {idx < posts.length - 1 && <Divider single />}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Page
