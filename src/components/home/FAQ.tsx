
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FAQ.module.css";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is Merxenta and what do we do?",
    answer:
      "Merxenta is a diversified group of businesses focused on creating meaningful opportunities across industries. We bring together expertise, innovation, and long-term thinking to build reliable solutions, strengthen connections, and create lasting value.",
  },
  {
    id: 2,
    question: "Which industries does Merxenta operate in?",
    answer:
      "Merxenta operates across multiple sectors, including jewelry, electrical solutions, logistics, household services, and manpower solutions. Each business focuses on delivering specialized services while contributing to the group's shared vision.",
  },
  {
    id: 3,
    question: "How are Merxenta's businesses connected?",
    answer:
      "Our businesses are connected through shared values, collaboration, and a commitment to long-term progress. While each company serves its own market, they work toward a common goal of building trust, encouraging innovation, and creating opportunities for people and businesses.",
  },
  {
    id: 4,
    question: "How can I explore career opportunities at Merxenta?",
    answer:
      "You can explore career opportunities by visiting our Careers page or contacting our team. We welcome people who value creativity, collaboration, and continuous learning, and who want to contribute to meaningful work across our businesses.",
  },
];

export default function FAQ() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setActiveFAQ((previous) => (previous === id ? null : id));
  };

  return (
    <section
      className={styles.faqSection}
      aria-labelledby="faq-title"
    >
      <div className={styles.container}>
        {/* Left Side */}
        <div className={styles.leftContent}>
          <div className={styles.headingArea}>
            <h2 id="faq-title" className={styles.mainHeading}>
              FAQ
            </h2>

            <p className={styles.headingDescription}>
              Do you have a different question?{" "}
              <Link href="/contact" className={styles.contactLink}>
                Contact Us
              </Link>
            </p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/images/home/faq/Faq.png"
              alt="Merxenta FAQ decorative abstract pink sculpture"
              width={274}
              height={294}
              className={styles.faqImage}
              sizes="274px"
            />
          </div>
        </div>

        {/* Right Side - FAQ Accordion */}
        <div className={styles.faqList}>
          {faqData.map((item) => {
            const isOpen = activeFAQ === item.id;

            return (
              <div
                key={item.id}
                className={`${styles.faqItem} ${
                  isOpen ? styles.faqItemOpen : ""
                }`}
              >
                <h3 className={styles.questionHeading}>
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                  >
                    <span className={styles.questionText}>
                      {item.question}
                    </span>

                    <span
                      className={`${styles.iconWrapper} ${
                        isOpen ? styles.iconOpen : ""
                      }`}
                      aria-hidden="true"
                    >
                      <span className={styles.iconHorizontal} />
                      <span className={styles.iconVertical} />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`${styles.answerWrapper} ${
                    isOpen ? styles.answerOpen : ""
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answerText}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
