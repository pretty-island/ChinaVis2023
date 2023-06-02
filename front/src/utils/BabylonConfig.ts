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

    static crossroadCamerasPosition: {[key: number]: Vector3} = {
        0: new Vector3(-280, 0, 30),
        1: new Vector3(-30, 0, -120),
        2: new Vector3(135, 0, -200),
        3: new Vector3(300, 0, -340),
        4: new Vector3(-360, 0, -280),
        5: new Vector3(-140, 0, -380),
        6: new Vector3(15, 0, -440),
        7: new Vector3(200, 0, -570),
    }

    static roadPosition: {[key: number]: Vector3} = {
        0: new Vector3(-360, 0, 60),
        1: new Vector3(-150, 0, -50),
        2: new Vector3(55, 0, -160),
        3: new Vector3(200, 0, -250),
        4: new Vector3(350, 0, -370),
        5: new Vector3(-420, 0, -260),
        6: new Vector3(-250, 0, -330),
        7: new Vector3(-60, 0, -410),
        8: new Vector3(106, 0, -510),
        9: new Vector3(250, 0, -600),
        10: new Vector3(-320, 0, -175),
        11: new Vector3(-85, 0, -250),
        12: new Vector3(75, 0, -320),
        13: new Vector3(250, 0, -460),
        14: new Vector3(0, 0, -60),
    }

    static roadVisibleTags: number[][] = [[0], [0, 1], [1, 2], [2, 3], [3], [4], [4, 5], [5, 6], [6, 7], [7], [0, 4], [1, 5], [2, 6], [3, 7], [1]];
    static crossroadVisibleTags: number[][] = [[0, 1, 10], [1, 2, 11, 13], [2, 3, 12], [3, 4, 13], [5, 6, 10], [6, 7, 11], [7, 8 ,12], [8, 9, 13]];

    static carMeshCreator: (scene: Scene, type: number) => Promise<ISceneLoaderAsyncResult> = (scene, type) => {
        return SceneLoader.ImportMeshAsync("", BabylonConfig.carMeshUrlMap[type], undefined, scene);
    }
}