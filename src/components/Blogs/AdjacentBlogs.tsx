import { getAdjacentBlogs } from '@/services'
import { ArrowLeftIcon, ArrowRightIcon } from '@/utils/icons'
import Link from 'next/link'

type Props = {
  currentSlug: string
}

export default async function AdjacentBlogs({ currentSlug }: Props) {
  const { previousBlog, nextBlog } = await getAdjacentBlogs(currentSlug)

  return (
    <div className="mt-8">
      <h4 className="text-primary-content mb-4 text-2xl font-bold">Related Posts</h4>

      <div className="cursor-pointer space-y-4">
        {previousBlog && (
          <div className="hover:bg-secondary border-border flex items-center rounded-md border p-4 transition-all duration-300 ease-out">
            <ArrowLeftIcon className="text-accent mr-3 size-5" />
            <Link href={`/blogs/${previousBlog.slug}`} passHref>
              <h4 className="text-accent text-lg font-semibold">{previousBlog.title}</h4>
            </Link>
          </div>
        )}

        {nextBlog && (
          <div className="hover:bg-secondary border-border flex items-center rounded-md border p-4 transition-all duration-300 ease-out">
            <Link href={`/blogs/${nextBlog.slug}`} passHref>
              <div className="flex items-center">
                <ArrowRightIcon className="text-accent mr-3 size-5" />
                <h4 className="text-accent text-lg font-semibold">{nextBlog.title}</h4>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
