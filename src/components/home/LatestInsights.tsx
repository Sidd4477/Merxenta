
import Image from "next/image";
import styles from "./LatestInsights.module.css";

type Insight = {
  id: number;
  image: string;
  imageAlt: string;
  date: string;
  title: string;
};

const insights: Insight[] = [
  {
    id: 1,
    image: "/images/home/news/1.png",
    imageAlt: "Industrial manufacturing facility",
    date: "10 October 2026",
    title: "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 2,
    image: "/images/home/news/2.png",
    imageAlt: "Shipping containers at a logistics terminal",
    date: "4 hours ago",
    title: "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 3,
    image: "/images/home/news/3.png",
    imageAlt: "Modern industrial production facility",
    date: "10 October 2026",
    title: "Closed-loop recycling pilot launches at three hubs.",
  },
];

export default function LatestInsights() {
  return (
    <section
      className={styles.insightsSection}
      aria-labelledby="latest-insights-title"
    >
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.headingArea}>
          <h2
            id="latest-insights-title"
            className={styles.mainHeading}
          >
            <span className={styles.headingNormal}>
              Latest
            </span>

            <span className={styles.headingScript}>
              Insights
            </span>
          </h2>
        </div>

        {/* Insights Grid */}
        <div className={styles.insightsGrid}>
          {insights.map((insight) => (
            <article
              key={insight.id}
              className={styles.insightCard}
            >
              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={insight.image}
                  alt={insight.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 384px"
                  className={styles.insightImage}
                />
              </div>

              {/* Date / Eyebrow */}
              <p className={styles.insightDate}>
                {insight.date}
              </p>

              {/* Insight Title */}
              <h3 className={styles.insightTitle}>
                {insight.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
