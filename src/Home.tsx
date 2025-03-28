import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Code, Trophy, BookOpen, Zap, Star } from "lucide-react";
import CustomScrollbar from "@/components/costom-scrollbar";
import Navigation from "./Nav";

// Feature card component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => (
  <motion.div
    className="h-full"
    variants={{
      hidden: { opacity: 0, y: 50 },
      show: { opacity: 1, y: 0 },
    }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
  >
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 overflow-hidden h-full">
      <div className="p-0">
        <div className={`h-2 bg-gradient-to-r ${color}`}></div>
        <div className="p-6">
          <div className="mb-4">{icon}</div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-400">{description}</p>
          <Button className="mt-6 w-full bg-gray-700 hover:bg-gray-600 group">
            <span>Get Started</span>
            <motion.span
              className="ml-2"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
);

// CodeSymbolsBackground component
interface CodeSymbolsBackgroundProps {
  codeSymbols: string[];
}

const CodeSymbolsBackground = ({ codeSymbols }: CodeSymbolsBackgroundProps) => {
  // Use useMemo to generate positions once and prevent re-renders from causing jumps
  const symbolsWithPositions = useMemo(
    () =>
      codeSymbols.map((symbol) => ({
        symbol,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 24 + 12}px`,
        yOffset: Math.random() * 100 - 50,
        xOffset: Math.random() * 100 - 50,
        rotate: Math.random() > 0.5 ? 360 : -360,
        duration: Math.random() * 20 + 10,
      })),
    [codeSymbols]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbolsWithPositions.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500 opacity-10 font-mono font-bold"
          style={{
            top: item.top,
            left: item.left,
            fontSize: item.fontSize,
          }}
          animate={{
            y: [0, item.yOffset],
            x: [0, item.xOffset],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, item.rotate],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [navSearch, setNavSearch] = useState("");
  const [typedText, setTypedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchResults, setSearchResults] = useState<
    Array<{ title: string; category: string }>
  >([]);
  const [showResults, setShowResults] = useState(false);

  // Updated to "Learn with Codex" instead of cycling through phrases
  const phrases = ["Learn with MVNH Codex"];

  // Text typing animation effect
  useEffect(() => {
    const fullPhrase = phrases[currentPhraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setTypedText(fullPhrase.substring(0, typedText.length + 1));

          // If we've completed typing the current phrase
          if (typedText.length === fullPhrase.length) {
            // Wait longer at completed phrase
            setTimeout(() => setIsDeleting(true), 3000);
          }
        } else {
          setTypedText(fullPhrase.substring(0, typedText.length - 1));

          // If we've deleted the current phrase
          if (typedText.length === 0) {
            setIsDeleting(false);
            setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 100 : 150
    ); // Type slower, delete faster

    return () => clearTimeout(timeout);
  }, [typedText, currentPhraseIndex, isDeleting, phrases]);

  const handleSearch = () => {
    // Mock search results
    if (search.trim() !== "") {
      setSearchResults([
        { title: "JavaScript Basics", category: "Programming" },
        { title: "Advanced React Patterns", category: "Web Development" },
        { title: "Data Structures", category: "Computer Science" },
      ]);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Technology tags for the horizontal list
  const technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "PHP",
    "C",
    "MySQL",
    "jQuery",
    "Excel",
  ];

  // Code symbols for the background animation
  const codeSymbols = [
    "</>",
    "{ }",
    "( )",
    "[]",
    ";",
    "=>",
    "...",
    "function()",
    "import",
    "export",
    "const",
    "let",
    "=",
    "&&",
    "||",
    "===",
    "++",
    "--",
  ];

  // Feature cards data
  const featureCards = [
    {
      icon: <Code className="text-green-400 w-12 h-12" />,
      title: "Interactive Coding",
      description:
        "Practice real-time coding challenges with our interactive editor and receive instant feedback.",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: <Trophy className="text-yellow-400 w-12 h-12" />,
      title: "Earn Rewards",
      description:
        "Complete lessons and unlock badges, certificates, and exclusive content as you progress.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <BookOpen className="text-purple-400 w-12 h-12" />,
      title: "Comprehensive Learning",
      description:
        "Access thousands of tutorials covering everything from basics to advanced concepts.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <CustomScrollbar>
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Main Navigation Bar */}
        <Navigation
          technologies={technologies}
          navSearch={navSearch}
          setNavSearch={setNavSearch}
        />

        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Code-related animated background */}
            <CodeSymbolsBackground codeSymbols={codeSymbols} />

            <header className="text-center py-16">
              <div className="inline-block relative">
                <motion.h1
                  className="text-6xl font-extrabold tracking-tight"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                    {typedText}
                  </span>
                  <motion.span
                    className="inline-block w-0.5 h-12 bg-green-400 ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.h1>
                <motion.p
                  className="text-gray-400 mt-4 text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Your journey to programming excellence starts here
                </motion.p>
              </div>
            </header>

            <motion.div
              className="flex flex-col md:flex-row justify-center gap-4 mb-10 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex-1 max-w-2xl flex rounded-full overflow-hidden shadow-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <Input
                  className="flex-1 p-6 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Find tutorials, courses, challenges..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  aria-label="Search content"
                />
                <Button
                  className="m-1 px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full font-medium"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-5 w-5" /> Search
                </Button>
              </div>
            </motion.div>

            {/* Search results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  className="mb-10 bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 max-w-2xl mx-auto"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium mb-2">Search Results</h3>
                  <div className="space-y-2">
                    {searchResults.map((result, index) => (
                      <motion.div
                        key={index}
                        className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div>
                          <p className="font-medium">{result.title}</p>
                          <p className="text-xs text-gray-400">
                            {result.category}
                          </p>
                        </div>
                        <Zap className="text-yellow-400 h-4 w-4" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {featureCards.map((card, index) => (
                <FeatureCard key={index} {...card} />
              ))}
            </motion.div>

            <motion.div
              className="mt-16 text-center pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-gray-400 mb-4">
                Trusted by thousands of learners worldwide
              </p>
              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="text-yellow-400 w-6 h-6"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-yellow-400 font-medium mt-2">
                4.9 / 5 average rating
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </CustomScrollbar>
  );
}
