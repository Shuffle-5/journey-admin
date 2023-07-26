/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'app')]
  }
}

module.exports = nextConfig
