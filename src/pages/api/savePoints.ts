import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { MapPoint } from '../../components/AppMap';
import path from 'path';

export const config = {
    api: {
        bodyParser: true
    }
};

interface SavePointsApiRequest extends NextApiRequest {
  body: MapPoint[];
}

function post(
  req: SavePointsApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const dir = path.join(process.cwd(), 'public');
  fs.writeFileSync(dir + "/data.json",JSON.stringify(req.body)); //сохранени файла
  res.status(200).send("Success");
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") post(req,res);
    else res.status(200).send("Invalid method, use POST")
};
