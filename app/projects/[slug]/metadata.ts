import type { Metadata } from "next"

// Placeholder data - replace with actual data later
const projects = [
  {
    id: 1,
    title: "Sign Language Translation",
    description: "A machine learning model that translates sign language gestures into text in real-time.",
    slug: "sign-language-translation",
  },
  {
    id: 2,
    title: "RozirotiPk",
    description: "A platform connecting job seekers with employers in Pakistan.",
    slug: "roziroti-pk",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description for Project 3.",
    slug: "project-3",
  },
]

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Awais Nazir`,
    description: project.description,
  }
}
