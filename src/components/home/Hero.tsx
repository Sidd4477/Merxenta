
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* Background Video */}
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src="/images/home/hero/Hero%20BG%20Video%20.webm"
          type="video/webm"
        />
      </video>

      {/* Dark Overlay */}
      <div className={styles.heroOverlay} />

      {/* Hero Content */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Main Heading */}
          <h1 id="hero-title" className={styles.heroHeading}>
            <span className={styles.headingLine}>
              <span className={styles.scriptText}>Built</span>
              <span className={styles.normalText}>on belief</span>
            </span>

            <span className={styles.headingLine}>
              <span className={styles.normalText}>Driven by</span>
              <span className={styles.scriptText}>
                possibility
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className={styles.heroDescription}>
            We bring together businesses across industries,
            creating opportunities through innovation,
            reliable services, and a shared vision for a better
            future. Across markets and generations, we pair
            long-term thinking with decisive action.
          </p>

          {/* CTA Buttons */}
          <div className={styles.heroActions}>
            <Link href="/about" className={styles.aboutButton}>
              <span className={styles.buttonText}>
                About Merxenta
              </span>

              <span className={styles.buttonCircle}>
                <svg
                  className={styles.arrowIcon}
                  width="13"
                  height="11"
                  viewBox="0 0 13 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5.5H11.5M7 1L11.5 5.5L7 10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            <Link
              href="/services"
              className={styles.exploreButton}
            >
              Explore Businesses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
