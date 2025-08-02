import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle,
  Minimize2,
  Maximize2
} from 'lucide-react';

const AudioPlayer = ({ 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  playlist = [], 
  onTrackChange,
  className = ""
}) => {
  // États du lecteur
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.7);
  
  // Références
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const isDragging = useRef(false);

  // Couleurs par univers
  const getUniverseColors = (color) => {
    const colors = {
      purple: { primary: '#8b5cf6', secondary: '#a78bfa', bg: 'bg-purple-500' },
      blue: { primary: '#3b82f6', secondary: '#60a5fa', bg: 'bg-blue-500' },
      green: { primary: '#10b981', secondary: '#34d399', bg: 'bg-green-500' },
      cyan: { primary: '#06b6d4', secondary: '#22d3ee', bg: 'bg-cyan-500' },
      pink: { primary: '#ec4899', secondary: '#f472b6', bg: 'bg-pink-500' },
      orange: { primary: '#f97316', secondary: '#fb923c', bg: 'bg-orange-500' }
    };
    return colors[color] || colors.purple;
  };

  const universeColors = currentTrack ? getUniverseColors(currentTrack.color) : getUniverseColors('purple');

  // Formatage du temps
  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Gestion de l'audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    
    const handleTimeUpdate = () => {
      if (!isDragging.current) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    const handleError = () => {
      console.error('Erreur de lecture audio');
      setIsLoading(false);
    };

    // Événements audio
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrack, isRepeat]);

  // Contrôle lecture/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Gestion du volume
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Navigation dans la playlist
  const getCurrentTrackIndex = () => {
    return playlist.findIndex(track => track.id === currentTrack?.id);
  };

  const handleNext = useCallback(() => {
    if (!playlist.length || !onTrackChange) return;
    
    const currentIndex = getCurrentTrackIndex();
    let nextIndex;
    
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    
    onTrackChange(playlist[nextIndex]);
  }, [playlist, currentTrack, isShuffle, onTrackChange]);

  const handlePrevious = useCallback(() => {
    if (!playlist.length || !onTrackChange) return;
    
    const currentIndex = getCurrentTrackIndex();
    let prevIndex;
    
    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    }
    
    onTrackChange(playlist[prevIndex]);
  }, [playlist, currentTrack, isShuffle, onTrackChange]);

  // Gestion de la barre de progression
  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = () => {
    isDragging.current = true;
  };

  const handleProgressMouseUp = () => {
    isDragging.current = false;
  };

  // Gestion du volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          onTogglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onTogglePlay, handleNext, handlePrevious]);

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed bottom-6 left-6 right-6 md:left-8 md:right-8 glass rounded-xl border border-white/20 backdrop-blur-xl z-50 ${className}`}
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${universeColors.primary}20`
        }}
      >
        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={currentTrack.audio}
          preload="metadata"
        />

        {/* Player Content */}
        <div className={`transition-all duration-300 ${isMinimized ? 'p-3' : 'p-4 md:p-6'}`}>
          {!isMinimized && (
            <>
              {/* Track Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-white truncate">
                    {currentTrack.title}
                  </h4>
                  <p className="text-sm text-gray-300 truncate">
                    {currentTrack.description}
                  </p>
                  {currentTrack.genre && (
                    <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${universeColors.bg}/20`}
                          style={{ color: universeColors.primary }}>
                      {currentTrack.genre}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => setIsMinimized(true)}
                  className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Minimiser"
                >
                  <Minimize2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                  <span className="w-10 text-right">{formatTime(currentTime)}</span>
                  <div 
                    ref={progressRef}
                    className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer relative group"
                    onClick={handleProgressClick}
                    onMouseDown={handleProgressMouseDown}
                    onMouseUp={handleProgressMouseUp}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-100 relative"
                      style={{
                        width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                        background: `linear-gradient(90deg, ${universeColors.primary}, ${universeColors.secondary})`
                      }}
                    >
                      <div 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ transform: 'translate(50%, -50%)' }}
                      />
                    </div>
                  </div>
                  <span className="w-10">{formatTime(duration)}</span>
                </div>
              </div>
            </>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              {!isMinimized && playlist.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Précédent"
                  >
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
              
              <button
                onClick={onTogglePlay}
                disabled={isLoading}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${universeColors.bg} disabled:opacity-50`}
                title={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>

              {!isMinimized && playlist.length > 1 && (
                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Suivant"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
              )}
            </div>

            {/* Center - Track Info (minimized) */}
            {isMinimized && (
              <div className="flex-1 mx-4 min-w-0">
                <p className="text-white font-medium truncate">{currentTrack.title}</p>
              </div>
            )}

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {!isMinimized && (
                <>
                  {/* Repeat & Shuffle */}
                  <button
                    onClick={() => setIsRepeat(!isRepeat)}
                    className={`p-2 rounded-lg transition-colors ${
                      isRepeat ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-gray-400'
                    }`}
                    title="Répéter"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`p-2 rounded-lg transition-colors ${
                      isShuffle ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-gray-400'
                    }`}
                    title="Aléatoire"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title={isMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 slider hidden md:block"
                      title="Volume"
                    />
                  </div>
                </>
              )}

              {isMinimized && (
                <button
                  onClick={() => setIsMinimized(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Agrandir"
                >
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudioPlayer;
