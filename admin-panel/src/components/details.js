import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css';

function EmailDetail() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/emails/${id}`);
        
        setEmail(response.data);
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchEmail();
  }, [id]);

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Email Detail</h2>
      <p><strong>ID:</strong> {email.id}</p>
      <p><strong>Name:</strong> {email.name}</p>
      <p><strong>Subject:</strong> {email.subject}</p>
      <p><strong>Email:</strong> {email.email}</p>
      <p><strong>Message:</strong> {email.message}</p>
      <p><strong>Date:</strong> {new Date(email.received_at).toLocaleString()}</p>
    </div>
  );
}

export default EmailDetail;
