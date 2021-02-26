//Core
import cookie from 'cookie';
import klaw from 'klaw';

//Other
import {getFile, setFile} from "helpers/fileHelper";
import {renderId} from "helpers/renderId";

export default async (req, res) => {
  const {
    method,
    query,
  } = req
  const cookies = cookie.parse(req.headers.cookie || '');
  const logUrl = "logs/rest";

  switch (method) {
    case 'POST':
      const log = {
        created: new Date().toISOString(),
        userId: "userId" in cookies ? cookies.userId : "",
        userAgent: req.headers['user-agent'],
        logId: renderId(),
        payload: req.body
      }

      await setFile(`${logUrl}/${log.logId}.json`, log)
      res.status(200).json({ name: 'New log was successfully created', log});
      break;
    case 'GET':
      const files = [];
      if (query?.userId) {
        for await (const file of klaw(logUrl)) {
          const data = await getFile(file.path);
          if (!Array.isArray(data) && +data.userId === +query?.userId) {
            files.push(data)
          }
        }
      } else {
        for await (const file of klaw(logUrl)) {
          const data = await getFile(file.path);
          if (!Array.isArray(data)) {
            files.push(data)
          }
        }
      }
      res.status(200).json({ name: 'REST Logs File', files});
      break;
    default:
      break;
  }
}