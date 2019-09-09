import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {Link} from 'react-router-dom';
import GET_SONG from '../queries/fetchSong';
import LyricCreate from './LyricCreate';

const SongDetail = ({ match }) => {
  const { loading, error, data } = useQuery(GET_SONG, {
    variables: { id: match.params.id }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  const { song } = data;
  if (!song) return <div>Something went wrong, please try again and refresh page.</div>
  return (
    <div>
      <h3>Song Detail</h3>
      <p>id: {song.id}</p>
      <p>title: {song.title}</p>
      <Link to="/">Back</Link>
      <LyricCreate />
    </div>
  );
};

export default SongDetail;
