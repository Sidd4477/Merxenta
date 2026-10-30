
import styles from "./OurServices.module.css";

const services = [
  {
    number: "01",
    name: "Vibhushanam",
    description:
      "A luxury jewelry house inspired by timeless elegance. We craft high-quality pieces using the finest materials designed to celebrate beauty, confidence, and individuality.",
    image: "/images/home/services/Vibhushanam.png",
  },
  {
    number: "02",
    name: "Jagsome Electricals",
    description:
      "Jagsom Electricals is a trusted name in the design, development, and installation of high-quality electrical panels and systems.",
    image: "/images/home/services/jagsome.jpg",
  },
  {
    number: "03",
    name: "Quick Cargo",
    description:
      "Quick Cargo connects customers, agency owners, and drivers through an intuitive platform for truck bookings, route management, and real-time shipment tracking.",
    image: "/images/home/services/Quick Cargo.png",
  },
  {
    number: "04",
    name: "Fast Response",
    description:
      "The Fast Response mobile app transforms household services with seamless booking, trusted professionals, and Real-Time Tracking all in one place.",
    image: "/images/home/services/Fast resp.jpg",
  },
  {
    number: "05",
    name: "Man Power Solutions",
    description:
      "A reliable workforce solutions provider helping businesses connect with skilled professionals and build efficient, future-ready teams.",
    image: "/images/home/services/MPS.jpg",
  },
];

export default function OurServices() {
  return (
    <section
      className={styles.servicesSection}
      aria-labelledby="services-heading"
    >
      <div className={styles.container}>
        {/* Section heading */}

        <div className={styles.headingArea}>
          <h2
            id="services-heading"
            className={styles.mainHeading}
          >
            <span className={styles.headingNormal}>Our</span>{" "}
            <span className={styles.headingScript}>
              Services
            </span>
          </h2>

          <p className={styles.headingDescription}>
            Strategy, design, and direction for brands ready
            to become impossible to overlook.
          </p>
        </div>

        {/* Services list */}

        <div className={styles.servicesList}>
          {services.map((service) => (
            <div
              className={styles.serviceRow}
              key={service.number}
            >
              <span className={styles.serviceNumber}>
                {service.number}
              </span>

              <h3 className={styles.serviceName}>
                {service.name}
              </h3>

              <p className={styles.serviceDescription}>
                {service.description}
              </p>

              {/* Hover image */}

              <div
                className={styles.imageWrapper}
                aria-hidden="true"
              >
                <img
                  src={service.image}
                  alt=""
                  className={styles.serviceImage}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
