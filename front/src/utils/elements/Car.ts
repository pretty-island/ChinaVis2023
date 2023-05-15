import {Mesh, Vector2, Animation, Vector3, Scene} from "@babylonjs/core";
import {calculateDistance2D} from "../tools.ts";

export default class Car {
    scene: Scene;
    carMesh: Mesh;

    get position() {
        return this.carMesh.position;
    }

    set position(value) {
        this.carMesh.position = value;
    }

    constructor(scene: Scene, carMesh: Mesh) {
        this.scene = scene;
        this.carMesh = carMesh;
    }

    private launchPositionAnimation(points: Vector2[], speed: number): [Animation, number] {
        // speed为每秒移速，points为路径点
        let animationBox = new Animation("carAnimation", "position", 30,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
        let positionKeys = [{frame: 0, value: new Vector3(points[0].x, this.position.y, points[0].y)}];
        let lastFrame = 0;
        for (let i = 1; i < points.length; i++) {
            lastFrame = i * 30 * calculateDistance2D(points[i], points[i - 1]) / speed;
            positionKeys.push({
                frame: lastFrame,
                value: new Vector3(points[i].x, this.position.y, points[i].y)
            });
        }
        animationBox.setKeys(positionKeys);

        return [animationBox, lastFrame];
    }

    moveFollowPoints(scene: Scene, points: Vector2[], speed: number) {
        const [positionAnimation, lastFrame] = this.launchPositionAnimation(points, speed);
        this.carMesh.animations.push(positionAnimation);
        scene.beginAnimation(this.carMesh, 0, lastFrame, false);
    }
}