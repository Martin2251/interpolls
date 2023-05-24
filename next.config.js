/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["ws-public.interpol.int"]
  }
}

module.exports = nextConfig
