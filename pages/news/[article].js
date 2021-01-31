import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {getFile} from "helpers/getFile";
import {newsActions} from "bus/news/actions";
import BackLayout from "components/layouts/BackLayout";
import Article from "components/Article";
import {setCurrentDate} from "helpers/setCurrentDate";
import {redirectTo} from "helpers/redirectTo";
import {withUser} from "utils/withUser";

export const getServerSideProps = withUser(async (ctx) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const news = await getFile('public/news.json');

  if (!news.find(item => item.id === ctx.query.article)) {
    redirectTo(ctx, '/')
  }

  store.dispatch(newsActions.fillNews(setCurrentDate(news)));
  const initialReduxState = store.getState();

  return {
    initialReduxState
  }
});

const ArticlePage = () => {
  return (
    <BackLayout>
      <Article/>
    </BackLayout>
  )
}

export default ArticlePage;
