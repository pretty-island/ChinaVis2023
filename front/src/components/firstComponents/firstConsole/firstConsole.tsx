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
    { id: "all", name: "所有路口" },
    { id: "1", name: "路口1" },
    { id: "2", name: "路口2" },
    { id: "3", name: "路口3" },
    { id: "4", name: "路口4" }
];
interface TimeOption {
    id: string;
    name: string;
}
const TimeOptions: TimeOption[] = [
    { id: '7', name: '7点' },
    { id: '8', name: '8点' },
    { id: '9', name: '9点' },
    { id: '10', name: '10点' },
    { id: '11', name: '11点' },
    { id: '12', name: '12点' },
    { id: '13', name: '13点' },
    { id: '14', name: '14点' },
    { id: '15', name: '15点' },
    { id: 'all', name: '全部9小时' }
];
interface FirstConsoleProps {
    setSelectedIntersection: React.Dispatch<React.SetStateAction<string>>;
    selectedIntersection: string;
    setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
    selectedTime: string;
}
const FirstConsole: React.FC<FirstConsoleProps> = ({ setSelectedIntersection, selectedIntersection, setSelectedTime, selectedTime }) => {
    const handleIntersectionChange = (value: string) => {
        setSelectedIntersection(value);
    }
    const handleTimeChange = (value: string) => {
        setSelectedTime(value);
    }
    return (
        <div style={{ height: "32.2vh", width: "100%" }}>
            <div className="multipleCheck" style={{ height: "15%", width: "100%" }}>
                <span>选择路口：</span>
                <Select value={selectedIntersection} style={{ width: 120 }} onChange={handleIntersectionChange}>
                    {IntersectionOptions.map((option) => {
                        return < Option key={option.id} value={option.id} > {option.name}</Option>
                    })}

                </Select>
            </div>
            <div>
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