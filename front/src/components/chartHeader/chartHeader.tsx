import "./chartHeader.css";

interface Props{
    chartName:string; // 定义chartName参数类型为string
}
export default function ChartHeader({chartName}:Props){
    return <div className="chartheader">{chartName}</div>;
}