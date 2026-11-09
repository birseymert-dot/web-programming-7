import { Link } from "react-router";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">A LITTLE SOMETHING FOR EVERY DAY</p>
        <h1>Find your next<br /><span>favorite thing.</span></h1>
        <p className="hero-description">
          Browse thoughtful everyday picks, save your favorites in a cart, and
          share a filtered catalogue with a link.
        </p>
        <Link className="primary-button" to="/products">Explore the shop <span aria-hidden="true">→</span></Link>
      </div>
      <div className="hero-art" aria-label="Featured everyday products" role="img">
        <span className="hero-orbit orbit-one" />
        <span className="hero-orbit orbit-two" />
        <span className="hero-sparkle sparkle-one">✳</span>
        <span className="hero-sparkle sparkle-two">✦</span>
        <div className="hero-product product-sun">☀</div>
        <div className="hero-product product-leaf">✿</div>
        <div className="hero-product product-dot">●</div>
      </div>
    </section>
  );
}
