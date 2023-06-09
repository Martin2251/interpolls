import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
export interface Notices {
  forename: string;
  date_of_birth: string;
  entity_id: string;
  nationalities: string[];
  name: string;
  _links: Links;
}

export interface Links {
  self: Images;
  images: Images;
  thumbnail: Images;
}

export interface Images {
  href: string;
}

const Home: NextPage = () => {
  const [notices, setNotices] = useState<Notices[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // search the api
    async function fetchData() {
      setLoading(true);
      const data = await fetch(
        `https://ws-public.interpol.int/notices/v1/red?forename=${search}&resultPerPage=200`
      ).then((res) => res.json());
      setNotices(data._embedded.notices);
      setLoading(false);
    }
    fetchData();
  }, [search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <input
          type="search"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        {notices.map((notice) => {
          return (
            <div key={notice.entity_id} className={styles.notice}>
              {notice._links?.thumbnail.href && (
                <Image
                  src={notice._links.thumbnail.href}
                  width="100px"
                  height="100px"
                  alt={notice.name}
                />
              )}
              <div className={styles.notice_body}>
                <p>
                  {notice.forename} {notice.name}
                </p>
                <p>{notice.date_of_birth}</p>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
