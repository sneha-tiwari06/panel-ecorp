import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';
function FormSubmissions() {
  const [submissions, setSubmissions] = useState([]);


  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/form-submissions');
        console.log("Response from server:", response.data); 
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching form submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);
  
  return (
    <div>
      <div>
        <h1 style={{textAlign: "center"}}>Form Submissions</h1></div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td><Link to={`/form-submissions/${submission.id}`}>{submission.id}</Link></td>
              <td>{submission.name}</td>
              <td>{submission.email}</td>
              <td>{submission.message}</td>
              <td>{new Date(submission.submitted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormSubmissions;
