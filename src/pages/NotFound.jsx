import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="message-page">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>We couldn't find that page.</h1>
      <p>The link may be old, or the address may have a typo.</p>
      <Link className="primary-button" to="/">Return home</Link>
    </section>
  );
}
