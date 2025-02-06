import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://git-verse.vercel.app';

  return [
    { url: `${siteUrl}/`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/fa`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/en`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/fa/about-us`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/en/about-us`, lastModified: new Date().toISOString() },
  ];
}
