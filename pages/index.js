import {initializeStore} from 'init/store';
import {initialDispatcher} from 'init/initialDispatcher';
import {userActions} from 'bus/user/actions';
import {withUser} from 'utils/withUser';
import Message from "components/Message";
import BaseLayout from "components/layouts/BaseLayout";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());
  store.dispatch(userActions.fillUser(user));

  const initialReduxState = store.getState();

  return {
    initialReduxState
  }
});

const Home = () => {
  return (
    <BaseLayout>
      <Message/>
    </BaseLayout>
  )
}

export default Home;
