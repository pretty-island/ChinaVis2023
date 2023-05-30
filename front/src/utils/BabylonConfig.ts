import {Mesh, MeshBuilder, Scene} from "@babylonjs/core";
import {creatCarMaterial} from "./tools.ts";

export class BabylonConfig {
    static groundSize = 2000;
    static skyboxSize = 5000;

    static roadHeight = 0.01;
    static carHeight = 3;

    static timeScale = 0.05;
    static carMeshCreator: (scene: Scene, type: number) => Mesh = (scene, _) => {
        const car = MeshBuilder.CreateBox("car", {width: 1, depth: 2}, scene);
        car.material = creatCarMaterial(scene);

        return car
    };
}