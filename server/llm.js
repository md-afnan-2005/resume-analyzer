function extractBlockFlexible(text, keywords, fallback) {
  for (let label of keywords) {
    const regex = new RegExp(`${label}:?[\s\S]*?(?=\n\s*\w+:|\n\s*$)`, 'i')
    const match = text.match(regex)
    if (match) return match[0].replace(new RegExp(`${label}:?`, 'i'), '').trim()
  }
  return fallback
}

function extractName(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean)
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i]
    if (/^[A-Z][a-z]+(\s+[A-Z][a-z]+)+$/.test(line)) return line
  }
  return 'John Doe'
}

exports.extractInfoFromText = async (text) => {
  const name = extractName(text)
  const email = text.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/)?.[0] || 'johndoe@example.com'
  const phone = text.match(/(?<!\d)(\+91[-\s]?)?[789]\d{9}(?!\d)/)?.[0] || '+91-9876543210'
  const linkedin = text.match(/https?:\/\/[^\s]*linkedin\.com\/[^\s]*/) || []

  return {
    personalDetails: { name, email, phone, linkedin: linkedin[0] || 'https://linkedin.com/in/johndoe' },
    resumeContent: {
      summary: extractBlockFlexible(text, ['Summary', 'Objective', 'Career Objective'], 'Aspiring software engineer passionate about full-stack development.'),
      experience: extractBlockFlexible(text, ['Experience', 'Work Experience', 'Professional Experience'], 'Intern at ABC Corp where I contributed to web development using React and Node.js.'),
      education: extractBlockFlexible(text, ['Education', 'Academic Background'], 'B.Tech in Computer Science from XYZ University (2020 - 2024).'),
      projects: extractBlockFlexible(text, ['Projects', 'Academic Projects'], 'Built a resume analyzer tool using React and Node.js with PDF parsing.'),
      certifications: extractBlockFlexible(text, ['Certifications', 'Courses'], 'Certified AWS Cloud Practitioner, Completed JavaScript Bootcamp.'),
      achievements: extractBlockFlexible(text, ['Achievements', 'Accomplishments'], 'Won 2nd prize in college coding contest, Selected for Hackathon finals.')
    },
    skills: {
      technical: [...new Set((text.match(/(Python|Java|React|Node|C\+\+|SQL|HTML|CSS|JavaScript|TypeScript|Git|Docker|MongoDB)/gi) || []))],
      soft: [...new Set((text.match(/(Teamwork|Communication|Leadership|Problem-solving|Adaptability|Time Management|Critical Thinking)/gi) || []))]
    },
    rating: Math.floor(Math.random() * 3) + 7,
    improvementAreas: [
      "Include a strong professional summary",
      "Add quantifiable metrics in experience",
      "Highlight unique skills or achievements"
    ],
    suggestedSkills: ["TypeScript", "Docker", "CI/CD", "Cloud Services"]
  }
}