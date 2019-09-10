import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import GET_SONG from '../queries/fetchSong';

const LIKE = gql`
  mutation LIKE($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

const LyricList = ({ lyrics, songId, title }) => {
  const [likeLyric, { data, loading, error }] = useMutation(LIKE);

  const updatedLyrics = (lyricsArray, lyricId, newLyric) =>
    lyricsArray.map(l => {
      if (l.id === lyricId) {
        l = {
          ...l,
          likes: newLyric.likes
        };
      }
      return l;
    });

  const onLikeClick = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      },
      update(
        cache,
        {
          data: { likeLyric }
        }
      ) {
        const { song } = cache.readQuery({
          query: GET_SONG,
          variables: { id: songId }
        });
        const updatedSong = {
          ...song,
          lyrics: updatedLyrics(song.lyrics, id, likeLyric)
        };
        cache.writeQuery({
          query: GET_SONG,
          data: { song: updatedSong }
        });
      }
    });
  };

  const renderLyrics = () =>
    lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
          {likes}
          <i onClick={() => onLikeClick(id, likes)} className="material-icons">
            thumb_up
          </i>
        </div>
      </li>
    ));
  return <ul className="collection">{renderLyrics()}</ul>;
};

export default LyricList;
