import React from 'react';
import { Scene, } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import SceneComponent from 'babylonjs-hook';

import {VehicleMovementLog} from "../utils/model/general.ts";
import BabylonManager from "../utils/model/BabylonManager.ts";

let babylonManager: BabylonManager;

const onSceneReady = (scene: Scene) => {
    babylonManager = new BabylonManager(scene);
    babylonManager.onSceneReady();

    Promise.all(["data/type_1.json", "data/type_2.json", "data/type_3.json",
        "data/type_4.json", "data/type_6.json", "data/type_10.json"].map(url => fetch(url)))
        .then(res => {
            Promise.all(res.map(r => r.json()))
                .then(
                    data => {
                        babylonManager.updateLogs(data
                            .reduce((prev, curr) => {
                                prev.push(...curr);
                                return prev;
                            })
                            .map(e => {
                                e.position = JSON.parse(e.position);
                                e.shape = JSON.parse(e.shape);

                                return e as VehicleMovementLog;
                            })
                        )
                    }
                )

        })
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
