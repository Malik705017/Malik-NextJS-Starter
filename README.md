# Malik's NextJS Starter

This is a nextjs project bootstrapped with `create-next-app`, but using TypeScript and customized by me. I add redux, firebase and more tools/configuration such as pr template, prettier, pre-commit to make the DX better. You can make your side project with this starter to build your website.

![NextJS starter](https://user-images.githubusercontent.com/45000964/164965844-8c324764-39e7-44ff-b8b7-4ef152a3ed45.png)

[Demo link](https://malik-nextjs-starter.vercel.app/)


## Quick Start

To start it, you can download this project via zip. Then run the following command to install package (if you don't have yarn, you need to install via `npm install yarn` first)

```
yarn 
```

### Authentication with firebase
If you want to use firebase's authentication service, you need to create a firebase project. You can go to [firebase console](https://console.firebase.google.com/u/0/) to create it. Then go back to this project and add a `.env.local` file, put the following key and fill the value (those can be obtained from firebase)

```
AUTH_APIKEY = 
AUTH_ENDPOINT = "https://identitytoolkit.googleapis.com/v1" // Google RESTful API endpoint

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Deployment with vercel
For Deployment, I highly recommend you to use [Vercel](https://vercel.com), the best platform to deploy a NextJS project.


## Why use this starter

1. Well desinged structure
2. Reliable development tools
3. Redux best practice
