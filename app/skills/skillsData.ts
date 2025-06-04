export type Skill = {
  name: string
  icon: string // relative path to icon
  description: string
}

export type SkillCategory = {
  category: string
  skills: Skill[]
}

const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      {
        name: "Python",
        icon: "python.ico",
        description: "Versatile programming language used for web, automation, and AI tasks.",
      },
      {
        name: "Java",
        icon: "java.ico",
        description: "Object-oriented language for building reliable, platform-independent applications.",
      },
      {
        name: "C++",
        icon: "cpp.ico",
        description: "High-performance language ideal for systems programming and competitive coding.",
      },
      {
        name: "MATLAB",
        icon: "matlab.ico",
        description: "Specialized language for numerical computing and simulations.",
      },
    ],
  },
  {
    category: "Web & App Development",
    skills: [
      {
        name: "HTML5",
        icon: "html.ico",
        description: "Markup standard for building modern and semantic web pages.",
      },
      {
        name: "CSS3",
        icon: "css.ico",
        description: "Stylesheet language used for visually styling HTML documents.",
      },
      {
        name: "JavaScript",
        icon: "javascript.ico",
        description: "Dynamic language for creating interactive web applications.",
      },
      {
        name: "React.js",
        icon: "react.ico",
        description: "Library for building modular, fast, and responsive UIs.",
      },
      {
        name: "Node.js",
        icon: "node.ico",
        description: "Backend runtime for scalable network applications.",
      },
      {
        name: "Express.js",
        icon: "express.png",
        description: "Minimalist backend framework for Node.js applications.",
      },
      {
        name: "PyQt",
        icon: "python.ico",
        description: "GUI toolkit for Python desktop applications.",
      },
    ],
  },
  {
    category: "Databases",
    skills: [
      {
        name: "MySQL",
        icon: "mysql.ico",
        description: "Relational database system for structured data.",
      },
      {
        name: "MongoDB",
        icon: "mongodb.ico",
        description: "NoSQL database used for handling unstructured data.",
      },
      {
        name: "Oracle Database",
        icon: "oracle.ico",
        description: "Enterprise-grade RDBMS for mission-critical workloads.",
      },
      {
        name: "SQLite",
        icon: "sqlite.ico",
        description: "Lightweight database embedded in apps and devices.",
      },
    ],
  },
  {
    category: "Dev Tools",
    skills: [
      {
        name: "Git",
        icon: "git.ico",
        description: "Version control system to manage and collaborate on code.",
      },
      {
        name: "GitHub",
        icon: "github.ico",
        description: "Cloud-based platform to host and review code.",
      },
      {
        name: "Docker",
        icon: "docker.ico",
        description: "Tool for containerizing and deploying applications efficiently.",
      },
    ],
  },
  {
    category: "AI / Machine Learning",
    skills: [
      {
        name: "Scikit-learn",
        icon: "sklearn.png",
        description: "Library for building and evaluating machine learning models.",
      },
      {
        name: "TensorFlow",
        icon: "tensorflow.ico",
        description: "End-to-end platform for training and deploying ML models.",
      },
      {
        name: "PyTorch",
        icon: "pytorch.ico",
        description: "Flexible deep learning framework for research and production.",
      },
      {
        name: "OpenCV",
        icon: "opencv.ico",
        description: "Library for real-time image processing and computer vision.",
      },
      {
        name: "LangChain",
        icon: "langchain.svg",
        description: "Framework for building LLM apps with context and chaining.",
      },
      {
        name: "NLP",
        icon: "nlp.png",
        description: "Field focused on understanding and generating human language.",
      },
    ],
  },
  {
    category: "Data Analysis & Visualization",
    skills: [
      {
        name: "NumPy",
        icon: "numpy.ico",
        description: "Core package for numerical operations in Python.",
      },
      {
        name: "Pandas",
        icon: "pandas.png",
        description: "Library for data manipulation and preprocessing.",
      },
      {
        name: "Matplotlib",
        icon: "matplotlib.svg",
        description: "Visualization library for line plots, histograms, and more.",
      },
      {
        name: "Seaborn",
        icon: "seaborn.svg",
        description: "High-level plotting library built on Matplotlib.",
      },
    ],
  },
]

export default skillsData
