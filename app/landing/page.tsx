"use client";
import { supabase } from '../lib/SupabaseCilent';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, GitFork, Eye, Clock, Heart, Shield, Zap, Database, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="border-border bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-lg">
    <CardContent className="p-6">
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#3ECF8E]/10 text-[#3ECF8E]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

interface TechStackItemProps {
  name: string;
  icon: React.ReactNode;
}

const TechStackItem: React.FC<TechStackItemProps> = ({ name, icon }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
    {icon}
    <span className="text-sm font-medium text-foreground">{name}</span>
  </div>
);

const LandingPage: React.FC = () => {
  const [searchTopic, setSearchTopic] = useState('');
  const [minStars, setMinStars] = useState('');
  const router = useRouter();
  const handleLogin = async () => {
     router.push('/Login'); 
    };

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Advanced Search Filters',
      description: 'Search GitHub repositories by topics, stars, and open issues with dynamic filters tailored to your interests.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Favorites Management',
      description: 'Mark repositories as favorites and maintain a personalized list for quick access to your most important projects.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Search History',
      description: 'Keep track of all your previous searches for easy reference and save time on repeated queries.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Authentication',
      description: 'User authentication powered by Supabase ensures your data is safe and your experience is personalized.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Updates',
      description: 'Get the latest updated public repositories matching your criteria with live data from GitHub API.',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Scalable Backend',
      description: 'Built with Next.js and Supabase for fast, secure, and scalable performance at any scale.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
           
            <span className="text-xl font-bold text-foreground">RadiantDev</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#tech-stack" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tech Stack
            </a>
            <a href="/open-source" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              New Hero
            </a>
            <a href="/etheral-shadow-demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Ethereal Demo
            </a>
            <a href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Search
            </a>
            <a href="/api-test" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              API Test
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-foreground" 
            onClick={handleLogin}
            >
              Log In
            </Button>
           
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3ECF8E]/5 via-background to-background" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20 hover:bg-[#3ECF8E]/20">
              Powered by Supabase & GitHub API
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Discover, Search, and Manage Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ECF8E] to-[#1a8f5f]">
                Favourite Open Source Projects
              </span>{' '}
              Effortlessly
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              A powerful platform for developers and open-source enthusiasts to explore GitHub repositories with advanced filters, save favorites, and track search history.
            </p>

            {/* Search Preview */}
            <div className="max-w-3xl mx-auto mb-8">
              <Card className="border-border bg-card shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          placeholder="Search by topic (e.g., react, machine-learning)"
                          className="pl-10 bg-background border-border"
                          value={searchTopic}
                          onChange={(e) => setSearchTopic(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Min stars"
                          className="pl-9 w-32 bg-background border-border"
                          value={minStars}
                          onChange={(e) => setMinStars(e.target.value)}
                        />
                      </div>
                      <Button className="bg-[#3ECF8E] hover:bg-[#2db377] text-white">
                        Search
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                      <Star className="w-3 h-3 mr-1" /> Stars: 1000+
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                      <GitFork className="w-3 h-3 mr-1" /> Active Issues
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                      <Clock className="w-3 h-3 mr-1" /> Recently Updated
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#3ECF8E] hover:bg-[#2db377] text-white text-lg px-8">
                Start Searching Now
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground text-lg px-8">
                View Demo
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground text-lg px-8" asChild>
                <a href="/open-source">New Hero Demo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Powerful Features for Developers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover and manage open-source projects efficiently
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full text-[#3ECF8E] flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account with secure Supabase authentication in seconds
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Search & Filter</h3>
              <p className="text-muted-foreground">
                Use advanced filters to find repositories that match your interests
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Save & Manage</h3>
              <p className="text-muted-foreground">
                Mark favorites and access your personalized dashboard anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Your Personalized Dashboard
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Keep all your favorite repositories and search history in one place. Access them anytime, anywhere.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3ECF8E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Heart className="w-4 h-4 text-[#3ECF8E]" />
                    </div>
                    <span className="text-foreground">Save unlimited favorite repositories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3ECF8E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#3ECF8E]" />
                    </div>
                    <span className="text-foreground">Track all your previous searches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3ECF8E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Eye className="w-4 h-4 text-[#3ECF8E]" />
                    </div>
                    <span className="text-foreground">Quick access to meaningful repos</span>
                  </li>
                </ul>
              </div>
              <div>
                <Card className="border-border bg-card shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Favorite Repositories</h3>
                      <Badge className="bg-[#3ECF8E]/10 text-[#3ECF8E]">5 saved</Badge>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'react', stars: '220k', desc: 'A JavaScript library for building UIs' },
                        { name: 'next.js', stars: '120k', desc: 'The React Framework for Production' },
                        { name: 'supabase', stars: '65k', desc: 'Open source Firebase alternative' },
                      ].map((repo, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-muted/50 border border-border hover:bg-accent/5 transition-colors">
                          <div className="flex items-start justify-between mb-1">
                            <span className="font-medium text-foreground">{repo.name}</span>
                            <Heart className="w-4 h-4 text-[#3ECF8E] fill-[#3ECF8E]" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{repo.desc}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Star className="w-3 h-3" />
                            <span>{repo.stars}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fast, secure, and scalable infrastructure you can trust
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            <TechStackItem name="Next.js" icon={<Zap className="w-4 h-4 text-foreground" />} />
            <TechStackItem name="Supabase" icon={<Database className="w-4 h-4 text-foreground" />} />
            <TechStackItem name="GitHub API" icon={<Github className="w-4 h-4 text-foreground" />} />
            <TechStackItem name="PostgreSQL" icon={<Database className="w-4 h-4 text-foreground" />} />
            <TechStackItem name="TypeScript" icon={<Shield className="w-4 h-4 text-foreground" />} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#3ECF8E]/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Explore Open Source?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers discovering and managing their favorite repositories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#3ECF8E] hover:bg-[#2db377] text-white text-lg px-8">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground text-lg px-8">
                Learn More
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              <Shield className="w-4 h-4 inline mr-1" />
              Secure authentication • Privacy protected • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#1a8f5f] flex items-center justify-center">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">RepoFinder</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Discover and manage your favorite open-source projects effortlessly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 RepoFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;