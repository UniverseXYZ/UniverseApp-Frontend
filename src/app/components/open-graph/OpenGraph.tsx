import Head from 'next/head';
import { useRouter } from 'next/router';

interface IOpenGraphProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

export const OpenGraph = (props: IOpenGraphProps) => {
  const { title, description, image, imageAlt } = props;

  const router = useRouter();

  const url = `${process.env.REACT_APP_BASE_URL}/${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      {description && (<meta name="description" content={description} />)}

      {/*OPEN GRAPH*/}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Universe" />
      <meta property="og:title" content={title} />
      {description && (<meta property="og:description" content={description} />)}
      {image && (<meta property="og:image" content={image} />)}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      {/*TWITTER*/}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@universe_xyz" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      {description && (<meta name="twitter:description" content={description} />)}
      {image && (<meta name="twitter:image" content={image} />)}
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {/*SCHEMA.ORG*/}
      <meta itemProp="name" content={title} />
      {description && (<meta itemProp="description" content={description} />)}
      {image && (<meta itemProp="image" content={image} />)}
    </Head>
  );
};
