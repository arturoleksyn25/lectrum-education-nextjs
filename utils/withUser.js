import nookies from "nookies";
import fs from 'fs';

import {parseUserType} from 'helpers/parseUserType';
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