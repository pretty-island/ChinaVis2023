import React from 'react';
import {
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Scene,
    Vector2,
    ArcRotateCamera
} from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import {creatRoad} from "../utils/roadVisualizeHelp.ts";

let box: Mesh;

const onSceneReady = (scene: Scene) => {
    const camera = new ArcRotateCamera("camera", 0, 0, 10, Vector3.Zero());
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    box = MeshBuilder.CreateBox("box", {size: 2}, scene);
    box.position.y = 1;

    // MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    creatRoad(scene, new Vector2(1, 1), new Vector2(2, 2));
}

const onRender = (scene: Scene) => {
    if (box !== undefined) {
        var deltaTimeInMillis = scene.getEngine().getDeltaTime();

        const rpm = 10;
        box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
    }
}

const MainVisualizationView: React.FC = () => {
    return (
        <div className={"MainView"} style={{width: "100%", height: "100%"}}>
            <SceneComponent observeCanvasResize antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
        </div>
    )
}

export default MainVisualizationView;
