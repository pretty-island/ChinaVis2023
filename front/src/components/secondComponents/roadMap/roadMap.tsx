import { useEffect, useRef, Component } from 'react';
import L from 'leaflet';
import 'proj4leaflet';
import "leaflet/dist/leaflet.css";
// import 'leaflet.heat.js'
interface RoadMapProps {
  heatMap: string;
  // setEventName: React.Dispatch<React.SetStateAction<string>>;
  // typeName: string;
}
const RoadMap: React.FC<RoadMapProps> = ({ heatMap }) => {

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
      // if (mapRef.current != undefined) mapRef.current.remove();
      var container = L.DomUtil.get(mapRef.current);
      if (container != null) {
        container._leaflet_id = null;
      }
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
      var polygon5_right_1 = L.polygon([
        [-0.002612, -0.00303],
        [-0.002694, -0.003055],
        [-0.002971, -0.002372],
        [-0.003054, -0.002124],
        [-0.003278, -0.001577],
        [-0.003211, -0.001554],
      ], { fillColor: 'blue', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon5_right_2 = L.polygon([
        [-0.002694, -0.003055],
        [-0.002763, -0.003077],
        [-0.003359, -0.001613],
        [-0.003278, -0.001577],
        [-0.003054, -0.002124],
        [-0.002971, -0.002372],
      ], { fillColor: 'blue', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon5_left_2 = L.polygon([
        [-0.002488, -0.003494],
        [-0.002588, -0.003525],
        [-0.002084, -0.00476],
        [-0.00203, -0.004741],
        [-0.002123, -0.004511],
        [-0.002218, -0.004171],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon5_left_1 = L.polygon([
        [-0.002488, -0.003494],
        [-0.002425, -0.003469],
        [-0.001925, -0.004707],
        [-0.00203, -0.004741],
        [-0.002123, -0.004511],
        [-0.002218, -0.004171],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon1_left_1 = L.polygon([
        [0.000578, -0.002504],
        [0.000918, -0.003268],
        [0.000845, -0.0033],
        [0.000497, -0.002541],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon1_left_2 = L.polygon([
        [0.000497, -0.002541],
        [0.000846, -0.003342],
        [0.000746, -0.003368],
        [0.000408, -0.002596],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon1_left_3 = L.polygon([
        [0.000408, -0.002596],
        [0.000746, -0.003368],
        [0.000651, -0.003395],
        [0.000313, -0.002657],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon1_left_4 = L.polygon([
        [0.000313, -0.002657],
        [0.001194, -0.004695],
        [0.001124, -0.004738],
        [0.000231, -0.002698],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon1_up_1 = L.polygon([
        [0.000946, -0.002229],
        [0.000912, -0.002134],
        [0.00059, -0.002242],
        [0.000637, -0.002326],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon1_up_2 = L.polygon([
        [0.00059, -0.002242],
        [0.000927, -0.00213],
        [0.000908, -0.002053],
        [0.000551, -0.002171],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon1_down_1 = L.polygon([
        [0.000008, -0.002534],
        [-0.000012, -0.002477],
        [-0.000579, -0.002656],
        [-0.000796, -0.002704],
        [-0.002346, -0.003209],//
        [-0.002317, -0.00329],
        [-0.001732, -0.003101],
        [-0.001538, -0.003012],
        [-0.00077, -0.00276],
        [-0.000574, -0.00272],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon1_down_2 = L.polygon([
        [-0.002346, -0.003209],//
        [-0.000796, -0.002704],
        [-0.000579, -0.002656],
        [-0.000012, -0.002477],
        [-0.00004, -0.002387],
        [-0.002371, -0.003147],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon1_right_1 = L.polygon([
        [0.000241, -0.002065],
        [0.000116, -0.002103],//
        [-0.000321, -0.001406],
        [-0.000413, -0.001213],
        [-0.000798, -0.000584],//
        [-0.000704, -0.000538],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon1_right_2 = L.polygon([
        [0.000116, -0.002103],//
        [-0.000321, -0.001406],
        [-0.000413, -0.001213],
        [-0.000798, -0.000584],//
        [-0.000918, -0.000644],
        [0.00002, -0.002157],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon2_up_1 = L.polygon([
        [-0.000632, -0.00032],
        [-0.000698, -0.000223],
        [-0.00016, 0.000025],
        [0.000179, 0.000161],
        [0.000267, 0.000221],
        [0.000321, 0.000143],
        [0.000153, 0.000049],
        [-0.000117, -0.000079],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon2_up_2 = L.polygon([
        [-0.000729, -0.000189],
        [-0.000771, -0.00011],
        [-0.000512, -0.000001],
        [-0.000244, 0.000136],
        [0.000128, 0.000432],
        [0.000351, 0.000567],
        [0.00063, 0.000666],
        [0.001186, 0.000924],
        [0.001223, 0.000842],
        [0.000686, 0.000591],
        [0.000443, 0.000511],
        [0.000078, 0.000284],
        [-0.00005, 0.00017],
        [-0.000201, 0.000053],
        [-0.000486, -0.000086],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon2_down_1 = L.polygon([
        [-0.001215, -0.000528],
        [-0.00127, -0.00043],//
        [-0.00316, -0.001205],//
        [-0.003112, -0.001327],
        [-0.002412, -0.001038],
        [-0.002245, -0.00095],
        [-0.001214, -0.000529],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon2_down_2 = L.polygon([
        [-0.00127, -0.00043],//
        [-0.00316, -0.001205],//
        [-0.003194, -0.001091],
        [-0.002137, -0.000664],
        [-0.002015, -0.000587],
        [-0.001351, -0.000317],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon2_right_1 = L.polygon([
        [-0.001038, 0.000041],
        [-0.001154, -0.000018],//
        [-0.001717, 0.000848],//
        [-0.001601, 0.000908],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon2_right_2 = L.polygon([
        [-0.001154, -0.000018],//
        [-0.001717, 0.000848],//
        [-0.001865, 0.000769],
        [-0.001302, -0.000098]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon3_up_1 = L.polygon([
        [-0.001607, 0.001205],//
        [-0.001115, 0.001529],
        [-0.001034, 0.001577],//
        [-0.000988, 0.001512],
        [-0.001562, 0.00114],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon3_up_2 = L.polygon([
        [-0.001607, 0.001205],//
        [-0.001115, 0.001529],//
        [-0.001167, 0.001611],
        [-0.001666, 0.001288]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon3_right_1 = L.polygon([
        [-0.001903, 0.001349],
        [-0.002052, 0.001283],//
        [-0.002383, 0.001791],
        [-0.002476, 0.002035],
        [-0.002742, 0.002446],//
        [-0.002656, 0.002502]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon3_right_2 = L.polygon([
        [-0.002052, 0.001283],//
        [-0.002383, 0.001791],
        [-0.002476, 0.002035],
        [-0.002742, 0.002446],//
        [-0.00288, 0.002355],
        [-0.002157, 0.001245]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon4_up_1 = L.polygon([
        [-0.002656, 0.002863],//
        [-0.002282, 0.003103],//
        [-0.002215, 0.003004],
        [-0.002594, 0.00276],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon4_up_2 = L.polygon([
        [-0.002656, 0.002863],//
        [-0.002282, 0.003103],//
        [-0.002175, 0.003167],
        [-0.002204, 0.003209],
        [-0.002452, 0.003047],
        [-0.00248, 0.003095],
        [-0.002713, 0.002947]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon4_right_1 = L.polygon([
        [-0.002996, 0.003054],
        [-0.003127, 0.002967],//
        [-0.003441, 0.003436],
        [-0.003647, 0.00378],//
        [-0.003637, 0.003788],
        [-0.003671, 0.003849],
        [-0.003559, 0.003903],
        [-0.003286, 0.003495],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon4_right_2 = L.polygon([
        [-0.003127, 0.002967],//
        [-0.003441, 0.003436],
        [-0.003647, 0.00378],//
        [-0.003773, 0.0037],
        [-0.003235, 0.002873],
        [-0.003119, 0.002952]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon4_down_1 = L.polygon([
        [-0.003218, 0.002444],
        [-0.003259, 0.002518],//
        [-0.004883, 0.001751],//
        [-0.004837, 0.001684],
        [-0.004189, 0.001994],
        [-0.003866, 0.002132],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon4_down_2 = L.polygon([
        [-0.003259, 0.002518],//
        [-0.004883, 0.001751],//
        [-0.004928, 0.001823],
        [-0.004277, 0.002133],
        [-0.003964, 0.002297],
        [-0.003292, 0.002617],
        [-0.003251, 0.002534]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon8_right_1 = L.polygon([
        [-0.005157, 0.001865],
        [-0.005233, 0.001822],//
        [-0.005451, 0.002172],
        [-0.005522, 0.002319],
        [-0.005677, 0.00256],//
        [-0.00562, 0.002589]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon8_right_2 = L.polygon([
        [-0.005233, 0.001822],//
        [-0.005451, 0.002172],
        [-0.005522, 0.002319],
        [-0.005677, 0.00256],//
        [-0.005752, 0.002509],
        [-0.005291, 0.001788]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon8_left_1 = L.polygon([
        [-0.004906, 0.001491],
        [-0.004963, 0.001458],//
        [-0.004609, 0.000902],
        [-0.004452, 0.000601],
        [-0.004195, 0.000212],//
        [-0.004114, 0.000264],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon8_left_2 = L.polygon([
        [-0.004963, 0.001458],//
        [-0.004609, 0.000902],
        [-0.004452, 0.000601],
        [-0.004195, 0.000212],//
        [-0.004262, 0.00017],
        [-0.005064, 0.001423],
        [-0.004981, 0.00148]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon7_up_1 = L.polygon([
        [-0.003842, 0.000198],
        [-0.003825, 0.000158],//
        [-0.00214, 0.000938],//
        [-0.002169, 0.000986],
        [-0.002486, 0.000837],
        [-0.002559, 0.000789],
        [-0.00262, 0.000751],
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon7_up_2 = L.polygon([
        [-0.003825, 0.000158],//
        [-0.00214, 0.000938],//
        [-0.002105, 0.000888],
        [-0.002461, 0.000725],
        [-0.002594, 0.000675],
        [-0.003202, 0.000392],
        [-0.003278, 0.000345],
        [-0.003798, 0.000105]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);


      var polygon7_left_1 = L.polygon([
        [-0.004017, -0.000191],
        [-0.003968, -0.000165],//
        [-0.003661, -0.000714],
        [-0.003551, -0.000988],//
        [-0.003607, -0.001012],
        [-0.003657, -0.000871],
        [-0.003729, -0.00071],
        [-0.003829, -0.000509]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);
      var polygon7_left_2 = L.polygon([
        [-0.003968, -0.000165],//
        [-0.003661, -0.000714],
        [-0.003551, -0.000988],//
        [-0.003463, -0.000951],
        [-0.003552, -0.000749],
        [-0.003666, -0.000502],
        [-0.00373, -0.000385],
        [-0.003878, -0.000118]
      ], { color: 'red', fillOpacity: 0.5, stroke: false }).addTo(mymap);

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