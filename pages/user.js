//Components
import User from "components/User";
import BaseLayout from "components/layouts/BaseLayout";

//Actions
import {userActions} from "bus/user/actions";

//Other
import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {withUser} from "utils/withUser";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());
  store.dispatch(userActions.fillUser(user));

  return {
    initialReduxState: {
      user
    }
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