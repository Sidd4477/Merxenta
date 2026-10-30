
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";

import styles from "./Leadership.module.css";

type Leader = {
  name: string;
  designation: string;
  image: string;
};

const leaders: Leader[] = [
  {
    name: "Ankit Kumar Das",
    designation: "Founder & Chairman",
    image: "/images/about/leadership/Img.png",
  },
  {
    name: "Shivanshi Gupta",
    designation: "Founder & Chairman",
    image: "/images/about/leadership/Img2.png",
  },
  {
    name: "Vishal Gupta",
    designation: "Founder & Chairman",
    image: "/images/about/leadership/Img3.png",
  },
];

/* ==========================================
   LEADERSHIP COMPONENT
========================================== */

export default function Leadership() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  return (
    <section
      className={styles.leadershipSection}
      aria-labelledby="leadership-heading"
    >
      <div className={styles.container}>

        {/* ==================================
            MAIN HEADING
        ================================== */}

        <h2
          id="leadership-heading"
          className={styles.mainHeading}
        >
          <span className={styles.normalText}>
            Group
          </span>

          <span className={styles.scriptText}>
            Leadership
          </span>
        </h2>

        {/* ==================================
            LEADERSHIP CARDS
        ================================== */}

        <div className={styles.cardsGrid}>
          {leaders.map((leader, index) => (
            <article
              key={index}
              className={`${styles.leaderCard} ${
                activeIndex === index
                  ? styles.cardActive
                  : ""
              }`}
              onMouseEnter={() =>
                setActiveIndex(index)
              }
              onMouseLeave={() =>
                setActiveIndex(null)
              }
              onClick={() =>
                setActiveIndex(
                  activeIndex === index
                    ? null
                    : index
                )
              }
            >
              {/* ==========================
                  LEADER IMAGE
              ========================== */}

              <Image
                src={leader.image}
                alt={leader.name}
                fill
                sizes="(max-width: 767px) 90vw, (max-width: 1199px) 33vw, 384px"
                className={styles.leaderImage}
                priority={index === 0}
              />

              {/* ==========================
                  FIGMA WHITE HOVER PANEL
              ========================== */}

              <div className={styles.hoverPanel}>

                {/* LEFT INFORMATION BOX */}

                <div className={styles.leaderInfo}>
                  <h3 className={styles.leaderName}>
                    {leader.name}
                  </h3>

                  <p className={styles.designation}>
                    {leader.designation}
                  </p>
                </div>

                {/* RIGHT SOCIAL ICON STRIP */}

                <div className={styles.socialLinks}>

                  {/* LINKEDIN */}

                  <span
                    className={styles.socialIcon}
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <FaLinkedin />
                  </span>

                  {/* FACEBOOK */}

                  <span
                    className={styles.socialIcon}
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <FaFacebook />
                  </span>

                  {/* X / TWITTER */}

                  <span
                    className={styles.socialIcon}
                    aria-label="X"
                    title="X"
                  >
                    <FaXTwitter />
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
