
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./BusinessNetwork.module.css";

const businesses = [
  {
    id: "mps",
    name: "Manpower Solutions",
    image: "/images/businesses/logos/MPS.png",
    left: 339,
    logoWidth: 71,
    logoHeight: 64,
    logoTop: 17,
    logoLeft: 14,
  },
  {
    id: "jagsom",
    name: "Jagsom",
    image: "/images/businesses/logos/Jagsome.png",
    left: 505,
    logoWidth: 77,
    logoHeight: 49,
    logoTop: 25,
    logoLeft: 11,
  },
  {
    id: "vibhushnam",
    name: "Vibhushnam",
    image: "/images/businesses/logos/Vibhushanam.png",
    left: 671,
    logoWidth: 74,
    logoHeight: 47,
    logoTop: 26,
    logoLeft: 12,
  },
  {
    id: "fastresponse",
    name: "Fast Response",
    image: "/images/businesses/logos/fastresponse.png",
    left: 837,
    logoWidth: 64,
    logoHeight: 43,
    logoTop: 28,
    logoLeft: 17,
  },
  {
    id: "qc",
    name: "QC",
    image: "/images/businesses/logos/QC.png",
    left: 1003,
    logoWidth: 56,
    logoHeight: 45,
    logoTop: 26,
    logoLeft: 21,
  },
];

const SVG_WIDTH = 1440;
const SVG_HEIGHT = 720;

const SOURCE_X = 720;
const SOURCE_Y = 202;
const TARGET_Y = 542;

function getConnectionPath(targetX: number) {
  const difference = targetX - SOURCE_X;

  return `
    M ${SOURCE_X} ${SOURCE_Y}
    C ${SOURCE_X + difference * 0.12} 325,
      ${targetX - difference * 0.15} 420,
      ${targetX} ${TARGET_Y}
  `;
}

export default function BusinessNetwork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.networkSection}
    >
      <div
        className={`${styles.networkCanvas} ${
          isVisible ? styles.isVisible : ""
        }`}
      >
        {/* =====================================
            CONNECTION LINES
        ===================================== */}

        <svg
          className={styles.connectionSvg}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="networkBaseGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E9A4BD" />
              <stop offset="50%" stopColor="#E8D4B9" />
              <stop offset="100%" stopColor="#B9A8EF" />
            </linearGradient>

            <linearGradient
              id="networkFlowGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F3B5CF" />
              <stop offset="45%" stopColor="#E9C1A6" />
              <stop offset="100%" stopColor="#BDA9F6" />
            </linearGradient>

            {/* PINK STREAK GRADIENT */}
            <linearGradient
              id="networkStreakGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F9B5E9" stopOpacity="0" />
              <stop offset="25%" stopColor="#F38BDA" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#E44BC1" stopOpacity="1" />
              <stop offset="75%" stopColor="#F38BDA" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F9B5E9" stopOpacity="0" />
            </linearGradient>

            <filter
              id="networkGlow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="3" />
            </filter>

            <filter
              id="networkStreakGlow"
              x="-200%"
              y="-100%"
              width="500%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {businesses.map((business) => {
            const targetX = business.left + 49;
            const path = getConnectionPath(targetX);

            return (
              <g key={business.id}>
                {/* BASE CONNECTION */}
                <path
                  d={path}
                  className={`${styles.connectionBase} ${
                    business.id === "vibhushnam"
                      ? styles.centerConnection
                      : ""
                  }`}
                  stroke="url(#networkBaseGradient)"
                />

                {/* ANIMATED LINE */}
                <path
                  d={path}
                  className={styles.connectionFlow}
                  stroke="url(#networkFlowGradient)"
                  pathLength={100}
                />

                {/* PINK GLOWING STREAK */}
                <g className={styles.travelingLight}>
                  {/* SOFT OUTER GLOW */}
                  <rect
                    x="-4"
                    y="-13"
                    width="8"
                    height="26"
                    rx="4"
                    fill="#EC75D3"
                    opacity="0.65"
                    filter="url(#networkStreakGlow)"
                  />

                  {/* MAIN PINK STREAK */}
                  <rect
                    x="-1.8"
                    y="-11"
                    width="3.6"
                    height="22"
                    rx="1.8"
                    fill="url(#networkStreakGradient)"
                  />

                  {/* BRIGHT CENTER */}
                  <rect
                    x="-0.65"
                    y="-7"
                    width="1.3"
                    height="14"
                    rx="0.65"
                    fill="#FFE2FA"
                    opacity="0.95"
                  />

                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path={path}
                  />
                </g>
              </g>
            );
          })}
        </svg>

        {/* =====================================
            MERXENTA MAIN LOGO
        ===================================== */}

        <div className={styles.mainLogoBox}>
          <div className={styles.mainLogoInner}>
            <Image
              src="/images/businesses/logos/merxentaLogo.png"
              alt="Merxenta"
              fill
              priority
              sizes="76px"
              className={styles.logoImage}
            />
          </div>
        </div>

        {/* =====================================
            MAIN HEADING
        ===================================== */}

        <div className={styles.headingContainer}>
          <h2 className={styles.mainHeading}>
            <span className={styles.headingFirstLine}>
              <span className={styles.scriptText}>
                Creating
              </span>{" "}
              <span className={styles.normalText}>
                value across
              </span>
            </span>

            <span className={styles.headingSecondLine}>
              <span className={styles.normalText}>
                Everyday
              </span>{" "}
              <span className={styles.scriptText}>
                life
              </span>
            </span>
          </h2>
        </div>

        {/* =====================================
            BUSINESS LOGO CARDS
        ===================================== */}

        <div className={styles.businessCards}>
          {businesses.map((business) => (
            <div
              key={business.id}
              className={styles.businessCard}
              style={{
                left: `${business.left}px`,
              }}
            >
              <div
                className={styles.businessLogo}
                style={{
                  width: `${business.logoWidth}px`,
                  height: `${business.logoHeight}px`,
                  top: `${business.logoTop}px`,
                  left: `${business.logoLeft}px`,
                }}
              >
                <Image
                  src={business.image}
                  alt={business.name}
                  fill
                  sizes="80px"
                  className={styles.logoImage}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
