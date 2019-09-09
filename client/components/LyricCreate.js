import React, { useState } from 'react';

const LyricCreate = () => {

  const onSubmit = e => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmit} method="POST">
      <label htmlFor="lyric">Add a lyric</label>
      <input id="lyric" />
    </form>
  )
}

export default LyricCreate;