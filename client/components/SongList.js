import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import GET_SONGS from '../queries/fetchSongs';
import '../style/style.css';

const DELETE_SONG = gql`
  mutation DELETE_SONG($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const SongList = ({ history, location, match }) => {
  const { loading, error, data } = useQuery(GET_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query: GET_SONGS }]
  });

  const renderSongs = () =>
    data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i
          className="material-icons"
          onClick={() => deleteSong({ variables: { id } })}
        >
          delete
        </i>
      </li>
    ));

  if (loading) return 'Loading...';
  if (error) return 'Error...';
  return (
    <div>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
