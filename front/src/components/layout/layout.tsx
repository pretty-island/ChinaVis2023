import "./layout.css";
import { useEffect } from "react";

// 引入数据获取的接口
import { testUrl, postParams } from "../../apis/api";
import ChartHeader from "../chartHeader/chartHeader";
import QueCar from "../queCar/queCar";
import TrafficFlow from "../trafficFlow/trafficFlow";
import MainVisualizationView from "../MainVisualizationView";

const Layout = () => {
  useEffect(() => {
    testUrl("/").then((res) => {
      // 后端返回的数据
      const data = res.data;
      console.log(data);
    });

    postParams("/passParam", { id: "testid", name: 'testname' }).then((res) => {
      console.log(res.data);
    });


  }, []);
  return (
    <div id="layout">
      <div id="header">
        <div className="title marginc">交通态势感知</div>
      </div>
      <div className="container">
        <div className="left">
          <div id="console" className="marginc">
            <ChartHeader chartName={"控制台"} />
          </div>
          <div id="queue" className="marginc">
            <ChartHeader chartName={"排队车辆统计"} />
            <QueCar />
          </div>
        </div>
        <div id="mainview" className="marginc">
          <MainVisualizationView/>
        </div>
        <div className="right">
          <div id="traffic" className="marginc">
            <ChartHeader chartName={"断面车流统计"} />
            <TrafficFlow />
          </div>
          <div id="heat" className="marginc">
            <ChartHeader chartName={"车辆热力图"} />
          </div>
        </div>

      </div>







    </div>
  );
};

export default Layout;
