import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, ExternalLink, Mail, Instagram, Youtube, Music } from 'lucide-react';

// Données des univers musicaux
const universes = [
{
    "id": 1,
    "title": "Neon Love",
    "description": "L'amour illuminé par les néons de la ville",
    "color": "cyan",
    "status": "coming-soon",
    "audio": null,
    "duration": "3:45",
    "genre": "Synthwave Romance",
    "mood": "Passionné",
    "album": "Love's Journey",
    "trackNumber": 1
  },
  {
    "id": 2,
    "title": "Roads We Travel",
    "description": "Les chemins parcourus ensemble",
    "color": "pink",
    "status": "coming-soon",
    "audio": null,
    "duration": "4:12",
    "genre": "Emotional Pop",
    "mood": "Nostalgique",
    "album": "Love's Journey",
    "trackNumber": 2
  },
  {
    "id": 3,
    "title": "Endless Journey",
    "description": "Un voyage sans fin vers l'amour éternel",
    "color": "orange",
    "status": "coming-soon",
    "audio": null,
    "duration": "4:33",
    "genre": "Ambient Love",
    "mood": "Romantique",
    "album": "Love's Journey",
    "trackNumber": 3
  },
  {
    "id": 4,
    "title": "Stars Above",
    "description": "Sous un ciel étoilé, l'amour brille",
    "color": "blue",
    "status": "coming-soon",
    "audio": null,
    "duration": "3:58",
    "genre": "Dreamy Pop",
    "mood": "Contemplatif",
    "album": "Love's Journey",
    "trackNumber": 4
  },
  {
    "id": 5,
    "title": "Drawn to the Unknown",
    "description": "Attiré vers l'inconnu mystérieux",
    "color": "purple",
    "status": "available",
    "audio": "/assets/audio/drawn-to-the-unknown.m4a",
    "duration": "4:03",
    "genre": "Dark Ambient",
    "mood": "Mystérieux",
    "album": "Singles",
    "trackNumber": 1
  }
];

// Composant pour chaque carte d'univers
const UniverseCard = ({ universe, onPlay, isPlaying, currentTrack }) => {
  const colorClasses = {
    purple: "border-purple-500 shadow-purple-500/20 text-purple-400",
    blue: "border-blue-500 shadow-blue-500/20 text-blue-400",
    green: "border-green-500 shadow-green-500/20 text-green-400",
    cyan: "border-cyan-500 shadow-cyan-500/20 text-cyan-400",
    pink: "border-pink-500 shadow-pink-500/20 text-pink-400",
    orange: "border-orange-500 shadow-orange-500/20 text-orange-400"
  };

  const bgClasses = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    cyan: "bg-cyan-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500"
  };

  const isCurrentTrack = currentTrack?.id === universe.id;
  const canPlay = universe.status === 'available' && universe.audio;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`glass rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-lg ${
        colorClasses[universe.color]
      } ${isCurrentTrack ? 'ring-2 ring-white/30' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{universe.title}</h3>
          <p className="text-gray-300 text-sm mb-3">{universe.description}</p>
          <span className="text-xs text-gray-400">{universe.duration}</span>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          {canPlay ? (
            <button
              onClick={() => onPlay(universe)}
              className={`w-12 h-12 rounded-full ${bgClasses[universe.color]} 
                flex items-center justify-center hover:scale-110 transition-transform`}
            >
              {isPlaying && isCurrentTrack ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
              <Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
          
          <span className={`text-xs px-2 py-1 rounded-full ${
            universe.status === 'available' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {universe.status === 'available' ? 'Disponible' : 'Bientôt'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Composant lecteur audio
const AudioPlayer = ({ currentTrack, isPlaying, onTogglePlay }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audio) audio.volume = newVolume;
  };

  if (!currentTrack) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 right-6 glass rounded-xl p-4 border border-white/20"
    >
      <audio
        ref={audioRef}
        src={currentTrack.audio}
        volume={volume}
        onEnded={() => onTogglePlay()}
      />
      
      <div className="flex items-center gap-4">
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center hover:scale-110 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>
        
        <div className="flex-1">
          <div className="text-sm font-medium text-white mb-1">
            {currentTrack.title}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 bg-gray-700 rounded-full h-1">
              <div
                className="bg-purple-500 h-1 rounded-full transition-all duration-100"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-20 slider"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Composant principal App
export default function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePlay = (universe) => {
    if (currentTrack?.id === universe.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(universe);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Ici vous pouvez ajouter l'intégration avec votre service d'email
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-16 text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="gradient-text">Mason Sterling</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-300">
            Multiverses Audio
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Explorez 6 univers musicaux uniques créés par intelligence artificielle. 
            Chaque monde sonore raconte une histoire différente.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            <a href="/youtube" target="_blank" rel="noopener noreferrer"
               className="glass p-3 rounded-full hover:scale-110 transition-transform">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="/instagram" target="_blank" rel="noopener noreferrer"
               className="glass p-3 rounded-full hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="/soundcloud" target="_blank" rel="noopener noreferrer"
               className="glass p-3 rounded-full hover:scale-110 transition-transform">
              <ExternalLink className="w-6 h-6" />
            </a>
            <a href="/suno" target="_blank" rel="noopener noreferrer"
               className="glass p-3 rounded-full hover:scale-110 transition-transform">
              <Music className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </header>
      
{/* Section EP Love's Journey */}
<motion.section
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.1 }}
  className="relative z-10 max-w-4xl mx-auto px-6 mb-16"
>
  <div className="glass rounded-2xl p-8 border border-white/20 text-center">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="mb-6"
    >
      <h2 className="text-4xl font-bold mb-4">
        <span className="gradient-text">Love's Journey</span>
      </h2>
      <p className="text-xl text-gray-300 mb-6">Nouvel EP - Bientôt disponible</p>
      
      {/* Tracklist */}
      <div className="space-y-3 mb-8">
        {universes.filter(u => u.album === "Love's Journey").map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-mono text-gray-400">
                {track.trackNumber}.
              </span>
              <div className="text-left">
                <h4 className={`font-semibold text-${track.color}-400`}>
                  {track.title}
                </h4>
                <p className="text-sm text-gray-400">{track.description}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">{track.duration}</span>
              <div className={`text-xs px-2 py-1 rounded-full mt-1 bg-yellow-500/20 text-yellow-400`}>
                Bientôt
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EP Info */}
      <div className="flex flex-col md:flex-row justify-center gap-4 text-sm text-gray-400">
        <span>🎵 4 titres</span>
        <span>⏱️ 16 minutes</span>
        <span>🎨 Produit par IA</span>
        <span>💝 Thème : Amour & Voyage</span>
      </div>
    </motion.div>
  </div>
</motion.section>
      
      {/* Univers Grid */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {universes.map((universe, index) => (
            <motion.div
              key={universe.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <UniverseCard
                universe={universe}
                onPlay={handlePlay}
                isPlaying={isPlaying}
                currentTrack={currentTrack}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-4 gradient-text">
            Restez connecté
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Soyez les premiers informés des nouveaux univers musicaux et sorties exclusives
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg 
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {isSubmitted ? 'Merci !' : 'S\'abonner'}
              </button>
            </div>
          </form>
        </motion.section>
      </main>

      {/* Audio Player */}
      <AudioPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      />

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500">
        <p>&copy; 2024 Mason Sterling. Créé avec ❤️ et 🤖</p>
      </footer>
    </div>
  );
}
