
import Image from "next/image";
import Link from "next/link";
import styles from "./Environment.module.css";

/* ==========================================
   ARROW ICON
========================================== */

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

/* ==========================================
   GALLERY IMAGES
========================================== */

const galleryImages = [
  {
    src: "/images/careers/gallery/1.png",
    alt: "Merxenta employee working at a desk",
  },
  {
    src: "/images/careers/gallery/2.png",
    alt: "Merxenta team members collaborating",
  },
  {
    src: "/images/careers/gallery/3.png",
    alt: "Merxenta colleagues having a discussion",
  },
  {
    src: "/images/careers/gallery/4.png",
    alt: "Merxenta employees in a collaborative workspace",
  },
];

/* ==========================================
   ENVIRONMENT SECTION
========================================== */

export default function Environment() {
  return (
    <section
      className={styles.environmentSection}
      aria-labelledby="environment-heading"
    >
      <div className={styles.container}>

        {/* ==================================
            TOP CONTENT
        ================================== */}

        <div className={styles.topContent}>

          {/* LEFT HEADING */}

          <div className={styles.headingColumn}>
            <h2
              id="environment-heading"
              className={styles.mainHeading}
            >
              <span className={styles.headingLine}>
                <span className={styles.normalText}>
                  Environmental
                </span>
              </span>

              <span className={styles.headingLine}>
                <span className={styles.scriptText}>
                  Stewardship
                </span>

                <span className={styles.normalText}>
                  Operations
                </span>
              </span>
            </h2>

            {/* OPEN ROLES BUTTON */}

            <Link
              href="/careers#open-roles"
              className={styles.openRolesButton}
            >
              <span className={styles.buttonText}>
                Open Roles
              </span>

              <span className={styles.buttonCircle}>
                <ArrowIcon />
              </span>
            </Link>
          </div>

          {/* RIGHT DESCRIPTION */}

          <div className={styles.descriptionColumn}>
            <p className={styles.topDescription}>
              The company operates with advanced
              manufacturing equipment and a highly
              skilled workforce, ensuring consistent
              delivery of premium garments. The company
              embraces innovation by integrating the
              latest technology into its production
              processes, which allows it to maintain
              the highest standards of quality and
              efficiency.
            </p>
          </div>
        </div>

        {/* ==================================
            CENTER DESCRIPTION
        ================================== */}

        <div className={styles.centerContent}>
          <p className={styles.centerDescription}>
            Empowering connections through technology
            and collaboration. Our mission is to foster
            an inclusive environment that nurtures
            creativity, encourages diversity, and
            supports the development of future leaders.
            Collaboration and transparency are at the
            heart of our corporate culture.
          </p>
        </div>

        {/* ==================================
            IMAGE GALLERY
        ================================== */}

        <div className={styles.galleryGrid}>
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={styles.galleryItem}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 588px"
                className={styles.galleryImage}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
