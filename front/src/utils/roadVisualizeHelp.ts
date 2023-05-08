import {Scene, MeshBuilder, Vector3, Vector2, Plane} from "@babylonjs/core";
import {calculateDistance2D, creatGrassMaterial, creatRoadMaterial, creatSkyboxMaterial} from "./tools.ts";

export function creatRoad(scene: Scene, start: Vector2, end: Vector2) {
    const length = calculateDistance2D(start, end);

    const sourcePlane = new Plane(0 , 1, 0, 0);
    sourcePlane.normalize();

    const road = MeshBuilder.CreatePlane(
        "road", {
            width: 1, height: length, sourcePlane: sourcePlane
        }, scene);

    road.position = new Vector3(start.x, 0.01, start.y);
    road.addRotation(0, 0, Math.atan((end.y - start.y) / (end.x - start.x)));
    road.material = creatRoadMaterial(scene, length);
}

export function creatGround(scene: Scene) {
    const ground = MeshBuilder.CreateGround("ground", {width: 500, height: 500}, scene);
    ground.material = creatGrassMaterial(scene, 500, 500);
}

export function creatSkyBox(scene: Scene) {
    const skybox = MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    skybox.material = creatSkyboxMaterial(scene);
}