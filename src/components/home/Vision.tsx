
import Image from "next/image";
import Link from "next/link";
import styles from "./Vision.module.css";

function ArrowIcon() {
  return (
    <svg
      width="13"
      height="11"
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 5.5H11.5M11.5 5.5L7 1M11.5 5.5L7 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Vision() {
  return (
    <section
      className={styles.visionSection}
      aria-labelledby="vision-heading"
    >
      <div className={styles.container}>
        {/* Main heading */}

        <h2 id="vision-heading" className={styles.mainHeading}>
          <span className={styles.headingLine}>
            <span className={styles.scriptText}>What</span>
            <span className={styles.normalText}>Moves</span>
          </span>

          <span className={styles.headingLine}>
            <span className={styles.normalText}>Us</span>
            <span className={styles.scriptText}>Forward</span>
          </span>
        </h2>

        {/* First two cards */}

        <div className={styles.topCards}>
          <article className={`${styles.card} ${styles.firstCard}`}>
            <div className={styles.cardContent}>
              <p className={styles.eyebrow}>
                Built on Long-Term Thinking
              </p>

              <h3 className={styles.cardHeading}>
                We believe meaningful progress takes time.
                Every business we build is guided by a
                long-term vision, thoughtful decisions,
                and a commitment to creating lasting value.
              </h3>
            </div>

            <Link href="/about" className={styles.approachButton}>
              <span className={styles.buttonText}>
                Our Approach
              </span>

              <span className={styles.buttonCircle}>
                <ArrowIcon />
              </span>
            </Link>
          </article>

          <article className={`${styles.card} ${styles.secondCard}`}>
            <div className={styles.decorativeGrid} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className={styles.cardContent}>
              <p className={styles.eyebrow}>
                Different Businesses, One Vision
              </p>

              <h3 className={styles.cardHeading}>
                From logistics and technology to people
                solutions, our businesses work toward a
                shared goal: creating better opportunities
                and moving industries forward.
              </h3>
            </div>

            <Link href="/about" className={styles.aboutButton}>
              <span className={styles.buttonText}>
                About Merxenta
              </span>

              <span className={styles.buttonCircle}>
                <ArrowIcon />
              </span>
            </Link>
          </article>
        </div>

        {/* Third full-width card */}

        <article className={`${styles.card} ${styles.thirdCard}`}>
          <div className={styles.thirdCardContent}>
            <p className={styles.eyebrow}>
              Progress Through People
            </p>

            <h3 className={styles.cardHeading}>
              We believe lasting progress begins with people.
              By bringing together diverse expertise,
              shared values, and a spirit of collaboration,
              we build businesses that create meaningful
              opportunities and move industries forward.
            </h3>
          </div>

          <div className={styles.waveImageWrapper}>
            <Image
              src="/images/home/services/Wave.png"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 520px"
              className={styles.waveImage}
              aria-hidden="true"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
