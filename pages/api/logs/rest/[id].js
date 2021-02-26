//Other
import {getFile} from "helpers/fileHelper";

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req

  if (method === 'GET') {
    const log = await getFile(`logs/rest/${id}.json`);

    if (Array.isArray(log)) {
      res.status(404).send('Not found');
    } else {
      res.status(200).json({ name: `REST Log id${id} File`, log});
    }
  }
}