const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./resume.db')

db.run(`CREATE TABLE IF NOT EXISTS resumes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT,
  data TEXT
)`)

exports.saveResume = (data) => new Promise((resolve, reject) => {
  db.run(`INSERT INTO resumes(filename, data) VALUES(?, ?)`, [data.filename, JSON.stringify(data)], function(err) {
    if (err) reject(err)
    else resolve(this.lastID)
  })
})

exports.getAllResumes = () => new Promise((resolve, reject) => {
  db.all(`SELECT id, json_extract(data, '$.personalDetails.name') as name, json_extract(data, '$.personalDetails.email') as email, filename FROM resumes`, [], (err, rows) => {
    if (err) reject(err)
    else resolve(rows)
  })
})

exports.getResumeById = (id) => new Promise((resolve, reject) => {
  db.get(`SELECT * FROM resumes WHERE id = ?`, [id], (err, row) => {
    if (err) reject(err)
    else resolve({ ...row, data: JSON.parse(row.data) })
  })
})

exports.deleteResumeById = (id) => new Promise((resolve, reject) => {
  db.run(`DELETE FROM resumes WHERE id = ?`, [id], function(err) {
    if (err) reject(err)
    else resolve()
  })
})
