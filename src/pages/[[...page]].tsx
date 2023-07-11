import React from 'react';
import { useRouter } from 'next/router';
import { BuilderComponent, builder } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';

// Replace with your Public API Key
builder.init("3f2e4166c5a949bb8a361a63d655f7e9");

// const myObj = {
//   name: 'Ross',
//   writing: true,
//   enjoyment: 10,
//   meta: {
//     minutesWriting: 20,
//     minutesProcrastinating: 0,
//   }
// };

export async function getStaticProps({ params }: any) {
  // Fetch the builder content
  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + (params?.page?.join('/') || ''),
      },
     
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5
  };
}

export async function getStaticPaths() {
  // Get a list of all pages in builder
  const pages = await builder.getAll('page', {
    // We only need the URL field
    fields: 'data.url', 
    options: { noTargeting: true },
  });

  return {
    paths: pages.map(page => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({ page }: any) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  if (!page && !true) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{page?.data.title}</title>
      </Head>
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={page} />
    </>
  );
}


