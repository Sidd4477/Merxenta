
import Image from "next/image";
import styles from "./ContactUs.module.css";

/* ==========================================
   MERXENTA - CONTACT US SECTION
========================================== */

export default function ContactUs() {
  return (
    <section
      className={styles.contactSection}
      aria-labelledby="contact-heading"
    >
      <div className={styles.container}>

        {/* ==================================
            MAIN HEADING
        ================================== */}

        <div className={styles.headingWrapper}>
          <h1
            id="contact-heading"
            className={styles.mainHeading}
          >
            <span className={styles.normalText}>
              Contact
            </span>

            <span className={styles.scriptText}>
              Us
            </span>
          </h1>

          <p className={styles.subHeading}>
            We are guided by purpose and focused on
            building what lasts.
            <br />
            Through careers at Merxenta, you contribute
            to work in industries and the future.
          </p>
        </div>

        {/* ==================================
            CONTACT GRID
        ================================== */}

        <div className={styles.contactGrid}>

          {/* LEFT IMAGE */}

          <div className={styles.imageWrapper}>
            <Image
              src="/images/contact/contact-us.png"
              alt="Merxenta professionals meeting and shaking hands"
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 35vw, 416px"
              className={styles.contactImage}
            />
          </div>

          {/* RIGHT INFORMATION GRID */}

          <div className={styles.infoGrid}>

            {/* EMAIL */}

            <article className={styles.infoCard}>
              <h2 className={styles.cardLabel}>
                Email
              </h2>

              <a
                href="mailto:Hello@merxenta.com"
                className={styles.cardValue}
              >
                Hello@merxenta.com
              </a>
            </article>

            {/* PHONE */}

            <article className={styles.infoCard}>
              <h2 className={styles.cardLabel}>
                Phone
              </h2>

              <a
                href="tel:+911144011440"
                className={styles.cardValue}
              >
                +91 11440-11440
              </a>
            </article>

            {/* OFFICE ADDRESS */}

            <article className={styles.infoCard}>
              <h2 className={styles.cardLabel}>
                Office Address
              </h2>

              <address className={styles.cardValue}>
                Unit No. 244 A, Tower B2,
                <br />
                Spaze I-Tech Park, Tower, Sohna -
                <br />
                Gurgaon Rd, Block S, Sector 49,
                <br />
                Gurugram, Haryana 122018
              </address>
            </article>

            {/* BUSINESS HOURS */}

            <article className={styles.infoCard}>
              <h2 className={styles.cardLabel}>
                Business Hours
              </h2>

              <p className={styles.cardValue}>
                Monday — Friday
                <br />
                9:00 AM – 6:00 PM
              </p>
            </article>

          </div>
        </div>
      </div>
    </section>
  );
}
