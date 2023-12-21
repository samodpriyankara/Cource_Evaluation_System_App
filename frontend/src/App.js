
import AdminLogin from "./components/admin/AdminLogin";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import Index from "./components/common/pages/Index";
import StudentDashboard from "./components/students/pages/StudentDashboard";
import AllDegreeRating from "./components/students/allDegreeRating/AllDegreeRating";
import DegreeForm from "./components/admin/degreeInfoForm/DegreeForm";
import ProfessorForm from "./components/admin/professorInfoForm/ProfessorForm";
import ProfessorDashboard from "./components/professors/dashboard/ProfessorDashboard";
import AllProfessorRating from "./components/students/allProfessorRating/AllProfessorRating";
import NewDegreeRate from "./components/students/newDegreeRate/NewDegreeRate";
import NewProfessorRate from "./components/students/newProfessorRate/NewProfessorRate";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />}/>
          <Route path="/admin/dashboard" element={<AdminDashboard />}/>
          <Route path="/admin/addCourse" element={<DegreeForm />}/>
          <Route path="/admin/addProfessor" element={<ProfessorForm />}/>
          <Route path="/student/dashboard" element={<StudentDashboard />}/>
          <Route path="/student/allDegreeRating/:id" element={<AllDegreeRating />}/>
          <Route path="/student/newDegreeRate/:id/:degree/:field" element={<NewDegreeRate/>}/>
          <Route path="/student/allProfessorRating/:id" element={<AllProfessorRating />}/>
          <Route path="/student/newProfessorRate/:id/:username/:degree" element={<NewProfessorRate />}/>
          <Route path="/professor/dashboard" element={<ProfessorDashboard />}/>
          <Route path="/" element={<Index />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
