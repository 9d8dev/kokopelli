type HeroProps = {
  title: string;
  children: React.ReactNode;
};

const Hero: React.FC<HeroProps> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{children}</h2>
    </div>
  );
};

export default Hero;
