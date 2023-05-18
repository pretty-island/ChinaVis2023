import React from 'react';
import {
    Vector3,
    Scene,
    Vector2,
    ArcRotateCamera, DirectionalLight, FollowCamera
} from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import {creatCarMesh, creatGroundMesh, creatRoadMesh, creatSkyBoxMesh} from "../utils/roadVisualizeHelp.ts";

import CarLogs from '/src/assets/test_with_roads.json?raw'
import {VehicleMovementLog} from "../utils/model/general.ts";
import Car from "../utils/model/Car.ts";
import {Config} from "../utils/Config.ts";

let cars: Car[] = [];
let timestamp: number;
let currTime: number;

const onSceneReady = (scene: Scene) => {
    const camera = new ArcRotateCamera("camera", 0, 0, 10, Vector3.Zero());
    camera.setTarget(new Vector3(-200, 0 , -200));
    camera.upperBetaLimit = 5 * Math.PI / 12;
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 120;

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const light = new DirectionalLight("light", new Vector3(0.3, -1, 0), scene);
    light.intensity = 0.7;

    creatGroundMesh(scene);
    creatRoadMesh(scene, new Vector2(0, 0), new Vector2(10, 8));
    creatSkyBoxMesh(scene);

    const carLogs = JSON.parse(CarLogs).map(e => {
        e.position = JSON.parse(e.position);
        e.shape = JSON.parse(e.shape);

        return e;
    }) as VehicleMovementLog[];
    const carIds = new Set(carLogs.map(e => e.id));

    for (const carId of carIds) {
        const carMesh = creatCarMesh(scene);
        cars.push(new Car(scene, carMesh, carLogs.filter(e => e.id === carId)));
    }

    currTime = carLogs.sort((a, b) => a.time_meas - b.time_meas)[0].ms_no;
}

const onRender = (_: Scene) => {
    if (currTime === null || currTime === undefined) return;
    if (timestamp === null) {
        timestamp = performance.now();
    }
    const timeInterval = performance.now() - timestamp;
    currTime += (Number.isNaN(timeInterval) ? 0 : timeInterval) * Config.timeScale;

    for (const car of cars) {
        car.updatePosition(currTime);
    }

    timestamp = performance.now();
}

const MainVisualizationView: React.FC = () => {
    return (
        <div className={"MainView"} style={{width: "94%", height: "94%"}}>
            <SceneComponent observeCanvasResize antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
        </div>
    )
}

export default MainVisualizationView;
