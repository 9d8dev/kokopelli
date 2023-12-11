import { notion } from "@/lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";

export default async function Home() {
  const data: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm space-y-4">
        {/* TO-DO: Update this to the correct type to avoid using 'any' */}
        {data.results.map((result: any) => (
          <div key={result?.properties?.id?.unique_id?.number}>
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
