import { Fragment } from "react";
import { getDatabase, getBlocks, getPageFromSlug } from "@/lib/notion-block";
import { renderBlock } from "@/components/notion-render";

export async function generateStaticParams() {
  const database = await getDatabase();
  return (
    // @ts-ignore
    database?.map((page: PageObjectResponse) => {
      // @ts-ignore
      const slug = page.properties.slug.rich_text[0]?.text?.content;
      return { id: page.id, slug };
    }) ?? []
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageFromSlug(params.slug);
  // @ts-ignore
  const blocks = await getBlocks(page?.id);
  // @ts-ignore
  const title = page.properties?.name?.title[0]?.plain_text;

  if (!page || !blocks) {
    return <div />;
  }

  return (
    <div>
      <article className="prose prose-headings:font-normal prose-p:font-light dark:prose-invert">
        <h1>{title}</h1>
        <section>
          {blocks.map((block: BlockObjectResponse) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
        {/* @ts-ignore */}
        <a href={page.properties?.url?.url}>{page.properties?.url?.url}</a>
      </article>
    </div>
  );
}
