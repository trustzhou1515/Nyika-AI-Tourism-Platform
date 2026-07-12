import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="section pageTop">
      <div className="container">
        <h1>Page not found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <Link className="button" to="/">Go home</Link>
      </div>
    </section>
  );
}
