import React from 'react';
import { useRouter } from 'next/router';
import { BuilderComponent, builder } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';

// Replace with your Public API Key
builder.init("c782aff3c66f48acb425981b997feb10");

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

// import { Builder, BuilderComponent, builder } from '@builder.io/react';
// import { useRouter } from 'next/router';
// import type { GetStaticPaths, GetStaticProps } from 'next';
// import type { FC } from 'react';
// import DefaultErrorPage from 'next/error';

// const BUILDER_API_KEY = process.env.BUILDER_API_KEY || '';
// builder.init("50f519d641444bbbbab91d6d5acf254f");


// interface PostProps {
//   post: any;
//   posts?: any;
//   categories?: any;
//   authors?: any;
//   sidebarCopy?: any;
//   isListing?: boolean;
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const slug = params?.post ? params.post[0] : '';

//   const post = await builder
//     .get('blog-post', {
//       userAttributes: {
//         urlPath: '/resource-center/blog/' + slug,
//       },
//     })
//     .toPromise();

//   const notFoundData = await builder.get('not-found-page', {}).toPromise();
//   const componentHeader = await builder.get('component-header', {}).toPromise();
//   const componentFooter = await builder.get('component-footer', {}).toPromise();

//   let posts = null;
//   let categories = null;
//   let authors = null;
//   let sidebarCopy = null;

//   const isListing = slug === '';

//   if (isListing) {
//     posts = await builder.getAll('blog-post', {
//       options: { noTargeting: true },
//       fields: 'data',
//       includeRefs: true,
//       query: {
//         'name': {$ne: 'Blog Listing - DO NOT DELETE'},
//       },
//     });
//     console.log("all posts", posts);
    
//     (categories = await builder.getAll('blog-category')), { options: { noTargeting: true } };
//     (authors = await builder.getAll('entity-person')), { options: { noTargeting: true } };
//     sidebarCopy = await builder.get('listing-sidebar-copy', { fields: 'data' }).toPromise();
//   }

//   return {
//     props: {
//       post: post || null,
//       notFoundData,
//       componentHeader,
//       componentFooter,
//       posts,
//       categories,
//       authors,
//       isListing,
//       sidebarCopy,
//     },
//     revalidate: 5,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const posts = await builder.getAll('blog-post', {
//     fields: 'data.url',
//     options: { noTargeting: true },
//     limit: 0,
//   });

//   return {
//     paths: posts.map(post => `${post.data?.url}`),
//     fallback: true,
//   };
// };

// const BlogPostDetail: FC<PostProps> = ({
//   post,
//   posts,
//   authors,
//   categories,
//   isListing,
//   sidebarCopy,
// }) => {
//   const router = useRouter();
//   if (router.isFallback) {
//     return <h1>Loading...</h1>;
//   }
//   const isLive = !Builder.isEditing && !Builder.isPreviewing && !router.isFallback;

//   if (!post && isLive) {
//     return (
//       <DefaultErrorPage statusCode={404} />
//     );
//   }

//   const blogData = post?.data?.blogInformation;
//   const background = post?.data?.heroBackground;
//   const featuredImageData = post?.data?.featuredImage;
//   const blogCategoryLabel = blogData?.blogCategory?.value?.data?.categoryTitle;
//   const seoData = post?.data?.seo;

//   console.log("posts:", JSON.stringify({ posts, categories, authors, sidebarCopy }));

//   return (
//       <BuilderComponent
//         content={post}
//         model="blog-post"
//         options={{ includeRefs: true, cachebust: true }}
//         data={{ postData: JSON.stringify({ posts, categories, authors, sidebarCopy }) }}
//       />
//   );
// };

// export default BlogPostDetail;

