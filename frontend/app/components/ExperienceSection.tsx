"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Experience {
  _id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  category: "data-science" | "ai-ml" | "software-engineer";
  summary: string;
  details?: string[];
  logoUrl?: string;
}

const categories = [
  {
    key: "data-science",
    label: "Data Science / Analyst",
  },
  {
    key: "ai-ml",
    label: "AI / ML",
  },
  {
    key: "software-engineer",
    label: "Software Engineer / Web Development",
  },
];

export default function ExperienceSection() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/experiences?category=${selectedCategory}`)
      .then((res) => setExperiences(res.data))
      .catch(() => setExperiences([]))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const openModal = (exp: Experience) => {
    setSelectedExperience(exp);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-junicode transition-colors">
            A showcase of my professional work, split by focus area. Click on any experience for more details.
          </p>
        </motion.div>
        <div className="flex justify-center mb-8 space-x-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2 rounded-lg font-medium transition-colors border ${{
                'data-science': 'border-blue-400',
                'ai-ml': 'border-green-400',
                'software-engineer': 'border-purple-400',
              }[cat.key]} ${
                selectedCategory === cat.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[120px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.length === 0 && (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No experiences found for this category.
              </div>
            )}
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
                onClick={() => openModal(exp)}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    {exp.logoUrl && (
                      <img src={exp.logoUrl} alt={exp.company} className="w-10 h-10 rounded-full mr-3 object-cover" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-primary-500 dark:text-primary-400 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {exp.summary}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {/* Modal for details */}
      {modalOpen && selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full p-6 relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center mb-4">
              {selectedExperience.logoUrl && (
                <img src={selectedExperience.logoUrl} alt={selectedExperience.company} className="w-12 h-12 rounded-full mr-4 object-cover" />
              )}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedExperience.title}
                </h3>
                <p className="text-primary-500 dark:text-primary-400 font-medium">
                  {selectedExperience.company}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedExperience.location}
                </p>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(selectedExperience.startDate).toLocaleDateString()} - {selectedExperience.endDate ? new Date(selectedExperience.endDate).toLocaleDateString() : "Present"}
                </div>
              </div>
            </div>
            <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
              {selectedExperience.details && selectedExperience.details.length > 0 ? (
                <ul className="list-disc pl-6">
                  {selectedExperience.details.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              ) : (
                <span>{selectedExperience.summary}</span>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
} 
