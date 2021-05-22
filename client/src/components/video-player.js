import { useEffect, useState } from 'react';

import WebTorrent from 'webtorrent';
import ReactPlayer from 'react-player';

import dayjs from 'dayjs';

export default function VideoPlayer(props) {
  const [torrentData, setTorrentData] = useState([]);
  const [playerState, setPlayerState] = useState('initial');
  const [playerError, setPlayerError] = useState(null);
  const [playerFile, setPlayerFile] = useState(null);
  const [playerURL, setPlayerURL] = useState(null);
  const [playerPosterFile, setPlayerPosterFile] = useState(null);
  const [playerDownloadProgess, setPlayerDownloadProgess] = useState(null);
  const [playerPeersCount, setPlayerPeersCount] = useState(null);
  const [playerDownloadSizeCount, setPlayerDownloadedSize] = useState(null);
  const [playerTotalDownloadSizeCount, setPlayerTotalDownloadSize] =
    useState(null);
  const [playerDownloadTime, setPlayerDownloadTime] = useState(null);
  const [playerDownloadSpeed, setPlayerDownloadSpeed] = useState(null);

  var torrentId = props.torrentId;

  useEffect(() => {
    if (torrentId) {
      setPlayerState('initial');
      setPlayerError('');
      var client = new WebTorrent();

      client.on('error', (err) => {
        console.log('[+] Webtorrent error: ' + err.message);
        setPlayerError(err.message);
      });

      client.add(torrentId, (torrent) => {
        setPlayerState('downloading');

        setTorrentData({
          torrentInfoHash: torrent.infoHash,
          torrentMagnetURI: torrent.magnetURI,
          torrentName: torrent.name,
          torrentFiles: torrent.files,
          created: torrent.created,
          createdBy: torrent.createdBy,
          comment: torrent.comment,
        });

        torrent.files.forEach(function (file) {
          if (file.name.endsWith('.mp4')) {
            console.debug('Video file found => ', file);
            setPlayerFile(file);
            file.renderTo('#VideoPlayer');
            /* file.appendTo(
                            '#VideoPlayerRender',
                            {
                              autoplay: true,
                              controls: true,
                            },
                            function (err, elem) {
                              if (err) console.error(err);
                              console.log('New DOM node with the content', elem);
                            }
                          ); */
            /* file.getBlobURL(function (err, url) {
                              if (err) console.error(err);
                              console.log(url);
                              setPlayerURL(url);
                            }); */
          } else if (file.name.endsWith('.jpg')) {
            setPlayerPosterFile(file);
          }
        });

        torrent.on('download', function (bytes) {
          setPlayerDownloadProgess((torrent.progress * 100).toFixed(1));
          setPlayerPeersCount(torrent.numPeers);
          setPlayerDownloadedSize((torrent.downloaded * 100).toFixed(1));
          setPlayerTotalDownloadSize((torrent.length * 100).toFixed(1));
          setPlayerDownloadTime((torrent.timeRemaining * 100).toFixed(1));
          setPlayerDownloadSpeed((torrent.downloadSpeed * 100).toFixed(1));

          setPlayerURL(torrent.torrentFileBlobURL);
        });

        torrent.on('wire', function (wire, addr) {
          console.debug('connected to peer with address ' + addr);
        });

        torrent.on('infoHash', function () {
          console.debug('InfoHash Event Triggered.');
        });

        torrent.on('metadata', function () {
          console.debug('Metadata Event Triggered.');
        });

        torrent.on('done', () => {
          console.debug('Done Event Triggered.');

          setPlayerState('downloaded');
          setPlayerDownloadProgess(100);
        });

        torrent.on('warning', (error) => {
          console.debug('Warning Event Triggered.');
          console.debug(error);
        });

        torrent.on('error', (error) => {
          console.debug('Error Event Triggered.');
          console.error(error);

          setPlayerError(error.message);
        });
      });
    } else {
      setPlayerError('NoTorrentId');
    }
  }, [torrentId]);

  return (
    <div className="App-Video-Player-Inner">
      {playerError ? (
        <div className="App-Video-Player-Error">
          <h2>Whoops, an error occured.</h2>
          <p>Error: {playerError}</p>
        </div>
      ) : (
        <>
          {/* {playerURL && (
            <>
              <ReactPlayer
                url={playerURL}
                poster={playerPosterFile ? playerPosterFile.path : null}
                width="100%"
                height="640px"
                controls={true}
              />
            </>
          )} */}
          {/* <div
            id="VideoPlayerRender"
            style={{ width: '100%', height: '640px' }}
          ></div> */}
          <video
            poster={playerPosterFile ? playerPosterFile.path : null}
            src=""
            style={{ width: '100%' }}
            id="VideoPlayer"
            autoPlay={true}
            preload="auto"
            controls=""
          ></video>
          {torrentData && (
            <>
              <div className="video-details">
                <div className="video-details-header">
                  <div className="row">
                    <div className="column column-75">
                      <h1>{torrentData.torrentName}</h1>
                    </div>
                    <div className="column column-25">
                      <div className="magnet-info-block flex">
                        <div className="magnet-info-magnet">
                          <a
                            href={torrentData.torrentMagnetURI}
                            title={'Info hash:' + torrentData.torrentInfoHash}
                            target="_blank"
                          >
                            <svg
                              width="30"
                              height="30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0)" fill="#F07777">
                                <path d="M6.797 18.281a.586.586 0 100 1.173.586.586 0 000-1.173z" />
                                <path d="M25.547 7.031h-5.86a.586.586 0 00-.585.586v11.25A4.106 4.106 0 0115 22.97a4.1 4.1 0 01-4.102-4.102V7.617a.586.586 0 00-.586-.586H4.453a.586.586 0 00-.586.586v11.25C3.867 25.006 8.861 30 15 30c6.139 0 11.133-4.994 11.133-11.133V7.617a.586.586 0 00-.586-.586zM5.039 8.203h4.688v4.22H5.039v-4.22zm19.922 10.664c0 5.493-4.469 9.961-9.961 9.961s-9.96-4.468-9.96-9.96v-5.274h4.687v5.273A5.272 5.272 0 0015 24.141a5.28 5.28 0 005.273-5.274v-5.273h4.688v5.273zm0-6.445h-4.688V8.203h4.688v4.219z" />
                                <path d="M10.402 24.936a7.69 7.69 0 01-2.709-3.914.586.586 0 10-1.124.332 8.87 8.87 0 003.124 4.515.586.586 0 00.71-.933zM8.467 2.622a.586.586 0 00-.498-.278H6.573L7.321.848A.586.586 0 006.273.324L5.1 2.668a.586.586 0 00.524.848h1.396l-.748 1.496a.586.586 0 101.048.524l1.172-2.344a.586.586 0 00-.026-.57zM24.873 2.622a.586.586 0 00-.498-.278h-1.396l.748-1.496A.586.586 0 0022.68.324l-1.172 2.344a.586.586 0 00.524.848h1.396l-.748 1.496a.586.586 0 001.048.524L24.9 3.192a.586.586 0 00-.026-.57z" />
                              </g>
                              <defs>
                                <clipPath id="clip0">
                                  <path fill="#fff" d="M0 0h30v30H0z" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </div>
                        <div className="magnet-info-stats flex">
                          <div className="magnet-info-stat info-stat-downloading">
                            <div className="icon">
                              <svg
                                width="27"
                                height="27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M24.89.844H11.813a1.267 1.267 0 00-1.265 1.265v7.594a1.267 1.267 0 001.265 1.266h5.492l1.051 1.542a.632.632 0 01-.523.989h-.113a.422.422 0 100 .844h3.488a1.478 1.478 0 001.22-2.309L21.7 10.97h1.925v6.328a.422.422 0 01-.422.422h-2.531a1.266 1.266 0 100 2.531h1.687a.421.421 0 110 .844h-3.797a1.266 1.266 0 100 2.531h2.532a.422.422 0 010 .844h-5.907a.423.423 0 01-.421-.422V22.78h.421a1.267 1.267 0 001.266-1.265v-7.594a1.267 1.267 0 00-1.265-1.266H2.108a1.267 1.267 0 00-1.265 1.266v7.594a1.267 1.267 0 001.265 1.265h5.492l1.051 1.542a.633.633 0 01-.523.99h-.113a.422.422 0 100 .843h3.488a1.477 1.477 0 001.22-2.308l-.727-1.067h1.925v1.266a1.267 1.267 0 001.265 1.265h5.907a1.266 1.266 0 000-2.53h-2.532a.422.422 0 110-.845h3.797a1.265 1.265 0 100-2.53h-1.687a.422.422 0 110-.845h2.531a1.267 1.267 0 001.266-1.265v-6.328h.422a1.267 1.267 0 001.265-1.266V2.11A1.267 1.267 0 0024.891.844zm-9.28 13.078v7.594a.423.423 0 01-.422.422h-.495a1.26 1.26 0 00.073-.422v-7.594a1.26 1.26 0 00-.073-.422h.495a.422.422 0 01.421.422zm-3.583 10.401a.633.633 0 01-.523.99h-2.04c.124-.263.169-.557.127-.844h.956v-.844h-1.35l-.575-.844h2.354l1.051 1.542zM2.11 21.937a.422.422 0 01-.421-.421v-7.594a.422.422 0 01.421-.422H13.5a.422.422 0 01.422.422v7.594a.423.423 0 01-.422.422H2.11zm19.621-9.426a.632.632 0 01-.523.989h-2.04c.124-.262.169-.556.127-.844h.956v-.844H18.9l-.575-.843h2.354l1.051 1.542zm-9.918-2.386a.422.422 0 01-.421-.422V2.11a.423.423 0 01.421-.421h11.391a.422.422 0 01.422.421v7.594a.422.422 0 01-.422.422h-11.39zm13.5-.422a.422.422 0 01-.421.422h-.495a1.26 1.26 0 00.073-.422V2.11a1.26 1.26 0 00-.073-.421h.495a.422.422 0 01.422.421v7.594z"
                                  fill="#EE63B6"
                                />
                              </svg>
                            </div>
                            <div className="text">
                              Downloading from {playerPeersCount} peers
                            </div>
                          </div>
                          <div className="magnet-info-stat info-stat-seeding">
                            <div className="icon">
                              <svg
                                width="24"
                                height="24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0)">
                                  <path
                                    d="M17.648 18.358c-.378 0-.75.06-1.105.177a4.97 4.97 0 00-1.451-1.914 4.95 4.95 0 00-2.389-1.036V9.86c.998-.066 2.793-.364 4.032-1.603 1.76-1.76 1.622-4.646 1.615-4.769a.703.703 0 00-.663-.663c-.122-.007-3.008-.144-4.769 1.616a4.548 4.548 0 00-.5.596c-.257-1.037-.742-2.195-1.648-3.1C8.667-.168 5.207-.003 5.06.005a.703.703 0 00-.663.663c-.008.147-.173 3.607 1.93 5.71 1.54 1.54 3.809 1.863 4.97 1.923v7.283a4.95 4.95 0 00-2.39 1.036 4.97 4.97 0 00-1.45 1.914 3.531 3.531 0 00-4.632 3.35v1.412c0 .388.314.703.702.703h16.945a.703.703 0 00.703-.703v-1.412a3.531 3.531 0 00-3.527-3.527zm2.121 4.236H4.23v-.71A2.123 2.123 0 017.495 20.1a.703.703 0 001.064-.432A3.517 3.517 0 0112 16.94a3.517 3.517 0 013.442 2.727.703.703 0 001.064.432 2.123 2.123 0 013.264 1.786v.709zM9.776 2.93c1.168 1.168 1.445 2.986 1.506 3.962-.975-.06-2.787-.334-3.961-1.508C6.153 4.216 5.876 2.4 5.815 1.422c.975.06 2.787.334 3.96 1.508zm4.137 2.504c.87-.87 2.204-1.117 3.01-1.184-.07.807-.318 2.147-1.183 3.012-.87.87-2.205 1.117-3.01 1.184.07-.807.318-2.147 1.183-3.012z"
                                    fill="#5FBA85"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <path fill="#fff" d="M0 0h24v24H0z" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="text">
                              Seeding to {playerPeersCount} peers
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="video-details-footer">
                  <div className="row">
                    <div className="column column-80">
                      <div className="video-info-avatar flex">
                        <div className="avatar-icon">
                          {torrentData.createdBy
                            ? torrentData.createdBy
                                .split(' ')
                                .map((str) => str[0])
                                .join('')
                            : ''}
                        </div>
                        <div className="avatar-details">
                          <span className="name">{torrentData.createdBy}</span>
                          <span className="date">
                            Posted {dayjs(torrentData.created).format()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column column-20">
                      <button className="button btn-primary">Subscribe</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="video-description">{torrentData.comment}</div>
            </>
          )}
          <ul className="video-debug">
            <li>Torrent ID: {torrentId}</li>
            <li>Player State: {playerState}</li>
            <li>Player Error: {playerError}</li>
            <li>Player URL: {playerURL}</li>
            <li>Player Download Progress: {playerDownloadProgess}</li>
            <li>Player Peers Count: {playerPeersCount}</li>
            <li>Player Download Size: {playerDownloadSizeCount}</li>
            <li>Player Total Download Size: {playerTotalDownloadSizeCount}</li>
            <li>Player Download Time: {playerDownloadTime}</li>
            <li>Player Download Speed: {playerDownloadSpeed}</li>
          </ul>
        </>
      )}
    </div>
  );
}
