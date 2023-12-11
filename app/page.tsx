import { notion } from "@/lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/hero";
import Grid from "@/components/grid";

export default async function Home() {
  const data: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });

  return (
    <main>
      <Hero title="Welcome to Kokopelli">
        A next js and notion starter theme.
      </Hero>
      <Grid>
        {data.results.map((result: any) => (
          <div key={result?.properties?.id?.unique_id?.number}>
            <div className="h-52 w-full overflow-hidden">
              <Image
                src={result.properties?.image?.files[0]?.file?.url}
                alt={`Image for ${result.properties?.name?.title[0]?.text?.content}`}
                width={700}
                height={500}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <p>ID: {result.properties?.id?.unique_id?.number}</p>
            <p>updated: {result.properties?.updated_at?.last_edited_time}</p>
            <p>created: {result.properties?.created_at?.created_time}</p>
            <p>status: {result.properties?.status?.select?.name}</p>
            <div>
              tags:{" "}
              {result.properties?.tags?.multi_select?.map(
                (tag: Tag, index: number) => (
                  <span key={index} className="tag">
                    {tag.name}
                  </span>
                )
              )}
            </div>
            <p>
              description:{" "}
              {result.properties?.description?.rich_text[0]?.text?.content}
            </p>
            <p>url: {result.properties?.url?.url}</p>
            <p>name: {result.properties?.name?.title[0]?.text?.content}</p>
            <Link
              href={`/${result.properties?.slug?.rich_text[0]?.text?.content}`}
            >
              slug: {result.properties?.slug?.rich_text[0]?.text?.content}
            </Link>
          </div>
        ))}
      </Grid>
    </main>
  );
}
