import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import GET_SONGS from '../queries/fetchSongs';

export const ADD_SONG = gql`
  mutation ADD_SONG($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongCreate = ({ history }) => {
  const [title, setTitle] = useState('');
  const [addSong, { data }] = useMutation(ADD_SONG, {
    variables: { title },
    refetchQueries: [{ query: GET_SONGS }]
  });
  const onSubmit = e => {
    e.preventDefault();
    addSong();
    history.push('/');
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit} method="POST">
        <label>Song Title:</label>
        <input onChange={e => setTitle(e.target.value)} value={title} />
      </form>
    </div>
  );
};

export default SongCreate;
