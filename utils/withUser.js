import nookies from "nookies";
import fs from 'fs';

import {renderId} from "helpers/renderId";
import {getFile} from "helpers/getFile";

export const withUser = (getData) => async (ctx) => {
  const userId = +nookies.get(ctx).userId || renderId();
  const file = await getFile("users.json");
  const visitCounts = file.find((user) => user.userId === userId)?.visitCounts + 1 || 1;

  nookies.set(ctx, 'userId', userId);
  fs.writeFile(
    "users.json",
    JSON.stringify(visitCounts === 1 ?
      [...file, {userId, visitCounts}]
      : file.map(user => user.userId === userId ? {userId, visitCounts} : user)),
    () => {}
  )
  const props = {
    isGuest: visitCounts < 3,
    isFriend: visitCounts >= 3 && visitCounts < 5,
    isFamily: visitCounts >= 5
  }
  const data = getData ? await getData(props) : {};

  return {
    props: {
      ...props,
      ...data
    }
  }
}