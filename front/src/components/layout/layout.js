import "./layout.css";
import { useEffect, useState } from "react";

// 引入数据获取的接口
import { testUrl, postParams } from "../../apis/api";

const Layout = () => {
  useEffect(() => {
    testUrl("/").then((res) => {
      // 后端返回的数据
      const data = res.data;
    });

    postParams("/passParam", { id: "testid", name: 'testname' }).then((res) => {
      console.log(res.data);
    });

    
  }, []);
  return(
    <div id="layout">
      


    </div>
  );
};

export default Layout;
