import {ArcRotateCamera, Scene, SceneLoader, Vector3} from "@babylonjs/core";
import "@babylonjs/loaders";
import {BabylonConfig} from "../BabylonConfig.ts";
import {VehicleMovementLog} from "./general.ts";
import Car from "./Car.ts";
import {creatGroundMesh, creatSkyBoxMesh} from "../roadVisualizeHelp.ts";

export default class BabylonManager {
    private readonly scene: Scene;
    private cars: Car[];
    private renderTimestamp: number;

    public currTimestamp: number;
    public timeScale: number;

    public constructor(scene: Scene, vehicleMovementLogs: VehicleMovementLog[], currTimestamp?: number, timeScale: number = 0.04) {
        this.scene = scene;

        vehicleMovementLogs.sort((m1, m2) => m1.ms_no - m2.ms_no);

        const groupLogs: {[key: number]: VehicleMovementLog[]} = {};
        vehicleMovementLogs.forEach(log => {
            groupLogs[log.id] = groupLogs[log.id] ?? [];
            groupLogs[log.id].push(log);
        })
        this.cars = Object.values(groupLogs).map(logs => new Car(scene, logs, BabylonConfig.meshCreator));

        this.currTimestamp = currTimestamp ?? vehicleMovementLogs[0].ms_no;
        this.timeScale = timeScale;

        this.renderTimestamp = performance.now();
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

        SceneLoader.ImportMeshAsync("", "model/scene.glb", undefined,
            this.scene).then(r => {
            for (const mesh of r.meshes) {
                if (mesh.id == "__root__") {
                    mesh.position = new Vector3(0, 2, 0);
                    mesh.rotation = Vector3.Zero()
                }
            }
        })
    }

    public onRender() {
        const timeInterval = performance.now() - this.renderTimestamp;
        this.currTimestamp += (Number.isNaN(timeInterval) ? 0 : timeInterval) * BabylonConfig.timeScale;

        this.cars.forEach(car => {
            car.updatePosition(this.currTimestamp);
        });

        this.renderTimestamp = performance.now();
    }

}