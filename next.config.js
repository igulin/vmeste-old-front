/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.unsplash.com",
            "plus.unsplash.com",
            "localhost",
            "vmestebackend-app.ru",
        ],
    },
};

module.exports = nextConfig;
