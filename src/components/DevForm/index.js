import React, { useState, useEffect } from 'react';

import './styles.css';

function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      err => console.error(err),
      { timeout: 30000 }
    );
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername('');
    setTechs('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='input-block'>
          <label htmlFor='github_username'>Github User</label>
          <input
            name='github_username'
            id='github_username'
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
            required
          />
        </div>

        <div className='input-block'>
          <label htmlFor='techs'>Techs</label>
          <input
            name='techs'
            id='techs'
            value={techs}
            onChange={e => setTechs(e.target.value)}
            required
          />
        </div>

        <div className='input-group'>
          <div className='input-block'>
            <label htmlFor='latitude'>Latitude</label>
            <input
              name='latitude'
              id='latitude'
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
              required
            />
          </div>

          <div className='input-block'>
            <label htmlFor='longitude'>Longitude</label>
            <input
              name='longitude'
              id='longitude'
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
              required
            />
          </div>
        </div>

        <button type='submit'>Salvar</button>
      </form>
    </div>
  );
}

export default DevForm;
