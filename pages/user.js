import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {userActions} from "bus/user/actions";
import User from "components/User";
import BaseLayout from "components/layouts/BaseLayout";
import {withUser} from "utils/withUser";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());
  store.dispatch(userActions.fillUser(user));

  const initialReduxState = store.getState();

  return {
    initialReduxState
  }
});

const UserPage = () => {
  return (
    <BaseLayout>
      <User/>
    </BaseLayout>
  )
}

export default UserPage;