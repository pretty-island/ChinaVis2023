import { useEffect, useRef, Component } from 'react';
import L from 'leaflet';
import 'proj4leaflet';
import "leaflet/dist/leaflet.css";

const RoadMap = () => {

    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
         if (mapRef.current) {
        const mymap = L.map(mapRef.current,{ crs: L.CRS.EPSG4326 }).setView([-250, -50], 0.09);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 13,
            id: 'mapbox/streets-v11',
            // tileSize: 512,
            // zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoid2xtcWppeWl6aCIsImEiOiJjanNwZ29zcTUwOXA5NGFveHEwNmNzZWgxIn0.rf8H02a7Z-PSV9qz471Cww'
        }).addTo(mymap);
        const loadRoadData = async () => {
            try {
              const response = await fetch('src/assets/roadData/boundaryroad_with9road.geojson');
              console.log("response");
              console.log(response);
              const boundaryRoadGeoJSON = await response.json();
              console.log(boundaryRoadGeoJSON);
              L.geoJSON(boundaryRoadGeoJSON, {
                // crs: L.CRS.EPSG4326 
                // style: style,
                // onEachFeature: onEachFeature,
              }).addTo(mymap);
            } catch (error) {
              console.error('Failed to load road data:', error);
            }
          };
    
          loadRoadData();
        }
    })

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
}


export default RoadMap;