import {Vector2} from "@babylonjs/core";

export function calculateDistance2D(start: Vector2, end: Vector2) {
    return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
}