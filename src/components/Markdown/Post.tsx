import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeCodeTitles from 'rehype-code-titles'
import { Markdown } from './Markdown'

export function Post({ children }: { children: React.ReactNode }) {
  return (
    <MDXRemote
      source={typeof children === 'string' ? children : ''}
      options={{
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [rehypeCodeTitles],
        },
      }}
      components={Markdown}
    />
  )
}
