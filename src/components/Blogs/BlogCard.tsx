import { BlogPost } from '@/lib/types'
import { formatDate } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface BlogCardProps {
  index?: number
  large?: boolean
  post: BlogPost
}

const BlogCard: FC<BlogCardProps> = ({ post, large, index = 0 }) => {
  const { slug, title, cover, shortDescription, tags, publishedDate, readingTime } = post

  return (
    <div>
      <Link
        href={`/blogs/${slug}`}
        className="hover:ring-border hover:ring-offset-primary flex items-start gap-4 no-underline transition-all duration-300 ease-out hover:rounded-md hover:ring hover:ring-offset-8">
        {!large && (
          <h5 className="text-neutral/20 text-[56px] leading-[68px] font-bold">0{index + 1}</h5>
        )}

        <div className="w-full">
          {large && (
            <>
              <figure className="relative mb-8 h-[200px] w-full md:h-[400px]">
                <Image src={cover} alt={title} fill />
              </figure>
              <div className="mb-1.5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag.trim()}
                    className="bg-neutral/10 inline-block rounded-md px-2 py-[5px] capitalize backdrop-blur-[80px]">
                    <span className="text-tag text-xs font-normal">{tag}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3
            className={`${large ? 'text-[30px] font-bold md:text-[40px]' : 'text-[20px] font-medium'} text-accent mt-2 mb-1.5 line-clamp-3 leading-[1.3]`}>
            {title}
          </h3>
          <p className="text-primary-content mb-1.5 line-clamp-3 overflow-hidden text-sm leading-[1.4] text-ellipsis">
            {shortDescription}
          </p>

          {!large && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.trim()}
                  className="bg-neutral/10 inline-block rounded-md px-2 py-[5px] capitalize backdrop-blur-[80px]">
                  <span className="text-tag text-xs font-normal">{tag}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-7 flex items-center">
            <time className="text-primary-content text-sm font-normal" dateTime={publishedDate}>
              {formatDate(publishedDate)}
            </time>
            <span className="text-primary-content relative ml-5 text-sm font-normal before:absolute before:top-1/2 before:left-[-11px] before:h-[2px] before:w-[2px] before:rounded-full before:bg-[#909090] before:content-['']">
              {readingTime}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard
