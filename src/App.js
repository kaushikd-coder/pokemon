import Pokemon from './components/Pokemon';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonInfo from './components/PokemonInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pokemon />} />
        <Route path='/:name' element={<PokemonInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
