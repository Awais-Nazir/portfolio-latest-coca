// skillsData.ts
export type Skill = {
  name: string
  icon: string
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
        icon: "🐍",
        description: "Versatile programming language used for web, automation, and AI tasks.",
      },
      {
        name: "Java",
        icon: "☕",
        description: "Object-oriented language for building reliable, platform-independent applications.",
      },
      {
        name: "C++",
        icon: "🧠",
        description: "High-performance language ideal for systems programming and competitive coding.",
      },
      {
        name: "MATLAB",
        icon: "📐",
        description: "Specialized language for numerical computing and simulations.",
      },
    ],
  },
  {
    category: "Web & App Development",
    skills: [
      {
        name: "HTML5",
        icon: "🟥",
        description: "Markup standard for building modern and semantic web pages.",
      },
      {
        name: "CSS3",
        icon: "🎨",
        description: "Stylesheet language used for visually styling HTML documents.",
      },
      {
        name: "JavaScript",
        icon: "⚡",
        description: "Dynamic language for creating interactive web applications.",
      },
      {
        name: "React.js",
        icon: "⚛️",
        description: "Library for building modular, fast, and responsive UIs.",
      },
      {
        name: "Node.js",
        icon: "🟩",
        description: "Backend runtime for scalable network applications.",
      },
      {
        name: "Express.js",
        icon: "🚂",
        description: "Minimalist backend framework for Node.js applications.",
      },
      {
        name: "PyQt",
        icon: "🖥️",
        description: "GUI toolkit for Python desktop applications.",
      },
    ],
  },
  {
    category: "Databases",
    skills: [
      {
        name: "MySQL",
        icon: "🗃️",
        description: "Relational database system for structured data.",
      },
      {
        name: "MongoDB",
        icon: "🍃",
        description: "NoSQL database used for handling unstructured data.",
      },
      {
        name: "Oracle Database",
        icon: "🏛️",
        description: "Enterprise-grade RDBMS for mission-critical workloads.",
      },
      {
        name: "SQLite",
        icon: "📦",
        description: "Lightweight database embedded in apps and devices.",
      },
    ],
  },
  {
    category: "Dev Tools",
    skills: [
      {
        name: "Git",
        icon: "🔧",
        description: "Version control system to manage and collaborate on code.",
      },
      {
        name: "GitHub",
        icon: "🐙",
        description: "Cloud-based platform to host and review code.",
      },
      {
        name: "Docker",
        icon: "🐳",
        description: "Tool for containerizing and deploying applications efficiently.",
      },
    ],
  },
  {
    category: "AI / Machine Learning",
    skills: [
      {
        name: "Scikit-learn",
        icon: "🧪",
        description: "Library for building and evaluating machine learning models.",
      },
      {
        name: "TensorFlow",
        icon: "🟠",
        description: "End-to-end platform for training and deploying ML models.",
      },
      {
        name: "PyTorch",
        icon: "🔥",
        description: "Flexible deep learning framework for research and production.",
      },
      {
        name: "OpenCV",
        icon: "📸",
        description: "Library for real-time image processing and computer vision.",
      },
      {
        name: "LangChain",
        icon: "🧠",
        description: "Framework for building LLM apps with context and chaining.",
      },
      {
        name: "NLP",
        icon: "🗣️",
        description: "Field focused on understanding and generating human language.",
      },
    ],
  },
  {
    category: "Data Analysis & Visualization",
    skills: [
      {
        name: "NumPy",
        icon: "🔢",
        description: "Core package for numerical operations in Python.",
      },
      {
        name: "Pandas",
        icon: "🐼",
        description: "Library for data manipulation and preprocessing.",
      },
      {
        name: "Matplotlib",
        icon: "📊",
        description: "Visualization library for line plots, histograms, and more.",
      },
      {
        name: "Seaborn",
        icon: "🌊",
        description: "High-level plotting library built on Matplotlib.",
      },
    ],
  },
]

export default skillsData
