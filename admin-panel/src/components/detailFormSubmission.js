import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css';

function FormSubmissionDetail() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/form-submissions/${id}`);
        setSubmission(response.data);
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    fetchSubmission();
  }, [id]);

  if (!submission) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Form Submission Detail</h2>
      <p><strong>ID:</strong> {submission.id}</p>
      <p><strong>Name:</strong> {submission.name}</p>
      <p><strong>Email:</strong> {submission.email}</p>
      <p><strong>Message:</strong> {submission.message}</p>
      <p><strong>Date:</strong> {new Date(submission.submitted_at).toLocaleString()}</p>
    </div>
  );
}

export default FormSubmissionDetail;
