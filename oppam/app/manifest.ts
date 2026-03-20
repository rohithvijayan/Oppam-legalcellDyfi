import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oppam | Cyber Neethi Support Portal',
    short_name: 'Oppam',
    description: 'Free legal support portal for cybercrime victims in Kerala.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#cf0000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
