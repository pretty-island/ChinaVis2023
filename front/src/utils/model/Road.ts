import {Mesh, MeshBuilder, Plane, Scene, Vector2, Vector3} from "@babylonjs/core";
import {calculateDistance2D, creatRoadMaterial} from "../tools.ts";
import {getBoundaryRoadGeoData} from "./geoData.ts";

export default class Road {
    scene: Scene;
    mesh: Mesh;

    start: Vector2;
    end: Vector2;

    constructor(scene: Scene, start: Vector2, end: Vector2) {
        this.scene = scene;
        this.start = start;
        this.end = end;

        const length = calculateDistance2D(start, end);

        const sourcePlane = new Plane(0 , 1, 0, 0);
        sourcePlane.normalize();

        const road = MeshBuilder.CreatePlane(
            "road", {
                width: 1, height: length, sourcePlane: sourcePlane
            }, scene);

        road.position = new Vector3((start.x + end.x) / 2, 0.01, (start.y + end.y) / 2);
        road.addRotation(0, 0, Math.atan((end.y - start.y) / (end.x - start.x)));
        road.material = creatRoadMaterial(scene, length);

        this.mesh = road;
    }

    static fromJSON(scene: Scene): Road[] {
        const geoData = getBoundaryRoadGeoData();
        let result: Road[] = [];

        for (const data of geoData.features.slice(0, 50)) {
            for (let i = 0; i < data.geometry.coordinates.length - 1; i++) {
                result.push(
                    new Road(
                        scene, new Vector2(data.geometry.coordinates[i][0], data.geometry.coordinates[i][1]),
                        new Vector2(data.geometry.coordinates[i + 1][0], data.geometry.coordinates[i + 1][1])
                    )
                )
            }
        }

        return result;
    }
}