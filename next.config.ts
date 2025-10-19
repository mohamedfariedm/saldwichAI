import createNextIntlPlugin from "next-intl/plugin";

// Create the `next-intl` plugin configuration
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://mizan.com.sa/api/:path*", // Proxy to external API
      },
    ];
  },
};

// Export the configuration with both next-intl and rewrites applied
export default withNextIntl(nextConfig);
