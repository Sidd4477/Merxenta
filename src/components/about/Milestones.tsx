
import Image from "next/image";
import styles from "./Milestones.module.css";

/* ==========================================
   MERXENTA - MILESTONES DATA
========================================== */

type Milestone = {
  year: string;
  description: string;
  image: string;
  alt: string;
};

const milestones: Milestone[] = [
  {
    year: "2006",
    description:
      "MNC was founded to make smart & digital business solution.",
    image: "/images/about/milestones/1.png",
    alt: "Two hands connecting puzzle pieces",
  },
  {
    year: "2007",
    description:
      "A shared identity for a growing portfolio.",
    image: "/images/about/milestones/2.png",
    alt: "Team members joining hands",
  },
  {
    year: "2009",
    description: "Building what tomorrow needs.",
    image: "/images/about/milestones/3.png",
    alt: "Chess pieces representing growth and strategy",
  },
];

/* ==========================================
   MILESTONES COMPONENT
========================================== */

export default function Milestones() {
  return (
    <section
      className={styles.milestonesSection}
      aria-labelledby="milestones-heading"
    >
      <div className={styles.container}>

        {/* LEFT MAIN HEADING */}

        <div className={styles.headingColumn}>
          <h2
            id="milestones-heading"
            className={styles.mainHeading}
          >
            <span className={styles.headingLine}>
              <span className={styles.scriptText}>
                Milestones
              </span>

              <span className={styles.normalText}>
                That
              </span>
            </span>

            <span className={styles.headingLine}>
              <span className={styles.normalText}>
                Shaped
              </span>

              <span className={styles.scriptText}>
                Us
              </span>
            </span>
          </h2>
        </div>

        {/* RIGHT TIMELINE */}

        <div className={styles.timelineContent}>

          {/* VERTICAL LINE */}

          <div
            className={styles.timelineRail}
            aria-hidden="true"
          >
            <div className={styles.timelineLine} />

            <span className={styles.timelineDot} />
          </div>

          {/* MILESTONE ITEMS */}

          <div className={styles.milestonesList}>
            {milestones.map((milestone) => (
              <article
                key={milestone.year}
                className={styles.milestoneItem}
              >
                <div className={styles.milestoneText}>
                  <span className={styles.year}>
                    {milestone.year}
                  </span>

                  <h3 className={styles.description}>
                    {milestone.description}
                  </h3>
                </div>

                <div className={styles.imageWrapper}>
                  <Image
                    src={milestone.image}
                    alt={milestone.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 308px"
                    className={styles.milestoneImage}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
