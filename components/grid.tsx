import Section from "./section";

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className }) => {
  return (
    <Section>
      <div className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 ${className}`}>
        {children}
      </div>
    </Section>
  );
};

export default Grid;
