import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonInfo = () => {
  const [searchData, setSearchData] = useState({});
  const { name } = useParams();

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);

      setSearchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className='flex justify-center mt-2'>
        <input
          type='search'
          placeholder='Search'
          className='px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none cursor-pointer sm:w-72 md:w-96 focus:outline-none focus:shadow-outline'
        />
        <button
          type='submit'
          className='px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
        >
          Search
        </button>
      </form>
      <h1 className='mt-4 text-lg font-bold text-center'>Pokemon Lists:</h1>

      <div className='m-auto mt-4 text-center border rounded-lg shadow w-72'>
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
    </>
  );
};

export default PokemonInfo;
