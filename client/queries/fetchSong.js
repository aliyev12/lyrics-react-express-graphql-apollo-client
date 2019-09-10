import { gql } from 'apollo-boost';
export default gql`
  query GET_SONG($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;
