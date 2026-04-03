import React from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  videoId?: string;
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, videoId, image }) => {
  return (
    <div className={`card-glass ${styles.card}`}>
      <div className={styles.mediaContainer}>
        {videoId ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : image ? (
          <img src={image} alt={title} className={styles.image} loading="lazy" />
        ) : null}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
