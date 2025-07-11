'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Eye } from 'lucide-react'

interface Resume {
  id: string
  title: string
  role: string
  description: string
  filename: string
  icon: string
}

const resumes: Resume[] = [
  {
    id: 'ai-ml',
    title: 'AI & ML Resume',
    role: 'AI/ML Engineer',
    description: 'Specialized in machine learning, deep learning, and artificial intelligence projects.',
    filename: 'Labh_Vatsal_Resume (AI&ML).pdf',
    icon: '🤖'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst Resume',
    role: 'Data Analyst',
    description: 'Focused on data analysis, visualization, and business intelligence.',
    filename: 'Labh_Vatsal_Resume (Data Analyst).pdf',
    icon: '📊'
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer Resume',
    role: 'Software Engineer',
    description: 'Full-stack development, system design, and software architecture.',
    filename: 'Labh_Vatsal_Resume (Software Engineering 2025).pdf',
    icon: '💻'
  }
]

export default function ResumeSection() {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleDownload = (resume: Resume) => {
    const link = document.createElement('a')
    link.href = `/files/${resume.filename}`
    link.download = resume.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = (resume: Resume) => {
    setSelectedResume(resume)
    setIsViewerOpen(true)
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
    setSelectedResume(null)
  }

  return (
    <>
      <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Resume</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-junicode transition-colors">
              Choose the resume that best fits the role you're interested in. You can view or download any version.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-3">{resume.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors">
                        {resume.title}
                      </h3>
                      <p className="text-primary-500 dark:text-primary-400 font-medium">
                        {resume.role}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">
                    {resume.description}
                  </p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleView(resume)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-primary-500 dark:bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDownload(resume)}
                      className="flex-1 flex items-center justify-center space-x-2 border border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 px-4 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {isViewerOpen && selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedResume.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedResume.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedResume.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDownload(selectedResume)}
                  className="flex items-center space-x-2 bg-primary-500 dark:bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button
                  onClick={closeViewer}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={`/files/${selectedResume.filename}#toolbar=0`}
                className="w-full h-full rounded-lg border border-gray-200 dark:border-gray-700"
                title={selectedResume.title}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
} 