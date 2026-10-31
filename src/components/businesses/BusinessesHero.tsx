
import Image from "next/image";
import styles from "./BusinessesHero.module.css";

export default function BusinessesHero() {
  return (
    <section className={styles.businessesHero}>
      <div className={styles.heroContainer}>

        {/* LEFT ABSTRACT IMAGE */}
        <div className={styles.leftImage}>
          <Image
            src="/images/businesses/hero/Abstract.png"
            alt="Abstract pink shape"
            fill
            priority
            sizes="254px"
            className={styles.abstractImage}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>
            <span className={styles.headingLine}>
              <span className={styles.scriptText}>
                Independent
              </span>{" "}
              <span className={styles.normalText}>
                businesses.
              </span>
            </span>

            <span className={styles.headingLine}>
              <span className={styles.normalText}>
                Shared
              </span>{" "}
              <span className={styles.scriptText}>
                ambition.
              </span>
            </span>
          </h1>

          <p className={styles.heroDescription}>
            We bring together businesses across industries,
            creating opportunities through innovation,
            reliable services, and a shared vision for a
            better future. Across markets and generations,
            we are long-term thinking with decisive action.
          </p>
        </div>

        {/* RIGHT ABSTRACT IMAGE - FLIPPED */}
        <div className={styles.rightImage}>
          <Image
            src="/images/businesses/hero/Abstract.png"
            alt="Abstract pink shape"
            fill
            priority
            sizes="268px"
            className={`${styles.abstractImage} ${styles.flippedImage}`}
          />
        </div>

      </div>
    </section>
  );
}
