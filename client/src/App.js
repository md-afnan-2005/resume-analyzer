import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [tab, setTab] = useState('upload')
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [detail, setDetail] = useState(null)

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await axios.post('http://localhost:3001/upload', formData)
    setResult(res.data)
  }

  const loadHistory = async () => {
    const res = await axios.get('http://localhost:3001/history')
    setHistory(res.data)
  }

  const loadDetails = async (id) => {
    const res = await axios.get(`http://localhost:3001/resume/${id}`)
    setDetail(res.data)
  }

  const deleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      await axios.delete(`http://localhost:3001/resume/${id}`)
      loadHistory()
      setDetail(null)
    }
  }

  useEffect(() => {
    if (tab === 'history') loadHistory()
  }, [tab])

  const renderDetails = (data) => {
    if (!data || !data.personalDetails || !data.resumeContent || !data.skills) return null

    const { personalDetails, resumeContent, skills, rating, improvementAreas, suggestedSkills } = data

    return (
      <div className="details-container">
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> {personalDetails.name || 'N/A'}</p>
        <p><strong>Email:</strong> {personalDetails.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {personalDetails.phone || 'N/A'}</p>
        <p><strong>LinkedIn:</strong> <a href={personalDetails.linkedin} target="_blank" rel="noreferrer">{personalDetails.linkedin || 'N/A'}</a></p>

        <h3>Resume Content</h3>
        <p><strong>Summary:</strong> {resumeContent.summary || 'N/A'}</p>
        <p><strong>Experience:</strong> {resumeContent.experience || 'N/A'}</p>
        <p><strong>Education:</strong> {resumeContent.education || 'N/A'}</p>
        <p><strong>Projects:</strong> {resumeContent.projects || 'N/A'}</p>
        <p><strong>Certifications:</strong> {resumeContent.certifications || 'N/A'}</p>
        <p><strong>Achievements:</strong> {resumeContent.achievements || 'N/A'}</p>

        <h3>Skills</h3>
        <p><strong>Technical:</strong> {skills.technical?.join(', ') || 'N/A'}</p>
        <p><strong>Soft:</strong> {skills.soft?.join(', ') || 'N/A'}</p>

        <h3>Rating</h3>
        <p><strong>Score:</strong> {rating ?? 'N/A'}</p>

        <h3>Suggestions</h3>
        <p><strong>Improvement Areas:</strong> {improvementAreas?.join(', ') || 'N/A'}</p>
        <p><strong>Suggested Skills:</strong> {suggestedSkills?.join(', ') || 'N/A'}</p>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Resume Analyzer</h1>
      <div>
        <button onClick={() => setTab('upload')}>Upload</button>
        <button onClick={() => setTab('history')}>History</button>
      </div>

      {tab === 'upload' && (
        <div>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleUpload}>Analyze</button>
          {result && renderDetails(result)}
        </div>
      )}

      {tab === 'history' && (
        <div>
          <table border="1">
            <thead>
              <tr><th>Name</th><th>Email</th><th>File</th><th>Details</th><th>Delete</th></tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.filename}</td>
                  <td><button onClick={() => loadDetails(item.id)}>View</button></td>
                  <td><button style={{ backgroundColor: '#e63946', color: 'white' }} onClick={() => deleteResume(item.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {detail && renderDetails(detail)}
        </div>
      )}
    </div>
  )
}

export default App
