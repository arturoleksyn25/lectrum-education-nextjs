//Other
import {getFile} from "helpers/fileHelper";

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req

  if (method === 'GET') {
    const file = await getFile("logs/rest/storage.json");
    const log = file.find((item) => +item.logId === +id);

    if (log) {
      res.status(200).json({ name: `REST Log id${id} File`, log});
    } else {
      res.status(404).send('Not found');
    }
  }
}