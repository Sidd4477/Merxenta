
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "About Merxenta", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "News & Updates", href: "/news" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Services", href: "/terms-of-services" },
];

const businessLinks = [
  { label: "Vibhushanam", href: "/businesses/vibhushanam" },
  { label: "Jagsome Electricals", href: "/businesses/jagsome-electricals" },
  { label: "Man Power Solutions", href: "/businesses/man-power-solutions" },
  { label: "Fast Response", href: "/businesses/fast-response" },
  { label: "Quick Cargo", href: "/businesses/quick-cargo" },
];

const careerLinks = [
  { label: "Life at Merxenta", href: "/careers/life-at-merxenta" },
  { label: "Search Jobs", href: "/careers" },
];

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 10H16.5M16.5 10L11 4.5M16.5 10L11 15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.1 3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM3.4 9h3.4v11H3.4V9Zm5.6 0h3.3v1.5h.05A3.65 3.65 0 0 1 15.6 8.7c3.5 0 4.1 2.3 4.1 5.3v6h-3.4v-5.3c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V20H9V9Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.5L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.6 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6H17V3.1a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5v3.2h2.8V21h3.3Z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Connect a newsletter API or mailing-list provider here.
    setMessage("Subscription service will be available soon.");
  }

  return (
    <footer className={styles.footer}>
      {/* NEWSLETTER */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContainer}>
          <h2 className={styles.newsletterHeading}>
            News, opportunities and stories from across our businesses,
            straight to your inbox.
          </h2>

          <div className={styles.newsletterRight}>
            <h3 className={styles.newsletterSubheading}>
              Get the latest updates from Merxenta.
            </h3>

            <form
              className={styles.newsletterForm}
              onSubmit={handleSubscribe}
            >
              <label htmlFor="footer-email" className={styles.srOnly}>
                Your email address
              </label>

              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="Enter Your Mail"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (message) setMessage("");
                }}
                className={styles.emailInput}
                required
              />

              <button
                type="submit"
                className={styles.subscribeButton}
                aria-label="Subscribe to newsletter"
              >
                <ArrowIcon />
              </button>
            </form>

            {message && (
              <p className={styles.formMessage} role="status">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logoLink} aria-label="Merxenta Home">
              <Image
                src="/icons/logo.png"
                alt="MERXENTA"
                width={140}
                height={124}
                className={styles.logo}
              />
            </Link>

            <p className={styles.brandDescription}>
              A diverse group of businesses across industries, creating
              opportunities through innovation, reliable services, and
              a shared vision for a better future.
            </p>

            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="X"
              >
                <XIcon />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <nav className={styles.footerNavigation} aria-label="Footer navigation">
            <div className={styles.linkColumn}>
              <h4 className={styles.linkHeading}>Quick Links</h4>

              <ul className={styles.linkList}>
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkHeading}>Business</h4>

              <ul className={styles.linkList}>
                {businessLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkHeading}>Career</h4>

              <ul className={styles.linkList}>
                {careerLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className={styles.footerBottom}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            ©2026 Merxenta Group Pvt Ltd All Rights Reserved
          </p>

          <p className={styles.poweredBy}>
            Powered by{" "}
            <span className={styles.poweredName}>Athratech</span>
          </p>

          <button
            type="button"
            className={styles.cookieButton}
            onClick={() => {
              window.dispatchEvent(new Event("open-cookie-settings"));
            }}
          >
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  );
}
