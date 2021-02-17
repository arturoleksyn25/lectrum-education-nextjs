import nookies from "nookies";

import {parseUserType} from 'helpers/parseUserType';
import {renderId} from "helpers/renderId";
import {getFile, setFile} from "helpers/fileHelper";

export const withUser = (getData) => async (ctx) => {
  const userId_cookie = +nookies.get(ctx).userId;
  const userId = userId_cookie || renderId();
  const file = await getFile("users.json");
  const visitCounts = file.find((user) => user.userId === userId)?.visitCounts + 1 || 1;

  if (!userId_cookie) {
    nookies.set(ctx, 'userId', userId);
  }

  await setFile("users.json", visitCounts === 1 ?
    [...file, {userId, visitCounts}]
    : file.map(user => user.userId === userId ? {userId, visitCounts} : user))

  const user = {
    userId,
    visitCounts,
    userType: parseUserType(visitCounts)
  }

  const data = getData ? await getData(ctx, user) : {};

  return {
    props: {
      ...data
    }
  }
}