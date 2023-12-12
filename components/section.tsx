type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <section className={`p-6 sm:py-12 md:py-24 max-w-7xl m-auto ${className}`}>
      {children}
    </section>
  );
};

export default Section;
