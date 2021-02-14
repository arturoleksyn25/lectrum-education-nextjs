//Core
import {useSelector} from "react-redux";

//Selectors
import {selectAsteroidsList} from "bus/asteroids/selectors";

const Asteroids = () => {
  const asteroids = useSelector(selectAsteroidsList);

  const AsteroidsJSX = asteroids && asteroids.map((asteroid) => (
    <div key={asteroid.id}>
      {asteroid.full_name}
    </div>
  ))

  return (
    <div>
      <h2>Asteroids</h2>
      {AsteroidsJSX}
    </div>
  )
}

export default Asteroids;