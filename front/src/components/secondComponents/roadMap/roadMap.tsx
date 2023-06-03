import { useEffect, useRef, Component } from 'react';
import L from 'leaflet';
import 'proj4leaflet';
import "leaflet/dist/leaflet.css";

const RoadMap = () => {

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
      const mymap = L.map(mapRef.current, { attributionControl: false }).setView([-0.0017576975791426756, -0.00042456356621113807], 17);
      // 设置地图边界范围
      var southWest = L.latLng(-0.0058576975791426756, -0.00506456356621113807);  // 左下角边界坐标
      var northEast = L.latLng(0.00220, 0.00440);  // 右上角边界坐标
      var bounds = L.latLngBounds(southWest, northEast);
      mymap.setMaxBounds(bounds);

      const arr = [-560.2920031034, -226.3958884591]
      // 将边界范围以内的区域设置为可见区域
      mymap.on('drag', function () {
        mymap.panInsideBounds(bounds, { animate: false });
      });

      L.control.attribution({ prefix: false }).addTo(mymap);
      L.tileLayer('src/assets/tiles/{z}/{x}/{y}.png', {
        attribution: '',
        minZoom: 17,
        maxZoom: 20,
        tms: false,
        // id: 'mapbox/streets-v11',
        // // tileSize: 512,
        // // zoomOffset: -1,
        // accessToken: 'pk.eyJ1Ijoid2xtcWppeWl6aCIsImEiOiJjanNwZ29zcTUwOXA5NGFveHEwNmNzZWgxIn0.rf8H02a7Z-PSV9qz471Cww'
      }).addTo(mymap);
      //弹窗显示点击处的坐标
      var polygon5_6_1 = L.polygon([
        [-0.002591, -0.003025],
        [-0.002694, -0.003055],
        [-0.002811, -0.002774],
        [-0.002708, -0.002736],
      ], { color: '{}' }).addTo(mymap);
      var polygon5_6_2 = L.polygon([
        [-0.002707, -0.002733],
        [-0.002816, -0.002771],
        [-0.002971, -0.002372],
        [-0.003054, -0.002124],
        [-0.003132, -0.001943],
        [-0.003041, -0.001917],
      ]).addTo(mymap);
      var polygon5_6_3 = L.polygon([
        [-0.003041, -0.001917],
        [-0.003132, -0.001943],
        [-0.003278, -0.001577],
        [-0.003199, -0.001545],
      ], { color: 'red' }).addTo(mymap);
      var polygon6_5_1 = L.polygon([
        [-0.003278, -0.001577],
        [-0.003386, -0.001625],
        [-0.003238, -0.001986],
        [-0.003132, -0.001943],
      ]).addTo(mymap);
      var polygon6_5_2 = L.polygon([
        [-0.003132, -0.001943],
        [-0.003238, -0.001986],
        [-0.002904, -0.002801],
        [-0.002816, -0.002771],
        [-0.002971, -0.002372],
        [-0.003054, -0.002124],
      ], { color: 'red' }).addTo(mymap);
      var polygon6_5_3 = L.polygon([
        [-0.002816, -0.002771],
        [-0.002904, -0.002801],
        [-0.002784, -0.003084],
        [-0.002694, -0.003055],
      ]).addTo(mymap);

      var polygon5_left_1 = L.polygon([
        [-0.002422, -0.003474],
        [-0.002486, -0.003493],
        [-0.002351, -0.003828],
        [-0.002288, -0.003807],
      ]).addTo(mymap);
      var polygon5_left_2 = L.polygon([
        [-0.002288, -0.003807],
        [-0.002351, -0.003828],
        [-0.002224, -0.004155],
        [-0.00213, -0.004481],
        [-0.002031, -0.004741],
        [-0.001924, -0.004706],
      ], { color: 'red' }).addTo(mymap);
      var polygonleft_5_1 = L.polygon([
        [-0.002351, -0.003828],
        [-0.00247, -0.003872],
        [-0.002609, -0.003539],
        [-0.002486, -0.003493],

      ]).addTo(mymap);
      var polygonleft_5_2 = L.polygon([
        [-0.002031, -0.004741],
        [-0.002103, -0.004772],
        [-0.00247, -0.003872],
        [-0.002351, -0.003828],
        [-0.002224, -0.004155],
        [-0.00213, -0.004481],
      ], { color: 'red' }).addTo(mymap);


      var polygon1_5_1 = L.polygon([
        [0.000028, -0.002459],
        [-0.00002, -0.002351],
        [-0.000297, -0.002448],
        [-0.000269, -0.002549],
      ], { color: 'red' }).addTo(mymap);
      var polygon1_5_2 = L.polygon([
        [-0.000269, -0.002549],
        [-0.000297, -0.002448],
        [-0.000814, -0.002615],
        [-0.000777, -0.002692],
        [-0.000577, -0.002654],
      ], { color: 'red' }).addTo(mymap);
      var polygon1_5_3 = L.polygon([
        [-0.000777, -0.002692],
        [-0.000814, -0.002615],
        [-0.00124, -0.002754],
        [-0.001219, -0.002834],

      ], { color: 'red' }).addTo(mymap);
      var polygon1_5_4 = L.polygon([
        [-0.001219, -0.002834],
        [-0.00124, -0.002754],
        [-0.001743, -0.002918],
        [-0.001724, -0.003002],

      ], { color: 'red' }).addTo(mymap);
      var polygon1_5_5 = L.polygon([
        [-0.001724, -0.003002],
        [-0.001743, -0.002918],
        [-0.002125, -0.003043],
        [-0.002106, -0.003127],

      ], { color: 'red' }).addTo(mymap);
      var polygon1_5_6 = L.polygon([
        [-0.002106, -0.003127],
        [-0.002125, -0.003043],
        [-0.002383, -0.003124],
        [-0.00235, -0.003201],
      ], { color: 'red' }).addTo(mymap);
      var polygon5_1_1 = L.polygon([
        [-0.002106, -0.003127],
        [-0.00235, -0.003201],
        [-0.002299, -0.00331],
        [-0.00208, -0.003239],
      ], { color: 'red' }).addTo(mymap);
      var polygon5_1_2 = L.polygon([
        [-0.002106, -0.003127],
        [-0.00208, -0.003239],
        [-0.001713, -0.003112],
        [-0.00173, -0.003002],
      ], { color: 'blue' }).addTo(mymap);









      var popup = L.popup();
      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(mymap);
      }
      mymap.on('click', onMapClick);
    }
  })

  return <div ref={mapRef} style={{ width: '94%', height: '94%' }}></div>;
}


export default RoadMap;