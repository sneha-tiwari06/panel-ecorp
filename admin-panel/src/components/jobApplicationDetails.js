import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css';

function JobApplicationDetail() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  let fileName = ''; // Declare fileName variable

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/job-applications/${id}`);
        setApplication(response.data);
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    };

    fetchApplication();
  }, [id]);

  if (!application) {
    return <div>Loading...</div>;
  }

  if (application.name) {
    fileName = `${application.name}_resume.pdf`;
  } else {
    fileName = 'resume.pdf'; 
  }

  return (
    <div className="container">
      <h2>Job Application Detail</h2>
      <p><strong>ID:</strong> {application.id}</p>
      <p><strong>Name:</strong> {application.name}</p>
      <p><strong>Email:</strong> {application.email}</p>
      <p><strong>Phone:</strong> {application.phone}</p>
      <p><strong>Date:</strong> {new Date(application.submitted_at).toLocaleString()}</p>
      {application.file && (
        <p>
          <strong>Resume:</strong>
          <a href={`data:application/pdf;base64,${btoa(application.file)}`} download={fileName}>Download Resume</a>
        </p>
      )}
    </div>
  );
}

export default JobApplicationDetail;
