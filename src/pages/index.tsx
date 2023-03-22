import AppMap, { MapPoint } from '../components/AppMap'
import React from 'react'

import styles from '@/styles/Home.module.css'

export default function Home() {

  const [points, setPoints] = React.useState<MapPoint[]>([]);
  const [pointsAdded, setPointsAdded] = React.useState(false)

  function handleGetPoints(points : MapPoint[]){
    if (points.length===0) {
      alert('Ошибка, ни одной точки магазина!');
    }
    setPoints(points);
    console.log(points)
  }

  React.useEffect(()=>{
    fetch('/api/getPoints').then(data=>data.json()).then(data=>handleGetPoints(data))
  },[]);

  function getEnteredPoint() : MapPoint{
    const title = (document.getElementById('inputTitle') as HTMLInputElement).value
    const coorsStr = (document.getElementById('inputCoordinates') as HTMLInputElement).value
    const point : MapPoint = {
      coordinates: JSON.parse(`[${coorsStr}]`),
      title: title,
    }
    if (point.coordinates.length === 0 || point.title.length === 0){
      throw Error;
    }
    return point;
  }

  async function savePoints(e: React.MouseEvent) {
    if (!pointsAdded){
      return;
    }
    
    const body = JSON.stringify(points);
    console.log(body)

    fetch('/api/savePoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    setPointsAdded(false);
  }

  async function addPoint(e: React.MouseEvent){
    try{
      const enteredPt = getEnteredPoint();
      for(let it of points){
        if (it.coordinates[0] == enteredPt.coordinates[0] && it.coordinates[1] == enteredPt.coordinates[1] ||
            it.title == enteredPt.title
        ){
          return;
        }
      }
      setPoints(points.concat(enteredPt));
      setPointsAdded(true);
    }
    catch{
      console.log("addPoint err")
    }
  }
  
  return (
    <>
    <main className={styles.main}>
      <div>Zoo map</div>
      <div className={styles.AppMap}>
        <AppMap points={points} zoom={12}></AppMap>
      </div>
      
      <div>Координаты:<br/> <input type="search" name="Coordinates" id="inputCoordinates" width="100"/></div>
      <div>Название:<br/> <input type="search" name="Title" id="inputTitle" /></div>
      <button onClick={addPoint}>Добавить</button>
      <button onClick={savePoints}>Сохранить</button>
    </main>
    </>
  )
}
