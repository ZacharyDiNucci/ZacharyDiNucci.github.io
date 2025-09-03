'use client'
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  className?: string
  children: React.ReactNode
}

const customStyle = {
  lineHeight: '1.5',
  fontSize: '14px',
  borderBottomLeftRadius: '5px',
  borderBottomRightRadius: '5px',
  padding: '20px',
  marginTop: '0px',
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children, ...props }) => {
  const language = className?.replace('language-', '') || ''
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (className) {
    // Block code
    return (
      <div className="relative mb-5">
        <div>
          <button
            onClick={handleCopy}
            className={`absolute top-2 right-2 transform rounded-md bg-blue-600/20 px-3 py-0.5 text-sm text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700/20`}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <SyntaxHighlighter
          style={coldarkDark}
          language={language}
          customStyle={customStyle}
          PreTag="div"
          showLineNumbers
          wrapLines
          {...props}>
          {String(children).trim()}
        </SyntaxHighlighter>
      </div>
    )
  } else {
    // Inline code
    return (
      <code {...props} className="rounded-sm bg-gray-200 px-1 py-0.5 font-mono text-red-500">
        {children}
      </code>
    )
  }
}

export default CodeBlock
