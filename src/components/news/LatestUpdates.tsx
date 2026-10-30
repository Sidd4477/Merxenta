
import Image from "next/image";
import styles from "./LatestUpdates.module.css";

/* ==========================================
   MERXENTA - LATEST UPDATES
========================================== */

type NewsItem = {
  id: number;
  image: string;
  date: string;
  title: string;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: "/images/news/1.png",
    date: "4 hours ago",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 2,
    image: "/images/news/2.png",
    date: "10 October 2026",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 3,
    image: "/images/news/3.png",
    date: "10 October 2026",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 4,
    image: "/images/news/1.png",
    date: "4 hours ago",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 5,
    image: "/images/news/2.png",
    date: "10 October 2026",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 6,
    image: "/images/news/3.png",
    date: "10 October 2026",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
];

export default function LatestUpdates() {
  return (
    <section
      className={styles.newsSection}
      aria-labelledby="latest-updates-heading"
    >
      <div className={styles.container}>

        {/* ==================================
            MAIN HEADING
        ================================== */}

        <h1
          id="latest-updates-heading"
          className={styles.mainHeading}
        >
          <span className={styles.normalText}>
            Latest
          </span>

          <span className={styles.scriptText}>
            updates
          </span>
        </h1>

        {/* ==================================
            NEWS CARDS GRID
        ================================== */}

        <div className={styles.newsGrid}>
          {newsItems.map((item) => (
            <article
              key={item.id}
              className={styles.newsCard}
            >

              {/* IMAGE */}

              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 384px"
                  className={styles.newsImage}
                  priority={item.id <= 3}
                />
              </div>

              {/* DATE */}

              <p className={styles.newsDate}>
                {item.date}
              </p>

              {/* TITLE */}

              <h2 className={styles.newsTitle}>
                {item.title}
              </h2>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
