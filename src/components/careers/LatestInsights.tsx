
import Image from "next/image";
import styles from "./LatestInsights.module.css";

/* ==========================================
   MERXENTA - LATEST INSIGHTS
========================================== */

type Insight = {
  id: number;
  image: string;
  date: string;
  title: string;
};

const insights: Insight[] = [
  {
    id: 1,
    image: "/images/careers/insights/insights1.png",
    date: "4 hours ago",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 2,
    image: "/images/careers/insights/insights2.png",
    date: "10 October 2026",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
  {
    id: 3,
    image: "/images/careers/insights/insights3.png",
    date: "10 October 2026",
    title:
      "Closed-loop recycling pilot launches at three hubs.",
  },
];

export default function Insights() {
  return (
    <section
      className={styles.insightsSection}
      aria-labelledby="insights-heading"
    >
      <div className={styles.container}>

        {/* ==================================
            MAIN HEADING
        ================================== */}

        <h2
          id="insights-heading"
          className={styles.mainHeading}
        >
          <span className={styles.normalText}>
            Latest
          </span>

          <span className={styles.scriptText}>
            Insights
          </span>
        </h2>

        {/* ==================================
            INSIGHTS GRID
        ================================== */}

        <div className={styles.insightsGrid}>
          {insights.map((insight, index) => (
            <article
              key={insight.id}
              className={styles.insightCard}
            >

              {/* IMAGE */}

              <div className={styles.imageWrapper}>
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 384px"
                  className={styles.insightImage}
                  priority={index === 0}
                />
              </div>

              {/* CONTENT */}

              <div className={styles.cardContent}>

                <p className={styles.insightDate}>
                  {insight.date}
                </p>

                <h3 className={styles.insightTitle}>
                  {insight.title}
                </h3>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
