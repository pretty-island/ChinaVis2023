import {
    ArcRotateCamera, FollowCamera,
    Scene,
    SceneLoader,
    Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders";
import {BabylonConfig} from "../BabylonConfig.ts";
import {VehicleMovementLog} from "./general.ts";
import Car from "./Car.ts";
import {creatGroundMesh, creatSkyBoxMesh} from "../roadVisualizeHelp.ts";
import {creatCarMeshInstance} from "../tools.ts";
import {AdvancedDynamicTexture, Control, TextBlock} from "@babylonjs/gui";
import React from "react";

export default class BabylonManager {
    private readonly scene: Scene;
    private cars: Car[] | undefined;
    private timestampText: TextBlock | undefined;
    private timeScaleText: TextBlock | undefined;
    private renderTimestamp: number;
    private _beginTimestamp: number | undefined;
    private _endTimestamp: number | undefined;

    private readonly crossroadCameras: ArcRotateCamera[];
    private readonly roadCameras: ArcRotateCamera[];
    private followCameras: FollowCamera | undefined;

    private timeScaleIndex: number = BabylonConfig.defaultTimeScalesIndex;
    private _timeScale: number = BabylonConfig.timeScales[this.timeScaleIndex];

    public get beginTimestamp() {return this._beginTimestamp};
    public get endTimestamp() {return this._endTimestamp};
    public currTimestamp: number;

    get timeScale() {return this._timeScale}
    set timeScale(value) {
        this.timeScaleIndex = BabylonConfig.timeScales.findIndex(v => v === value);
        this._timeScale = value;
    }

    public isSceneReady: boolean;
    public isCarMeshReady: boolean;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.renderTimestamp = performance.now();
        this.currTimestamp = 0;
        this.timeScale = BabylonConfig.timeScales[this.timeScaleIndex];
        this.cars = [];

        this.isSceneReady = false;
        this.isCarMeshReady = false;
        this.crossroadCameras = [];
        this.roadCameras = [];
    }

    public updateLogs(vehicleMovementLogs: VehicleMovementLog[], onSuccess: () => void) {
        vehicleMovementLogs.sort((m1, m2) => m1.ms_no - m2.ms_no);

        this._beginTimestamp = vehicleMovementLogs[0].ms_no;
        this._endTimestamp = vehicleMovementLogs[vehicleMovementLogs.length - 1].ms_no;

        const idTypeMap: {[key: number]: Set<number>} = {};
        const groupLogs: {[key: number]: VehicleMovementLog[]} = {};
        vehicleMovementLogs.forEach(log => {
            groupLogs[log.id] = groupLogs[log.id] ?? [];
            groupLogs[log.id].push(log);
            idTypeMap[log.type] = idTypeMap[log.type] ?? new Set<number>();
            idTypeMap[log.type].add(log.id);
        })

        const cars: Car[] = []

        Promise.all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            .map(type => BabylonConfig.carMeshCreator(this.scene, type)
                .then(r => [type, r] as const)))
            .then(values => {
            for (const value of values) {
                const [type, r] = value;
                r.meshes.forEach(mesh => mesh.isVisible = false);

                for (const id of (idTypeMap[type] ?? [])) {
                    const {meshes, transformNode} = creatCarMeshInstance(r.meshes, type);
                    cars.push(
                        new Car(groupLogs[id], transformNode, meshes, this.followCameras!, this.crossroadCameras[0])
                    );
                }
            }

            this.cars = cars;
            this.isCarMeshReady = true;
            onSuccess();
        })

        this.currTimestamp = vehicleMovementLogs[0].ms_no;
    }

    private createArcCameras(endIndex: number, positions: {[key: number]: Vector3}): ArcRotateCamera[] {
        const result: ArcRotateCamera[] = [];
        for (let i = 0; i <= endIndex; i++) {
            const camera = new ArcRotateCamera("camera " + i, 0, 0, 10, Vector3.Zero());
            camera.setTarget(positions[i]);
            camera.upperBetaLimit = 5 * Math.PI / 12;
            camera.lowerRadiusLimit = 50;
            camera.upperRadiusLimit = 300;
            camera.attachControl(true);

            result.push(camera);
        }

        return result;
    }

    private initCamera() {
        this.crossroadCameras.push(...this.createArcCameras(7, BabylonConfig.crossroadCamerasPosition));
        this.roadCameras.push(...this.createArcCameras(14, BabylonConfig.roadPosition));

        this.followCameras = new FollowCamera("followCamera", this.crossroadCameras[0].position, this.scene);
        this.followCameras.attachControl(true);
        this.followCameras.radius = 30;
        this.followCameras.heightOffset = 15;
        this.followCameras.cameraAcceleration = 0.005;
        this.followCameras.maxCameraSpeed = 150;
        this.followCameras.lowerHeightOffsetLimit = 15;
        this.followCameras.lowerRadiusLimit = 30;
        this.followCameras.upperRadiusLimit = 60;

        this.scene.activeCamera = this.crossroadCameras[0];
    }

    public onSceneReady() {
        this.initCamera();

        creatGroundMesh(this.scene);
        creatSkyBoxMesh(this.scene);

        this.scene.createDefaultLight(true);

        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.timestampText = this.creatTimestampText(advancedTexture);
        this.timeScaleText = this.creatTimeScaleText(advancedTexture);

        SceneLoader.ImportMeshAsync("", "model/scene.glb", undefined,
            this.scene).then(r => {
            for (const mesh of r.meshes) {
                if (mesh.id == "__root__") {
                    mesh.position = new Vector3(0, 2, 0);
                    mesh.rotation = Vector3.Zero()
                }
            }

            this.isSceneReady = true;
        })
    }

    private getCurrTime() {
        let date = new Date(this.currTimestamp * 100);
        const formattedDateNumber = (num: number) => {
            if (num < 10) {
                return "0" + num;
            } else {
                return num.toString();
            }
        }
        return formattedDateNumber(date.getFullYear()) + "-" +
            formattedDateNumber(date.getMonth()) + "-" +
            formattedDateNumber(date.getDay()) + " " +
            formattedDateNumber(date.getHours()) + ":" +
            formattedDateNumber(date.getMinutes()) + ":" +
            formattedDateNumber(date.getSeconds());
    }

    public onRender() {
        if (!this.isSceneReady || !this.isCarMeshReady || this.cars === undefined) return;
        if (this.timeScale === 0) return;

        const timeInterval = performance.now() - this.renderTimestamp;
        this.currTimestamp += (Number.isNaN(timeInterval) ? 0 : timeInterval) * this.timeScale;

        if (this.timestampText !== undefined) {
            this.timestampText.text = this.getCurrTime()
        }

        if (this.timeScaleText !== undefined) {
            this.timeScaleText.text = "时间速率: " + this.timeScale * 100 + "x";
        }

        this.cars?.forEach(car => {
            car.updatePosition(this.currTimestamp);
        });

        this.renderTimestamp = performance.now();
    }

    private creatTimestampText(advancedTexture: AdvancedDynamicTexture) {
        const text = new TextBlock();
        text.text = "Loading...";
        text.color = "white";
        text.fontSize = 24;
        text.fontFamily = "Arial";
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        text.outlineWidth = 2;
        text.outlineColor = "black";
        text.paddingRight = 12;
        text.paddingTop = 12;

        advancedTexture.addControl(text);

        return text;
    }

    private creatTimeScaleText(advancedTexture: AdvancedDynamicTexture) {
        const text = new TextBlock();
        text.color = "white";
        text.fontSize = 24;
        text.fontFamily = "Arial";
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        text.outlineWidth = 2;
        text.outlineColor = "black";
        text.paddingLeft = 12;
        text.paddingTop = 12;

        advancedTexture.addControl(text);

        return text;
    }

    public onKeyDown(event: React.KeyboardEvent<HTMLCanvasElement>) {
        if (["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9"].indexOf(event.code) !== -1) {
            const index = Number(event.code.slice(5));
            this.setCameraToRoad(index);
            return;
        }

        if (["Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4"].indexOf(event.code) !== -1) {
            const index = Number(event.code.slice(6));
            this.setCameraToRoad(index + 10);
            return;
        }

        switch (event.key) {
            case "+":
            case "=":
                if (this.timeScaleIndex === -1) {
                    this.timeScaleIndex = BabylonConfig.defaultTimeScalesIndex + 1;
                } else {
                    this.timeScaleIndex = Math.min(this.timeScaleIndex + 1, BabylonConfig.timeScales.length - 1);
                }
                break;
            case "-":
                if (this.timeScaleIndex === -1) {
                    this.timeScaleIndex = BabylonConfig.defaultTimeScalesIndex - 1;
                } else {
                    this.timeScaleIndex = Math.max(this.timeScaleIndex - 1, 0);
                }
                break;

        }
        this._timeScale = BabylonConfig.timeScales[this.timeScaleIndex];
        return;
    }

    public setCameraToCrossroad(index: number) {
        console.assert(index >= 0 && index < 8);
        this.scene.activeCamera = this.crossroadCameras[index];
    }

    public setCameraToRoad(index: number) {
        console.assert(index >= 0 && index < 15);
        this.scene.activeCamera = this.roadCameras[index];
    }

    public focusOnCar(carId: number) {
        const targetCar = this.cars?.find(car => car.id == carId);
        targetCar?.focus();
    }
}