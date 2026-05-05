import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      {
        source: '/works/inquiry-automation.html',
        destination: '/works/inquiry-automation',
        permanent: true,
      },
      {
        source: '/works/podtube-pipeline.html',
        destination: '/works/podtube-pipeline',
        permanent: true,
      },
      {
        source: '/works/faq-rag.html',
        destination: '/works/faq-rag',
        permanent: true,
      },
      {
        source: '/experiments/index.html',
        destination: '/experiments',
        permanent: true,
      },
      {
        source: '/experiments/youtube-summary.html',
        destination: '/experiments/youtube-summary',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
