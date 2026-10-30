
import Image from "next/image";
import styles from "./CareersHero.module.css";

export default function CareersHero() {
  return (
    <section
      className={styles.heroSection}
      aria-labelledby="careers-hero-heading"
    >
      {/* FULL SCREEN BACKGROUND IMAGE */}
      <div className={styles.imageWrapper}>
        <Image
          src="/images/careers/hero/Life At Marxenta Hero .png"
          alt="Life at Merxenta"
          fill
          priority
          sizes="100vw"
          quality={90}
          className={styles.heroImage}
        />
      </div>

      {/* DARK OVERLAY */}
      <div
        className={styles.heroOverlay}
        aria-hidden="true"
      />

      {/* CENTER HEADING */}
      <div className={styles.heroContent}>
        <h1
          id="careers-hero-heading"
          className={styles.heroHeading}
        >
          <span className={styles.normalText}>
            Life
          </span>

          <span className={styles.scriptText}>
            at
          </span>

          <span className={styles.normalText}>
            Merxenta
          </span>
        </h1>
      </div>
    </section>
  );
}
