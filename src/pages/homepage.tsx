// pages/collections/[collection].jsx
import { BuilderComponent, builder } from '@builder.io/react';

// Replace with your Public API Key.
builder.init("c782aff3c66f48acb425981b997feb10");

export async function getStaticProps({ params }) {
  const homepage = await builder.get('homepage').toPromise();

  return {
    props: {
      homepage: homepage || null,
    },
  };
}

export default function Page({ homepage }) {
  return (
    <>
      {/* Put your header here. */}
      <BuilderComponent model="homepage" content={homepage} />
      {/* Put your footer here. */}
    </>
  );
}