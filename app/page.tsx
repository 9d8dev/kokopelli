import { notion } from "@/lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const data: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });

  return (
    <main>
      <div className="">
        {/* TO-DO: Update this to the correct type to avoid using 'any' */}
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
      </div>
    </main>
  );
}
