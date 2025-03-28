import "./App.css";
import "./index.css";
import Compiler from "./Home";
// import Map from "./map";
// import { PageHeader } from "./layouts/PageHeader";
export default function App() {
  return (
    <>
      <div className=".max-h-screen flex flex-col items-center justify-center bg-gray-100"></div>
      <Compiler></Compiler>
      {/* <Map></Map> */}
    </>
  );
}
