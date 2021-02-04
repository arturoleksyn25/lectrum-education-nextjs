import {useSelector} from "react-redux";
import {useRouter} from 'next/router';

import Item from "components/shared/Item";

const Article = () => {
  const {query: {article}} = useRouter();
  const {news} = useSelector((state) => state);

  const ArticleJSX = news.news && (
    <Item {...news.news.find(item => item.id === article)}/>
  )

  return (
    <div>
      <h1>Article</h1>
      {ArticleJSX}
    </div>
  )
}

export default Article;