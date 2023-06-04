import {
    ArcRotateCamera, FollowCamera,
    Scene,
    SceneLoader, TransformNode,
    Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders";
import {BabylonConfig} from "../BabylonConfig.ts";
import {VehicleMovementLog} from "./general.ts";
import Car from "./Car.ts";
import {creatGroundMesh, creatSkyBoxMesh} from "../roadVisualizeHelp.ts";
import {creatCarMeshInstance} from "../tools.ts";
import {AdvancedDynamicTexture, Control, Rectangle, TextBlock} from "@babylonjs/gui";
import React from "react";

export default class BabylonManager {
    private readonly scene: Scene;
    private cars: Car[] | undefined;
    private text: TextBlock | undefined;
    private renderTimestamp: number;
    private _beginTimestamp: number | undefined;
    private _endTimestamp: number | undefined;

    private readonly crossroadCameras: ArcRotateCamera[];
    private readonly roadCameras: ArcRotateCamera[];
    private readonly crossroadTags: Rectangle[];
    private readonly roadTags: Rectangle[];
    private followCameras: FollowCamera | undefined;

    public get beginTimestamp() {return this._beginTimestamp};
    public get endTimestamp() {return this._endTimestamp};
    public currTimestamp: number;
    public timeScale: number;

    public isSceneReady: boolean;
    public isCarMeshReady: boolean;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.renderTimestamp = performance.now();
        this.currTimestamp = 0;
        this.timeScale = 0.04;
        this.cars = [];

        this.isSceneReady = false;
        this.isCarMeshReady = false;
        this.crossroadCameras = [];
        this.roadCameras = [];
        this.crossroadTags = [];
        this.roadTags = [];
    }

    public updateLogs(vehicleMovementLogs: VehicleMovementLog[], currTimestamp?: number, timeScale: number = 0.04) {
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
                        new Car(groupLogs[id], transformNode, meshes, this.followCameras!, this.crossroadCameras[0], (isFocus) => {
                            // this.updateTags(false, isFocus ? -1 : 0);
                        })
                    );
                }
            }

            this.cars = cars;
            this.isCarMeshReady = true;
        })

        this.currTimestamp = currTimestamp ?? vehicleMovementLogs[0].ms_no;
        this.timeScale = timeScale;
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
        this.followCameras.cameraAcceleration = 0.01;
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
        this.text = this.creatTimestampText(advancedTexture);

        // this.roadTags.push(...Object.entries(BabylonConfig.roadPosition).map(
        //     (position) =>
        //         this.createSceneTag(advancedTexture, position[1], "道路" + (Number(position[0]) + 1))
        // ));
        // this.crossroadTags.push(...Object.entries(BabylonConfig.crossroadCamerasPosition).map(
        //     (position) =>
        //         this.createSceneTag(advancedTexture, position[1], "路口" + (Number(position[0]) + 1))
        // ));

        // this.updateTags(false, 0);

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
        this.currTimestamp += (Number.isNaN(timeInterval) ? 0 : timeInterval) * BabylonConfig.timeScale;

        if (this.text !== undefined) {
            this.text.text = this.getCurrTime()
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

    private createSceneTag(advancedTexture: AdvancedDynamicTexture, position: Vector3, text: string) {
        const node = new TransformNode("Scene Tag", this.scene);
        node.position = position;

        let rect1 = new Rectangle();
        rect1.width = 0.1;
        rect1.thickness = 0;
        advancedTexture.addControl(rect1);
        rect1.linkWithMesh(node);

        let label = new TextBlock();
        label.text = text;
        label.color = 'white'
        label.outlineWidth = 2;
        label.outlineColor = "black";
        label.alpha = 0.4;
        rect1.addControl(label);

        return rect1;
    }

    public onKeyDown(event: React.KeyboardEvent<HTMLCanvasElement>) {
        if (["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9"].indexOf(event.code) !== -1) {
            const index = Number(event.code.slice(5));
            this.setCameraToRoad(index);
        }

        if (["Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4"].indexOf(event.code) !== -1) {
            const index = Number(event.code.slice(6));
            this.setCameraToRoad(index + 10);
        }
    }

    private updateTags(isRoad: boolean, index: number) {
        this.roadTags.forEach(e => e.isVisible = false);
        this.crossroadTags.forEach(e => e.isVisible = false);

        if (index === -1) return;

        if (isRoad) {
            this.roadTags[index].isVisible = true;
            BabylonConfig.roadVisibleTags[index].forEach(i => this.crossroadTags[i].isVisible = true);
        } else {
            this.crossroadTags[index].isVisible = true;
            BabylonConfig.crossroadVisibleTags[index].forEach(i => this.roadTags[i].isVisible = true);
        }
    }

    public setCameraToCrossroad(index: number) {
        console.assert(index >= 0 && index < 8);
        this.scene.activeCamera = this.crossroadCameras[index];
        // this.updateTags(false, index);
    }

    public setCameraToRoad(index: number) {
        console.assert(index >= 0 && index < 15);
        this.scene.activeCamera = this.roadCameras[index];
        // this.updateTags(true, index);
    }

    public focusOnCar(carId: number) {
        const targetCar = this.cars?.find(car => car.id == carId);
        targetCar?.focus();
    }
}