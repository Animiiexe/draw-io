"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Palette, 
  Users, 
  Smartphone, 
  Image as ImageIcon, 
  Eraser, 
  Shield, 
  Menu, 
  X, 
  Play,
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Intuitive Drawing Tools",
      description: "Professional-grade brush, eraser, color picker, and size adjustments for precise creative control."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-Time Collaboration",
      description: "Draw together with unlimited team members from anywhere in the world, instantly."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Seamless experience across desktop, tablet, and mobile devices with touch optimization."
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Custom Colors & Brushes",
      description: "Choose from 256 colors or create custom palettes with adjustable brush sizes and opacity."
    },
    {
      icon: <Eraser className="w-8 h-8" />,
      title: "Smart Canvas Management",
      description: "Layer support, undo/redo, canvas resizing, and one-click clear functionality."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "End-to-end encryption ensures your creative work stays private and secure."
    }
  ];

  const benefits = [
    "Unlimited canvas size",
    "Real-time synchronization",
    "No installation required",
    "Free forever plan",
    "Export to multiple formats",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Draw.io
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Pricing
            </Link>
            <Link 
              href="/draw" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Drawing
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-6 space-y-4">
              <Link href="#features" className="block py-2 hover:text-indigo-600 transition-colors font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="block py-2 hover:text-indigo-600 transition-colors font-medium">
                How It Works
              </Link>
              <Link href="#pricing" className="block py-2 hover:text-indigo-600 transition-colors font-medium">
                Pricing
              </Link>
              <Link 
                href="/draw" 
                className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-center font-semibold"
              >
                Start Drawing
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-indigo-200 dark:border-indigo-800">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 50,000+ creators worldwide
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Create Together
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Draw Without Limits
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The most intuitive collaborative drawing platform. Create, sketch, and brainstorm with your team in real-time, from anywhere in the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                href="/app" 
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group border-2 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-1">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 text-center">
                      <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                      <span className="text-sm text-red-700 dark:text-red-300">Brush</span>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                      <span className="text-sm text-blue-700 dark:text-blue-300">Pencil</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <span className="text-sm text-green-700 dark:text-green-300">Marker</span>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4 text-center">
                      <Eraser className="w-8 h-8 text-purple-700 dark:text-purple-300 mx-auto mb-2" />
                      <span className="text-sm text-purple-700 dark:text-purple-300">Eraser</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-teal-200/20 dark:from-indigo-800/20 dark:via-purple-800/20 dark:to-teal-800/20"></div>
                    <div className="relative flex items-center justify-center h-32">
                      <span className="text-2xl md:text-3xl font-bold text-gray-400 dark:text-gray-600">
                        Interactive Canvas Preview
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">13 users online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to Create
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional-grade tools designed for seamless collaboration and unlimited creativity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2"
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">How Draw.io Works</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in seconds with our intuitive three-step process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Launch Instantly",
                description: "No downloads, no accounts required. Start drawing immediately in your browser.",
                color: "from-red-500 to-pink-500"
              },
              {
                step: "2", 
                title: "Choose Your Style",
                description: "Select from our comprehensive toolkit of brushes, colors, and creative effects.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "3",
                title: "Collaborate & Create",
                description: "Share your canvas instantly and watch as others contribute in real-time.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-gradient-to-r ${item.color} w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  {item.step}
                </div>
                <h4 className="text-2xl font-semibold mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Draw.io?
              </h3>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Join thousands of creators who've made Draw.io their go-to creative platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Loved by Creators Worldwide</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our community has to say about their Draw.io experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Draw.io transformed how our remote team collaborates on design concepts. The real-time features are incredible!",
                name: "Alex Rodriguez",
                role: "UX Designer",
                company: "TechFlow Studios",
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
              },
              {
                quote: "Finally, a drawing app that works perfectly on all devices. My kids and I love creating together!",
                name: "Sarah Chen", 
                role: "Art Teacher",
                company: "Creative Learning Academy",
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
              },
              {
                quote: "The intuitive interface and powerful tools make Draw.io perfect for both quick sketches and detailed artwork.",
                name: "Marcus Thompson",
                role: "Freelance Illustrator", 
                company: "Independent Artist",
                avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to Create Something Amazing?
            </h3>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-indigo-100">
              Join over 50,000 creators who are already bringing their ideas to life with Draw.io.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/app" 
                className="group bg-white text-indigo-600 px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                Start Drawing Now
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="border-2 border-white/30 text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Draw.io</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The most intuitive collaborative drawing platform for creators worldwide.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Product</h5>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-indigo-400 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                <li><Link href="/gallery" className="hover:text-indigo-400 transition-colors">Gallery</Link></li>
                <li><Link href="/api" className="hover:text-indigo-400 transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Support</h5>
              <ul className="space-y-2">
                <li><Link href="/help" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
                <li><Link href="/community" className="hover:text-indigo-400 transition-colors">Community</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                <li><Link href="/status" className="hover:text-indigo-400 transition-colors">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2025 Draw.io. All rights reserved. Made with ❤️ for creators everywhere.</p>
            <p className="text-sm text-gray-500 mt-2">Powered by Socket.IO for real-time collaboration</p>
          </div>
        </div>
      </footer>
    </div>
  );
}