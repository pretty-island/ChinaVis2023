import {Color3, CubeTexture, Scene, StandardMaterial, Texture, Vector2} from "@babylonjs/core";

import grassTexture from "/src/assets/texture/grass.jpg"
import grassNormalMap from "/src/assets/texture/grass_normal.jpeg";


function getScaleTexture(path: string, uScale: number, vScale: number, scene: Scene) {
    const texture = new Texture(path, scene);
    texture.wrapU = Texture.WRAP_ADDRESSMODE;
    texture.wrapV = Texture.WRAP_ADDRESSMODE;
    texture.uScale = uScale;
    texture.vScale = vScale;

    return texture
}

export function calculateDistance2D(start: Vector2, end: Vector2) {
    return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
}

export function creatGrassMaterial(scene: Scene, uScale: number, vScale: number) {
    const result = new StandardMaterial("grassMaterial", scene);
    result.diffuseTexture = getScaleTexture(grassTexture, uScale, vScale, scene);
    result.bumpTexture = getScaleTexture(grassNormalMap, uScale, vScale, scene);

    return result;
}

export function creatSkyboxMaterial(scene: Scene) {
    const skyboxMaterial = new StandardMaterial("skybox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);

    return skyboxMaterial;
}

// 创建白色材质
export function creatCarMaterial(scene: Scene) {
    const carMaterial = new StandardMaterial("carMaterial", scene);
    carMaterial.emissiveColor = new Color3(1, 1, 1);

    return carMaterial;
}