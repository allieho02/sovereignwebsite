import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, 
  FileText, 
  BarChart2, 
  Search, 
  Menu, 
  X, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Play,
  Download
} from 'lucide-react';

// --- Mock Data ---

const ARTICLES = [
  {
    id: 'a1',
    type: 'article',
    title: 'The Future of Urban Architecture',
    excerpt: 'Exploring how sustainable materials are reshaping our skylines and the way we live in modern cities.',
    author: 'Elena Fisher',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    image: 'bg-blue-100', // Placeholder color class
    category: 'Design'
  },
  {
    id: 'a2',
    type: 'article',
    title: 'Minimalism in the Digital Age',
    excerpt: 'Why stripping away the noise is more important than ever in user interface design.',
    author: 'Marcus Chen',
    date: 'Nov 05, 2023',
    readTime: '8 min read',
    image: 'bg-indigo-100',
    category: 'Tech'
  },
  {
    id: 'a3',
    type: 'article',
    title: 'Culinary Journeys: Tokyo',
    excerpt: 'A deep dive into the street food culture of Japan’s bustling capital.',
    author: 'Sarah Jenkins',
    date: 'Dec 20, 2023',
    readTime: '6 min read',
    image: 'bg-orange-100',
    category: 'Travel'
  }
];

const FILMS = [
  {
    id: 'f1',
    type: 'film',
    title: 'Echoes of the Forest',
    description: 'A documentary capturing the unseen lives of nocturnal wildlife in the Amazon.',
    director: 'David Attenborough (Tribute)',
    duration: '1h 24m',
    year: '2023',
    image: 'bg-green-900',
    genre: 'Documentary'
  },
  {
    id: 'f2',
    type: 'film',
    title: 'Neon Nights',
    description: 'A cyberpunk thriller set in a future where memories can be bought and sold.',
    director: 'Ridley Scott-esque',
    duration: '2h 10m',
    year: '2024',
    image: 'bg-purple-900',
    genre: 'Sci-Fi'
  },
  {
    id: 'f3',
    type: 'film',
    title: 'The Baker’s Daughter',
    description: 'An emotional drama about family legacy and the art of sourdough.',
    director: 'Greta G.',
    duration: '1h 45m',
    year: '2022',
    image: 'bg-yellow-900',
    genre: 'Drama'
  }
];

const REPORTS = [
  {
    id: 'r1',
    type: 'report',
    title: 'Global Energy Trends 2024',
    summary: 'Comprehensive analysis of renewable energy adoption rates across G20 nations.',
    pages: '45 Pages',
    size: '2.4 MB',
    date: 'Jan 15, 2024',
    image: 'bg-slate-200',
    status: 'Public'
  },
  {
    id: 'r2',
    type: 'report',
    title: 'Q4 Market Analysis',
    summary: 'Detailed breakdown of tech sector performance in the final quarter of the fiscal year.',
    pages: '12 Pages',
    size: '1.1 MB',
    date: 'Jan 10, 2024',
    image: 'bg-slate-300',
    status: 'Confidential'
  }
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'all', label: 'All Content', icon: null },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'films', label: 'Films', icon: Film },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActiveTab('all')}>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">MediaArchive</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-black focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === item.id
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <div className="flex items-center">
                  {item.icon && <item.icon className="w-4 h-4 mr-3" />}
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const ArticleCard = ({ item }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <div className={`h-48 w-full ${item.image} relative overflow-hidden`}>
       <div className="absolute inset-0 flex items-center justify-center text-gray-500/30 font-bold text-4xl uppercase tracking-widest">
         Article
       </div>
       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
         {item.category}
       </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {item.date}</span>
        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {item.readTime}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{item.excerpt}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-900">{item.author}</span>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center">
          Read <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  </motion.div>
);

const FilmCard = ({ item }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="group relative h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
  >
    <div className={`absolute inset-0 ${item.image} transition-transform duration-700 group-hover:scale-105`}>
        <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-6xl uppercase tracking-widest rotate-45">
         Film
       </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
    
    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-red-600 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Movie</span>
          <span className="text-xs font-medium text-gray-300">{item.duration} • {item.year}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2 leading-tight">{item.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {item.description}
        </p>
        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
          <button className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors">
            <Play className="w-5 h-5 fill-black" />
          </button>
          <span className="text-sm font-medium">Watch Trailer</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const ReportCard = ({ item }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="flex bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
  >
    <div className={`w-24 flex-shrink-0 ${item.image} flex items-center justify-center`}>
      <BarChart2 className="w-8 h-8 text-gray-500" />
    </div>
    <div className="p-5 flex-grow flex flex-col justify-center">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Public' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
          {item.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{item.summary}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
        <div className="flex space-x-4">
            <span>{item.date}</span>
            <span>{item.pages}</span>
            <span>{item.size}</span>
        </div>
        <button className="text-gray-900 hover:text-blue-600 flex items-center font-medium transition-colors">
          <Download className="w-4 h-4 mr-1" /> PDF
        </button>
      </div>
    </div>
  </motion.div>
);

const Hero = () => (
  <div className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
      >
        Discover Perspectives.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
      >
        A curated collection of insightful articles, cinematic masterpieces, and data-driven reports for the modern mind.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative max-w-lg mx-auto"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-full leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-700 focus:border-gray-600 focus:ring-2 focus:ring-gray-600 sm:text-sm transition-colors"
          placeholder="Search for articles, films, or reports..."
        />
      </motion.div>
    </div>
  </div>
);

// --- Main Application ---

export default function MediaWebsite() {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredContent = () => {
    const allContent = [
      ...ARTICLES,
      ...FILMS,
      ...REPORTS
    ];

    if (activeTab === 'all') return allContent;
    return allContent.filter(item => item.type === activeTab);
  };

  const filteredContent = getFilteredContent();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'all' && <Hero />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 capitalize">
            {activeTab === 'all' ? 'Latest Updates' : `${activeTab}`}
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredContent.length} results
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredContent.map((item) => {
              if (item.type === 'article') {
                return <ArticleCard key={item.id} item={item} />;
              } else if (item.type === 'film') {
                return <FilmCard key={item.id} item={item} />;
              } else if (item.type === 'report') {
                // Reports span full width on mobile, 2 cols on large if mixed, or standard grid
                return (
                  <div key={item.id} className="col-span-1 md:col-span-2 lg:col-span-3">
                     <ReportCard item={item} />
                  </div>
                );
              }
              return null;
            })}
          </AnimatePresence>
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No content found in this category.</p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-900">MediaArchive</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs">
                Bringing you the best in journalism, cinema, and analytics. Stay informed, stay entertained.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('articles')} className="text-gray-500 hover:text-black text-sm">Articles</button></li>
                <li><button onClick={() => setActiveTab('films')} className="text-gray-500 hover:text-black text-sm">Films</button></li>
                <li><button onClick={() => setActiveTab('reports')} className="text-gray-500 hover:text-black text-sm">Reports</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-black text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-400 text-sm">&copy; 2024 MediaArchive Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}