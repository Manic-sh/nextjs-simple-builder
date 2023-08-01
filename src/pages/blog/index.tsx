import { builder, BuilderComponent } from "@builder.io/react";
import NextLink from 'next/link';

builder.init("3f2e4166c5a949bb8a361a63d655f7e9");

const articlesPerPage = 30;


const Link: React.FC<React.AnchorHTMLAttributes<any>> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href!} {...props}>
      {children}
    </NextLink>
  )
}



function Blog({ articles }: any) {
  return (
      <>
      <h1 style={{fontSize: "32px", textAlign: "center"}}> Builder IO Next JS Blog </h1>
      <BuilderComponent
              name="page"
              content={articles}
              options={{ includeRefs: true }}
            />
    <div style={{ display: "flex", gap: "2rem;", marginTop: "20px", alignItems: "center", justifyContent: "center"}}>
      {articles.map((item: any, index: number) => (
        <div style={{ display: "flex", color: "#fff"}} key={index}>
            <Link href={`/blog/${item?.data?.handle}`}>
                <div style={{cursor: "pointer", overflow: "hidden", width: 300 }}>
                    <div style={{ width: 300, height: 400, display: "block" }}>
                    <img src={item?.data?.image} />
                    </div>
                    {item?.data?.title}
                    {item?.data?.description}
                </div>
            </Link>
        </div>
      ))}
     </div>
    </>
  );
}

export async function getStaticProps({ query }: any) {
  const articles = await builder.getAll("blog-article", {
    // Include references, like the `author` ref
    options: { includeRefs: true },
    // For performance, don't pull the `blocks` (the full blog entry content)
    // when listing
    omit: "data.blocks",
    limit: articlesPerPage,
  });

  return {props:{ articles}};
}

export default Blog;
