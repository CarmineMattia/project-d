import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2>{children}</h2>;
};

export default Card;
