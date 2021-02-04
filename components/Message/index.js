import {useSelector} from "react-redux";

const Message = () => {
  const {userType} = useSelector((state) => state.user);

  const guestJSX = userType === 'guest' && (
    <h1>Приветствуем тебя странник!</h1>
  )

  const friendJSX = userType === 'friend' && (
    <h1>Приветствуем тебя друг!</h1>
  )

  const familyJSX = userType === 'familyMember' && (
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

export default Message;