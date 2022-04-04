This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Configure your URL database and jwtSecret in `config.env`

```env
  MONGO_URI="YOUR_MONGO_URI"
  jwtSecret="YOUR_JWT_SECRET"
```

Configure your URL Cloudinary in `next.config.js`

```env
  CLOUDINARY_URL: "YOUR_URL_CLOUDINARY",
```

Configure your email for nodemailer in `config.env`

```env
  YOUR_EMAIL: "YOUR_EMAIL"
  YOUR_EMAIL_PASSWORD: "YOUR_EMAIL_PASSWORD"
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Demo

[Demo app](https://social-media-app-nextjs-rouge.vercel.app/)
