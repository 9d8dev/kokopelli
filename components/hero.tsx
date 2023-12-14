import Section from "./section";
import { ArrowRightIcon, RocketIcon } from "@radix-ui/react-icons";

type HeroProps = {
  title: string;
  children: React.ReactNode;
  cta?: string;
  cta_link?: string;
};

const Hero: React.FC<HeroProps> = ({ title, children, cta, cta_link }) => {
  return (
    <Section className="text-center grid gap-6 items-center justify-center border rounded-xl">
      <a
        href={cta_link}
        className="flex gap-1 text-xs items-center m-auto border w-fit rounded-lg px-2 py-1 opacity-80 hover:opacity-100 transition-all"
      >
        Discover headless Notion using Next JS <ArrowRightIcon />
      </a>
      <h1 className="text-6xl font-normal max-w-2xl">{title}</h1>
      <h2>{children}</h2>
      {cta && (
        <a
          href={cta_link}
          className="mt-4 flex items-center gap-2 w-fit m-auto transition-all bg-primary-600 text-white font-semibold py-2 px-4 rounded hover:bg-primary-500"
        >
          {cta} <RocketIcon />
        </a>
      )}
    </Section>
  );
};

export default Hero;
