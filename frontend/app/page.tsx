'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Mail, Linkedin, Twitter } from 'lucide-react'
import { ThemeToggle } from './components/ThemeToggle'
import ResumeSection from './components/ResumeSection'
import ExperienceSection from './components/ExperienceSection'
import TerminalShell from './components/TerminalShell'

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

interface BlogPost {
  _id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  createdAt: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, blogRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get('/api/blog')
        ])
        setProjects(projectsRes.data)
        setBlogPosts(blogRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
            <div className="flex justify-center space-x-6">
              <a
                href="mailto:vatsal.12505@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/vatsal-labh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/Jimbob12505"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <Github size={24} />
              </a>
            </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Projects</a>
              <a href="#resume" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Resume</a>
              <a href="#blog" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Blog</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Contact</a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-center gap-12"
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary-100 shadow-lg">
                  <img
                    src="/images/profile-picture.png"
                    alt="Vatsal Labh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 rounded-full border-4 border-white"></div>
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="text-center lg:text-left max-w-2xl">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl transition-colors">
                Hi, I'm <span className="text-primary-500 dark:text-primary-400 font-junicode text-7xl">Vatsal Labh</span>
              </h1>
              <p className="mt-6 text-xl font-junicode text-gray-600 dark:text-gray-300 transition-colors">
                I am a software engineer, data scientist, and AI practitioner who likes turning complex ideas into working, reliable systems.
                I recently graduated Summa Cum Laude with a B.Sc. in Computer Science from University at Buffalo where I spent my time combining strong engineering with deep data science and modern AI techniques and shipping them into real, scalable products.        
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#projects"
                  className="bg-primary-500 dark:bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
                >
                  View My Work
                </a>
                <a
                  href="#resume"
                  className="border border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 px-6 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  View Resume
                </a>
                <a
                  href="#contact"
                  className="border border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 px-6 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-junicode transition-colors">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {projects.slice(0, 9).map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                {project.imageUrl && (
                  <div className="h-48 bg-gray-200">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Resume Section */}
      <ResumeSection />

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Latest Blog Posts</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-junicode transition-colors">
              Thoughts, tutorials, and insights about web development, AI, and technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Get In Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-junicode transition-colors">
              I'm always interested in hearing about new opportunities and exciting projects.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="mailto:vatsal.12505@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/vatsal-labh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/Jimbob12505"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <Github size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Vatsal Labh. All rights reserved.</p>
        </div>
      </footer>

      {/* Terminal Shell */}
      <TerminalShell />
    </div>
  )
} 
