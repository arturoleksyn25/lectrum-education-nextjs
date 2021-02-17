//Core
import cookie from 'cookie';

//Other
import {getFile, setFile} from "helpers/fileHelper";
import {renderId} from "helpers/renderId";

export default async (req, res) => {
  const {
    method,
    query,
  } = req
  const {userId} = cookie.parse(req.headers.cookie);
  const logUrl = "logs/graphql/storage.json";
  const file = await getFile(logUrl);

  switch (method) {
    case 'POST':
      const log = {
        created: new Date().toISOString(),
        userId,
        userAgent: req.headers['user-agent'],
        logId: renderId(),
        payload: req.body
      }

      await setFile(logUrl, [...file, log])
      res.status(200).json({ name: 'New log was successfully created', log});
      break;
    case 'GET':
      if (query?.userId) {
        res.status(200).json({ name: 'GraphQL Logs File', file: file.filter(item => +item.userId === +query.userId)});
      } else {
        res.status(200).json({ name: 'GraphQL Logs File', file});
      }
      break;
    default:
      break;
  }
}