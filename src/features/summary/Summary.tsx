import { FC } from "react";
import cn from "classnames";

import styles from "./styles.module.css";

type SummaryProps = {
  title: string;
  content: string;
};

export const Summary: FC<SummaryProps> = ({ title, content }) => {
  return (
    <article className="min-h-screen flex flex-col p-24">
      <h2 className="text-lg font-semibold tracking-wide text-black mb-6">
        {title}
      </h2>
      <div className="flex flex-col tracking-normal justify-center">
        <p className="text-sm text-gray-700">{content}</p>
      </div>
    </article>
  );
};
