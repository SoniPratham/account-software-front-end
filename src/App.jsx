import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from "../src/components/Menubar/menu-bar";
import MainRoutes from "../src/routes/main-routes";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen max-w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4 space-y-4">
        <header className="w-full">
          <MenuBar />
        </header>
        <main className="flex-grow w-full">
          <MainRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;