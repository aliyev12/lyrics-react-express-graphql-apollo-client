import React from 'react';

const LyricList = ({ lyrics }) => {
  const renderLyrics = () =>
    lyrics.map(({ id, content }) => (
      <li key={id} className="collection-item">
        {content}
      </li>
    ));
  return <ul className="collection">{renderLyrics()}</ul>;
};

export default LyricList;
