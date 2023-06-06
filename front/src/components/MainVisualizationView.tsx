import React from 'react';
import { Scene, } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import SceneComponent from 'babylonjs-hook';

import {VehicleMovementLog} from "../utils/model/general.ts";
import BabylonManager from "../utils/model/BabylonManager.ts";

export let babylonManager: BabylonManager | undefined;

const onSceneReady = (scene: Scene) => {
    babylonManager = new BabylonManager(scene);
    babylonManager.onSceneReady();

    Promise.all(["data/8_30hour.json"].map(url => fetch(url).then(res => res.json())))
        .then(data => {
            babylonManager!.updateLogs(data
                .reduce((prev, curr) => {
                    prev.push(...curr);
                    return prev;
                })
                .map(e => {
                    e.position = JSON.parse(e.position);
                    e.shape = JSON.parse(e.shape);

                    return e as VehicleMovementLog;
                }),
                () => {
                    babylonManager!.timeScale = 0.01;
                }
            );
        })
}

const onRender = (_: Scene) => {
    babylonManager?.onRender();
}

const MainVisualizationView: React.FC = () => {
    return (
        <div className={"MainView"} style={{width: "94%", height: "94%"}}>
            <SceneComponent observeCanvasResize antialias onSceneReady={onSceneReady} onRender={onRender} onKeyDown={e => babylonManager?.onKeyDown(e)} id='my-canvas' />
        </div>
    )
}

export default MainVisualizationView;
