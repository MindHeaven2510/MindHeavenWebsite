import "./output.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Heart,
  Brain,
  Book,
  MessageCircle,
  Bell,
  Shield,
  Leaf,
  Star,
  Download,
  Play,
  Users,
  Mail,
  Menu,
  X,
  CheckCircle,
  Trash,
  PlusCircle,
  AlertCircle,
  Send,
  Calendar,
  Droplets,
  Moon,
  Sun,
} from "lucide-react";

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Download", path: "/download" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/mindheaven logo.png"
              alt="Your App Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              MindHeaven
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-700 hover:text-emerald-600 transition-colors font-medium ${
                  location.pathname === item.path ? "text-emerald-600" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg mt-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Floating CTA Component
const FloatingCTA = () => (
  <Link
    to="/download"
    className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 z-40"
  >
    <Download className="w-5 h-5" />
    <span className="font-medium">Download Now</span>
  </Link>
);

// Home Page
const HomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    { icon: Heart, name: "Mood Tracker", color: "text-pink-500" },
    { icon: Book, name: "Journal", color: "text-purple-500" },
    { icon: MessageCircle, name: "AI Chatbot", color: "text-blue-500" },
    { icon: Bell, name: "Reminders", color: "text-green-500" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Leaf className="w-5 h-5 text-emerald-500" />
              <span className="text-emerald-700 font-medium">
                Your Personal Emotional Companion
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                MindHeaven
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A safe space where you can track emotions, express thoughts,
              receive uplifting care, and connect with an emotionally
              intelligent companion — all in a calming, playful interface that
              grows with you 🌱
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/how-it-works"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Play className="w-6 h-6" />
              <span>Watch How It Works</span>
            </Link>
            <Link
              to="/download"
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-emerald-200 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Download className="w-6 h-6" />
              <span>Download Now</span>
            </Link>
          </div>

          {/* Feature Teaser */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className={`p-6 rounded-2xl bg-white/60 backdrop-blur-sm border-2 transition-all duration-500 ${
                    currentFeature === index
                      ? "border-emerald-300 shadow-lg scale-105"
                      : "border-emerald-100 hover:border-emerald-200"
                  }`}
                >
                  <Icon className={`w-8 h-8 ${feature.color} mx-auto mb-4`} />
                  <h3 className="font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start your journey toward inner peace
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands who have found comfort, support, and growth with
            MindHeaven. Your emotional well-being deserves the best care.
          </p>
          <Link
            to="/download"
            className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Download className="w-6 h-6" />
            <span>Get Started Today</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Features Page
const FeaturesPage = () => {
  const features = [
    {
      icon: Heart,
      title: "Mood Tracker",
      description:
        "Track daily feelings using a clean, emoji-based UI with color-coded reflections and emotional insights.",
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: Book,
      title: "Journal with Stickers",
      description:
        'Write freely, attach photos, decorate with mental health-themed stickers, and tag your entries with moods like "Grateful", "Anxious", or "In Love".',
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: MessageCircle,
      title: "AI-Powered Chatbot",
      description:
        "An emotionally supportive chatbot you can talk to anytime — it listens, responds empathetically, and uplifts you.",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Bell,
      title: "Daily Caring Notifications",
      description:
        'Wake up or wind down with gentle reminders like "Hydrate", "Breathe", or "You did your best today 💛".',
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Shield,
      title: "Emergency Depression Aid Mode",
      description:
        "A quick-access mode offering motivational messages, breathing tools, and immediate mood boosters during emotionally tough moments.",
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Leaf,
      title: "Self-Care Habit Tracker",
      description:
        "Track habits like sleep, water intake, walking tracker, meditation — all tied to how you're feeling.",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Makes MindHeaven{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Unique
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features designed to support your emotional
            well-being and personal growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`${feature.bgColor} p-8 rounded-3xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/how-it-works"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Play className="w-6 h-6" />
            <span>See How It Works</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// How It Works Page
const HowItWorksPage = () => {
  const steps = [
    {
      step: 1,
      title: "Track Your Mood",
      description:
        "Start your day by logging how you feel using our intuitive emoji-based mood tracker.",
      icon: Heart,
      color: "from-pink-400 to-rose-500",
    },
    {
      step: 2,
      title: "Write in Your Journal",
      description:
        "Express your thoughts freely, add photos, and decorate with mental health-themed stickers.",
      icon: Book,
      color: "from-purple-400 to-indigo-500",
    },
    {
      step: 3,
      title: "Chat for Support",
      description:
        "Connect with our AI companion whenever you need emotional support or just want to talk.",
      icon: MessageCircle,
      color: "from-blue-400 to-cyan-500",
    },
    {
      step: 4,
      title: "Receive Gentle Care",
      description:
        "Get personalized notifications and reminders to take care of yourself throughout the day.",
      icon: Bell,
      color: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How MindHeaven{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Simple steps to start your journey toward better emotional
            well-being.
          </p>
        </div>

        {/* Video Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-4 mb-16 border border-white/50 max-w-5xl mx-auto">
          <div className="aspect-video max-w-4xl mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden relative">
            <video
              className="w-full h-full object-cover rounded-2xl"
              controls
              poster="/thumbnail.png"
            >
              <source
                src="/Your safe space for mental peace..mp4"
                type="video/mp4"
              />
              {/* Fallback for browsers that don't support video */}
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-600">
                  Your browser doesn't support video playback.
                </p>
              </div>
            </video>
          </div>

          {/* Optional: Video description */}
          <div className="text-center mt-4">
            <p className="text-gray-600"></p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.step}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12`}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}
                    >
                      {step.step}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {step.description}
                  </p>
                </div>

                <div className="flex-1">
                  <div
                    className={`bg-gradient-to-br ${step.color} p-8 rounded-3xl text-center text-white`}
                  >
                    <Icon className="w-16 h-16 mx-auto mb-4" />
                    <div className="text-lg font-medium">Step {step.step}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/download"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Download className="w-6 h-6" />
            <span>Start Your Journey</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Download Page
const DownloadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Download{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              MindHeaven
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with your personal emotional companion today. Available
            for Android devices.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/50">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to transform your emotional well-being?
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <span className="text-gray-700">
                    Free to download and use
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <span className="text-gray-700">
                    No registration required
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <span className="text-gray-700">Privacy-focused design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <span className="text-gray-700">
                    Regular updates and improvements
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Download className="w-6 h-6" />
                  <span>Download APK (Android)</span>
                </button>

                <button className="w-full bg-gray-200 text-gray-500 px-8 py-4 rounded-full font-semibold text-lg cursor-not-allowed flex items-center justify-center space-x-2">
                  <Download className="w-6 h-6" />
                  <span>iOS Coming Soon</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-2xl">
              <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl mx-auto flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-xs mb-1">QR Code</div>
                    <div className="text-xs">Scan to Download</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Scan with your phone to download directly
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            System Requirements
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Android</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Android 5.0 (API level 21) or higher</li>
                <li>• 100 MB free storage space</li>
                <li>• Internet connection for AI features</li>
                <li>• Camera access (optional, for journal photos)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                What Users Love
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• "Simple and calming interface"</li>
                <li>• "The AI really understands me"</li>
                <li>• "Perfect for daily check-ins"</li>
                <li>• "Helps me stay mindful"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//testimonials page
const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState([
    { label: "Moods Tracked", value: "25,000+", icon: Heart },
    { label: "Journal Entries", value: "12,500+", icon: Book },
    { label: "AI Conversations", value: "8,200+", icon: MessageCircle },
    { label: "Daily Reminders Sent", value: "45,000+", icon: Bell },
  ]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);

  // Load testimonials from Firebase on component mount
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);

      // Create a query to get testimonials ordered by creation date (newest first)
      const testimonialsQuery = query(
        collection(db, "testimonials"),
        orderBy("createdAt", "desc")
      );

      const testimonialsSnapshot = await getDocs(testimonialsQuery);
      const testimonialsData = testimonialsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTestimonials(testimonialsData);
    } catch (error) {
      console.error("Error loading testimonials:", error);

      // If there's an error (like no data exists yet), show empty array
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = async () => {
    // Validate form
    if (
      !newTestimonial.name.trim() ||
      !newTestimonial.role.trim() ||
      !newTestimonial.content.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);

      const testimonialData = {
        name: newTestimonial.name.trim(),
        role: newTestimonial.role.trim(),
        content: newTestimonial.content.trim(),
        rating: newTestimonial.rating,
        avatar: newTestimonial.name.charAt(0).toUpperCase(),
        createdAt: serverTimestamp(), // Firebase server timestamp
      };

      // Add to Firebase
      const docRef = await addDoc(
        collection(db, "testimonials"),
        testimonialData
      );

      // Add to local state with the new ID
      const newTestimonialWithId = {
        id: docRef.id,
        ...testimonialData,
        createdAt: new Date(), // For immediate display
      };

      setTestimonials((prev) => [newTestimonialWithId, ...prev]);

      // Reset form
      setNewTestimonial({ name: "", role: "", content: "", rating: 5 });
      setShowAddForm(false);

      alert("Testimonial added successfully!");
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("Error adding testimonial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-20"
      style={{ paddingTop: "120px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Users{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Say
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real stories from people who have found comfort, support, and growth
            with MindHeaven.
          </p>

          {/* Admin Controls */}
          <div className="mb-8">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-800 transition-colors inline-flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={submitting}
              style={{ backgroundColor: "#14532d", color: "white" }}
            >
              <PlusCircle className="w-6 h-6" />
              <span>Add New Testimonial</span>
            </button>
          </div>
        </div>

        {/* Add Testimonial Form */}
        {showAddForm && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 mb-16 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Add New Testimonial
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newTestimonial.name}
                  onChange={(e) =>
                    setNewTestimonial((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter full name"
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={newTestimonial.role}
                  onChange={(e) =>
                    setNewTestimonial((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="e.g., Student, Professional, etc."
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Testimonial
                </label>
                <textarea
                  value={newTestimonial.content}
                  onChange={(e) =>
                    setNewTestimonial((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent h-32 transition-all resize-none"
                  placeholder="Share your experience with MindHeaven..."
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Rating
                </label>
                <select
                  value={newTestimonial.rating}
                  onChange={(e) =>
                    setNewTestimonial((prev) => ({
                      ...prev,
                      rating: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  disabled={submitting}
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num !== 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={addTestimonial}
                  className="flex-1 text-white py-3 rounded-xl font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={submitting}
                  style={{ backgroundColor: "#047857" }}
                  onMouseEnter={(e) =>
                    !submitting && (e.target.style.backgroundColor = "#065f46")
                  }
                  onMouseLeave={(e) =>
                    !submitting && (e.target.style.backgroundColor = "#047857")
                  }
                >
                  {submitting ? "Adding..." : "Add Testimonial"}
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/50 hover:bg-white/70 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Icon className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <MessageCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No testimonials yet
            </h3>
            <p className="text-gray-500">
              Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/70 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star
                      key={i + testimonial.rating}
                      className="w-5 h-5 text-gray-300"
                    />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic text-base">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
              Thousands of users have already started their journey to better
              emotional well-being. Your story could be next.
            </p>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2">
              <Download className="w-6 h-6" />
              <span>Start Your Journey</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              MindHeaven
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our mission to make emotional well-being accessible,
            creative, and personal for everyone.
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                MindHeaven was born from a simple but powerful belief: emotional
                health deserves creativity, too. In today's fast-paced world,
                mental health often takes a back seat, and we wanted to change
                that.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We envisioned an app that would be as comforting and personal as
                using your favorite app, where emotional care is easy,
                accessible, and genuinely supportive. Whether you're feeling
                low, overwhelmed, or just need a gentle check-in, MindHeaven is
                designed to be your pocket-sized friend who listens,
                understands, and reminds you to breathe.
              </p>
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-2xl">
                <p className="text-emerald-800 font-medium italic text-lg">
                  "We believe emotional health deserves creativity, too."
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center p-4">
                  <img
                    src="/mindheaven logo.png"
                    alt="Your App Logo"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Behind the Scenes
                </h3>
                <p className="text-gray-600">
                  A passionate team dedicated to creating meaningful technology
                  that genuinely cares for your emotional well-being.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Compassionate Care
            </h3>
            <p className="text-gray-600">
              Every feature is designed with empathy and understanding, ensuring
              you feel supported and never judged.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Inclusive Design
            </h3>
            <p className="text-gray-600">
              Built for everyone - students, creatives, professionals, and
              anyone who wants to care for their inner self.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Growth-Focused
            </h3>
            <p className="text-gray-600">
              We believe in personal growth and provide tools that evolve with
              you on your emotional wellness journey.
            </p>
          </div>
        </div>

        {/* Who It's For */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">
            Who MindHeaven is For
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Students</h4>
              <p className="text-emerald-100 text-sm">
                Overwhelmed with stress and need emotional support
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Long-distance Lovers</h4>
              <p className="text-emerald-100 text-sm">
                Feeling low and needing emotional connection
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Creatives</h4>
              <p className="text-emerald-100 text-sm">
                Needing an emotional outlet and creative expression
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Everyone</h4>
              <p className="text-emerald-100 text-sm">
                Who wants to care for their inner self in a private, kind space
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-emerald-100 text-lg font-medium">
              No diagnoses, no judgments. Just support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ isSubmitting: true, isSuccess: false, error: null });

    try {
      // Basic form validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("Please fill in all fields");
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Since Firebase isn't available in this environment, we'll simulate the submission
      // Replace this section with your actual Firebase code in your project:
      const docRef = await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: 'new'
      });

      // Simulate API delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form data ready for submission:", formData);
      
      setSubmitStatus({ isSubmitting: false, isSuccess: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(prev => ({ ...prev, isSuccess: false }));
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({ 
        isSubmitting: false, 
        isSuccess: false, 
        error: error.message || "Failed to send message. Please try again." 
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to
            hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 relative">
            {/* Success Message Overlay */}
            {submitStatus.isSuccess && (
              <div className="absolute inset-0 bg-emerald-50/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-emerald-700 mb-2">Message Sent!</h3>
                  <p className="text-emerald-600">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a message
            </h2>
            
            {/* Error Message */}
            {submitStatus.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-red-700">{submitStatus.error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={submitStatus.isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={submitStatus.isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  disabled={submitStatus.isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors bg-white/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitStatus.isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center"
              >
                {submitStatus.isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">We'll respond within 24 hours</p>
                </div>
              </div>
              <a
                href="mailto:mindheaven2510@gmail.com"
                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                mindheaven2510@gmail.com
              </a>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="/features"
                  className="block text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  → Explore Features
                </a>
                <a
                  href="/download"
                  className="block text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  → Download App
                </a>
                <a
                  href="/privacy"
                  className="block text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  → Privacy Policy
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">
                We'd Love Your Feedback
              </h3>
              <p className="text-emerald-100 mb-6">
                Your thoughts and suggestions help us make MindHeaven better for
                everyone. Whether it's a feature request, bug report, or just
                sharing your experience, every message matters to us.
              </p>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-pink-200" />
                <span className="text-emerald-100">
                  Made with love for your well-being
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Privacy Policy Page
const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy and emotional well-being are our top priorities. Here's
            how we protect your data.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 space-y-8">
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-2xl">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Privacy First
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              MindHeaven is designed with privacy at its core. We believe your
              emotional journey is personal, and we're committed to keeping it
              safe and secure.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Data We Collect
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Mood Data:</strong> Your daily mood entries and
                  emotional reflections
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Journal Entries:</strong> Your personal writings and
                  attached media
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Habit Tracking:</strong> Self-care activities and
                  wellness habits
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>App Usage:</strong> How you interact with features
                  (anonymized)
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              How We Protect Your Data
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Local Storage:</strong> Most data is stored locally on
                  your device
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Encryption:</strong> All data is encrypted both in
                  transit and at rest
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>No Selling:</strong> We never sell your personal data
                  to third parties
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Minimal Collection:</strong> We only collect what's
                  necessary for app functionality
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Your Rights
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have complete control over your data:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Access:</strong> View all data we have about you
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Delete:</strong> Remove your data at any time
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Export:</strong> Download your data in a readable
                  format
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Opt-out:</strong> Disable data collection features
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              AI and Chatbot Data
            </h3>
            <p className="text-gray-700 leading-relaxed">
              When you interact with our AI chatbot, conversations are processed
              to provide emotional support. These interactions are anonymized
              and never linked to your personal identity. We use this data
              solely to improve the chatbot's ability to provide helpful,
              empathetic responses.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Contact Us About Privacy
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about how we handle your data or want to
              exercise your privacy rights, please don't hesitate to reach out.
            </p>
            <a
              href="mailto:mindheavenapp@gmail.com"
              className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              mindheavenapp@gmail.com
            </a>
          </div>

          <div className="text-center text-gray-600 text-sm">
            <p>Last updated: January 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/mindheaven logo.png"
                alt="Your App Logo"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-2xl font-bold">MindHeaven</span>
            </div>
            <p className="text-emerald-100 leading-relaxed">
              Your personal emotional companion for better mental well-being.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                to="/features"
                className="block text-emerald-100 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                to="/how-it-works"
                className="block text-emerald-100 hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/download"
                className="block text-emerald-100 hover:text-white transition-colors"
              >
                Download
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <div className="space-y-2">
              <Link
                to="/contact"
                className="block text-emerald-100 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/privacy"
                className="block text-emerald-100 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <a
                href="mailto:mindheavenapp@gmail.com"
                className="block text-emerald-100 hover:text-white transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <div className="space-y-2">
              <Link
                to="/testimonials"
                className="block text-emerald-100 hover:text-white transition-colors"
              >
                User Stories
              </Link>
              <Link
                to="/about"
                className="block text-emerald-100 hover:text-white transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-400 mt-8 pt-8 text-center">
          <p className="text-emerald-100">
            © 2025 MindHeaven. Made with 💚 for your emotional well-being.
          </p>
          <p>Built with ❤️ by Lokesh Yadav & Tanushree</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
        <FloatingCTA />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
