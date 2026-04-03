/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your GitHub repository is named "Portfolio" and hosted on caglaeras.github.io/Portfolio, 
  // you must use basePath. For custom domains or User Pages, you may remove this.
  basePath: '/Portfolio',
};

module.exports = nextConfig;
