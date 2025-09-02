import { Metadata } from 'next'

const title = 'My Coding Blogs - Learn, Stay Updated, and Grow'
const description =
  'Explore Development blogs for the latest coding news, new course launches, learning tips, and helpful guides. Your journey to better learning starts here!'

const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`

export const metadata: Metadata = {
  applicationName: 'John Doe Portfolio',
  title,
  description,
  category: 'education',
  alternates: {
    canonical: url,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  openGraph: {
    title,
    description,
    url,
    siteName: 'John Doe Portfolio',
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@Basit_Miyanji',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
