// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { MapPoint } from '../../components/AppMap';

export type GetPointsRes = Array<MapPoint>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPointsRes>
) {
  try{
    fs.readdir(".", (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    });

    const buf = fs.readFileSync('./data.json');
    const fileContent = buf.toString('utf8');
    const resObj: GetPointsRes = JSON.parse(fileContent)
    res.status(200).send(resObj);
    
  }
  catch(e){
    res.status(200).send([]);
  }
}
