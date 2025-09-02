import { BlogPost } from '@/lib/types'
import { formatDate } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface HorizontalBlogCardProps {
  index?: number
  post: BlogPost
}

const HorizontalBlogCard: FC<HorizontalBlogCardProps> = ({ index = 0, post }) => {
  const { title, shortDescription, cover, slug, publishedDate, readingTime, tags } = post

  return (
    <Link
      href={`/blogs/${slug}`}
      className="hover:ring-border hover:ring-offset-primary flex flex-col-reverse gap-4 transition-all duration-300 ease-out hover:rounded-sm hover:ring hover:ring-offset-8 md:grid md:grid-cols-[auto_1fr_40%] md:hover:ring-offset-[16px] lg:grid-cols-[auto_1fr_30%]">
      <div className="border-neutral/20 text-neutral/20 hidden size-14 items-center justify-center rounded-full border-2 border-dotted font-medium md:flex">
        {index + 1}
      </div>

      <div className="space-y-2">
        <h3
          className={`text-accent hover:text-secondary-content line-clamp-2 text-[20px] leading-[1.3] font-medium transition-colors duration-300`}>
          {title}
        </h3>
        <p className="text-primary-content line-clamp-3 overflow-hidden text-sm leading-[1.4] text-ellipsis">
          {shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.trim()}
              className="bg-neutral/10 inline-block rounded-md px-2 py-[5px] capitalize backdrop-blur-[80px]">
              <span className="text-tag text-xs font-normal">{tag}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center">
          <time className="text-primary-content text-sm font-normal" dateTime={publishedDate}>
            {formatDate(publishedDate)}
          </time>
          <span className="text-primary-content relative ml-5 text-sm font-normal before:absolute before:top-1/2 before:left-[-11px] before:h-[2px] before:w-[2px] before:rounded-full before:bg-[#909090] before:content-['']">
            {readingTime}
          </span>
        </div>
      </div>

      <figure className="relative h-[210px] w-full">
        <Image src={cover} alt={title} fill className="rounded-sm" />
      </figure>
    </Link>
  )
}

export default HorizontalBlogCard
