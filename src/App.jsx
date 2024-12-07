import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from "../src/components/Menubar/menu-bar";
import MainRoutes from "../src/routes/main-routes";

function App() {
  return (
    <Router>
      <div className="flex flex-col max-w-full space-y-4">
        <MenuBar />
        <div className="mt-16 flex-grow w-full">
          <MainRoutes />
        </div>
      </div>
    </Router>
  );
}
export default App;