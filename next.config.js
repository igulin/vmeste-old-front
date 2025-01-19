/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.unsplash.com",
            "plus.unsplash.com",
            "localhost",
            "vmestebackend-app.ru",
            "igulin-vmeste-old-back-d991.twc1.net",
        ],
    },
};

module.exports = nextConfig;
