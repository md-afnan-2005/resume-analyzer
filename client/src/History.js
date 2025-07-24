// === client/src/History.js ===
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const History = () => {
  const [resumes, setResumes] = useState([])

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:3001/history')
      setResumes(res.data)
    } catch (err) {
      console.error('Error fetching history:', err)
    }
  }

  const deleteResume = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this resume?')) {
        await axios.delete(`http://localhost:3001/resume/${id}`)
        fetchHistory()
      }
    } catch (err) {
      console.error('Error deleting resume:', err)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Uploaded Resume History</h2>
      {resumes.length === 0 ? (
        <p>No resumes uploaded yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {resumes.map((resume) => (
            <li key={resume.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <div><strong>File:</strong> {resume.filename}</div>
              <div><strong>Name:</strong> {resume.name}</div>
              <div><strong>Email:</strong> {resume.email}</div>
              <button
                onClick={() => deleteResume(resume.id)}
                style={{ marginTop: '0.5rem', backgroundColor: '#e63946', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default History