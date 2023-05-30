export interface VehicleMovementLog {
    id: number; // 载具ID
    type: number;   // 载具类型
    position: {x: number, y: number};   // 载具当前位置
    shape: {x: number, y: number, z: number};   // 载具形状
    orientation: number;    // 载具车头朝向
    is_moving: boolean; // 是否在运动
    velocity: number;   // 载具速度
    heading: number;    // 载具运动方向
    time_meas: number;  // 当前时间
    ms_no: number;  // 当前时间的毫秒数
}