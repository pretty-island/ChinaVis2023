import {Mesh, Scene, Vector2, Vector3} from "@babylonjs/core";
import {VehicleMovementLog} from "./general.ts";
import {BabylonConfig} from "../BabylonConfig.ts";

export default class Car {
    scene: Scene;
    carMesh: Mesh;
    movements: VehicleMovementLog[];

    startTime: number;
    endTime: number;

    get position() {
        return this.carMesh.position;
    }

    private set position(value) {
        this.carMesh.position = value;
    }

    get rotation() {
        return this.carMesh.rotation;
    }

    constructor(scene: Scene, movements: VehicleMovementLog[], meshCreator: (scene: Scene, type: number) => Mesh) {
        console.assert(
            movements.filter(m => m.type === movements[0].type).length === movements.length,
            "All movements should be of the same type"
        );

        this.scene = scene;
        this.movements = movements.sort((m1, m2) => m1.ms_no - m2.ms_no);

        this.startTime = movements[0].ms_no;
        this.endTime = movements[movements.length - 1].ms_no;

        this.carMesh = meshCreator(scene, movements[0].type);

        this.position.y = BabylonConfig.carHeight;
    }

    // 根据节点采集信息计算当前时间应当处于的位置
    // 当输入时间小于最早/大于最晚时间，物体位置设为最早/最晚记录位置，方向设为运动最早/最晚记录位置的朝向
    // 当输入时间在最早与最晚时间之间，找出离输入时间点最近的两个记录，物体位置和旋转方向均由上述两个记录插值计算
    updatePosition(currTime: number) {
        if (currTime < this.startTime || currTime > this.endTime) {
            this.carMesh.isVisible = false;
            return;
        }

        this.carMesh.isVisible = true;

        let lastIndex = this.movements.findIndex(m => m.ms_no > currTime);
        lastIndex = lastIndex === -1 ? 0 : lastIndex;
        const firstIndex = Math.max(lastIndex - 1, 0);

        if (!(this.movements[lastIndex].is_moving || this.movements[firstIndex].is_moving)) {
            this.position = new Vector3(this.movements[firstIndex].position.x, this.carMesh.position.y, this.movements[firstIndex].position.y);
            return;
        }

        const timeInterval = this.movements[lastIndex].ms_no - this.movements[firstIndex].ms_no;
        const timeRatio = timeInterval != 0 ? (currTime - this.movements[firstIndex].ms_no) / timeInterval : 1;

        const firstPos = new Vector2(this.movements[firstIndex].position.x, this.movements[firstIndex].position.y);
        const lastPos = new Vector2(this.movements[lastIndex].position.x, this.movements[lastIndex].position.y);
        const currPos = firstPos.add(lastPos.subtract(firstPos).scale(timeRatio));
        this.position = new Vector3(currPos.x, this.carMesh.position.y, currPos.y);

        const firstHeading = this.movements[firstIndex].heading, lastHeading = this.movements[lastIndex].heading;
        this.rotation.y = firstHeading + (lastHeading - firstHeading) * timeRatio - Math.PI / 6;
    }
}