// /** @type {import('next').NextConfig} */
// const nextConfig = {
//    reactStrictMode: true,
// }
// module.exports = nextConfig
const withPWA = require('next-pwa');

const settings = {
  env: {
  },
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: 'public',
  },
};

module.exports = settings;