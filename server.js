const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const db = require("./db"); 

const app = express();
const port = 8000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: "An error occurred while logging in" });
    } else {
      if (result.length > 0) {
      
        res.json({ success: true, message: "Login successful" });
      } else {
     
        res.json({ success: false, message: "Invalid username or password" });
      }
    }
  });
});
app.get('/emails', (req, res) => {
    const query = 'SELECT * FROM emails ORDER BY received_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send({ success: false, message: 'Failed to fetch emails from database' });
      }
      // console.log("feteched:", results)
      res.status(200).send(results);
    });
  });
  
  app.get('/emails/:id', (req, res) => {
    const { id } = req.params;
    console.log('Fetching email with ID:', id); 
    const query = 'SELECT * FROM emails WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Failed to fetch email from database:', err);
        return res.status(500).send({ success: false, message: 'Failed to fetch email from database' });
      }
      if (results.length === 0) {
        return res.status(404).send({ success: false, message: 'Email not found' });
      }
      // console.log('Fetched email:', results[0]); 
      res.status(200).send(results[0]);
    });
  });

  app.get('/form-submissions', (req, res) => {
    const query = 'SELECT * FROM form_submissions ORDER BY submitted_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching form submissions from database:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch form submissions from database' });
      }
      console.log('Form submissions:', results);
      res.status(200).json(results);
    });
  });

app.get('/job-applications', (req, res) => {
    const query = 'SELECT * FROM job_applications ORDER BY submitted_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Failed to fetch job applications from database' });
        }
        res.status(200).send(results);
    });
});

app.get('/form-submissions/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM form_submissions WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Failed to fetch form submission from database' });
        }
        if (results.length === 0) {
            return res.status(404).send({ success: false, message: 'Form submission not found' });
        }
        res.status(200).send(results[0]);
    });
});

app.get('/job-applications/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM job_applications WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Failed to fetch job application from database' });
        }
        if (results.length === 0) {
            return res.status(404).send({ success: false, message: 'Job application not found' });
        }
        res.status(200).send(results[0]);
    });
});
app.listen(8000, () => {
  console.log(`Server is running on ${port}`);
});
