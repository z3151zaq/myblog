import createMDX from '@next/mdx'
import langHttp from 'highlight.js/lib/languages/http'
import langNginx from 'highlight.js/lib/languages/nginx'
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
    options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)