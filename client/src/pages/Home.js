import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="App-Page App-Page-Homepage">
      <h1>This is the homepage</h1>
      <p>
        We'll show a list of videos here when the app is ready, at the moment
        this is still WIP
      </p>
      <p>
        <Link to="/video/2">Go to the sample video</Link>
      </p>
    </section>
  );
}
