import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

const junicode = localFont({
  src: [
    {
      path: '../public/fonts/Junicode.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Junicode-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-junicode',
})

export const metadata: Metadata = {
  title: "Vatsal Labh – Portfolio",
  description: "Portfolio of Vatsal Labh: Software Engineer, Data Scientist, and AI/ML Practitioner.",
  openGraph: {
    title: "Vatsal Labh – Portfolio",
    description: "Portfolio of Vatsal Labh: Software Engineer, Data Scientist, and AI/ML Practitioner.",
    url: "https://vatsal.online",
    siteName: "Vatsal Labh Portfolio",
    images: [
      {
        url: "/images/profile-picture.png",
        width: 800,
        height: 600,
        alt: "Vatsal Labh",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vatsal Labh – Portfolio",
    description: "Portfolio of Vatsal Labh: Software Engineer, Data Scientist, and AI/ML Practitioner.",
    images: ["/images/profile-picture.png"],
  },
  keywords: [
    "Vatsal Labh",
    "Vatsal Labh Portfolio",
    "Vatsal Labh Resume",
    "Software Engineer",
    "Full Stack Developer",
    "Front End Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "AI Engineer",
    "AI ML Developer",
    "Artificial Intelligence",
    "Deep Learning",
    "Graph Neural Networks",
    "Computer Vision",
    "Natural Language Processing",
    "NLP Engineer",
    "MLOps",
    "Cloud Engineer",
    "AWS Developer",
    "Docker Kubernetes",
    "PyTorch",
    "TensorFlow",
    "Python Developer",
    "Java Developer",
    "C++ Developer",
    "SQL",
    "NoSQL",
    "MongoDB",
    "Neo4j",
    "Big Data",
    "Spark",
    "PySpark",
    "Data Pipelines",
    "Time Series Forecasting",
    "Anomaly Detection",
    "Fraud Detection",
    "Risk Analytics",
    "Financial Data Science",
    "FinTech",
    "Distributed Systems",
    "Graph Databases",
    "Cloud Computing",
    "AWS Lambda",
    "Kinesis",
    "EC2",
    "S3",
    "Secure Authentication",
    "Web Development",
    "Modern Web Apps",
    "MERN Stack",
    "Node.js Developer",
    "Express.js",
    "FastAPI",
    "Open Source Developer",
    "University at Buffalo",
    "B.Sc. Computer Science",
    "Dean's List",
    "Honors College",
    "Class of 2025",
    "US Based Developer",
    "GitHub Developer",
    "GitLab Developer",
    "Technical Projects",
    "Professional Portfolio",
    "Hire Software Engineer",
    "Hire Data Scientist",
    "Hire AI ML Engineer",
    "Remote Developer"
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Vatsal Labh",
              "url": "https:/vatsal.online",
              "image": "https://vatsal.online/images/profile-picture.png",
              "sameAs": [
                "https://www.linkedin.com/in/vatsallabh",
                "https://github.com/Jimbob12505"
              ],
              "jobTitle": "Software Engineer, Data Scientist, AI/ML Practitioner",
              "worksFor": {
                "@type": "Organization",
                "name": "Princeton University"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University at Buffalo"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${junicode.variable}`}>
        <ThemeProvider>
          <div className="sr-only">
            <h1>Vatsal Labh – Software Engineer, Data Scientist, AI/ML Practitioner</h1>
            <p>
              Hi I'm Vatsal Labh, a software engineer, data scientist, and AI/ML practitioner. I'm currently a student at University at Buffalo, pursuing a B.Sc. in Computer Science. I'm interested in software development, data science, and AI/ML. I'm also interested in cloud computing, distributed systems, and graph databases.
            </p>
            <p>
            Designed a graph-based fraud detection engine using PySpark GraphFrames and Neo4j, modeling user, device, and IP relationships to identify anomalous behavior across large transaction networks. Achieved 92% precision with a Gradient Boosting classifier on graph-derived features and scaled deep learning pipelines using PyTorch DDP.
            </p>
            <p>
            Led end-to-end development of a Learning Management System by integrating React with Moodle APIs, deploying a cloud-based backend with Node.js and MongoDB, and ensuring scalability with Nginx and AWS EC2.
            </p>
            <p>
            Built a modular LSTM and TFT-based time series forecasting pipeline for financial data prediction using TensorFlow and MLflow. Included monitoring with EvidentlyAI and automated retraining with Airflow and Docker, improving forecasting accuracy by 15% over baseline ARIMA models.
            </p>
            <p>
            Led the development of an AI-powered anomaly detection platform for hydroponic agriculture, designing predictive models to identify abnormal plant physiology. Built a full-stack cloud pipeline on AWS with MongoDB for telemetry, and developed a real-time dashboard in React and Node.js for monitoring and alert visualization.
            </p>
            <p>
            Designed an automated grading system using C (Criterion) and Java (JUnit) for object-oriented and systems-level assignments. Also developed and mentored students through a capstone project to build a complete RPG game in Java, integrating OOP principles, file I/O, and design patterns with modern software engineering best practices.
            </p>
            <p>
            Developed Coriolis-lite, a lightweight C++ metagenomic classifier optimized for mobile ARM-based platforms like NVIDIA Jetson and Oxford Nanopore MinION. Achieved high throughput and significant index compression for efficient field-ready DNA analysis.
            </p>
            <p> Vatsal Labh Portfolio Website Software Engineer, Data Scientist, AI/ML Practitioner</p>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 