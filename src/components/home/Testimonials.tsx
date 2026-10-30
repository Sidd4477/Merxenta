
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

type Testimonial = {
  id: number;
  heading: string;
  description: string;
  name: string;
  designation: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    heading: "A Thoughtful Approach to Every Challenge.",
    description:
      "The team quickly understood our challenges and provided actionable recommendations that significantly improved our operations. Their thoughtful approach and commitment to quality made the entire experience seamless.",
    name: "Michael P.",
    designation: "Business Development Manager",
    image: "/images/home/testimonials/Profile1.png",
  },
  {
    id: 2,
    heading: "Professional, Insightful, And Efficient.",
    description:
      "Their teams combine specialist knowledge with genuine collaboration. They understand the detail without losing sight of the bigger picture. They bring the kind of practical thinking and operational discipline that turns ambitious plans into lasting results.",
    name: "Michael P.",
    designation: "Business Development Manager",
    image: "/images/home/testimonials/Profile2.png",
  },
  {
    id: 3,
    heading: "Expertise That Makes a Difference.",
    description:
      "Their team brought a rare combination of industry knowledge and collaborative thinking. From the initial discussions to final delivery, their expertise and dedication made a meaningful difference.",
    name: "Name Here",
    designation: "Business Development Manager",
    image: "/images/home/testimonials/Profile3.png",
  },
  {
    id: 4,
    heading: "Building Solutions That Create Real Impact.",
    description:
      "Working with a team that values innovation, clean architecture, and long-term thinking has been an incredible experience. Every challenge becomes an opportunity to create scalable and meaningful digital solutions.",
    name: "Siddharth Kumar Jha",
    designation: "Full Stack Developer",
    image: "/images/home/testimonials/Profile1.png",
  },
  {
    id: 5,
    heading: "Collaboration That Drives Progress.",
    description:
      "What stands out is the commitment to understanding every challenge before building a solution. The combination of technical expertise, communication, and forward-thinking ideas helps deliver exceptional results.",
    name: "Alex Morgan",
    designation: "Technology Consultant",
    image: "/images/home/testimonials/Profile2.png",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="13"
      height="11"
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        transform: direction === "left" ? "rotate(180deg)" : "none",
      }}
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

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((previous) => (previous + 1) % total);
  }, [total]);

  const previousSlide = useCallback(() => {
    setActiveIndex((previous) => (previous - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      nextSlide();
    }, 6000);

    return () => window.clearInterval(interval);
  }, [isPaused, nextSlide]);

  const getRelativePosition = (index: number) => {
    const difference = (index - activeIndex + total) % total;

    if (difference === 0) return "center";
    if (difference === 1) return "right";
    if (difference === total - 1) return "left";

    return "hidden";
  };

  return (
    <section
      className={styles.testimonialsSection}
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null
          )
        ) {
          setIsPaused(false);
        }
      }}
    >
      <div className={styles.container}>
        {/* Heading and navigation */}

        <div className={styles.sectionHeader}>
          <h2
            id="testimonials-heading"
            className={styles.mainHeading}
          >
            <span className={styles.headingLine}>
              <span className={styles.scriptText}>Trusted by</span>
              <span className={styles.normalText}>Forward</span>
            </span>

            <span className={styles.headingLine}>
              <span className={styles.normalText}>Thinking</span>
              <span className={styles.scriptText}>Companies</span>
            </span>
          </h2>

          <div className={styles.navigation}>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={previousSlide}
              aria-label="Previous testimonial"
            >
              <ArrowIcon direction="left" />
            </button>

            <button
              type="button"
              className={styles.arrowButton}
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        {/* Testimonial slider */}

        <div
          className={styles.sliderViewport}
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          {testimonials.map((testimonial, index) => {
            const position = getRelativePosition(index);

            return (
              <article
                key={testimonial.id}
                className={[
                  styles.testimonialCard,
                  position === "center" ? styles.centerCard : "",
                  position === "left" ? styles.leftCard : "",
                  position === "right" ? styles.rightCard : "",
                  position === "hidden" ? styles.hiddenCard : "",
                ].join(" ")}
                aria-hidden={position === "hidden"}
              >
                <div className={styles.cardText}>
                  <h3 className={styles.cardHeading}>
                    {testimonial.heading}
                  </h3>

                  <p className={styles.cardDescription}>
                    {testimonial.description}
                  </p>
                </div>

                <div className={styles.profile}>
                  <div className={styles.profileImage}>
                    <Image
                      src={testimonial.image}
                      alt=""
                      fill
                      sizes="47px"
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.profileDetails}>
                    <p className={styles.profileName}>
                      {testimonial.name}
                    </p>

                    <p className={styles.profileDesignation}>
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
