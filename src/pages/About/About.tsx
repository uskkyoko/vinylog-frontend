import "./About.css";
import { AppLayout } from "../../components/AppLayout";

function AboutHero() {
  return (
    <div className="about__hero">
      <p className="eyebrow">The story</p>
      <h1 className="about__title">About Vinylog</h1>
      <p className="about__lead">
        Vinylog is a music discovery and review platform for people who care
        deeply about albums — not just tracks.
      </p>
    </div>
  );
}

function AboutStack() {
  return (
    <div className="about__section">
      <h2 className="about__section-title">Tech Stack</h2>
      <ul className="about__list">
        <li>React 18 + TypeScript + Vite</li>
        <li>Redux Toolkit — lists, reviews, favourites</li>
        <li>React Router DOM — client-side routing</li>
        <li>Custom FastAPI backend on Render</li>
        <li>Spotify API — album and artist data</li>
      </ul>
    </div>
  );
}

function AboutFeatures() {
  return (
    <div className="about__section">
      <h2 className="about__section-title">Features</h2>
      <ul className="about__list">
        <li>Browse and search albums and artists</li>
        <li>Write and manage album reviews with star ratings</li>
        <li>Curate personal album lists</li>
        <li>Follow other users and explore their profiles</li>
        <li>AI-powered album recommendations</li>
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <AppLayout>
      <section className="about">
        <div className="about__container">
          <AboutHero />
          <AboutStack />
          <AboutFeatures />
        </div>
      </section>
    </AppLayout>
  );
}
