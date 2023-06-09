
//import './AppMap.css'
import React from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import AppPlacemark from "./AppPlacemark";

export type MapPoint = {
    coordinates: number[],
    title: string
}

export type AppMapProps = {
    points: Array<MapPoint>,
    zoom: number
}

const AppMap = (props: AppMapProps) => {
    const {points,zoom} = props;
  
    const mapState = {
      center: [53.195042, 45.018316],
      zoom: zoom,
      behaviors: ["default", "scrollZoom"]
    };
    
    
    return (
      <>
        <YMaps>
          <Map width="1000px" height="500px" state={mapState}>
            {points.map((it,id)=>
            <div key={id}>
              <AppPlacemark 
                coordinates={
                  it.coordinates
                }
                balloonText={
                  it.title
                }
              /></div>)}
          </Map>
        </YMaps>
      </>
    );
  };
  
  export default AppMap;