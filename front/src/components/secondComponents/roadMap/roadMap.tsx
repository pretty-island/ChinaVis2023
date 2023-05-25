import { useEffect, useRef, Component } from 'react';
import L from 'leaflet';
import 'proj4leaflet';
import "leaflet/dist/leaflet.css";

const RoadMap = () => {

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
      const mymap = L.map(mapRef.current, { attributionControl:false }).setView([-0.0017576975791426756, -0.00042456356621113807], 17);
      // 设置地图边界范围
      var southWest = L.latLng(-0.0058576975791426756, -0.00506456356621113807);  // 左下角边界坐标
      var northEast = L.latLng(0.00220, 0.00440);  // 右上角边界坐标
      var bounds = L.latLngBounds(southWest, northEast);
      mymap.setMaxBounds(bounds);

      // 将边界范围以内的区域设置为可见区域
      mymap.on('drag', function() {
        mymap.panInsideBounds(bounds, { animate: false });
      });

      L.control.attribution({ prefix: false }).addTo(mymap);
      L.tileLayer('src/assets/tiles/{z}/{x}/{y}.png', {
        attribution: '',
        minZoom: 17,
        maxZoom: 20,
        tms:false,
        // id: 'mapbox/streets-v11',
        // // tileSize: 512,
        // // zoomOffset: -1,
        // accessToken: 'pk.eyJ1Ijoid2xtcWppeWl6aCIsImEiOiJjanNwZ29zcTUwOXA5NGFveHEwNmNzZWgxIn0.rf8H02a7Z-PSV9qz471Cww'
      }).addTo(mymap);
      
    }
  })

  return <div ref={mapRef} style={{ width: '94%', height: '94%' }}></div>;
}


export default RoadMap;