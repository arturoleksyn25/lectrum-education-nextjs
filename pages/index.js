import {withUser} from 'utils/withUser';

export const getServerSideProps = withUser();

const Home = ({isGuest, isFriend, isFamily}) => {
  const guestJSX = isGuest && (
    <h1>Приветствуем тебя странник!</h1>
  )

  const friendJSX = isFriend && (
    <h1>Приветствуем тебя друг!</h1>
  )

  const familyJSX = isFamily && (
    <h1>Добро пожаловать в семье!</h1>
  )

  return (
    <div>
      {guestJSX}
      {friendJSX}
      {familyJSX}
    </div>
  )
}

export default Home;
