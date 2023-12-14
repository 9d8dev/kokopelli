import { notion } from "@/lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/hero";
import Grid from "@/components/grid";

export default async function Home() {
  const data = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });

  return (
    <main>
      <Hero
        title="Explore Kokopelli"
        cta="Get Started"
        cta_link="https://kokopelli.dev"
      >
        Discover the seamless integration of Next.js with Notion.
      </Hero>
      <Grid>
        {data.results.map(
          (result) =>
            result.properties?.status?.select?.name === "Published" && (
              <Link
                className="grid gap-4 group"
                key={result?.properties?.id?.unique_id?.number}
                href={`/${result.properties?.slug?.rich_text[0]?.text?.content}`}
              >
                {/* Featured Image */}
                <div className="h-52 w-full border rounded-md overflow-hidden">
                  <Image
                    src={result.properties?.image?.files[0]?.file?.url}
                    alt={`Image for ${result.properties?.name?.title[0]?.text?.content}`}
                    width={700}
                    height={500}
                    className="object-cover object-center w-full h-full transition-all group-hover:scale-105"
                  />
                </div>

                <div>
                  {/* Title */}
                  <h3 className="text-2xl mb-2 group-hover:opacity-70 transition-all">
                    {result.properties?.name?.title[0]?.text?.content}
                  </h3>
                  {/* Description */}
                  <p className="opacity-70">
                    {
                      result.properties?.description?.rich_text[0]?.text
                        ?.content
                    }
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {result.properties?.tags?.multi_select?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-secondary-200 dark:bg-secondary-700 px-2 text-xs py-1 rounded-md"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </Link>
            )
        )}
      </Grid>
    </main>
  );
}
