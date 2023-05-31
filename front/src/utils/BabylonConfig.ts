import {ISceneLoaderAsyncResult, Scene, SceneLoader, Vector3} from "@babylonjs/core";

export class BabylonConfig {
    static groundSize = 2000;
    static skyboxSize = 5000;

    static roadHeight = 0.01;
    static carHeightMap: {[key: number]: number} = {
      0: 4,
      1: 4,
      2: 4,
      3: 2,
      4: 4,
      5: 4,
      6: 4,
      7: 4,
      8: 4,
      9: 4,
      10: 4,
      11: 4,
      12: 4,
    };

    static timeScale = 0.05;

    static carMeshRotationMap: {[key: number]: Vector3} = {
        0: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        1: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        2: new Vector3(0, 0, 0),
        3: new Vector3(0, 0, 0),
        4: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        5: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        6: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        7: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        8: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        9: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        10: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        11: new Vector3(Math.PI / 2, Math.PI / 2, 0),
        12: new Vector3(Math.PI / 2, Math.PI / 2, 0),
    }

    private static carMeshUrlMap: {[key: number]: string} = {
        0: "model/car.glb",
        1: "model/car.glb",
        2: "model/man.glb",
        3: "model/motor.glb",
        4: "model/truck.glb",
        5: "model/van.glb",
        6: "model/bus.glb",
        7: "model/car.glb",
        8: "model/car.glb",
        9: "model/car.glb",
        10: "model/car.glb",
        11: "model/car.glb",
        12: "model/car.glb",
    }

    static carMeshCreator: (scene: Scene, type: number) => Promise<ISceneLoaderAsyncResult> = (scene, type) => {
        return SceneLoader.ImportMeshAsync("", BabylonConfig.carMeshUrlMap[type], undefined, scene);
    }
}