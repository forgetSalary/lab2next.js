// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import directoryTree from "directory-tree";
import fs from 'fs'
import { MapPoint } from '../../components/AppMap';
import { serverPath } from './helpers';

export type GetPointsRes = Array<MapPoint>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPointsRes>
) {
  try{
    const path = serverPath(".");
    console.log("path: ", path);
    const tree = directoryTree(path, {attributes:["type", "extension"]});
    console.log(JSON.stringify(tree, null, " "));

    const buf = fs.readFileSync('./data.json');
    const fileContent = buf.toString('utf8');
    const resObj: GetPointsRes = JSON.parse(fileContent)
    res.status(200).send(resObj);
    
  }
  catch(e){
    res.status(200).send([]);
  }
}
