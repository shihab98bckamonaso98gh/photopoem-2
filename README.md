
# PhotoPoem

This is a Next.js application that allows users to generate poems from images using AI.

## Features

- **Image to Poem:** Upload an image or provide a URL to generate a unique poem.
- **Customization:** Choose the poem's tone, style, language, and number of lines.
- **Responsive Design:** Works beautifully on desktops, tablets, and mobile devices.
- **Dark/Light Mode:** Switch between themes for your viewing preference.
- **Multi-language Support:** UI available in English and Bangla.

## Deployment to Vercel

To deploy this project to Vercel, follow these steps:

1.  **Fork and Clone:** Fork this repository and clone it to your local machine.
2.  **Push to Your Git Provider:** Push the code to your own GitHub, GitLab, or Bitbucket repository.
3.  **Import Project on Vercel:** Go to your Vercel dashboard and import the project from your Git repository.
4.  **Configure Build Settings:** Vercel will automatically detect that this is a Next.js project. The default build command (`next build`) and output directory are correct.
5.  **Configure Environment Variables:** This is a critical step.
    *   In your Vercel project settings, navigate to the **Environment Variables** section.
    *   Add a new environment variable named `GOOGLE_API_KEY`.
    *   Paste your Google AI API key as the value. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
6.  **Deploy:** Trigger a deployment. Vercel will build and deploy your application.

You can then access your live PhotoPoem app at the URL provided by Vercel.
