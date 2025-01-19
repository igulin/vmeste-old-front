/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.unsplash.com",
            "plus.unsplash.com",
            "localhost",
            "vmestebackend-app.ru",
            "igulin-vmeste-old-front-9961.twc1.net",
        ],
    },
};

module.exports = nextConfig;
