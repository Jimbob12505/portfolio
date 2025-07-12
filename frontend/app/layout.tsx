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
    url: "https://yourdomain.com",
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
      <body className={`${inter.className} ${junicode.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 