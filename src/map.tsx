import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  CheckCircle,
  Gift,
  User,
  BookOpen,
  Dumbbell,
  FileText,
  Flame,
  Gem,
  Home,
  Award,
  Bell,
} from "lucide-react";
import { Card } from "./components/ui/card";
interface CategoriesProps {
  index: number;
  title: string;
}

// Create 20 levels with unlocked/completed status and random lesson types.
const levels = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  unlocked: i < 7,
  completed: i < 4,
  // Cycle through three lesson types for demonstration.
  type: i % 3 === 0 ? "vocabulary" : i % 3 === 1 ? "exercise" : "grammar",
}));

const Map: React.FC<CategoriesProps> = ({ index, title }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  // Generate fixed random horizontal offsets for zig-zag effect.
  const offsets = useMemo(() => levels.map(() => Math.random() * 100 - 50), []);

  // Returns the appropriate icon based on lesson status and type.
  const renderLessonIcon = (level: (typeof levels)[number]) => {
    if (level.completed) {
      return <CheckCircle size={32} className="text-white" />;
    }
    if (level.unlocked) {
      if (level.type === "vocabulary")
        return <BookOpen size={32} className="text-white" />;
      if (level.type === "exercise")
        return <Dumbbell size={32} className="text-white" />;
      return <FileText size={32} className="text-white" />;
    }
    return <Lock size={32} className="text-white" />;
  };

  return (
    <div className="min-h-screen w-full dark:bg-gray-900 bg-gradient-to-b from-gray-800 to-blue-900 text-white">
      {/* ========== Top Bar ========== */}
      <div className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-gray-800 bg-opacity-95 shadow-md">
        {/* Left: User Lives & Streak */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1"></div>
          <div className="flex items-center gap-1">
            <Flame size={20} className="text-orange-400" />
            <span className="font-bold">Streak: 9</span>
          </div>
        </div>
        {/* Center: Logo & Language Selector */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">CodeX</h1>
          <img src="/flags/usa.png" alt="English" className="w-6 h-6 rounded" />
        </div>
        {/* Right: Currency */}
        <div className="flex items-center gap-1">
          <Gem size={20} className="text-blue-400" />
          <span className="font-bold">420</span>
        </div>
      </div>

      {/* ========== Desktop Layout ========== */}
      <div className="hidden lg:grid grid-cols-[250px_1fr_300px] gap-4 p-4">
        {/* Left Sidebar: Navigation Tiles */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-5 h-max sticky top-12 my-6 z-30">
          <h2 className="text-2xl font-bold">Menu</h2>
          <nav className="flex flex-col gap-4">
            <Link to={`/`}>
              <button className="flex items-center gap-2 hover:text-blue-400">
                {" "}
                <Home size={20} /> <span>Home</span>
              </button>
            </Link>
            <button className="flex items-center gap-2 hover:text-blue-400">
              <User size={20} /> <span>Profile</span>
            </button>
            <Link to={`/leaderboard`}>
              <button className="flex items-center gap-2 hover:text-blue-400">
                <Award size={20} /> <span>Leaderboards</span>
              </button>
            </Link>
            <Link to={`/quests`}>
              <button className="flex items-center gap-2 hover:text-blue-400">
                <Flame size={20} /> <span>Quests</span>
              </button>
            </Link>
            <Link to={`/quests`}>
              <button className="flex items-center gap-2 hover:text-blue-400">
                <Gift size={20} /> <span>Shop</span>
              </button>
            </Link>

            <button className="flex items-center gap-2 hover:text-blue-400">
              <Bell size={20} /> <span>More</span>
            </button>
          </nav>
        </div>

        {/* Main Content Area: Lesson Path & Progression */}
        <div className="p-8 space-y-8">
          {/* Unit Header */}
          <div>
            <h1 className="text-3xl font-bold">
              Unit {index} - {title}
            </h1>
            <p className="text-gray-300 mt-2">Learn the basics of {title}</p>
            <button className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-500">
              Let's go
            </button>
          </div>
          {/* Lesson Path: Zig-Zag Vertical with Curved Connectors */}
          <div className="relative flex flex-col items-center pb-12">
            {levels.map((level, index) => (
              <div
                key={level.id}
                className="relative flex flex-col items-center mb-8"
              >
                {/* SVG Connector (if not first node) */}
                {index > 0 && (
                  <svg
                    width={200}
                    height={50}
                    viewBox="0 0 200 50"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-2"
                  >
                    {(() => {
                      const startX = 100 + offsets[index - 1];
                      const endX = 100 + offsets[index];
                      const cpX = (startX + endX) / 2;
                      const cpY = 10;
                      return (
                        <path
                          d={`M ${startX} 0 Q ${cpX} ${cpY} ${endX} 50`}
                          stroke="#666"
                          strokeWidth="2"
                          fill="none"
                        />
                      );
                    })()}
                  </svg>
                )}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, ease: "easeOut" }}
                  style={{ transform: `translateX(${offsets[index]}px)` }}
                >
                  <Card
                    variant="circle"
                    className={`w-20 h-20 shadow-lg transition-transform transform hover:scale-110 ${
                      level.completed
                        ? "bg-green-500"
                        : level.unlocked
                        ? "bg-yellow-500"
                        : "bg-gray-700"
                    }`}
                    onClick={() => level.unlocked && setCurrentLevel(level.id)}
                    aria-label={
                      level.unlocked ? `Level ${level.id}` : "Locked Level"
                    }
                  >
                    {renderLessonIcon(level)}
                  </Card>
                </motion.div>
                {/* Milestone Reward (every 5th Node) */}
                {level.id % 5 === 0 && (
                  <div className="mt-1">
                    <Gift size={20} className="text-purple-400" />
                  </div>
                )}
                {/* Current Level Indicator */}
                {level.id === currentLevel && (
                  <motion.div
                    className="absolute -bottom-12 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Gift size={24} className="text-yellow-300" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Engagement & Progress Widgets */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6 sticky top-12 self-start my-12">
          <div>
            <h2 className="text-xl font-bold">Leaderboards</h2>
            <p className="text-gray-400 text-sm">
              See top performers and gain inspiration.
            </p>
            <button className="mt-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-500">
              View Leaderboard
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">Daily Quests</h2>
            <p className="text-gray-400 text-sm">
              Earn XP and rewards for daily challenges.
            </p>
            <button className="mt-2 px-3 py-1 bg-green-600 rounded hover:bg-green-500">
              View Quests
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">Join Us</h2>
            <p className="text-gray-400 text-sm">
              Create an account to preserve your progress.
            </p>
            <button className="mt-2 px-3 py-1 bg-purple-600 rounded hover:bg-purple-500">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* ========== Mobile Layout ========== */}
      <div className="lg:hidden">
        {/* Mobile Lesson Carousel/List */}
        <div className="flex flex-col items-center pt-24 pb-24 space-y-8">
          {levels.map((level, index) => (
            <div key={level.id} className="relative flex flex-col items-center">
              {index > 0 && (
                <svg
                  width={200}
                  height={50}
                  viewBox="0 0 200 50"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2"
                >
                  {(() => {
                    const startX = 100 + offsets[index - 1];
                    const endX = 100 + offsets[index];
                    const cpX = (startX + endX) / 2;
                    const cpY = 10;
                    return (
                      <path
                        d={`M ${startX} 0 Q ${cpX} ${cpY} ${endX} 50`}
                        stroke="#666"
                        strokeWidth="2"
                        fill="none"
                      />
                    );
                  })()}
                </svg>
              )}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, ease: "easeOut" }}
                style={{ transform: `translateX(${offsets[index]}px)` }}
              >
                <Card
                  variant="circle"
                  className={`w-16 h-16 shadow-lg transition-transform transform hover:scale-110 ${
                    level.completed
                      ? "bg-green-500"
                      : level.unlocked
                      ? "bg-yellow-500"
                      : "bg-gray-700"
                  }`}
                  onClick={() => level.unlocked && setCurrentLevel(level.id)}
                  aria-label={
                    level.unlocked ? `Level ${level.id}` : "Locked Level"
                  }
                >
                  {renderLessonIcon(level)}
                </Card>
              </motion.div>
              {level.id % 5 === 0 && (
                <div className="mt-1">
                  <Gift size={18} className="text-purple-400" />
                </div>
              )}
              {level.id === currentLevel && (
                <motion.div
                  className="absolute -bottom-10 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Gift size={20} className="text-yellow-300" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 py-2 px-4 shadow flex justify-around items-center">
          <button className="flex flex-col items-center">
            <Home size={24} className="mb-1 text-blue-400" />

            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center">
            <Dumbbell size={24} className="mb-1 text-green-400" />
            <span className="text-xs font-semibold">Exercises</span>
          </button>
          <button className="flex flex-col items-center">
            <Award size={24} className="mb-1 text-yellow-400" />
            <span className="text-xs font-semibold">League</span>
          </button>
          <button className="flex flex-col items-center">
            <Bell size={24} className="mb-1 text-red-400" />
            <span className="text-xs font-semibold">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Map;
