{
  "framework": "vite",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": "dist",
  "env": {
    "NODE_VERSION": "18.x"
  },
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/instagram",
      "destination": "https://www.instagram.com/mason683847"
    },
    {
      "source": "/youtube",
      "destination": "https://www.youtube.com/@MasonSterling-r3p"
    },
    {
      "source": "/soundcloud",
      "destination": "https://on.soundcloud.com/6KsGuPyfdgfRbJPfhJ"
    },
    {
      "source": "/suno",
      "destination": "https://suno.com/@masonsterling"
    }
  ]
}
