'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, ChevronDown } from 'lucide-react'
import axios from 'axios'

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

interface Experience {
  _id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  category: "data-science" | "ai-ml" | "software-engineer"
  summary: string
  details?: string[]
  logoUrl?: string
}

interface TerminalLine {
  id: string
  type: 'input' | 'output' | 'error'
  content: string
  timestamp: Date
}

export default function TerminalShell() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'Welcome to Vatsal\'s Portfolio Terminal!\nType "help" to see available commands.',
      timestamp: new Date()
    }
  ])
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Fetch data when terminal opens
      fetchData()
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const fetchData = async () => {
    try {
      const [projectsRes, experiencesRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/experiences')
      ])
      
      setProjects(projectsRes.data)
      setExperiences(experiencesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const addLine = (type: 'input' | 'output' | 'error', content: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    }
    setLines(prev => [...prev, newLine])
  }

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCommand])
    setHistoryIndex(-1)

    // Add input line
    addLine('input', `$ ${trimmedCommand}`)

    const [cmd, ...args] = trimmedCommand.split(' ')
    const keyword = args.join(' ')

    switch (cmd.toLowerCase()) {
      case 'help':
        addLine('output', `Available commands:
• help - Show this help message
• find <keyword> - Search for projects and experience containing the keyword
• clear - Clear terminal
• exit - Close terminal
• ls - List all projects
• exp - List all experience
• about - Show information about me
• skills - Show technical skills`)
        break

      case 'find':
        if (!keyword) {
          addLine('error', 'Usage: find <keyword>\nExample: find React')
          return
        }
        handleFindCommand(keyword)
        break

      case 'clear':
        setLines([{
          id: '1',
          type: 'output',
          content: 'Terminal cleared.',
          timestamp: new Date()
        }])
        break

      case 'exit':
        setIsOpen(false)
        break

      case 'ls':
        if (projects.length === 0) {
          addLine('output', 'No projects found.')
          return
        }
        const projectList = projects.map(p => `• ${p.title} (${p.technologies.join(', ')})`).join('\n')
        addLine('output', `Projects:\n${projectList}`)
        break

      case 'exp':
        if (experiences.length === 0) {
          addLine('output', 'No experience found.')
          return
        }
        const expList = experiences.map(e => `• ${e.title} at ${e.company} (${e.category})`).join('\n')
        addLine('output', `Experience:\n${expList}`)
        break

      case 'about':
        addLine('output', `Vatsal Labh:
  EDUCATION: B.Sc. Computer Science - University at Buffalo (Summa Cum Laude)
  POSITIONS: Software Engineer, Data Scientist, and AI Practitioner
  ABOUT ME: Passionate about turning complex ideas into working, reliable systems
  PORTFOLIO: https://vatsal.online
  EMAIL: vatsal.12505@gmail.com
  LINKEDIN: https://www.linkedin.com/in/vatsal-labh/
  GITHUB: https://github.com/Jimbob12505`)
        break

      case 'skills':
        addLine('output', `Technical Skills:
  Programming Languages: JavaScript/TypeScript, Python, Java, C++
  Web Technologies: React, Next.js, Node.js, Express, MongoDB
  AI/ML: TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy
  Data Science: SQL, PostgreSQL, Data Analysis, Visualization
  Cloud & DevOps: Docker, AWS, Git, CI/CD
  Mobile: React Native, Swift, Kotlin
  Frontend: HTML, CSS, Tailwind CSS, Framer Motion`)
        break

      default:
        addLine('error', `Command not found: ${cmd}\nType "help" for available commands.`)
    }
  }

  const handleFindCommand = (keyword: string) => {
    const searchTerm = keyword.toLowerCase()
    const results: string[] = []

    // Search in projects
    const matchingProjects = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
    )

    if (matchingProjects.length > 0) {
      results.push(`📁 Projects (${matchingProjects.length}):`)
      matchingProjects.forEach(project => {
        results.push(`  • ${project.title}`)
        results.push(`    Description: ${project.description}`)
        results.push(`    Technologies: ${project.technologies.join(', ')}`)
        if (project.githubUrl) results.push(`    GitHub: ${project.githubUrl}`)
        if (project.liveUrl) results.push(`    Live: ${project.liveUrl}`)
        results.push('')
      })
    }

    // Search in experiences
    const matchingExperiences = experiences.filter(exp => 
      exp.title.toLowerCase().includes(searchTerm) ||
      exp.company.toLowerCase().includes(searchTerm) ||
      exp.summary.toLowerCase().includes(searchTerm) ||
      exp.category.toLowerCase().includes(searchTerm)
    )

    if (matchingExperiences.length > 0) {
      results.push(`💼 Experience (${matchingExperiences.length}):`)
      matchingExperiences.forEach(exp => {
        results.push(`  • ${exp.title} at ${exp.company}`)
        results.push(`    Category: ${exp.category}`)
        results.push(`    Summary: ${exp.summary}`)
        results.push(`    Duration: ${new Date(exp.startDate).toLocaleDateString()} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}`)
        results.push('')
      })
    }

    if (results.length === 0) {
      addLine('output', `No results found for "${keyword}"`)
    } else {
      addLine('output', results.join('\n'))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <>
      {/* Floating Terminal Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-colors"
        title="Open Terminal"
      >
        <Terminal size={24} />
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 text-green-400 rounded-lg shadow-2xl w-full max-w-4xl h-96 md:h-[500px] flex flex-col"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-mono ml-2">portfolio-terminal</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Terminal Content */}
              <div 
                ref={terminalRef}
                className="flex-1 p-4 overflow-y-auto font-mono text-sm"
              >
                {lines.map((line) => (
                  <div key={line.id} className="mb-2">
                    {line.type === 'input' && (
                      <div className="text-green-400">{line.content}</div>
                    )}
                    {line.type === 'output' && (
                      <div className="text-gray-300 whitespace-pre-wrap">{line.content}</div>
                    )}
                    {line.type === 'error' && (
                      <div className="text-red-400">{line.content}</div>
                    )}
                  </div>
                ))}
                
                {/* Input Line */}
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-gray-300 outline-none border-none"
                    placeholder="Type a command..."
                    autoFocus
                  />
                  <span className="text-green-400 animate-pulse">|</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 