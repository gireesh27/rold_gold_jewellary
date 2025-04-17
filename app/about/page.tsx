"use client"
import { motion } from "framer-motion"
import { Heart, Shield, Award, Gem, Users, Sparkles } from "lucide-react"
import Image from "next/image"
import PageTransition from "../components/PageTransition"
import "../styles/about.css"

const AboutPage = () => {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  // Company values data
  const companyValues = [
    {
      title: "Quality Craftsmanship",
      description: "Every piece is meticulously crafted by skilled artisans with decades of experience.",
      icon: Gem,
    },
    {
      title: "Ethical Sourcing",
      description: "We ensure all our materials are ethically sourced and conflict-free.",
      icon: Shield,
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We stand behind every piece we create.",
      icon: Heart,
    },
    {
      title: "Award-Winning Designs",
      description: "Our designs have been recognized internationally for their innovation and beauty.",
      icon: Award,
    },
    {
      title: "Community Support",
      description: "We give back to the communities where our materials are sourced.",
      icon: Users,
    },
    {
      title: "Innovation",
      description: "We constantly push the boundaries of jewelry design and craftsmanship.",
      icon: Sparkles,
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-12">Our Story</h1>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-between mb-16"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <div className="md:w-1/2 mb-8 md:mb-0 hero-image">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Rold Gold Jewellery Craftsmanship"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-semibold mb-4 text-blue-600">Crafting Excellence Since 1990</h2>
              <p className="text-lg mb-4">
                Rold Gold Jewellery began as a small family workshop with a passion for creating beautiful, high-quality
                jewelry pieces. Over the decades, we've grown into a respected name in the industry, but our commitment
                to craftsmanship and quality has never wavered.
              </p>
              <p className="text-lg">
                Each piece in our collection tells a story - of tradition, of innovation, of artistry. We believe that
                jewelry is more than an accessory; it's an expression of personality, a marker of significant moments,
                and a legacy to be passed down through generations.
              </p>
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg value-card"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
              >
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-16 text-center" variants={fadeIn} initial="initial" animate="animate">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">Our Mission</h2>
            <p className="text-lg max-w-3xl mx-auto">
              To create exquisite jewelry that celebrates life's special moments, crafted with integrity, passion, and
              respect for both our customers and the environment.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default AboutPage

