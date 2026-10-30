
import styles from "./MissionVision.module.css";

export default function MissionVision() {
  return (
    <section
      className={styles.missionVisionSection}
      aria-labelledby="mission-vision-heading"
    >
      <div className={styles.container}>

        {/* ==================================
            MAIN HEADING
        ================================== */}

        <h2
          id="mission-vision-heading"
          className={styles.mainHeading}
        >
          <span className={styles.headingMedium}>
            Mission
          </span>

          <span className={styles.headingAmpersand}>
            &
          </span>

          <span className={styles.headingMedium}>
            Vision
          </span>
        </h2>

        {/* ==================================
            MISSION & VISION CARDS
        ================================== */}

        <div className={styles.cardsWrapper}>

          {/* ==================================
              MISSION CARD
          ================================== */}

          <article
            className={`${styles.card} ${styles.missionCard}`}
          >
            <div className={styles.cardContent}>

              <p className={styles.cardLabel}>
                Mission
              </p>

              <h3 className={styles.cardTitle}>
                We believe meaningful progress takes
                time. Every business we build is
                guided by a long-term vision,
                thoughtful decisions, and a
                commitment to creating lasting value.
              </h3>

              <p className={styles.cardDescription}>
                Today, we pair long-term thinking
                with decisive action—making
                disciplined decisions that strengthen
                our businesses and serve generations
                to come.
              </p>

            </div>
          </article>

          {/* ==================================
              VISION CARD
          ================================== */}

          <article
            className={`${styles.card} ${styles.visionCard}`}
          >

            {/* ==================================
                WHITE GRADIENT DECORATIVE GRID
                REFERENCE: Vision.module.css
            ================================== */}

            <div
              className={styles.decorativeGrid}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            {/* ==================================
                VISION CONTENT
            ================================== */}

            <div className={styles.cardContent}>

              <p className={styles.cardLabel}>
                Vision
              </p>

              <h3 className={styles.cardTitle}>
                From logistics and technology to
                people solutions, our businesses
                work toward a shared goal: creating
                better opportunities and moving
                industries forward.
              </h3>

              <p className={styles.cardDescription}>
                We&apos;re guided by a commitment
                to creating lasting value,
                empowering people, and growing
                responsibly—so every business we
                build leaves a better future behind.
              </p>

            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
