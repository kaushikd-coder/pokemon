import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [name, setName] = useState('');

  const inputRef = useRef(null);

  const fetchPokemon = async () => {
    try {
      const { data } = await axios(
        'https://pokeapi.co/api/v2/pokemon?limit=102'
      );
      setPokemons(data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
    inputRef.current.focus();
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemons([]);
      setSearchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className='flex justify-center mt-2' onSubmit={handleSubmit}>
        <input
          type='search'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search'
          className='px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none cursor-pointer sm:w-72 md:w-96 focus:outline-none focus:shadow-outline'
          ref={inputRef}
        />
        <button
          type='submit'
          className='px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
        >
          Search
        </button>
      </form>
      <h1 className='mt-4 text-lg font-bold text-center'>Pokemon Lists:</h1>

      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {pokemons?.map((pokemon, index) => {
          return (
            <Link
              to={`/${pokemon.name}`}
              key={index}
              className='mt-2 text-center border rounded-lg shadow cursor-pointer'
            >
              <p className='font-bold'>{pokemon.name}</p>
            </Link>
          );
        })}
      </div>

      {name && (
        <div className='m-auto mt-2 text-center border rounded-lg shadow w-72'>
          <p>
            <span className='font-bold '>Name:</span> {searchData.name}
          </p>
          <p>
            <span className='font-bold '>Base Experience is :</span>
            {searchData.base_experience}
          </p>

          <p>
            <span className='font-bold '>Abilties: </span>
            {searchData?.abilities?.map((val, index) => (
              <span key={index}>{val.ability.name}</span>
            ))}
          </p>

          <p>
            <span className='font-bold '>Height is: </span> {searchData.height}
          </p>
          <p>
            <span className='font-bold '>Weight is: </span> {searchData.weight}
          </p>
          <p>
            <span className='font-bold '>Id :</span> {searchData.id}
          </p>
        </div>
      )}
    </>
  );
};

export default Pokemon;
