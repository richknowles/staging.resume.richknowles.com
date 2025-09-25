/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Make sure assets resolve correctly no matter the domain
  basePath: '',
  assetPrefix: '',
};

module.exports = nextConfig;
