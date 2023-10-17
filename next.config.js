/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dummyimage.com",
      "www.pexels.com",
      "res.cloudinary.com",
      "source.unsplash.com",
      "pixabay.com",
    ],
  },
};

module.exports = nextConfig;
