import {Scene, MeshBuilder} from "@babylonjs/core";
import {
    creatGrassMaterial,
    creatSkyboxMaterial
} from "./tools.ts";
import {BabylonConfig} from "./BabylonConfig.ts";

export function creatGroundMesh(scene: Scene) {
    const ground = MeshBuilder.CreateGround("ground", {width: BabylonConfig.groundSize, height: BabylonConfig.groundSize}, scene);
    ground.material = creatGrassMaterial(scene, BabylonConfig.groundSize, BabylonConfig.groundSize);

    return ground;
}

export function creatSkyBoxMesh(scene: Scene) {
    const skybox = MeshBuilder.CreateBox("skyBox", {size: BabylonConfig.skyboxSize}, scene);
    skybox.material = creatSkyboxMaterial(scene);

    return skybox;
}