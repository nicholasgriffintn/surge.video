import { useEffect, useState } from 'react';

import WebTorrent from 'webtorrent';
import ReactPlayer from 'react-player';

export default function VideoPlayer(props) {
  const [torrentData, setTorrentData] = useState([]);
  const [playerState, setPlayerState] = useState('initial');
  const [playerError, setPlayerError] = useState(null);
  const [playerFile, setPlayerFile] = useState(null);
  const [playerPosterFile, setPlayerPosterFile] = useState(null);
  const [playerDownloadProgess, setPlayerDownloadProgess] = useState(null);
  const [playerPeersCount, setPlayerPeersCount] = useState(null);
  const [playerDownloadSizeCount, setPlayerDownloadedSize] = useState(null);
  const [playerTotalDownloadSizeCount, setPlayerTotalDownloadSize] =
    useState(null);
  const [playerDownloadTime, setPlayerDownloadTime] = useState(null);

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
        const interval = setInterval(() => {
          setPlayerDownloadProgess((torrent.progress * 100).toFixed(1));
          setPlayerPeersCount(torrent.numPeers);
          setPlayerDownloadedSize((torrent.downloaded * 100).toFixed(1));
          setPlayerTotalDownloadSize((torrent.length * 100).toFixed(1));
          setPlayerDownloadTime((torrent.timeRemaining * 100).toFixed(1));
        }, 5000);
        torrent.on('done', () => {
          setPlayerState('downloaded');
          setPlayerDownloadProgess(100);
          clearInterval(interval);
        });

        setTorrentData({
          torrentInfoHash: torrent.infoHash,
          torrentMagnetURI: torrent.magnetURI,
          torrentName: torrent.name,
          torrentFiles: torrent.files,
        });
      });
    } else {
      setPlayerError('NoTorrentId');
    }
  }, [torrentId]);

  useEffect(() => {
    if (torrentData && torrentData.torrentFiles) {
      console.log(torrentData.torrentFiles);
      var mp4File = torrentData.torrentFiles.find(function (file) {
        return file.name.endsWith('.mp4');
      });

      setPlayerFile(mp4File ? mp4File : null);

      var jpgFile = torrentData.torrentFiles.find(function (file) {
        return file.name.endsWith('.jpg');
      });

      setPlayerPosterFile(jpgFile ? jpgFile : null);
    }
  }, [torrentData.torrentFiles]);

  return (
    <div>
      {playerError && (
        <>
          <h2>Whoops, an error occured.</h2>
          <p>Error: {playerError}</p>
        </>
      )}
      {playerFile && (
        <>
          <ReactPlayer
            url={playerFile.path}
            poster={playerPosterFile.path}
            width="100%"
            height="640px"
            controls={true}
          />
        </>
      )}
      <ul>
        <li>Torrent ID: {torrentId}</li>
        <li>Player State: {playerState}</li>
        <li>Player Error: {playerError}</li>
        <li>Player File Set?: {!playerFile}</li>
        <li>Player Download Progress: {playerDownloadProgess}</li>
        <li>Player Peers Count: {playerPeersCount}</li>
        <li>Player Download Size: {playerDownloadSizeCount}</li>
        <li>Player Total Download Size: {playerTotalDownloadSizeCount}</li>
        <li>Player Download Time: {playerDownloadTime}</li>
      </ul>
    </div>
  );
}
