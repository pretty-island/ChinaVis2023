import {
    AbstractMesh,
    Color3,
    CubeTexture, InstancedMesh, Mesh,
    Scene,
    StandardMaterial,
    Texture,
    TransformNode,
    Vector2
} from "@babylonjs/core";

import grassTexture from "/src/assets/texture/grass.jpg"
import grassNormalMap from "/src/assets/texture/grass_normal.jpeg";
import {BabylonConfig} from "./BabylonConfig.ts";


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

export function creatCarMeshInstance(meshes: AbstractMesh[], type: number): {meshes: InstancedMesh[], transformNode: TransformNode} {
    const localMeshes = meshes.filter(e => e.id !== "__root__") as Mesh[];

    const meshTransformer = new TransformNode("car transformer ");
    const result = localMeshes.map(e => e.createInstance("car mesh "));
    result.forEach(e => e.setParent(meshTransformer));

    meshTransformer.rotation = BabylonConfig.carMeshRotationMap[type];

    const transformNode = new TransformNode("car node ");
    meshTransformer.setParent(transformNode);

    return {meshes: result, transformNode};
}