import { Link } from 'react-router-dom';

export default function Home() {
  const relatedVideos = [
    {
      title: 'Big Buck Bunny',
      id: 'big-buck-bunny',
      length: '10.34',
      thumbnails: {
        small: '/thumbnails/Big_Buck_Bunny.jpg',
        medium: '/thumbnails/Big_Buck_Bunny.jpg',
        large: '/thumbnails/Big_Buck_Bunny.jpg',
      },
      author: {
        name: 'Test Videos',
      },
    },
    {
      title: 'Cosmos Laundromat',
      id: 'cosmos-laundromat',
      thumbnails: {
        small: '/thumbnails/cosmos-laundromat.jpeg',
        medium: '/thumbnails/cosmos-laundromat.jpeg',
        large: '/thumbnails/cosmos-laundromat.jpeg',
      },
      author: {
        name: 'Test Videos',
      },
    },
    {
      title: 'Sintel',
      id: 'sintel',
      thumbnails: {
        small: '/thumbnails/Sintel.jpg',
        medium: '/thumbnails/Sintel.jpg',
        large: '/thumbnails/Sintel.jpg',
      },
      author: {
        name: 'Test Videos',
      },
    },
  ];

  return (
    <section className="App-Page App-Page-Homepage">
      <h1>Welcome to decentralised video sharing!</h1>
      <h2>
        Surge is the new age of video sharing platforms that uses torrenting
        technology in order to decentralise the video sharing industry.
      </h2>
      <p>
        At the moment, this is simply a demo of what the platform could be, just
        a quick side project during my spare time but I hope to build it more
        soon.
      </p>
      <p>You can check out some demo videos below.</p>
      <ul className="App-Video-RelatedVideos">
        {relatedVideos.map((video) => {
          return (
            <li className="App-Video-RelatedVideos-Video">
              <Link to={`/video/${video.id}`}>
                <div
                  className="App-Video-RelatedVideos-Video-Thumb"
                  style={{
                    background: `url(${video.thumbnails.medium})`,
                  }}
                >
                  <div className="App-Video-RelatedVideos-Video-Thumb-Content">
                    {video.length && (
                      <div className="timestamp">{video.length}</div>
                    )}
                    {video.progress && (
                      <div className="progress">
                        <span
                          className="progress-marker"
                          style={{ width: video.progress + '%' }}
                        ></span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="App-Video-RelatedVideos-Video-Info">
                  <span className="title">{video.title}</span>
                  <span className="author">{video.author.name}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
