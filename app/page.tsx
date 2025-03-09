"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CheckCircle, Star, Users, BarChart3, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TestimonialCard } from "@/components/testimonial-card"
import { BlogCard } from "@/components/blog-card"
import { GalleryPreview } from "@/components/gallery-preview"
import HeroSection from "@/components/hero"
import { AnimatedBackground } from "@/components/animated-background"

// Animasi untuk fade-in
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Animasi untuk staggered children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// Animasi untuk card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
}

// Animasi untuk feature item
const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

// Komponen Section dengan animasi
const AnimatedSection = ({
  children,
  className,
  id,
}: { children: React.ReactNode; className?: string; id?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`section-padding ${className}`}
    >
      {children}
    </motion.section>
  )
}

// Animated decorative shapes component
const DecorativeShapes = () => {
  return (
    <>
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 z-0"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-purple-500/5 z-0"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full border border-primary/20 z-0"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full border border-purple-500/20 z-0"
        animate={{
          y: [0, 30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </>
  )
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Stats data
  const stats = [
    { icon: Users, value: "500+", label: "Klien Puas" },
    { icon: Star, value: "98%", label: "Tingkat Kepuasan" },
    { icon: BarChart3, value: "10+", label: "Tahun Pengalaman" },
    { icon: Zap, value: "24/7", label: "Dukungan Teknis" },
  ]

  return (
    <AnimatePresence>
      {!isLoaded ? (
        <motion.div
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
            }}
            className="relative"
          >
            <div className="h-16 w-16 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              CMP
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Background */}
          <AnimatedBackground />

          {/* Hero Section with Slideshow */}
          <HeroSection />

          {/* Stats Section */}
          <div className="relative py-12 bg-gradient-to-r from-primary/5 to-purple-500/5 pt-24 md:pt-28">
            <div className="container px-4 md:px-6 mx-auto">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, staggerChildren: 0.1 }}
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="p-3 bg-primary/10 rounded-full mb-3">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Tentang Kami Section */}
          <AnimatedSection id="tentang-kami" className="w-full bg-muted/50 relative">
            <DecorativeShapes />
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                variants={fadeInUp}
              >
                <div className="space-y-2">
                  <motion.h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" variants={fadeInUp}>
                    Tentang Kami
                  </motion.h2>
                  <motion.p
                    className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    variants={fadeInUp}
                  >
                    Kami adalah tim profesional yang berdedikasi untuk memberikan solusi terbaik bagi bisnis Anda.
                    Dengan pengalaman lebih dari 10 tahun, kami telah membantu ratusan perusahaan mencapai tujuan
                    mereka.
                  </motion.p>
                </div>
              </motion.div>

              <div className="mt-16">
                <motion.h3 className="text-2xl font-bold tracking-tighter text-center mb-8" variants={fadeInUp}>
                  Mengapa Memilih Kami
                </motion.h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div
                    className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    variants={featureVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-primary/10 rounded-full mb-4"
                    >
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h4 className="text-xl font-semibold mb-2">Kualitas Terjamin</h4>
                    <p className="text-muted-foreground">Kami menjamin kualitas layanan terbaik untuk setiap klien.</p>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    variants={featureVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="p-3 bg-primary/10 rounded-full mb-4"
                    >
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h4 className="text-xl font-semibold mb-2">Harga Kompetitif</h4>
                    <p className="text-muted-foreground">
                      Harga yang bersaing dengan kualitas yang tidak mengecewakan.
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    variants={featureVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="p-3 bg-primary/10 rounded-full mb-4"
                    >
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h4 className="text-xl font-semibold mb-2">Dukungan 24/7</h4>
                    <p className="text-muted-foreground">Tim dukungan kami siap membantu Anda kapan saja.</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Galeri Preview Section */}
          <AnimatedSection id="galeri" className="w-full relative">
            <DecorativeShapes />
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                variants={fadeInUp}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Galeri</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Lihat beberapa hasil karya dan proyek terbaik kami.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mt-8"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <GalleryPreview />
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link href="/galeri">
                    <Button variant="outline" className="group">
                      Lihat Semua Galeri
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Blog Preview Section */}
          <AnimatedSection id="blog" className="w-full bg-muted/50 relative">
            <DecorativeShapes />
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                variants={fadeInUp}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Artikel terbaru dan wawasan dari tim kami.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={cardVariants} whileHover="hover">
                  <BlogCard
                    title="Cara Meningkatkan Produktivitas Bisnis"
                    excerpt="Pelajari cara meningkatkan produktivitas bisnis Anda dengan tips dan trik dari para ahli."
                    date="12 Mei 2023"
                    slug="cara-meningkatkan-produktivitas-bisnis"
                    image="/placeholder.svg?height=200&width=400"
                  />
                </motion.div>
                <motion.div variants={cardVariants} whileHover="hover">
                  <BlogCard
                    title="Strategi Marketing Digital 2023"
                    excerpt="Temukan strategi marketing digital terbaru yang efektif untuk bisnis Anda di tahun 2023."
                    date="5 Juni 2023"
                    slug="strategi-marketing-digital-2023"
                    image="/placeholder.svg?height=200&width=400"
                  />
                </motion.div>
                <motion.div variants={cardVariants} whileHover="hover">
                  <BlogCard
                    title="Pentingnya Analisis Data untuk Bisnis"
                    excerpt="Mengapa analisis data sangat penting untuk pertumbuhan dan pengembangan bisnis Anda."
                    date="20 Juli 2023"
                    slug="pentingnya-analisis-data-untuk-bisnis"
                    image="/placeholder.svg?height=200&width=400"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="/blog">
                  <Button variant="outline" className="group">
                    Lihat Semua Artikel
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Testimonial Section */}
          <AnimatedSection id="testimoni" className="w-full relative">
            <DecorativeShapes />
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                variants={fadeInUp}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Testimoni</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Apa kata klien kami tentang layanan yang kami berikan.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={cardVariants} whileHover="hover">
                  <TestimonialCard
                    name="Budi Santoso"
                    company="PT Maju Jaya"
                    testimonial="Layanan yang sangat memuaskan. Tim sangat profesional dan responsif terhadap kebutuhan kami."
                    rating={5}
                    image="/placeholder.svg?height=100&width=100"
                  />
                </motion.div>
                <motion.div variants={cardVariants} whileHover="hover">
                  <TestimonialCard
                    name="Siti Rahayu"
                    company="CV Berkah Abadi"
                    testimonial="Kami sangat puas dengan hasil kerja tim. Mereka memahami kebutuhan bisnis kami dengan baik."
                    rating={4}
                    image="/placeholder.svg?height=100&width=100"
                  />
                </motion.div>
                <motion.div variants={cardVariants} whileHover="hover">
                  <TestimonialCard
                    name="Dian Permata"
                    company="PT Sukses Mandiri"
                    testimonial="Solusi yang diberikan sangat membantu meningkatkan efisiensi operasional perusahaan kami."
                    rating={5}
                    image="/placeholder.svg?height=100&width=100"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="/testimoni">
                  <Button variant="outline" className="mr-4">
                    Lihat Semua Testimoni
                  </Button>
                </Link>
                <Link href="/testimoni/tambah">
                  <Button className="relative overflow-hidden group">
                    <span className="relative z-10">Tambah Testimoni</span>
                    <span className="absolute inset-0 bg-primary-foreground/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection id="kontak" className="w-full bg-muted/50 relative">
            <DecorativeShapes />
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                variants={fadeInUp}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Kontak Kami</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Hubungi kami untuk informasi lebih lanjut atau konsultasi gratis.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div
                  variants={cardVariants}
                  className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-4">Informasi Kontak</h3>
                  <div className="space-y-4">
                    <motion.p
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="font-semibold mr-2">Alamat:</span> Jl. Contoh No. 123, Jakarta Pusat
                    </motion.p>
                    <motion.p
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="font-semibold mr-2">Email:</span> info@example.com
                    </motion.p>
                    <motion.p
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="font-semibold mr-2">Telepon:</span> +62 123 4567 890
                    </motion.p>
                    <motion.p
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <span className="font-semibold mr-2">Jam Kerja:</span> Senin - Jumat, 09:00 - 17:00
                    </motion.p>
                  </div>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-4">Lokasi Kami</h3>
                  <motion.div
                    className="w-full h-[300px] bg-muted rounded-md flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                    <p className="text-muted-foreground relative z-10">Peta akan ditampilkan di sini</p>
                    <motion.div
                      className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xs font-medium">Klik untuk memperbesar</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-12 bg-background p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-6 text-center">Kirim Pesan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                    <motion.input
                      type="text"
                      className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <motion.input
                      type="email"
                      className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Subjek</label>
                    <motion.input
                      type="text"
                      className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Pesan</label>
                    <motion.textarea
                      rows={5}
                      className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    ></motion.textarea>
                  </div>
                  <div className="md:col-span-2 flex justify-center">
                    <motion.button
                      className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Kirim Pesan
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

