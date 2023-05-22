import boundaryRoadGeoData from '/src/assets/roadData/boundaryroad_with9road.geojson?raw';

interface GeoData {
    type: string;
    name: string;
    features: GeoFeature[];
}

interface GeoFeature {
    type: string;
    properties: {[n: string]: number}
    geometry: GeoGeometry;
}

interface GeoGeometry {
    type: string;
    coordinates: number[][];
}

export function getBoundaryRoadGeoData(): GeoData {
    const data = JSON.parse(boundaryRoadGeoData);
    return data as GeoData;
}