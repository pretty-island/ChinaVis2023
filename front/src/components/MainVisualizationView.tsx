import React from 'react';
import { Scene, } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import SceneComponent from 'babylonjs-hook';

import CarLogs1 from '/src/assets/type_1.json?raw'
import CarLogs2 from '/src/assets/type_2.json?raw'
import CarLogs3 from '/src/assets/type_3.json?raw'
import CarLogs4 from '/src/assets/type_4.json?raw'
import CarLogs6 from '/src/assets/type_6.json?raw'
import CarLogs10 from '/src/assets/type_10.json?raw'
import {VehicleMovementLog} from "../utils/model/general.ts";
import BabylonManager from "../utils/model/BabylonManager.ts";

let babylonManager: BabylonManager;

const onSceneReady = (scene: Scene) => {
    scene.debugLayer.show({embedMode: true});

    const carLogs = [CarLogs1, CarLogs2, CarLogs3, CarLogs4, CarLogs6, CarLogs10]
        .map(e => JSON.parse(e))
        .reduce((prev, curr) => {
            prev.push(...curr);
            return prev;
        })
        .map(e => {
            e.position = JSON.parse(e.position);
            e.shape = JSON.parse(e.shape);

            return e;
        }) as VehicleMovementLog[];

    babylonManager = new BabylonManager(scene, carLogs);
    babylonManager.onSceneReady();
}

const onRender = (_: Scene) => {
    babylonManager?.onRender();
}

const MainVisualizationView: React.FC = () => {
    return (
        <div className={"MainView"} style={{width: "94%", height: "94%"}}>
            <SceneComponent observeCanvasResize antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
        </div>
    )
}

export default MainVisualizationView;
