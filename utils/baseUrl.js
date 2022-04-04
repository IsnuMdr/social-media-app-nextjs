const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://social-media-app-nextjs-rouge.vercel.app";

module.exports = baseUrl;
