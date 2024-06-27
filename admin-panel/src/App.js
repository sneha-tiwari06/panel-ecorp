import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./components/login";
import Home from "./components/home";
import EmailDetail from "./components/details";
import FormSubmissionDetail from "./components/detailFormSubmission";
import FormSubmissions from "./components/formSubmission";
import JobApplicationDetail from "./components/jobApplicationDetails";
import JobApplications from "./components/jobApplication";
import Navbar from "./components/navbar";
import MainLayout from "./components/mainLayout";

function App() {

  return (

    <Router>
      <div className="App">

        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/email/:id" element={<EmailDetail />} />
          <Route path="/form-submissions/:id" element={<FormSubmissionDetail />} />
          <Route path="/formSubmission" element={<FormSubmissions />} />
          <Route path="/job-applications/:id" element={<JobApplicationDetail />} />
          <Route path="/jobApplications" element={<JobApplications />} />


        </Routes>

      </div>
    </Router>

  );
}

export default App;

