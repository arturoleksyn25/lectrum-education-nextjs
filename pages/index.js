import nookies from 'nookies';
import fs from 'fs';

import {renderId} from 'helpers/renderId';

export const getServerSideProps = async (ctx) => {
  const userId = +nookies.get(ctx).userId || renderId();
  const getFile = new Promise((resolve) => {
    fs.readFile("users.json", {encoding: 'utf-8'}, (err, data) => {
      resolve(err ? [] : JSON.parse(data))
    });
  });
  const file = await getFile;
  const visitCounts = file.find((user) => user.userId === userId)?.visitCounts + 1 || 1;

  nookies.set(ctx, 'userId', userId);
  fs.writeFile(
    "users.json",
    JSON.stringify(visitCounts === 1 ?
      [...file, {userId, visitCounts}]
        : file.map(user => user.userId === userId ? {userId, visitCounts} : user)),
    () => {}
  )

  return {
    props: {
      isGuest: visitCounts < 3,
      isFriend: visitCounts >= 3 && visitCounts < 5,
      isFamily: visitCounts >= 5
    }
  }
}

export default function Home({isGuest, isFriend, isFamily}) {
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
