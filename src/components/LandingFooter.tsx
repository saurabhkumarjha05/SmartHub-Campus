import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Globe,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Heart
} from 'lucide-react';

interface LandingFooterProps {
  onNavigateToSection?: (sectionId: string) => void;
  onEnterWorkspace?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onNavigateToSection,
  onEnterWorkspace
}) => {
  const quickLinks = [
    { label: 'Dashboard', sectionId: 'dashboard' },
    { label: 'Academic Analytics', sectionId: 'analytics' },
    { label: 'Attendance', sectionId: 'attendance' },
    { label: 'Assignments', sectionId: 'assignments' },
    { label: 'Library', sectionId: 'library' },
    { label: 'Digital Canteen', sectionId: 'canteen' },
    { label: 'Campus Events', sectionId: 'events' },
    { label: 'AI Study Assistant', sectionId: 'ai-study' }
  ];

  const resourceLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Release Notes', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' }
  ];

  const techStack = [
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'Framer Motion',
    'Recharts',
    'Zustand',
    'Vite'
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
      color: 'hover:text-white hover:bg-slate-800 hover:border-slate-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      color: 'hover:text-blue-400 hover:bg-blue-950/60 hover:border-blue-700/60'
    },
    {
      name: 'Twitter (X)',
      icon: Twitter,
      href: 'https://twitter.com',
      color: 'hover:text-sky-400 hover:bg-sky-950/60 hover:border-sky-700/60'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:support@smartcampushub.in',
      color: 'hover:text-rose-400 hover:bg-rose-950/60 hover:border-rose-700/60'
    }
  ];

  const handleLinkClick = (e: React.MouseEvent, action?: () => void) => {
    e.preventDefault();
    if (action) {
      action();
    } else if (onEnterWorkspace) {
      onEnterWorkspace();
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full bg-[#0B1020] text-slate-100 font-sans border-t border-slate-800/80 relative overflow-hidden z-20"
      aria-label="Smart Campus Hub Footer"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#3525cd]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Multi-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand & Description */}
          <div className="space-y-5 text-center sm:text-left">
            {/* Logo Header */}
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3525cd] via-[#4648d4] to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-[#3525cd]/30 ring-1 ring-white/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-xl text-white tracking-tight leading-none flex items-center gap-1.5 justify-center sm:justify-start">
                  Smart Campus Hub
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 flex items-center gap-1 mt-1 justify-center sm:justify-start">
                  <Sparkles className="w-3 h-3" />
                  AI-Powered Platform
                </span>
              </div>
            </div>

            {/* Tagline & Description */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-300">
                AI-Powered Academic Excellence Platform
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Empowering Indian universities with a modern, intelligent, and unified campus management experience.
              </p>
            </div>

            {/* Contact Information */}
            <div className="pt-2 space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center justify-center sm:justify-start gap-2 group">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>IIT Delhi, New Delhi, India</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 group">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:support@smartcampushub.in"
                  className="hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
                >
                  support@smartcampushub.in
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 group">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="https://smartcampushub.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-300 transition-colors flex items-center gap-1 underline-offset-4 hover:underline"
                >
                  <span>smartcampushub.in</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-2 inline-block sm:block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.sectionId}`}
                    onClick={(e) => handleLinkClick(e, () => onNavigateToSection?.(link.sectionId))}
                    className="text-slate-300 hover:text-white transition-all flex items-center justify-center sm:justify-start gap-1.5 group py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-3 sm:inline-block hidden" />
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-2 inline-block sm:block">
              Resources
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {resourceLinks.map((resource) => (
                <li key={resource.label}>
                  <a
                    href={resource.href}
                    onClick={(e) => handleLinkClick(e)}
                    className="text-slate-300 hover:text-white transition-all flex items-center justify-center sm:justify-start gap-1.5 group py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded"
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {resource.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Technology & Socials */}
          <div className="space-y-5 text-center sm:text-left">
            {/* Tech Stack */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-2 inline-block sm:block">
                Technology
              </h4>
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-[11px] font-semibold hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-slate-800 transition-all shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Connect With Us
              </h4>
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md ${social.color} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-800/80" />

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between text-xs text-slate-400 gap-6 text-center lg:text-left font-medium">
          {/* Copyright */}
          <div>
            <p className="font-semibold text-slate-300">
              © 2026 Smart Campus Hub. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Secure Cloud-Native Architecture • ISO 27001 & SOC-2 Compliant Security Standard
            </p>
          </div>

          {/* Designer & Developer Credit */}
          <div className="bg-slate-900/80 border border-slate-800 px-5 py-3 rounded-2xl shadow-inner max-w-md">
            <p className="text-slate-300">
              Designed & Developed by{' '}
              <span className="font-extrabold text-white underline decoration-indigo-500/80 underline-offset-4 hover:text-indigo-300 transition-colors">
                Saurabh Kumar Jha
              </span>
            </p>
            <p className="text-[11px] text-indigo-400 font-bold mt-0.5">
              B.Tech Computer Science & Engineering • Indian Institute of Technology Delhi
            </p>
          </div>

          {/* Built With Love */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/50 px-3.5 py-2 rounded-full border border-slate-800/80">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>using React, TypeScript, Tailwind CSS & Framer Motion.</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
