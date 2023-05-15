import {Scene, MeshBuilder, Vector3, Vector2, Plane} from "@babylonjs/core";
import {
    calculateDistance2D,
    creatCarMaterial,
    creatGrassMaterial,
    creatRoadMaterial,
    creatSkyboxMaterial
} from "./tools.ts";
import {Config} from "./Config.ts";
import Car from "./elements/Car.ts";

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

    return road;
}

export function creatGround(scene: Scene) {
    const ground = MeshBuilder.CreateGround("ground", {width: Config.groundSize, height: Config.groundSize}, scene);
    ground.material = creatGrassMaterial(scene, Config.groundSize, Config.groundSize);

    return ground;
}

export function creatSkyBox(scene: Scene) {
    const skybox = MeshBuilder.CreateBox("skyBox", {size: Config.skyboxSize}, scene);
    skybox.material = creatSkyboxMaterial(scene);

    return skybox;
}

// 创建2*1的立方体暂时代表车辆
export function creatCar(scene: Scene, initPos?: Vector2) {
    const car = MeshBuilder.CreateBox("car", {width: 1, depth: 2}, scene);
    car.material = creatCarMaterial(scene);
    car.position = new Vector3(initPos?.x ?? 0, Config.carHeight, initPos?.y ?? 0);

    return new Car(scene, car);
}