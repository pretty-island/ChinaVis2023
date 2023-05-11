import React from 'react';
import {
    Vector3,
    Scene,
    Vector2,
    ArcRotateCamera, DirectionalLight
} from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import {creatGround, creatRoad, creatSkyBox} from "../utils/roadVisualizeHelp.ts";

const onSceneReady = (scene: Scene) => {
    const camera = new ArcRotateCamera("camera", 0, 0, 10, Vector3.Zero());
    camera.setTarget(Vector3.Zero());
    camera.upperBetaLimit = 5 * Math.PI / 12;
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 120;

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const light = new DirectionalLight("light", new Vector3(0.1, -1, 0), scene);
    light.intensity = 0.7;

    creatGround(scene);
    creatRoad(scene, new Vector2(0, 0), new Vector2(10, 8));
    creatSkyBox(scene);
}

const onRender = (_: Scene) => {
}

const MainVisualizationView: React.FC = () => {
    return (
        <div className={"MainView"} style={{width: "94%", height: "94%"}}>
            <SceneComponent observeCanvasResize antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
        </div>
    )
}

export default MainVisualizationView;
