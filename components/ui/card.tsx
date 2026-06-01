import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card({
  title,
  children
}: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-3">
        {title}
      </h2>

      {children}
    </div>
  );
}