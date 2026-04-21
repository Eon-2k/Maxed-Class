/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  Maximize2, 
  X, 
  Filter, 
  Monitor,
  LayoutGrid,
  Home,
  ChevronRight
} from 'lucide-react';
import libraryData from './library.json';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = ['Home', 'Games', 'Apps'];

  const filteredItems = useMemo(() => {
    return libraryData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'Home' ? true : item.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const newestGames = useMemo(() => {
    return libraryData.filter(i => i.type === 'Games').slice(-4).reverse();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="mesh-gradient" />

      {/* Main Container */}
      <div className="flex flex-col md:flex-row h-full max-h-[900px] w-full max-w-[1280px] gap-6 overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-24 glass rounded-[2.5rem] p-6 flex flex-col gap-10 shrink-0 shadow-2xl items-center">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform cursor-pointer">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
          </div>

          <nav className="flex flex-col gap-4 flex-1 items-center w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all relative group ${
                  activeTab === tab 
                    ? 'bg-white/10 text-white shadow-lg' 
                    : 'text-white/20 hover:bg-white/5 hover:text-white/60'
                }`}
                title={tab}
              >
                {tab === 'Home' && <Home className="w-6 h-6" />}
                {tab === 'Games' && <Gamepad2 className="w-6 h-6" />}
                {tab === 'Apps' && <LayoutGrid className="w-6 h-6" />}
                
                <span className="absolute left-full ml-4 px-3 py-1.5 glass rounded-lg text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block z-50">
                  {tab}
                </span>
                
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -left-1 w-1 h-6 bg-white rounded-full hidden md:block"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto items-center flex flex-col gap-4">
            <div className="pt-4 border-t border-white/5 flex flex-col items-center">
              <div className="text-[8px] text-white/10 font-bold uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180 mb-4 opacity-50">
                MAXED-CLASS
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Header */}
          <header className="h-14 flex items-center justify-between shrink-0 px-2 text-white">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/60 transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass bg-white/5 border-none rounded-2xl py-3 pl-12 pr-4 text-sm outline-none placeholder:text-white/20 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl glass border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                <Monitor className="text-white/60 w-5 h-5" />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto no-scrollbar pr-1 flex flex-col gap-8">
            
            {activeTab === 'Home' && !searchQuery && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-12 py-6"
              >
                <div className="max-w-3xl">
                  <h1 className="text-[7rem] font-black text-white italic uppercase leading-[0.8] tracking-tighter mb-8 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
                    MAXED<br/>CLASS
                  </h1>
                  <p className="text-white/40 text-2xl font-medium leading-relaxed italic max-w-2xl">
                    High-end unblocked architecture. Optimized for speed, built for the unrestricted frontier. 
                    Explore newest software instances below.
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between text-white">
                    <div className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase flex items-center gap-4 text-white">
                      <span className="w-8 h-px bg-white/10"></span>
                      New Arrivals
                    </div>
                    <button onClick={() => setActiveTab('Games')} className="text-[10px] font-black text-white/40 hover:text-white tracking-widest uppercase flex items-center gap-2 transition-colors">
                      View All <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {newestGames.map(game => (
                      <motion.div 
                        key={game.id}
                        whileHover={{ y: -10 }}
                        onClick={() => setSelectedItem(game)}
                        className="glass-card aspect-square p-2 group cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-4 text-center"
                      >
                        <div className="w-full h-full relative p-4">
                           <img 
                            src={game.thumbnailUrl} 
                            alt={game.title} 
                            className="w-full h-full object-cover rounded-2xl opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/20 group-hover:bg-transparent transition-all pointer-events-none">
                            <h3 className="text-sm font-black text-white uppercase italic tracking-tighter leading-none mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{game.title}</h3>
                            <p className="text-[8px] text-white/20 font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">NEW_ENTRY</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/5">
                   <div className="glass p-8 rounded-[3rem] bg-white/5 border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32"></div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center shrink-0">
                           <Monitor className="text-white w-8 h-8 opacity-40" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">SYSTEM_INTEGRITY: OPTIMAL</h3>
                          <p className="text-white/40 text-sm font-medium italic">
                            All application hubs are currently operating at maximum bandwidth. Standard encryption layers are auto-active.
                          </p>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* Catalog View */}
            {(activeTab !== 'Home' || searchQuery) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24 px-1">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -8 }}
                      onClick={() => setSelectedItem(item)}
                      className="glass-card aspect-square p-2 group cursor-pointer flex flex-col overflow-hidden"
                    >
                      <div className="w-full h-full relative rounded-2xl overflow-hidden glass bg-white/5 text-white">
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                          <div className="font-black text-sm tracking-tight text-white uppercase italic leading-none">{item.title}</div>
                          <div className="text-[10px] text-white/30 font-bold tracking-widest uppercase mt-1">{item.type}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {filteredItems.length === 0 && activeTab !== 'Home' && (
              <div className="flex flex-col items-center justify-center py-20 text-white/30">
                <Filter className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-xl font-black italic tracking-tight uppercase tracking-tighter">NULL_SET: NO {activeTab.toUpperCase()} FOUND</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveTab('Home')}}
                  className="mt-4 text-white hover:text-white font-black text-xs uppercase tracking-widest"
                >
                  [ RETURN HOME ]
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Viewer Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
              onClick={() => setSelectedItem(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl aspect-video glass rounded-[3rem] overflow-hidden shadow-6xl flex flex-col"
            >
              <div className="flex items-center justify-between px-8 py-5 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Gamepad2 className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">{selectedItem.title}</h2>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-black mt-1">
                      {selectedItem.type === 'Games' ? 'INSTANCE_ID' : 'APP_RUNTIME'}: {selectedItem.id.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 flex items-center justify-center rounded-2xl glass hover:bg-white/10 text-white/60 transition-all">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white text-black hover:scale-105 transition-all shadow-xl"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-black/40 relative">
                <iframe 
                  src={selectedItem.iframeUrl}
                  title={selectedItem.title}
                  className="game-iframe h-full"
                  allow="fullscreen"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Licensing Footer */}
      <div className="fixed bottom-6 left-6 pointer-events-none hidden xl:block text-white">
        <div className="text-[8px] text-white/10 font-bold uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180 opacity-50">
           © 2026 MAXED-CLASS ARCHIVE :: LIC-4.2-NONE
        </div>
      </div>
    </div>
  );
}
