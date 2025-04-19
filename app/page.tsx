"use client"
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Server,
  Terminal,
  FileText,
  Menu,
  Award,
} from "lucide-react"
import Link from "next/link"

// Social and contact links - Update these with your information
const socialLinks = {
  github: "https://github.com/vishwaksenan",
  linkedin: "https://linkedin.com/in/vishwaksenan",
  resume: "https://drive.google.com/file/d/1F3tCdRF0kw_RROdFeisKX94bt9QDjRIz/view?usp=sharing", // Place your resume in the public folder
  email: "mailto:vishwaksenang@gmail.com",
}

// Helper function for scrolling to sections
const scrollToSection = (sectionId: string) => {
  // Wait a moment to ensure DOM is ready
  setTimeout(() => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      const headerOffset = 80 // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    } else {
      console.log(`Element not found: ${sectionId}`)
    }
  }, 100)
}

// Helper function to scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Helper function to calculate duration
const calculateDuration = (startDate: Date, endDate: Date | null): string => {
  const end = endDate || new Date()
  const diffInMonths = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth())

  const years = Math.floor(diffInMonths / 12)
  const months = diffInMonths % 12

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""}`
  } else if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`
  } else {
    return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}`
  }
}

// Animated Lines Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Line properties
    const lines: {
      x: number
      y: number
      length: number
      opacity: number
      width: number
      speed: number
      angle: number
    }[] = []

    // Create lines
    const createLines = () => {
      const lineCount = Math.floor(canvas.width / 10) // Increased density (was 100)

      for (let i = 0; i < lineCount; i++) {
        lines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 200 + 100, // Longer lines (was 150 + 50)
          opacity: Math.random() * 0.25 + 0.1, // Increased opacity (was 0.15 + 0.05)
          width: Math.random() * 1.5 + 0.5, // Increased width (was 1 + 0.1)
          speed: Math.random() * 0.8 + 0.2, // Increased speed (was 0.5 + 0.1)
          angle: Math.random() * 2 * Math.PI,
        })
      }
    }

    createLines()

    // Add some static background lines
    const staticLineCount = 15
    for (let i = 0; i < staticLineCount; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 300 + 200,
        opacity: Math.random() * 0.1 + 0.05, // Lower opacity for background
        width: Math.random() * 0.8 + 0.2,
        speed: 0, // Static lines don't move
        angle: Math.random() * 2 * Math.PI,
      })
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        const endX = line.x + Math.cos(line.angle) * line.length
        const endY = line.y + Math.sin(line.angle) * line.length
        ctx.lineTo(endX, endY)

        ctx.strokeStyle = `rgba(102, 255, 153, ${line.opacity})`
        ctx.lineWidth = line.width
        ctx.stroke()

        // Move the line
        line.x += Math.cos(line.angle) * line.speed
        line.y += Math.sin(line.angle) * line.speed

        // If line goes off screen, reset it
        if (
          line.x < -line.length ||
          line.x > canvas.width + line.length ||
          line.y < -line.length ||
          line.y > canvas.height + line.length
        ) {
          line.x = Math.random() * canvas.width
          line.y = Math.random() * canvas.height
          line.angle = Math.random() * 2 * Math.PI
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />
}

const MobileNav = ({ links }: { links: { href: string; label: string }[] }) => {
  const [open, setOpen] = useState(false)

  const handleClick = (href: string) => {
    // First close the mobile menu
    setOpen(false)

    // Wait for the sheet to close before scrolling
    setTimeout(() => {
      if (href === "#top") {
        scrollToTop()
      } else {
        const targetId = href.replace("#", "")
        const element = document.getElementById(targetId)
        if (element) {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }
    }, 400) // Increased delay to ensure the sheet has time to close
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <button
            className="block px-2 py-3 text-lg text-left hover:bg-gray-800 rounded-md transition-colors"
            onClick={() => handleClick("#top")}
          >
            Home
          </button>
          {links.map((link) => (
            <button
              key={link.href}
              className="block px-2 py-3 text-lg text-left hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => handleClick(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// Custom Skills Tab Component
const SkillsTabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-2 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab("languages")}
          className={`py-2 px-3 rounded-md text-sm transition-colors ${activeTab === "languages" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
        >
          Languages
        </button>
        <button
          onClick={() => setActiveTab("frameworks")}
          className={`py-2 px-3 rounded-md text-sm transition-colors ${activeTab === "frameworks" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
        >
          Technologies
        </button>
        <button
          onClick={() => setActiveTab("databases")}
          className={`py-2 px-3 rounded-md text-sm transition-colors ${activeTab === "databases" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
        >
          Databases
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`py-2 px-3 rounded-md text-sm transition-colors ${activeTab === "tools" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
        >
          Tools
        </button>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeSkillsTab, setActiveSkillsTab] = useState("languages")
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  // For Mail
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 850)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Store references to all sections
  useEffect(() => {
    sectionsRef.current = {
      top: document.getElementById("top"),
      experience: document.getElementById("experience"),
      education: document.getElementById("education"),
      skills: document.getElementById("skills"),
      certifications: document.getElementById("certifications"),
      projects: document.getElementById("projects"),
      contact: document.getElementById("contact"),
    }
  }, [])

  const navLinks = [
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#certifications", label: "Certifications" },
    { href: "#projects", label: "Projects" },
  ]

  // Experience data with dates and durations
  const experiences = [
    // {
    //   title: "Lead Backend Engineer",
    //   company: "Tech Innovations Inc.",
    //   location: "San Francisco, CA",
    //   startDate: new Date(2022, 5), // June 2022
    //   endDate: null, // Present
    //   isPromotion: true, // for making this role as a promotion within same company
    //   responsibilities: [
    //     "Lead a team of 8 engineers in developing scalable backend systems",
    //     "Architect and implement cloud-native solutions using AWS and Kubernetes",
    //     "Establish technical standards and best practices for the engineering department",
    //     "Mentor junior engineers and conduct technical interviews for new hires",
    //   ],
    // },
    {
      title: "Platform Engineer",
      company: "Lloyds Banking Group",
      location: "London, UK",
      startDate: new Date(2023, 7), // August 2023
      endDate: null, // Present
      isPromotion: false,
      responsibilities: [
        "Created self-service code deployment system (CI-CD), reducing deployment time by 90% using helm template, GCP cloud build and istio authentication and authorization mechanisms.",
        "Deployed bank's custom security services to make the VM instance 100% complaint by creating a custom linux's systemd service.",
        "Resolved a critical vulnerability in the platform within 24 hours for the platform to be 100% FCA complaint by updating the user’s access level and implementing new security groups in Terraform.",
        "Deploying GCP's external OAuth connection to Bank's on-prem active directory expose the application only for certain authorization levels."
      ],
    },
    {
      title: "Backend Engineer",
      company: "Beakbook Ltd",
      location: "London, UK",
      startDate: new Date(2022, 7), // August 2022
      endDate: new Date(2023, 7), // August 2023
      isPromotion: false,
      responsibilities: [
        "Worked on a start up venture in modern agicultural technology collaborating with small scale farmers and large enterprises like Avara foods.",
        "Desgined and Developer PostgreSQL schema to accept IOT data stream (AWS Kinesis) and improved the optimization by 60% using Normalization Techniques.",
        "Developed and Deployed the company's anomaly detection model which generated 50% of company's revenue.",
        "Sandbox and production environment isolation achieved using Github Actions and Terraform Cloud to try their new algorithm without affecting users. This cut R&D time by 45% for the company.",
      ],
    },
    {
      title: "ML Engineer Intern",
      company: "Telescope Analytics",
      location: "London, UK",
      startDate: new Date(2022, 6), // June 2022
      endDate: new Date(2022, 7), // July 2022
      isPromotion: false,
      responsibilities: [
        "Worked as a Machine Learning Engineer to develop recommendation systems to find sales prospects using Tensorflow and PyTorch.",
        "Successfully deployed 9 tracking event alert alert from frontend (React) and the backend (Python).",
        "Worked on Data Preprocessing pipelines (Kubeflow) for the recommendation systems."
      ],
    },
  ]

  // Certification data with links
  const certifications = [
    // {
    //   title: "AWS Certified Solutions Architect",
    //   organization: "Amazon Web Services",
    //   description: "Expertise in designing distributed systems on AWS infrastructure.",
    //   year: "2022",
    //   link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    // },
    // {
    //   title: "Google Cloud Professional Engineer",
    //   organization: "Google Cloud Platform",
    //   description: "Proficiency in designing, developing, and managing GCP solutions.",
    //   year: "2021",
    //   link: "https://cloud.google.com/certification/cloud-engineer",
    // },
    {
      title: "Certified Kubernetes Administrator",
      organization: "Cloud Native Computing Foundation",
      description: "Advanced knowledge and hands on experience in deploying and managing Kubernetes clusters.",
      year: "2024",
      link: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/efe76dff-883c-4f85-82db-35555955b06f-vishwak-senan-ganesan-328b5c1d-87b5-4e7f-bb11-81346b693169-certificate.pdf",
    },
  ]

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return "Present"
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  // Skill data
  const skillsData = {
    languages: ["Python", "Golang", "C++", "Java"],
    frameworks: ["Istio", "gRPC", "Apache Kafka", "Prometheus"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "Cassandra"],
    tools: ["Docker", "Kubernetes", "AWS", "GCP", "Git", "Github Actions", "Terraform", "Ansible"],
  }

  // Skill icons
  const skillIcons = {
    languages: <Code className="h-6 w-6 mx-auto mb-2" />,
    frameworks: <Server className="h-6 w-6 mx-auto mb-2" />,
    databases: <Database className="h-6 w-6 mx-auto mb-2" />,
    tools: <Terminal className="h-6 w-6 mx-auto mb-2" />,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl cursor-pointer hover:opacity-80 transition-opacity" onClick={scrollToTop}>
            <span className="text-primary">Vishwak</span>
          </div>
          {isMobile ? (
            <MobileNav links={navLinks} />
          ) : (
            <nav className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex" onClick={() => scrollToSection("#contact")}>
              Contact Me
            </Button>
            <Link href={socialLinks.github} target="blank">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={socialLinks.linkedin} target="blank">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Hero Section with Animated Background */}
        <section
          id="top"
          className="relative py-24 md:py-40 flex flex-col items-center justify-center text-center overflow-hidden"
        >
          <AnimatedBackground />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Backend Software Engineer</h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-10 mx-auto">
              Specialized in all backend system from deploying application in cloud to building low latency trading application. If you think I am the right guy for you, hit me up.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="gap-2" onClick={() => scrollToSection("#contact")}>
                <Mail className="h-4 w-4" />
                Contact Me
              </Button>
              <Link href={socialLinks.github} target="blank">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View GitHub
                </Button>
              </Link>
              <Link href={socialLinks.resume} target="blank">
                <Button variant="secondary" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Download Resume
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
          <div className="space-y-12">
            {/* Group experiences by company */}
            {(() => {
              // Create a map of companies to their experiences
              const companiesMap = new Map()

              experiences.forEach((exp) => {
                if (!companiesMap.has(exp.company)) {
                  companiesMap.set(exp.company, [])
                }
                companiesMap.get(exp.company).push(exp)
              })

              // Sort experiences within each company by date (newest first)
              companiesMap.forEach((exps, company) => {
                exps.sort((a: any, b: any) => {
                  const dateA = a.endDate || new Date()
                  const dateB = b.endDate || new Date()
                  return dateB.getTime() - dateA.getTime()
                })
              })

              // Convert map to array for rendering
              return Array.from(companiesMap).map(([company, exps]) => (
                <div key={company} className="company-group">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white">{company}</h3>
                    <p className="text-gray-400 text-sm">{exps[0].location}</p>
                  </div>

                  <div className="pl-0 md:pl-6 border-l-0 md:border-l border-gray-700 space-y-6">
                    {exps.map((exp: any, index: any) => (
                      <div key={index} className="relative">
                        <Card className="bg-gray-900 border-gray-800">
                          <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                              <div>
                                <CardTitle>{exp.title}</CardTitle>
                                <span className="text-xs text-gray-400 mt-1">
                                  {calculateDuration(exp.startDate, exp.endDate)}
                                </span>
                              </div>
                              <Badge className="whitespace-nowrap text-sm self-start">
                                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                              {exp.responsibilities.map((resp: any, idx: any) => (
                                <li key={idx}>{resp}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            })()}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <CardTitle>M.Sc in Data Analytics</CardTitle>
                    <CardDescription>University of Warwick</CardDescription>
                  </div>
                  <Badge className="self-start">2021 - 2022</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Specialized in Machine Learning and Algorithmic Game Theory. Thesis on "Building mobile friendly Anime filter using Generative Adversarial Networks."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <CardTitle>B.Tech in Computer Science Engineering</CardTitle>
                    <CardDescription>Rajalakshmi Institute of Technology</CardDescription>
                  </div>
                  <Badge className="self-start">2016 - 2020</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Graduated with merit. Coursework included Data Structures, Algorithms, Database Systems, Networking and Web Development.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>

          {/* Custom Skills Tabs */}
          <SkillsTabs activeTab={activeSkillsTab} setActiveTab={setActiveSkillsTab} />

          {/* Skills Content */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skillsData[activeSkillsTab as keyof typeof skillsData].map((skill) => (
                <div key={skill} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                  {skillIcons[activeSkillsTab as keyof typeof skillIcons]}
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>
          <div
            className={`grid gap-6 ${certifications.length === 1 ? "md:grid-cols-1 max-w-md mx-auto" : certifications.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3"}`}
          >
            {certifications.map((cert, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 group hover:border-primary transition-colors">
                <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="group-hover:text-primary transition-colors">{cert.title}</CardTitle>
                      <Award className="h-5 w-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardDescription>{cert.organization}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{cert.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge>{cert.year}</Badge>
                      <span className="text-primary text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Certificate <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Project 1 */}
            <Link href="https://github.com/vishwaksenan/istio-mtls-gateway-deployment" target="blank">
              <Card className="bg-gray-900 border-gray-800 group hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="group-hover:text-primary transition-colors">Istio mTLS Gateway</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription>Helm chart to deploy a transient application behind a Istio secured gateway</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Istio gateway with cert manager's self signed certifcate for mTLS gateway and a k8s job to delete the helm chart after a timeout time.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Kubernetes</Badge>
                    <Badge variant="outline">Helm Chart</Badge>
                    <Badge variant="outline">Istio</Badge>
                    <Badge variant="outline">GCP</Badge>
                    <Badge variant="outline">mTLS</Badge>
                    <Badge variant="outline">Cleanup Job</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" href="https://github.com/vishwaksenan/istio-mtls-gateway-deployment" />
                    View Demo
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            {/* Project 2 */}
            <Link href="https://github.com/vishwaksenan/terraform-workspace-seperation" target="blank">
              <Card className="bg-gray-900 border-gray-800 group hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="group-hover:text-primary transition-colors">Terraform IOT/ML Infrastructure</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription>IaaC for AWS using Terraform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    High level goal is to run a seperate IOT and ML infrastructure for dev and prod in different regions using terraform workspace separation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Terraform</Badge>
                    <Badge variant="outline">AWS</Badge>
                    <Badge variant="outline">IOT</Badge>
                    <Badge variant="outline">Sage Maker</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" href="https://github.com/vishwaksenan/terraform-workspace-seperation" />
                    View Demo
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            {/* Project 3 */}
            <Link href="https://github.com/vishwaksenan/Battle_of_Time_Card_Detection" target="blank">
              <Card className="bg-gray-900 border-gray-800 group hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="group-hover:text-primary transition-colors">Battle of Time Card Detection</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription>Computer Vision ML Application</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    A Machine Learning pipeline to detect the Doctor Who card (A BBC Show) in a green background video file.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">OpenCV</Badge>
                    <Badge variant="outline">Tensorflow</Badge>
                    <Badge variant="outline">Scale Invariant Feature Transform (SIFT)</Badge>
                    <Badge variant="outline">Computer Vision</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" href="https://github.com/vishwaksenan/Battle_of_Time_Card_Detection" />
                    View Demo
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            {/* Project 4 */}
            <Link href="https://github.com/vishwaksenan/cfd_multiprocessing" target="blank">
              <Card className="bg-gray-900 border-gray-800 group hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="group-hover:text-primary transition-colors">Computational Fluid Dynamic Application</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription>C++ application made faster using MPI</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Computation Fluid Dynamics mini application (karman) which is made faster using Message Passing Interfacing (MPI) in C++.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">C++</Badge>
                    <Badge variant="outline">MPI</Badge>
                    <Badge variant="outline">Multi Processing</Badge>
                    <Badge variant="outline">1D Decomposition</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" href="https://github.com/vishwaksenan/cfd_multiprocessing" />
                    View Demo
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            {/* Project 5 */}
            <Link href="https://github.com/vishwaksenan/text-sentiment-annotator" target="blank">
              <Card className="bg-gray-900 border-gray-800 group hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="group-hover:text-primary transition-colors">Text Sentiment Annotator</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription>React application for ML annotations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    A web application tool to annotate sentiment of the text from the huge CSV file. Build using CRA and processes the CSV data file.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Annotation</Badge>
                    <Badge variant="outline">File I/O</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" href="https://github.com/vishwaksenan/text-sentiment-annotator" />
                    View Demo
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            {/* Project 6 */}
            <Link href="https://github.com/vishwaksenan/visual_tire_inspection" target="blank">
              <Card className="bg-gray-900 border-gray-800 group hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="group-hover:text-primary transition-colors">Visual Tire Inspector</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription>Computer Vision application to detect manufacturer's fault</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    A web application tool to annotate sentiment of the text from the huge CSV file. Build using CRA and processes the CSV data file.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Terraform</Badge>
                    <Badge variant="outline">AWS</Badge>
                    <Badge variant="outline">IOT</Badge>
                    <Badge variant="outline">Sage Maker</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" href="https://github.com/vishwaksenan/visual_tire_inspection" />
                    View Demo
                  </Button>
                </CardFooter>
              </Card>
            </Link>



            {/* Project 5 - This will be centered when it's the last in an odd-numbered collection
            <Card className="bg-gray-900 border-gray-800 md:col-span-2 md:max-w-2xl md:mx-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Cloud Infrastructure Automation</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription>Terraform, AWS, Python</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  A comprehensive infrastructure-as-code solution for automating cloud resource provisioning and
                  management across multiple environments.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Terraform</Badge>
                  <Badge variant="outline">AWS</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">CI/CD</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Demo
                </Button>
              </CardFooter>
            </Card> */}


          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="max-w-md mx-auto">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Contact Me</CardTitle>
                <CardDescription>Fill out the form below to get in touch with me.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="name">Subject</label>
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Email Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Link href={socialLinks.email} className="w-full">
                      <Button
                        className="w-full"
                        onClick={() => {
                          const mailtoUrl = `mailto:vishwaksenang@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
                          window.location.href = mailtoUrl;
                        }}
                      >
                        Send Message
                      </Button>
                    </Link>
                  </div>

                  {/* <Button className="w-full">Send Message</Button> */}
                  <Link href={socialLinks.email}>
                  </Link>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 bg-black">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400">© {new Date().getFullYear()} Vishwak Senan Ganesan. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href={socialLinks.github} target="blank">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={socialLinks.linkedin} target="blank">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={socialLinks.email}>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Mail className="h-5 w-5" />
              </Button>
            </Link>

          </div>
        </div>
      </footer>
    </div>
  )
}

