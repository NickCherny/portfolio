import { FC } from "react";
import Image from "next/image";
import { SummaryProps } from "./types";

export const Summary: FC<SummaryProps> = ({ title, content }) => {
  return (
    <section className="min-h-screen flex flex-col p-8">
      <h2 className="text-2xl font-semibold tracking-wide text-black mb-6">
        {title}
      </h2>
      <div className="flex flex-col tracking-normal justify-center">
        <p className="text-sm text-gray-700">{content}</p>
      </div>
      <Image
        src="/working.png"
        alt="Nick is working"
        width={600}
        height={400}
      />
    </section>
  );
};
