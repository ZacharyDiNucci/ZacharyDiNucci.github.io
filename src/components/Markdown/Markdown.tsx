import { MDXComponents } from 'mdx/types'
import CodeBlock from './CodeBlock'

const CodeBlockWrapper: React.FC<
  React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
> = (props) => {
  return <CodeBlock {...props} className={props.className} children={props.children} />
}

export const Markdown: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      id={(children as string).replace(/\s+/g, '-').toLowerCase()}
      className="text-secondary-content mt-9 mb-5 text-3xl leading-tight font-medium md:text-4xl">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      id={(children as string).replace(/\s+/g, '-').toLowerCase()}
      className="text-secondary-content mt-7 mb-4 text-2xl leading-tight font-medium md:text-3xl">
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      {...props}
      id={(children as string).replace(/\s+/g, '-').toLowerCase()}
      className="text-secondary-content mt-7 mb-4 text-2xl leading-tight font-medium">
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="text-tertiary-content mb-4 text-lg text-[16px] leading-loose">
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="text-sky-500 underline duration-100 hover:text-blue-600"
      target="_blank">
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className="text-tertiary-content mb-4 list-inside list-disc pl-6 text-lg leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className="text-tertiary-content mb-4 list-inside list-decimal pl-6 text-lg leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="mb-2">
      {children}
    </li>
  ),
  img: ({ children, ...props }) => (
    <img {...props} className="mb-4 h-auto max-w-full">
      {children}
    </img>
  ),
  hr: () => <hr className="bg-border my-8 h-px border-0" />,
  code: CodeBlockWrapper,
  CodeBlock: CodeBlockWrapper,
}
