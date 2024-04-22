/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    sassOptions: {
        prependData:
            '@import "src/styles/abstracts/_variables.scss";@import "src/styles/abstracts/_palette.scss";@import "src/styles/abstracts/_fonts.scss";@import "src/styles/abstracts/_mixins.scss";',
    },
};

export default nextConfig;
