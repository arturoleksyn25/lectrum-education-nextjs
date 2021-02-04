import {useSelector, useDispatch} from "react-redux";

import {userActions} from 'bus/user/actions';
import {getImprovedStatus} from 'helpers/getImprovedStatus';

const User = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state);

  const handleClick = () => {
    dispatch(userActions.setUserType(getImprovedStatus(user.userType)))
  }

  const userJSX = user && (
    <>
      <h3>{`ID: ${user.userId}`}</h3>
      <h3>{`Visit Counts: ${user.visitCounts}`}</h3>
      <h3>{`Type: ${user.userType}`}</h3>
    </>
  )

  return (
    <div>
      <h1>User Data:</h1>
      {userJSX}
      <button onClick={handleClick}>
        Временно повысить свой статус
      </button>
    </div>
  )
}

export default User;