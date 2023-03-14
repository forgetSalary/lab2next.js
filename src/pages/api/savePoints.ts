import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { MapPoint } from '../AppMap';

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
  fs.writeFileSync("public/data.json",JSON.stringify(req.body)); //сохранени файла
  res.status(200).send("Success");
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") post(req,res);
    else res.status(200).send("Invalid method, use POST")
};
