//Core
import {useEffect} from 'react';
import {useDispatch} from "react-redux";

// Components
import {
  Message,
  Asteroids,
  Pokemons
} from "components";
import Cats from "bus/cats/catsComponent";
import {BaseLayout} from "components/layouts";

//Actions
import {userActions} from 'bus/user/actions';
import {asteroidsActions} from 'bus/asteroids/actions';
import {catsActions} from 'bus/cats/actions';

// Selectors
import { selectAsteroidsList } from 'bus/asteroids/selectors';

// Other
import {initializeStore} from 'init/store';
import { initApollo } from 'init/initApollo';
import {initialDispatcher} from 'init/initialDispatcher';
import {withUser} from 'utils/withUser';
import { serverDispatch } from 'helpers/serverDispatch';
import { disableSaga } from 'helpers/disableSaga';
import queryPokemons from '../bus/pokemons/hooks/usePokemons/gql/queryPokemons.graphql';

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const initialApolloState = await initApollo(ctx, async (execute) => {
    await execute({
      query: queryPokemons,
    });
  });

  await serverDispatch(store, (dispatch) => {
    dispatch(userActions.fillUser(user));
    dispatch(asteroidsActions.fetchAsteroidsAsync());
  });

  await disableSaga(store);

  const initialReduxState = {
    user,
    asteroids: {
      list: selectAsteroidsList(store.getState()),
    },
  };

  return {
    initialReduxState,
    initialApolloState
  }
});

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(catsActions.loadCatsAsync());
  }, [])

  return (
    <BaseLayout>
      <Message/>
      <Asteroids/>
      <Pokemons/>
      <Cats/>
    </BaseLayout>
  )
}

export default Home;
