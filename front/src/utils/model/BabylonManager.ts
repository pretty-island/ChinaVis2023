import {
    ArcRotateCamera,
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

export default class BabylonManager {
    private readonly scene: Scene;
    private cars: Car[] | undefined;
    private text: TextBlock | undefined;
    private renderTimestamp: number;
    private _beginTimestamp: number | undefined;
    private _endTimestamp: number | undefined;

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
                    cars.push(new Car(groupLogs[id], transformNode, meshes));
                }
            }

            this.cars = cars;
            this.isCarMeshReady = true;
        })

        this.currTimestamp = currTimestamp ?? vehicleMovementLogs[0].ms_no;
        this.timeScale = timeScale;
    }

    public onSceneReady() {
        const camera = new ArcRotateCamera("camera", 0, 0, 10, Vector3.Zero());
        camera.setTarget(new Vector3(-30, 0, -120));
        camera.upperBetaLimit = 5 * Math.PI / 12;
        camera.lowerRadiusLimit = 100;
        camera.upperRadiusLimit = 300;

        const canvas = this.scene.getEngine().getRenderingCanvas();
        camera.attachControl(canvas, true);

        creatGroundMesh(this.scene);
        creatSkyBoxMesh(this.scene);

        this.scene.createDefaultLight(true);

        this.text = this.creatTimestampText();

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

    public onRender() {
        if (!this.isSceneReady || !this.isCarMeshReady || this.cars === undefined) return;

        const timeInterval = performance.now() - this.renderTimestamp;
        this.currTimestamp += (Number.isNaN(timeInterval) ? 0 : timeInterval) * BabylonConfig.timeScale;

        if (this.text !== undefined) {
            this.text.text = `Timestamp: ${this.currTimestamp.toFixed(2)}\n` +
            `Begin Timestamp: ${this.beginTimestamp?.toFixed(2) ?? "Unknow"}\n` +
            `End Timestamp: ${this.endTimestamp?.toFixed(2) ?? "Unknow"}`;
        }

        this.cars?.forEach(car => {
            car.updatePosition(this.currTimestamp);
        });

        this.renderTimestamp = performance.now();
    }

    private creatTimestampText() {
        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

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
}