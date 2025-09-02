import AdjacentBlogs from '@/components/Blogs/AdjacentBlogs'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { Post } from '@/components/Markdown/Post'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import { getAllBlogs, getOneBlog } from '@/services'
import { formatDate } from '@/utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface StaticParams {
  slug: string
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<StaticParams[]> {
  const posts = await getAllBlogs()

  return posts.map((post) => {
    return {
      slug: `${post.slug}`,
    }
  })
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page(props: PageProps) {
  const params = await props.params

  const { slug } = params

  const post = await getOneBlog(slug)

  if (!post) return notFound()

  const breadcrumbs = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Blogs',
      href: '/blogs',
    },
    {
      label: post.title,
      href: `/blogs/${slug}`,
    },
  ]

  return (
    <main className="relative mx-auto max-w-[1200px] gap-4 p-4 lg:grid lg:grid-cols-[auto_minmax(280px,auto)] lg:justify-between">
      <article className="mx-auto mb-10 max-w-[850px]">
        <header>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <h1 className="text-accent text-4xl leading-[1.2] font-extrabold md:text-5xl md:leading-[1.2]">
            {post.title}
          </h1>
          <p className="text-primary-content mt-2 text-sm">
            Published on: {formatDate(post.publishedDate)}
          </p>
        </header>

        <section className="my-5">
          <figure className="relative h-[250px] w-full md:h-[320px] lg:h-[400px] xl:h-[450px]">
            <Image
              src={post.cover}
              alt={post.title}
              fill={true}
              sizes="100%"
              className="rounded-md"
            />
          </figure>
        </section>

        <aside className="sticky top-4 right-0 z-10 lg:absolute lg:top-0 lg:h-full lg:max-w-[280px]">
          <div className="static top-12 lg:sticky lg:my-12">
            <TableOfContents />
          </div>
        </aside>

        <section>
          <Post>{post.body}</Post>
        </section>

        <hr className="border-border my-8" />
        <AdjacentBlogs currentSlug={post.slug} />
      </article>
    </main>
  )
}
