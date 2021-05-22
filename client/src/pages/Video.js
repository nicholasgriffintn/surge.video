import { useParams } from 'react-router-dom';

import VideoPlayer from '../components/video-player';
import { Link } from 'react-router-dom';

export default function Video() {
  const { id } = useParams();

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
    <section className="App-Page App-Page-Video">
      <div className="App-Page-Video-Grid">
        <div className="row">
          <div className="column column-80">
            <div className="App-Video-Player-Wrapper">
              <VideoPlayer
                torrentId={
                  id === 'big-buck-bunny'
                    ? 'magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fbig-buck-bunny.torrent'
                    : id === 'cosmos-laundromat'
                    ? 'magnet:?xt=urn:btih:c9e15763f722f23e98a29decdfae341b98d53056&dn=Cosmos+Laundromat&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fcosmos-laundromat.torrent'
                    : id === 'sintel'
                    ? 'https://webtorrent.io/torrents/sintel.torrent'
                    : null
                }
              />
            </div>
          </div>
          <div className="column">
            <div className="App-Video-Autoplay flex">
              <span>Autoplay</span>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
