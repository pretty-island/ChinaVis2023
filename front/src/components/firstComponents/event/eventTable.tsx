import React, { useEffect, useRef, useState } from "react";
import { Table } from 'antd';
import { getEventTable } from '../../../apis/api';

import "./evt.css"

interface EventTableProps {
    eventName: string;
    setViewId: React.Dispatch<React.SetStateAction<string>>;
    setViewTime: React.Dispatch<React.SetStateAction<string>>;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    selectedRoad: string;
}
const EventTable: React.FC<EventTableProps> = ({ setViewId,setViewTime,selectedRoad, eventName, setEventName }) => {

    // interface OverSpeedData {
    //     id: string;
    //     ms_no: number;
    //     road_sec_id: string;
    // }
    const [useEventData, setUseEventData] = useState();
    const [OverSpeedData, setOverSpeedData] = useState();
    // 获取数据
    useEffect(() => {
        const eventmap = {
            "逆行": "time_nixing",
            "行人横穿马路": "time_true_cross",
            "机动车占用非机动车道": "bicycle_way",
            "机动车占用公交车道": "bus_way",
            "机动车超速": "time_true_overspeed"
        }
        if (eventName == "全天交通事件") {
            const hour = ["7", "8", "9", "10", "11", "12", "13", "14", "15"]
            const event = ["逆行", "行人横穿马路", "机动车占用非机动车道","机动车占用公交车道", "机动车超速"]
            const data = []
            for (const i of hour) {
                for (const j of event) {
                    // console.log(i);
                    getEventTable("/getEventTable", i, eventmap[j]).then((res) => {
                        data.push(...res.data);
                        // console.log(data);
                        setUseEventData(data);
                    });
                }
            }
            // console.log(data);           
        }
        else if (!eventName?.includes("全天交通事件")) {
            const hour = eventName?.split("点")[0]
            const event = eventName?.split("点")[1]
            getEventTable("/getEventTable", hour, eventmap[event]).then((res) => {
                const data = res.data;
                setUseEventData(data);
                // console.log("data");
                // console.log(data);
            });
        }
        else {
            const hour = ["7", "8", "9", "10", "11", "12", "13", "14", "15"]
            const event = eventName?.split("全")[0]
            const data = []
            for (const i of hour) {
                getEventTable("/getEventTable", i, eventmap[event]).then((res) => {
                    data.push(...res.data);
                    setUseEventData(data);
                    // console.log("data");
                    // console.log(data);
                });
            }
        }
    }, [eventName]);
    // 设置数据
    useEffect(() => {
        if (useEventData && selectedRoad) {
            console.log(OverSpeedData);
            console.log(selectedRoad);
            if (selectedRoad == "all") {
                setOverSpeedData(useEventData)
            }
            else {
                let data = []
                useEventData?.map((item) => {
                    if (item.road === ("道路" + selectedRoad)) {
                        data.push(item)
                    }
                })
                setOverSpeedData(data);
            }
        }
    }, [useEventData, selectedRoad]);

    const colums = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '时间',
            dataIndex: 'time'
        },
        {
            title: '道路',
            dataIndex: 'road'
        },
        {
            title: '事件名称',
            dataIndex: 'event_name'
        }
    ]
    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'odd-row' : 'even-row';
    };
    // const text = "机动车占用非机动车道"

    return <Table
        dataSource={OverSpeedData}
        // showHeader={false}
        columns={colums}
        rowClassName={rowClassName}
        pagination={false}
        bordered={false}
        style={{ marginTop: '20px' }}
        // title={() => text}
        size="middle"
        // sticky
        scroll={{ y: 270 }}
        // scroll={{ y: "max-content-200px" }}
        className="custom-table"
        // bordered
        rowKey={(record, index) => index}
        onRow={(record) => {
            return {
                onClick: (event) => {
                    console.log(record.ms_no);
                    setViewId(record.id);
                    setViewTime(record.ms_no);                   
                },               
            };
        }}
    />
}
export default EventTable;