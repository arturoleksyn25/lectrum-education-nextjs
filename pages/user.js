import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import User from "components/User";
import BaseLayout from "components/layouts/BaseLayout";

export const getServerSideProps = async (ctx) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const initialReduxState = store.getState();

  return  {
    props: {
      initialReduxState
    }
  }
}

const UserPage = () => {
  return (
    <BaseLayout>
      <User/>
    </BaseLayout>
  )
}

export default UserPage;