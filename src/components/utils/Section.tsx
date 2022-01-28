import React, { CSSProperties } from 'react';

export interface BareProps {
  className?: string;
  style?: CSSProperties;
}

type Props = React.PropsWithChildren<
  BareProps & {
    id?: string;
    className?: string;
    title?: React.ReactNode;
    level?: number;
  }
>;

export const Section = ({
  title,
  level = 2,
  className,
  id,
  children,
}: Props) => {
  const renderTitle = () => {
    if (!title) return null;

    const className = 'DfSection-title';
    return React.createElement(`h${level}`, { className }, title);
  };

  return (
    <div className="DfSectionOuter">
      <section id={id} className={`DfSection ${className}`}>
        {renderTitle()}
        {children}
      </section>
    </div>
  );
};

export default Section;
