import Head from 'next/head';
import type { FC } from 'react';

type HeadIngecterProps = {
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_image?: string;
};

const HeadIngecter: FC<HeadIngecterProps> = ({ title, description, og_title, og_description, og_url, og_image }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {og_title && <meta property="og:title" content={og_title} />}
      {og_description && <meta property="og:description" content={og_description} />}
      {og_url && <meta property="og:url" content={og_url} />}
      {og_image && <meta property="og:image" content={og_image} />}
    </Head>
  );
};

export default HeadIngecter;
