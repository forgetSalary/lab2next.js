// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { MapPoint } from '../AppMap';

export type GetPointsRes = Array<MapPoint>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPointsRes>
) {
  try{
    const buf = fs.readFileSync('public/data.json');
    const fileContent = buf.toString('utf8');
    const resObj: GetPointsRes = JSON.parse(fileContent)
    res.status(200).send(resObj);
    
  }
  catch(e){
    res.status(200).send([]);
  }
}