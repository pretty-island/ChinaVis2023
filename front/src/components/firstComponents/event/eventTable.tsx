import React, { useEffect, useRef, useState } from "react";
import { Table } from 'antd';
import { getEventTable } from '../../../apis/api';

import "./evt.css"

interface EventTableProps {
    eventName: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    // typeName: string;
}
const EventTable: React.FC<EventTableProps> = ({ eventName, setEventName }) => {

    interface OverSpeedData {
        id: string;
        ms_no: number;
        road_sec_id: string;
    }
    const [OverSpeedData, setOverSpeedData] = useState<OverSpeedData[]>([]);
    // 获取数据
    useEffect(() => {
        const eventmap = {
            "逆行": "time_nixing",
            "行人横穿马路": "time_true_cross",
            "机动车占用非机动车道": "time_true_error_way",
            "机动车超速": "time_true_overspeed"
        }
        if (eventName == "全天交通事件") {
            const hour = ["7", "8", "9", "10", "11", "12", "13", "14", "15"]
            const event = ["逆行", "行人横穿马路", "机动车占用非机动车道", "机动车超速"]
            const data = []
            for (const i of hour) {
                for (const j of event) {
                    // console.log(i);
                    getEventTable("/getEventTable", i, eventmap[j]).then((res) => {
                        data.push(...res.data);
                        // console.log(data);
                        setOverSpeedData(data);
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
                setOverSpeedData(data);
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
                    setOverSpeedData(data);
                    // console.log("data");
                    console.log(data);
                });
            }
            // else if(eventName.includes("全天交通事件")){

        }
    }, [eventName]);

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
        sticky
        scroll={{ y: 300 }}
        className="custom-table"
        // bordered
        rowKey={(record, index) => index}
    // onRow={(record) => {
    //     return {
    //         onClick: (event) => {
    //             // let tr = e.target.parentNode; 
    //             // //拿到tr标签
    //             // if (tr.nodeName !== 'TR') {tr = tr.parentNode}
    //             // //给所有tr标签设置颜色
    //             // for (let i = 0; i < tr.parentNode.childNodes.length; i++) 
    //             // {tr.parentNode.childNodes[i].style.color = 'white'}
    //             // //单独设置被选中的标签颜色
    //             // tr.style.color = "rgb(115,201,236)";
    //         },
    //         onDoubleClick: (event) => { },
    //         onContextMenu: (event) => { },
    //         onMouseEnter: (event) => { }, // 鼠标移入行
    //         onMouseLeave: (event) => { },
    //     };
    // }}
    />


}
export default EventTable;