import React, { useState, useEffect } from 'react';
import { Layout, Code, Image, Award, Mail, ArrowRight, ExternalLink, Twitter, Linkedin, Instagram } from 'lucide-react';
import { portfolioData } from '../mock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../hooks/use-toast';

const CozyPortfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  const iconMap = {
    layout: Layout,
    code: Code,
    image: Image,
    award: Award,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    dribbble: ExternalLink,
    figma: ExternalLink
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.observe-fade');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!"
    });
    
    setFormData({ name: '', email: '', description: '' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="cozy-portfolio">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {portfolioData.personal.name}
          </div>
          
          <div className="flex items-center gap-6">
            {portfolioData.personal.availableForWork && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="uppercase tracking-wider font-medium">Available for work</span>
              </div>
            )}
            <Button 
              onClick={scrollToContact}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full duration-300"
            >
              Book a call
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 observe-fade">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span className="text-cyan-600 uppercase tracking-wider font-semibold">Available for work</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                {portfolioData.personal.tagline}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {portfolioData.personal.experience}
              </p>
              
              <Button 
                onClick={scrollToContact}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-full duration-300 hover:scale-105"
              >
                Contact Us
              </Button>
            </div>

            <div className="relative observe-fade" style={{ animationDelay: '200ms' }}>
              <div 
                className="relative z-10"
                style={{ 
                  transform: `translateY(${scrollY * -0.1}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src={portfolioData.personal.image}
                  alt={portfolioData.personal.name}
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 bg-cyan-500">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-white text-2xl md:text-3xl font-medium text-center mb-12 observe-fade">
            {portfolioData.personal.mission}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-12 observe-fade" style={{ animationDelay: '200ms' }}>
            {portfolioData.clientLogos.map((client, index) => (
              <div key={index} className="grayscale hover:grayscale-0 duration-300 opacity-70 hover:opacity-100">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-gray-900 text-center mb-16 observe-fade">
            How Can I Assist You?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioData.services.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <Card 
                  key={service.id}
                  className="group p-8 hover:shadow-2xl duration-500 hover:-translate-y-2 cursor-pointer border-2 hover:border-cyan-500 observe-fade"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:scale-110 duration-300">
                    <IconComponent className="w-8 h-8 text-cyan-500 group-hover:text-white duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12 observe-fade">
            <h2 className="text-5xl font-bold text-gray-900">Selected work</h2>
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-gray-900 font-semibold"
              onClick={() => toast({ title: "Coming Soon", description: "Full portfolio view coming soon!" })}
            >
              See All <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Featured Project */}
          <div className="mb-12 observe-fade" style={{ animationDelay: '100ms' }}>
            <div 
              className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer h-96"
              onClick={() => toast({ title: portfolioData.featuredProject.title, description: portfolioData.featuredProject.client })}
            >
              <img
                src={portfolioData.featuredProject.image}
                alt={portfolioData.featuredProject.title}
                className="w-full h-full object-cover duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex gap-3 mb-4">
                    {portfolioData.featuredProject.categories.map((cat, idx) => (
                      <span key={idx} className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {cat}
                      </span>
                    ))}
                    <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {portfolioData.featuredProject.year}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{portfolioData.featuredProject.client}</h3>
                  <p className="text-lg text-white/90">{portfolioData.featuredProject.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.portfolio.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer h-80 observe-fade"
                style={{ animationDelay: `${200 + index * 100}ms` }}
                onClick={() => toast({ title: project.title, description: project.client })}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.categories.map((cat, idx) => (
                        <span key={idx} className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                          {cat}
                        </span>
                      ))}
                      <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{project.client}</h3>
                    <p className="text-sm text-white/90">{project.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 observe-fade">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Wanna see my experience?
            </h2>
            <Button 
              onClick={scrollToContact}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg rounded-full duration-300 hover:scale-105"
            >
              Book a call
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {portfolioData.experience.map((exp, index) => (
              <Card 
                key={exp.id}
                className="p-8 hover:shadow-2xl duration-500 hover:-translate-y-2 border-2 hover:border-cyan-500 observe-fade"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48';
                    }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-3">{exp.position}</p>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-white text-center mb-4 observe-fade">
            Contact with me to sizzle your project
          </h2>
          <p className="text-white/90 text-center mb-12 text-lg observe-fade" style={{ animationDelay: '100ms' }}>
            Let's create something amazing together
          </p>

          <Card className="p-8 shadow-2xl backdrop-blur-sm bg-white/95 observe-fade" style={{ animationDelay: '200ms' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-50 border-gray-200 focus:border-cyan-500 py-6 text-lg"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border-gray-200 focus:border-cyan-500 py-6 text-lg"
                  required
                />
              </div>
              <div>
                <Textarea
                  name="description"
                  placeholder="Work Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="bg-gray-50 border-gray-200 focus:border-cyan-500 resize-none text-lg"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-semibold rounded-full duration-300 hover:scale-105"
              >
                Submit
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 observe-fade">
            <h3 className="text-3xl font-bold mb-4">Let's connect and chat</h3>
            <a 
              href={`mailto:${portfolioData.personal.email}`}
              className="text-2xl text-cyan-400 hover:text-cyan-300 duration-300 font-semibold"
            >
              {portfolioData.personal.email}
            </a>
          </div>

          <div className="flex justify-center gap-6 mb-8 observe-fade" style={{ animationDelay: '100ms' }}>
            {portfolioData.socialLinks.map((social, index) => {
              const IconComponent = iconMap[social.icon];
              return (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-cyan-500 flex items-center justify-center duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <div className="text-center text-gray-400 text-sm">
            © 2025 {portfolioData.personal.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CozyPortfolio;
