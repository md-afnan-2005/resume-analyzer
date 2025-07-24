// === server/index.js ===
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const pdfParse = require('pdf-parse')
const fs = require('fs')
const { extractInfoFromText } = require('./llm')
const { saveResume, getAllResumes, getResumeById, deleteResumeById } = require('./db')
const app = express()
const upload = multer({ dest: 'uploads/' })
const port = 3001

app.use(cors())
app.use(express.json())

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path)
    const { text } = await pdfParse(pdfBuffer)
    const analysis = await extractInfoFromText(text)
    const id = await saveResume({ filename: req.file.originalname, ...analysis })
    res.json({ id, ...analysis })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/history', async (req, res) => {
  const resumes = await getAllResumes()
  res.json(resumes)
})

app.get('/resume/:id', async (req, res) => {
  const resume = await getResumeById(req.params.id)
  res.json(resume)
})

app.delete('/resume/:id', async (req, res) => {
  try {
    await deleteResumeById(req.params.id)
    res.json({ message: 'Resume deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))