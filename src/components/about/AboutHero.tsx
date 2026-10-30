
import Link from "next/link";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.aboutHero}>
      <div className={styles.heroContainer}>

        {/* ==================================
            MAIN HEADING
        ================================== */}

        <h1 className={styles.mainHeading}>
          <span className={styles.headingLine}>
            <span className={styles.scriptText}>
              Our work
            </span>

            <span className={styles.normalText}>
              spans industries.
            </span>
          </span>

          <span className={styles.headingLine}>
            <span className={styles.normalText}>
              Our thinking
            </span>

            <span className={styles.scriptText}>
              spans generations.
            </span>
          </span>
        </h1>

        {/* ==================================
            SUBHEADING
        ================================== */}

        <p className={styles.subheading}>
          We bring together businesses across
          industries, creating opportunities
          through innovation, reliable services,
          and a shared vision for a better future.
          Across markets and generations, we pair
          long-term thinking with decisive action.
        </p>

        {/* ==================================
            CTA BUTTONS
        ================================== */}

        <div className={styles.buttonGroup}>
          <Link
            href="/businesses"
            className={styles.primaryButton}
          >
            <span className={styles.primaryButtonText}>
              Our Businesses
            </span>

            <span className={styles.arrowCircle}>
              <svg
                width="13"
                height="11"
                viewBox="0 0 13 11"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 5.5H12M12 5.5L7.5 1M12 5.5L7.5 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/careers"
            className={styles.secondaryButton}
          >
            Life at Merxenta
          </Link>
        </div>

      </div>
    </section>
  );
}
