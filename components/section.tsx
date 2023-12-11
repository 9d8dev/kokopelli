type SectionProps = {
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Section;
