// 第一屏控制台
import React, { useState } from 'react';
import { Select, Switch, Space } from "antd";
import 'antd/dist/reset.css';
const { Option } = Select;

interface IntersectionOption {
    id: string;
    name: string;
}
const IntersectionOptions: IntersectionOption[] = [
    // { id: "all", name: "所有路口" },
    { id: "1", name: "路口1" },
    { id: "2", name: "路口2" },
    { id: "3", name: "路口3" },
    { id: "4", name: "路口4" },
    { id: "5", name: "路口5" },
    { id: "6", name: "路口6" },
    { id: "7", name: "路口7" },
    { id: "8", name: "路口8" },
];
// interface TimeOption {
//     id: string;
//     name: string;
// }
// const TimeOptions: TimeOption[] = [
//     // { id: 'all', name: '全部9小时' },
//     { id: '1', name: '7:00-8:00' },
//     { id: '2', name: '8:00-9:00' },
//     { id: '3', name: '9:00-10:00' },
//     { id: '4', name: '10:00-11:00' },
//     { id: '5', name: '11:00-12:00' },
//     { id: '6', name: '12:00-13:00' },
//     { id: '7', name: '13:00-14:00' },
//     { id: '8', name: '14:00-15:00' },
//     { id: '9', name: '15:00-16:00' },
// ];
interface SecondConsoleProps {
    setSelectedCross: React.Dispatch<React.SetStateAction<string>>;
    selectedCross: string;
    setSelectedMin: React.Dispatch<React.SetStateAction<string>>;
    selectedMin: string;
    setHeatMap: React.Dispatch<React.SetStateAction<string>>;
    setHeatCrossMap: React.Dispatch<React.SetStateAction<string>>;
    selectedHour: string;
    setSelectedHour: React.Dispatch<React.SetStateAction<string>>;
}


const provinceData = ['7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点'];

const cityData = {
    '7点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
    '8点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
    '9点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
    '10点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
    '11点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
    '12点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
    '13点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
    '14点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
    '15点': ['00-05', '05-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-00'],
};

type CityName = keyof typeof cityData;

const SecondConsole: React.FC<SecondConsoleProps> = ({ setHeatCrossMap, setHeatMap, setSelectedCross, selectedCross, setSelectedMin, selectedMin, setSelectedHour, selectedHour }) => {
    const handleIntersectionChange = (value: string) => {
        setSelectedCross(value);
    }
    // const handleTimeChange = (value: string) => {
    //     setSelectedMin(value);
    // }
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        setHeatMap(checked)
    };

    const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);

    const handleProvinceChange = (value: CityName) => {
        setCities(cityData[value]);
        setSelectedHour(value)
        setSelectedMin(cityData[value][0]);
    };

    const onSecondCityChange = (value: CityName) => {
        setSelectedMin(value);
    };
    console.log(selectedHour + selectedMin);

    return (
        <div style={{ height: "100%", width: "100%" }}>

            <div style={{ padding: "10px" }}>
                <span>选择时间：</span>
                <Space wrap>
                    <Select
                        defaultValue={provinceData[0]}
                        style={{ width: 120 }}
                        onChange={handleProvinceChange}
                        options={provinceData.map((province) => ({ label: province, value: province }))}
                    />
                    <Select
                        style={{ width: 120 }}
                        value={selectedMin}
                        onChange={onSecondCityChange}
                        options={cities.map((city) => ({ label: city, value: city }))}
                    />
                </Space>
                {/* <Select value={selectedMin} style={{ width: 120 }} onChange={handleTimeChange}>
                    {TimeOptions.map((option) => {
                        return <Option key={option.id} value={option.id}>
                            {option.name}
                        </Option>
                    })}
                </Select> */}
            </div>
            <div className="multipleCheck" style={{ padding: "10px" }}>
                <span>选择路口：</span>
                <Select value={selectedCross} style={{ width: 120 }} onChange={handleIntersectionChange}>
                    {IntersectionOptions.map((option) => {
                        return < Option key={option.id} value={option.id} > {option.name}</Option>
                    })}
                </Select>
            </div>
            <div style={{ padding: "10px" }}>
                <span>道路拥堵热力图：</span>
                <Switch
                    defaultChecked
                    onChange={onChange} />
                <span style={{ padding: "50px" }}>路口拥堵热力图：</span>
                <Switch defaultChecked
                    onChange={(checked: boolean) => {
                        setHeatCrossMap(checked)
                    }} />
            </div>

        </div >
    )
}
export default SecondConsole;