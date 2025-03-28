import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Map from "./map.tsx";
import "./App.css";
import "./index.css";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // Updated paths to be consistent with /map/[technology] format
  {
    path: "/map/html", // Changed from maphtml to match pattern
    element: <Map index={1} title="HTML" />,
  },
  {
    path: "/map/css",
    element: <Map index={1} title="CSS" />,
  },
  {
    path: "/map/javascript",
    element: <Map index={1} title="JavaScript" />,
  },
  // Added new technologies
  {
    path: "/map/php",
    element: <Map index={1} title="PHP" />,
  },
  {
    path: "/map/c",
    element: <Map index={1} title="C" />,
  },
  {
    path: "/map/mysql",
    element: <Map index={1} title="MySQL" />,
  },
  {
    path: "/map/jquery",
    element: <Map index={1} title="JQuery" />,
  },
  {
    path: "/map/excel",
    element: <Map index={1} title="Excel" />,
  },
]);

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
