import { useParams } from 'react-router-dom';

export default function Video() {
  const { id } = useParams();

  return (
    <section className="App-Page App-Page-Video">
      <div className="App-Page-Video-Grid">
        <div className="row">
          <div className="column column-80">
            <h1>This is the video page</h1>
            <p>We'll show a video player here</p>
            <p>Video ID: {id}</p>
            <div className="App-Video-Player-Wrapper"></div>
          </div>
          <div className="column">
            <h3>Video Sidebar here</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
