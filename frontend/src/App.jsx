import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/navbar";
import Task from "./Pages/task-dashboard";
import Audit from "./Pages/audit-dashboard";

const App = () => {
  return (
    <Router>
     <div className="flex flex-col xl:flex-row min-h-screen">
        <Navbar />
  <div className="flex-1 bg-[#101624] border border-[#2c2f3f] text-[#faf9f9]">
          <Routes>
            <Route path="/" element={<Task />} />
            <Route path="/audit" element={<Audit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
