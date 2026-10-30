
import styles from "./Introduction.module.css";

const stats = [
  {
    number: "15+",
    label: "Years of Excellence",
  },
  {
    number: "5",
    label: "Industries",
  },
  {
    number: "2,500",
    label: "People Across Group",
  },
  {
    number: "12+",
    label: "Markets Served",
  },
];

export default function Introduction() {
  return (
    <section
      className={styles.introduction}
      aria-labelledby="introduction-heading"
    >
      <div className={styles.container}>
        {/* Introduction heading and description */}
        <div className={styles.introContent}>
          <h2
            id="introduction-heading"
            className={styles.heading}
          >
            Empowering connections through{" "}
            <span className={styles.highlight}>
              technology and collaboration.
            </span>{" "}
            Our mission is to foster an inclusive environment
            that nurtures creativity, encourages diversity, and{" "}
            <span className={styles.highlight}>
              supports the development of future leaders.
            </span>
          </h2>

          <p className={styles.description}>
            Merxenta is a collective of ambitious companies
            and people, connected by a clear philosophy:
            meaningful progress takes patience, courage,
            and partnership.
          </p>
        </div>

        {/* Statistics cards */}
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div className={styles.statCard} key={stat.label}>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>
                  {stat.number}
                </h3>

                <p className={styles.statLabel}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
