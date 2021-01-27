import {getFile} from 'helpers/getFile';
import {withUser} from 'utils/withUser';

export const getServerSideProps = withUser(async ({isGuest, isFriend, isFamily}) => {
  const news = isGuest || isFriend || isFamily ? await getFile('public/news.json') : null;
  const discounts = isFriend || isFamily? await getFile('public/discounts.json') : null;
  const cars = isFamily ? await getFile('public/cars.json') : null;

  return {
    news,
    discounts,
    cars
  }
});

const Dashboard = ({news, discounts, cars}) => {
  const renderText = ({id, content, dateOfReceiving}) => {
    return (
      <div key={id}>
        <span>{dateOfReceiving}</span>
        <p>{content}</p>
        <style>{`
        div {
          border-bottom: 1px solid;
        }
        span {
          font-size: 12px;
        }
      `}</style>
      </div>
    )
  }

  const newsJSX = news && (
    <div>
      <h4>News List</h4>
      {news.map(line => renderText(line))}
    </div>
  )

  const discountsJSX = discounts && (
    <div>
      <h4>Discounts List</h4>
      {discounts.map(line => renderText(line))}
    </div>
  )

  const carsJSX = cars && (
    <div>
      <h4>Cars List</h4>
      {cars.map(line => renderText(line))}
    </div>
  )

  return (
    <div>
      {newsJSX}
      {discountsJSX}
      {carsJSX}
    </div>
  )
}

export default Dashboard;