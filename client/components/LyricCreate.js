import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import GET_SONG from '../queries/fetchSong';

const ADD_LYRIC_TO_SONG = gql`
  mutation ADD_LYRIC_TO_SONG($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;

const LyricCreate = ({ songId, lyrics, title }) => {
  const [content, setContent] = useState('');
  const [addLyricToSong, { data, loading }] = useMutation(ADD_LYRIC_TO_SONG, {
    variables: { content, songId },
    optimisticResponse: {
      __typename: 'Mutation',
      addLyricToSong: {
        id: songId,
        __typename: 'SongType',
        title,
        lyrics: [
          ...lyrics,
          {
            id: 'temp-id',
            content,
            __typename: 'LyricType'
          }
        ]
      }
    },
    update(
      cache,
      {
        data: { addLyricToSong }
      }
    ) {
      const { song } = cache.readQuery({
        query: GET_SONG,
        variables: { id: songId }
      });
      cache.writeQuery({
        query: GET_SONG,
        data: { song: addLyricToSong }
      });
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    addLyricToSong().then(() => setContent(''));
  };
  return (
    <form onSubmit={onSubmit} method="POST">
      <label htmlFor="lyric">Add a lyric</label>
      {loading && <p>Saving...</p>}
      <input
        id="lyric"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ backgroundColor: loading ? 'lightgrey' : '' }}
      />
    </form>
  );
};

export default LyricCreate;
