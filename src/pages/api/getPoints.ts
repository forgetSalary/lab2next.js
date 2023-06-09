// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import directoryTree from "directory-tree";
import path from 'path';
import fs from 'fs'
import { MapPoint } from '../../components/AppMap';
import { serverPath } from './helpers';

export type GetPointsRes = Array<MapPoint>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPointsRes>
) {
  try{
    const dir = path.join(process.cwd(), 'public');
    console.log("dir: ", dir);
    
    const buf = fs.readFileSync(dir + '/data.json');
    const fileContent = buf.toString('utf8');
    const resObj: GetPointsRes = JSON.parse(fileContent)
    res.status(200).send(resObj);
    
  }
  catch(e){
    res.status(200).send([]);
  }
}
