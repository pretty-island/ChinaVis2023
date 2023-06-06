// 第一屏控制台
import React from 'react';
import { Select } from "antd";
import 'antd/dist/reset.css';
const { Option } = Select;
interface IntersectionOption {
    id: string;
    name: string;
}
const IntersectionOptions: IntersectionOption[] = [
    { id: "all", name: "所有道路" },
    { id: "1", name: "道路1" },
    { id: "2", name: "道路2" },
    { id: "3", name: "道路3" },
    { id: "4", name: "道路4" },
    { id: "5", name: "道路5" },
    { id: "6", name: "道路6" },
    { id: "7", name: "道路7" },
    { id: "8", name: "道路8" },
    { id: "9", name: "道路9" },
    { id: "10", name: "道路10" },
    { id: "11", name: "道路11" },
    { id: "12", name: "道路12" },
    { id: "13", name: "道路13" },
    { id: "14", name: "道路14" },
    { id: "15", name: "道路15" }
];
interface TimeOption {
    id: string;
    name: string;
}
const TimeOptions: TimeOption[] = [
    { id: 'all', name: '全部9小时' },
    { id: '1', name: '7:00-8:00' },
    { id: '2', name: '8:00-9:00' },
    { id: '3', name: '9:00-10:00' },
    { id: '4', name: '10:00-11:00' },
    { id: '5', name: '11:00-12:00' },
    { id: '6', name: '12:00-13:00' },
    { id: '7', name: '13:00-14:00' },
    { id: '8', name: '14:00-15:00' },
    { id: '9', name: '15:00-16:00' },
];
interface FirstConsoleProps {
    setSelectedRoad: React.Dispatch<React.SetStateAction<string>>;
    selectedRoad: string;
    setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
    selectedTime: string;
}

const FirstConsole: React.FC<FirstConsoleProps> = ({ setSelectedRoad, selectedRoad, setSelectedTime, selectedTime }) => {
    const handleIntersectionChange = (value: string) => {
        setSelectedRoad(value);
    }
    const handleTimeChange = (value: string) => {
        setSelectedTime(value);
    }
    
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <div className="multipleCheck" style={{  padding:"10px" }}>
                <span>选择道路：</span>
                <Select value={selectedRoad} style={{ width: 120 }} onChange={handleIntersectionChange}>
                    {IntersectionOptions.map((option) => {
                        return < Option key={option.id} value={option.id} > {option.name}</Option>
                    })}
                </Select>
            </div>
            <div style={{ padding:"10px" }}>
                <span>选择时间：</span>
                <Select value={selectedTime} style={{ width: 120 }} onChange={handleTimeChange}>
                    {TimeOptions.map((option) => {
                        return <Option key={option.id} value={option.id}>
                            {option.name}
                        </Option>
                    })}
                </Select>
            </div>
        </div >
    )
}
export default FirstConsole;