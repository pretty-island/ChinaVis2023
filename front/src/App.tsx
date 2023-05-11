import './App.css'
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";

function App() {
  return (
    // <>
    //   <MainVisualizationView />
    // </>
    <div className="App">
      {/* <BrowserRouter> */}
        <Routes>
          <Route key="layout" path="/" element={<Layout />} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  )
}

export default App
