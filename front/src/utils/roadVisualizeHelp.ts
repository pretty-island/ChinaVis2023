import {Scene, MeshBuilder} from "@babylonjs/core";
import {
    creatGrassMaterial,
    creatSkyboxMaterial
} from "./tools.ts";
import {Config} from "./Config.ts";

export function creatGroundMesh(scene: Scene) {
    const ground = MeshBuilder.CreateGround("ground", {width: Config.groundSize, height: Config.groundSize}, scene);
    ground.material = creatGrassMaterial(scene, Config.groundSize, Config.groundSize);

    return ground;
}

export function creatSkyBoxMesh(scene: Scene) {
    const skybox = MeshBuilder.CreateBox("skyBox", {size: Config.skyboxSize}, scene);
    skybox.material = creatSkyboxMaterial(scene);

    return skybox;
}