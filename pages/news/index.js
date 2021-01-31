import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {newsActions} from "bus/news/actions";
import BaseLayout from "components/layouts/BaseLayout";
import News from "components/News";
import {withUser} from "utils/withUser";
import {setCurrentDate} from "helpers/setCurrentDate";
import {getFile} from "helpers/getFile";

export const getServerSideProps = withUser(async (ctx) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const news = await getFile('public/news.json');

  store.dispatch(newsActions.fillNews(setCurrentDate(news)));
  const initialReduxState = store.getState();

  return {
    initialReduxState
  }
});

const NewsPage = () => {
  return (
    <BaseLayout>
      <News/>
    </BaseLayout>
  )
}

export default NewsPage;
