import { useEffect, useState } from 'react';

import WebTorrent from 'webtorrent';
import ReactPlayer from 'react-player';

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
          setTorrentData({
            torrentInfoHash: torrent.infoHash,
            torrentMagnetURI: torrent.magnetURI,
            torrentName: torrent.name,
            torrentFiles: torrent.files,
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
        });

        torrent.on('done', () => {
          console.debug('Done Event Triggered.');

          setPlayerState('downloaded');
          setPlayerDownloadProgess(100);
          clearInterval(interval);
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
