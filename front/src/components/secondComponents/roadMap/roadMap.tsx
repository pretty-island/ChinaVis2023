import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'proj4leaflet';
import "leaflet/dist/leaflet.css";

const RoadMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (mapRef.current) {
            var map = L.map(mapRef.current,{
                crs:L.CRS.EPSG4326
            }).setView([15.538926, 114.354382], 1);
            L.tileLayer('', {  // 不使用瓦片地图
                attribution: '',
                maxZoom: 18,
            }).addTo(map);
            loadRoadData(map);
            
            // 创建 Leaflet 地图实例，并设置地图的初始视图
            // const map = L.map(mapRef.current).setView([15.538926, 114.354382], 1);
            // 添加EPSG4326转换器
            // L.Proj.geoJson(null, {
            //     // 指定源坐标系为EPSG4326
            //     crs: L.CRS.EPSG4326,
            // }).addTo(map);

            // 添加地图图层
            // L.tileLayer('', {  // 不使用瓦片地图
            //     attribution: '',
            //     maxZoom: 18,
            // }).addTo(map);

            // 加载并绘制道路数据
            // loadRoadData(map);
        }
    }, []);
    const loadRoadData = async (map: L.Map) => {
        const loadGeoJSON = async (url: string): Promise<L.GeoJSON> => {
            const response = await fetch(url);
            const data = await response.json();
            // // 进行EPSG4326到EPSG3857的坐标系转换
            // const transformedData = L.Proj.geoJson(data, {
            //     // 指定源坐标系为EPSG4326
            //     fromCRS: L.CRS.EPSG4326,
            //     // 指定目标坐标系为EPSG3857
            //     toCRS: map.options.crs,
            // });
            // return L.geoJSON(transformedData);
            return L.geoJSON(data);
        };
        try {
            // const crosswalkRoad = await loadGeoJSON("../../../assets/roadData/crosswalkroad_with9road.geojson");
            // const laneRoad = await loadGeoJSON("../../../assets/roadData/laneroad_with9road.geojson");
            // const signalRoad = await loadGeoJSON("../../../assets/roadData/signalroad_with9road.geojson");
            // const stoplineRoad = await loadGeoJSON("../../../assets/roadData/stoplineroad_with9road.geojson");
            const boundaryRoad = await loadGeoJSON("../../../assets/roadData/boundaryroad_with9road.geojson");
            // crosswalkRoad.addTo(map);
            // laneRoad.addTo(map);
            // signalRoad.addTo(map);
            // stoplineRoad.addTo(map);
            // boundaryRoad.addTo(map);
            L.geoJSON(boundaryRoad, {
                // onEachFeature: myOnEachFeature,
            }).addTo(Map);
        } catch (error) {
            console.error('Failed to load road data:', error);
        }
       


    };
    return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
}

export default RoadMap;