
"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Leadership.module.css";

type Leader = {
  name: string;
  designation: string;
  image: string;
};

const leaders: Leader[] = [
  {
    name: "Siddharth Kumar Jha",
    designation: "Founder & Chairman",
    image: "/images/about/leadership/Img.png",
  },
  {
    name: "Name Here",
    designation: "Leadership Team",
    image: "/images/about/leadership/Img2.png",
  },
  {
    name: "Name Here",
    designation: "Leadership Team",
    image: "/images/about/leadership/Img3.png",
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 10V17M7.5 7V7.1M11 17V10H14V11.2C14.5 10.3 15.3 9.8 16.5 10C18 10.2 18 11.5 18 13V17M11 13V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14.5 7.5H13C12 7.5 11.5 8 11.5 9V17M9.5 11.5H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4L19 20M19 4L5 20M5 4H9L19 20H15M19 4H15L5 20H9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Leadership() {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    null
  );

  return (
    <section
      className={styles.leadershipSection}
      aria-labelledby="leadership-heading"
    >
      <div className={styles.container}>
        <h2
          id="leadership-heading"
          className={styles.mainHeading}
        >
          <span className={styles.normalText}>Group</span>
          <span className={styles.scriptText}>
            Leadership
          </span>
        </h2>

        <div className={styles.cardsGrid}>
          {leaders.map((leader, index) => (
            <article
              key={index}
              className={`${styles.leaderCard} ${
                activeIndex === index
                  ? styles.cardActive
                  : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null
                  )
                ) {
                  setActiveIndex(null);
                }
              }}
              onClick={() =>
                setActiveIndex(
                  activeIndex === index ? null : index
                )
              }
            >
              <Image
                src={leader.image}
                alt={leader.name}
                fill
                sizes="(max-width: 767px) 90vw, (max-width: 1199px) 33vw, 384px"
                className={styles.leaderImage}
                priority={index === 0}
              />

              <div className={styles.hoverPanel}>
                <div className={styles.leaderInfo}>
                  <h3 className={styles.leaderName}>
                    {leader.name}
                  </h3>

                  <p className={styles.designation}>
                    {leader.designation}
                  </p>
                </div>

                <div className={styles.socialLinks}>
                  <span className={styles.socialIcon}>
                    <LinkedInIcon />
                  </span>

                  <span className={styles.socialIcon}>
                    <FacebookIcon />
                  </span>

                  <span className={styles.socialIcon}>
                    <XIcon />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
