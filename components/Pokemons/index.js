// Hooks
import {usePokemons} from 'bus/pokemons/hooks/usePokemons';

const Pokemons = () => {
  const {pokemons} = usePokemons();

  const PokemonsJSX = pokemons && pokemons.map((pokemon, index) => (
    <div key={index}>
      {pokemon.name}
    </div>
  ));

  return (
    <>
      <h2>Pokemons</h2>
      {PokemonsJSX}
    </>
  )
}

export default Pokemons;