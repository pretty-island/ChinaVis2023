import {Scene, MeshBuilder, Vector3, Vector2, Plane} from "@babylonjs/core";
import {calculateDistance2D} from "./tools.ts";

export function creatRoad(scene: Scene, start: Vector2, end: Vector2) {
    const length = calculateDistance2D(start, end);

    const sourcePlane = new Plane(0 , 1, 0, 0);
    sourcePlane.normalize();

    const road = MeshBuilder.CreatePlane(
        "road", {
            width: 1, height: length, sourcePlane: sourcePlane
        }, scene);

    road.position = new Vector3(start.x, 0, start.y);
    road.addRotation(0, 0, Math.atan((end.y - start.y) / (end.x - start.x)));
}