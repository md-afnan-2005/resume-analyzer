# Resume Analyzer

See client/ and server/ folders.
# 🧠 Resume Analyzer

A full-stack web application for parsing, analyzing, and suggesting improvements for resumes. Upload your resume in PDF format and get detailed insights including experience, skills, education, rating, and more.

---

## 🚀 Features

- 📤 Upload and analyze resumes
- 🧠 Extracts personal details, skills, education, experience, projects, certifications, and achievements
- 📈 Provides rating and suggestions for improvement
- 🕓 History tab to view all previous resume analyses
- ❌ Delete individual entries from history
- 🎨 Clean, modern UI with styled result view
- 🗂️ Uses SQLite for lightweight backend database
- 📄 PDF content extraction using `pdf-parse`

---

## 🧰 Tech Stack

| Layer      | Tech Used              |
|------------|------------------------|
| Frontend   | React.js, Axios, CSS   |
| Backend    | Node.js, Express.js    |
| Database   | SQLite                 |
| File Parse | `pdf-parse`            |
| UI         | Custom Responsive CSS  |

---

## 📦 Project Structure

```
resume-analyzer/
│
├── client/               # React frontend
│   └── src/
│       ├── App.js        # Main component
│       ├── App.css       # Styling
│
├── server/               # Node.js backend
│   ├── index.js          # Main server file
│   ├── llm.js            # Resume parsing logic
│   ├── db.js             # SQLite DB connection
│   └── uploads/          # Uploaded PDFs
```

---

## 🧑‍💻 Installation & Setup

### 1. Backend Setup

```bash
cd server
npm install
node index.js
```

Required packages:
- express
- multer
- pdf-parse
- sqlite3
- cors

> Ensure `index.js`, `llm.js`, and `db.js` are properly configured.

---

### 2. Frontend Setup

```bash
cd ../client
npm install
npm start
```

Required packages:
- axios
- react
- react-dom

---

## 📋 Usage

- Go to `http://localhost:3000`
- Click "Upload", choose a PDF resume, and hit "Analyze"
- See structured results with analysis and improvement suggestions
- Visit "History" tab to view/delete previously uploaded resumes

---

## 🛠️ Future Improvements

- ✨ Integrate GPT-based AI for smarter feedback
- 📊 Add charts for skill strength
- 📥 Export analyzed report to PDF
- 🔐 Add authentication & role-based access

---

## 🙋‍♂️ Author

**Mohammad Afnan Tailor**

---

## 📬 Feedback & Contributions

If you'd like to contribute, fix a bug, or suggest improvements, feel free to fork this repository and create a pull request.

---