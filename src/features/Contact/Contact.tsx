import { FC } from "react";
import L from "next/link";

import { ContactProps } from "./types";

export const ContactInfo: FC<ContactProps> = ({ data: { data } }) => {
  return (
    <section>
      <address>
        <p>{data.attributes.email}</p>
        <p>{data.attributes.phone}</p>
      </address>
      <div>
        <h2>social media links</h2>
        <ul>
          {data.attributes.social?.map((social) => {
            return (
              <li key={social.label}>
                <a href={social.url}>{social.label}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
