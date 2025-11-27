import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Palette, Mail, Phone, MapPin, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../mock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../hooks/use-toast';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    team: 0,
    awards: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const iconMap = {
    monitor: Monitor,
    smartphone: Smartphone,
    palette: Palette
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'services', 'experience', 'portfolio', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'stats') {
          animateStats();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    const statsElement = document.getElementById('stats');
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        projects: Math.floor(portfolioData.stats.projectsCompleted * progress),
        clients: Math.floor(portfolioData.stats.happyClients * progress),
        team: Math.floor(portfolioData.stats.teamMembers * progress),
        awards: Math.floor(portfolioData.stats.awardsWon * progress)
      });

      if (step >= steps) clearInterval(interval);
    }, increment);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1
    );
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!"
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="logo-text text-3xl font-dancing text-teal-dark">
            {portfolioData.personal.name.split(' ')[0]}
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Works', 'Notes', 'Experience'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-gray-700 hover:text-teal-dark duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">{portfolioData.personal.phone}</span>
            <Phone className="w-4 h-4 text-teal-dark" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-mustard relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-dark rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-coral rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className="space-y-6"
              style={{ 
                transform: `translateY(${scrollY * 0.1}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                Hey There,<br />
                I'm <span className="text-teal-dark">{portfolioData.personal.name.split(' ')[0]}</span>
              </h1>
              
              <p className="text-gray-600 font-medium">{portfolioData.personal.email}</p>
              
              <div className="pt-8">
                <div className="inline-block">
                  <div className="text-5xl font-bold text-teal-dark mb-2">
                    {portfolioData.personal.yearsExperience}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    Years<br />Experience
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div 
                className="relative z-10"
                style={{ 
                  transform: `translateY(${scrollY * -0.05}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                {/* Brush stroke background */}
                <div className="absolute inset-0 -left-12 -right-12 -top-12 -bottom-12">
                  <svg viewBox="0 0 500 600" className="w-full h-full">
                    <path
                      d="M100,50 Q150,20 200,40 L400,80 Q450,90 460,140 L480,400 Q470,450 420,460 L200,520 Q150,530 120,490 L80,200 Q70,150 100,50"
                      fill="#2C5F5D"
                      opacity="0.9"
                      transform="rotate(-5 250 300)"
                    />
                  </svg>
                </div>

                <img
                  src={portfolioData.personal.image}
                  alt={portfolioData.personal.name}
                  className="relative z-20 w-full max-w-md mx-auto rounded-lg shadow-2xl"
                />
              </div>

              <div className="absolute bottom-8 right-8 bg-cream p-6 rounded-lg shadow-xl z-30">
                <div className="w-16 h-16 bg-teal-dark rounded-full flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-mustard fill-mustard" />
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">IDF Certified</div>
                <div className="text-sm font-semibold text-gray-900">Professional<br />UI/UX Designer</div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-xl text-gray-700 max-w-xl mx-auto">
              {portfolioData.personal.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">What do I help?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I will help you with finding a solution and solve your problems. We use process design to create digital products. Besides that also help their business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {portfolioData.services.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <Card 
                  key={service.id}
                  className="group p-8 hover:shadow-2xl duration-500 hover:-translate-y-2 cursor-pointer border-none bg-white"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-teal-dark/10 flex items-center justify-center mb-6 group-hover:bg-teal-dark group-hover:scale-110 duration-300">
                    <IconComponent className="w-8 h-8 text-teal-dark group-hover:text-white duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{service.projectCount} Projects</p>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Stats */}
          <div id="stats" className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl p-12 shadow-lg">
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-dark mb-2">{stats.projects}+</div>
              <div className="text-sm text-gray-600">Project Completed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-dark mb-2">{stats.clients}+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-dark mb-2">{stats.team}+</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-dark mb-2">{stats.awards}+</div>
              <div className="text-sm text-gray-600">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gradient-to-b from-cream to-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-gray-900 mb-16 text-center">My Work Experience</h2>
          
          <div className="space-y-8">
            {portfolioData.workExperience.map((experience, index) => (
              <div 
                key={experience.id}
                className="flex gap-6 group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 duration-300"
                    style={{ backgroundColor: experience.color }}
                  >
                    {index + 1}
                  </div>
                  {index < portfolioData.workExperience.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  )}
                </div>
                
                <Card className="flex-1 p-6 hover:shadow-xl duration-300 border-l-4 border-transparent hover:border-teal-dark">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{experience.position}</h3>
                      <p className="text-sm text-gray-500 mt-1">{experience.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{experience.period}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{experience.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900">My Latest Works</h2>
            <Button 
              variant="ghost" 
              className="text-coral hover:text-coral/80"
              onClick={() => toast({ title: "Coming Soon", description: "Full portfolio view coming soon!" })}
            >
              Explore more Works <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-600 mb-12">Perfect solution for digital experience</p>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData.portfolio.map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onClick={() => toast({ title: project.title, description: project.subtitle })}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5]">
                  <div 
                    className="absolute inset-0 duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-90 duration-500 flex items-end p-8"
                    style={{ backgroundColor: project.color }}
                  >
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-white/90">{project.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-gray-900 mb-4 text-center">People talk about us</h2>
          <p className="text-gray-600 text-center mb-16">
            Let's talk from one is something real the story worked tell me. The purpose of submitting an application are quite easy.
          </p>

          <div className="relative">
            <Card className="p-12 shadow-2xl">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={portfolioData.testimonials[currentTestimonial].avatar}
                  alt={portfolioData.testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {portfolioData.testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {portfolioData.testimonials[currentTestimonial].position}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-mustard fill-mustard" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                "{portfolioData.testimonials[currentTestimonial].feedback}"
              </p>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-teal-dark text-white rounded-full flex items-center justify-center hover:bg-teal-dark/80 duration-300 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-teal-dark text-white rounded-full flex items-center justify-center hover:bg-teal-dark/80 duration-300 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {portfolioData.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full duration-300 ${
                  index === currentTestimonial ? 'bg-teal-dark w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-mustard/30 to-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Let's make something<br />
                <span className="text-teal-dark">amazing together.</span>
              </h2>
              <p className="text-gray-700 mb-8">
                Start by <span className="text-coral font-semibold">saying hi</span>
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-dark rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-semibold text-gray-900">{portfolioData.personal.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-dark rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-semibold text-gray-900">{portfolioData.personal.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-dark rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-semibold text-gray-900">Brisbane, Australia</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 focus:border-teal-dark"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 focus:border-teal-dark"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 focus:border-teal-dark"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-gray-50 border-gray-200 focus:border-teal-dark resize-none"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-teal-dark hover:bg-teal-dark/90 text-white py-6 text-lg font-semibold duration-300 hover:shadow-xl"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="logo-text text-3xl font-dancing mb-4 md:mb-0">
              {portfolioData.personal.name.split(' ')[0]}
            </div>
            <div className="text-sm text-gray-400">
              © 2025. All rights reserved by {portfolioData.personal.name}
            </div>
          </div>
        </div>
      </footer>

      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
