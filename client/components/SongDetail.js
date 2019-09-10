import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import GET_SONG from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

const SongDetail = ({ match, history }) => {
  const { loading, error, data } = useQuery(GET_SONG, {
    variables: { id: match.params.id }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  const { song } = data;
  if (!song)
    return <div>Something went wrong, please try again and refresh page.</div>;
  return (
    <div>
      <h3>Song Detail</h3>
      {song.lyrics && song.lyrics.length ? (
        <LyricList lyrics={song.lyrics} songId={song.id} title={song.title}/>
      ) : null}
      <Link to="/">Back</Link>
      <LyricCreate songId={match.params.id} history={history} lyrics={song.lyrics} title={song.title} />
    </div>
  );
};

export default SongDetail;
