import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="App-Page App-Page-Homepage">
      <h1>404 Not Found</h1>
      <p>Sorry, we couldn't find this page</p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </section>
  );
}
