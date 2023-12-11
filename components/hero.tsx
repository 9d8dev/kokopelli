import Section from "./section";

type HeroProps = {
  title: string;
  children: React.ReactNode;
};

const Hero: React.FC<HeroProps> = ({ title, children }) => {
  return (
    <Section>
      <h1>{title}</h1>
      <h2>{children}</h2>
    </Section>
  );
};

export default Hero;
