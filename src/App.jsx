import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles, Home, BookOpen, Gem, Trophy, Award, User, Plus, X, Check,
  ChevronRight, ChevronLeft, Edit, Trash2, Play, Star, Flame, Droplet,
  Mountain, Wind, Sun, Moon, Zap, Heart, Coins, Shield, Eye, Lock,
  Save, ArrowLeft, Gift, Wand2, FlaskConical, KeyRound, Swords, TreePine,
  Radio, Loader2, Users, Settings, RotateCw, Network, Library, Store,
  Crown, ArrowLeftRight, Upload, Globe, Flag, CheckCircle2, Trees
} from "lucide-react";

// ============================================================================
// DESIGN TOKENS & FONTS
// ============================================================================
const FONTS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap');

.font-display { font-family: 'Cinzel', serif; letter-spacing: 0.02em; }
.font-serif { font-family: 'Fraunces', serif; }
.font-body { font-family: 'Manrope', sans-serif; }

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes orbit {
  from { transform: rotate(0deg) translateX(28px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
}
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}
@keyframes prism {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
@keyframes nebula {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -20px) rotate(3deg); }
  66% { transform: translate(-20px, 20px) rotate(-3deg); }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(232, 200, 117, 0.3); }
  50% { box-shadow: 0 0 40px rgba(232, 200, 117, 0.6); }
}
@keyframes tile-flip {
  0% { transform: perspective(400px) rotateY(0deg); }
  100% { transform: perspective(400px) rotateY(180deg); }
}
@keyframes shockwave {
  0% { transform: scale(0); opacity: 0.8; }
  100% { transform: scale(8); opacity: 0; }
}
@keyframes screen-flash {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
@keyframes screen-shake {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-6px, 4px); }
  40% { transform: translate(8px, -3px); }
  60% { transform: translate(-4px, -6px); }
  80% { transform: translate(5px, 5px); }
}
@keyframes light-beam {
  0% { transform: scaleY(0); opacity: 0; }
  20% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0; }
}
@keyframes vortex-spin {
  from { transform: rotate(0deg) scale(1); opacity: 1; }
  to { transform: rotate(720deg) scale(0.3); opacity: 0; }
}
@keyframes burst {
  0% { transform: scale(0); opacity: 1; }
  60% { transform: scale(2.5); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}
@keyframes reveal-zoom {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes hue-rotate-once {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
@keyframes crack {
  0%, 100% { opacity: 0; transform: scaleX(0); }
  10%, 30% { opacity: 1; transform: scaleX(1); }
  60% { opacity: 0; transform: scaleX(1); }
}

.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.animate-nebula { animation: nebula 20s ease-in-out infinite; }
.animate-fade-in-up { animation: fade-in-up 0.5s ease-out backwards; }
.animate-scale-in { animation: scale-in 0.3s ease-out backwards; }
.animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
.animate-prism { animation: prism 4s linear infinite; }

.shimmer-text {
  background: linear-gradient(90deg, #e8c875 0%, #fff4d1 50%, #e8c875 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 3s linear infinite;
}

.scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
.scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(232,200,117,0.3); border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(232,200,117,0.5); }
`;

// ============================================================================
// GAME DATA CONSTANTS
// ============================================================================

const ELEMENTS = {
  ember:  { name: "Ember",  color: "#f27052", bg: "#3a1810", icon: Flame,    desc: "Fire & passion" },
  tide:   { name: "Tide",   color: "#5db4e8", bg: "#0f2438", icon: Droplet,  desc: "Water & flow" },
  stone:  { name: "Stone",  color: "#c4915c", bg: "#2a1e12", icon: Mountain, desc: "Earth & endurance" },
  gust:   { name: "Gust",   color: "#8fd9b8", bg: "#0f2a22", icon: Wind,     desc: "Air & swiftness" },
  glow:   { name: "Glow",   color: "#f5d76e", bg: "#322a0d", icon: Sun,      desc: "Light & clarity" },
  hush:   { name: "Hush",   color: "#b084e0", bg: "#241638", icon: Moon,     desc: "Shadow & mystery" },
};

const RARITIES = {
  glimmer:    { name: "Glimmer",    tier: 1, weight: 5000, color: "#9ca3af", glow: "#9ca3af", label: "Common" },
  shimmer:    { name: "Shimmer",    tier: 2, weight: 2500, color: "#e5e7eb", glow: "#f0f0f0", label: "Uncommon" },
  gleam:      { name: "Gleam",      tier: 3, weight: 1200, color: "#93c5fd", glow: "#60a5fa", label: "Rare" },
  radiant:    { name: "Radiant",    tier: 4, weight: 700,  color: "#86efac", glow: "#4ade80", label: "Epic" },
  luminous:   { name: "Luminous",   tier: 5, weight: 400,  color: "#d8b4fe", glow: "#a855f7", label: "Mythic" },
  celestial:  { name: "Celestial",  tier: 6, weight: 150,  color: "#fcd34d", glow: "#fbbf24", label: "Celestial" },
  prismatic:  { name: "Prismatic",  tier: 7, weight: 40,   color: "#f472b6", glow: "#ec4899", label: "Prismatic" },
  eclipsed:   { name: "Eclipsed",   tier: 8, weight: 9,    color: "#1f2937", glow: "#6b7280", label: "Eclipsed" },
  primordial: { name: "Primordial", tier: 9, weight: 1,    color: "#fb923c", glow: "#ea580c", label: "Primordial" },
};

const RARITY_ORDER = ["glimmer","shimmer","gleam","radiant","luminous","celestial","prismatic","eclipsed","primordial"];

// Creature species per element
const SPECIES = [
  // Ember
  { id: "emberfox",   element: "ember", name: "Emberfox",   desc: "A cunning fox wreathed in quiet flame." },
  { id: "flamelet",   element: "ember", name: "Flamelet",   desc: "A bouncing ember-sprite that loves mischief." },
  { id: "volcanix",   element: "ember", name: "Volcanix",   desc: "A small dragon forged in mountain heat." },
  // Tide
  { id: "bubblefin",  element: "tide",  name: "Bubblefin",  desc: "A gentle fish that blows wish-bubbles." },
  { id: "coralpup",   element: "tide",  name: "Coralpup",   desc: "A pup woven from living reef." },
  { id: "tidekin",    element: "tide",  name: "Tidekin",    desc: "A ribbon of ocean given shape." },
  // Stone
  { id: "rockling",   element: "stone", name: "Rockling",   desc: "A sturdy stone-beetle with a kind heart." },
  { id: "mossback",   element: "stone", name: "Mossback",   desc: "An ancient tortoise carrying a meadow." },
  { id: "geodewing",  element: "stone", name: "Geodewing",  desc: "A crystal moth with rock-facet wings." },
  // Gust
  { id: "breezeling", element: "gust",  name: "Breezeling", desc: "A tiny wind-wisp that whispers secrets." },
  { id: "cloudpuff",  element: "gust",  name: "Cloudpuff",  desc: "A bouncy cloud with curious eyes." },
  { id: "skylark",    element: "gust",  name: "Skylark",    desc: "A bird that sings the weather's mood." },
  // Glow
  { id: "sparkmote",  element: "glow",  name: "Sparkmote",  desc: "A mote of sunlight made playful." },
  { id: "dawnwing",   element: "glow",  name: "Dawnwing",   desc: "A butterfly born of first light." },
  { id: "starlitcub", element: "glow",  name: "Starlit Cub",desc: "A cub whose fur holds little stars." },
  // Hush
  { id: "whisperling",element: "hush",  name: "Whisperling",desc: "A shy shadow that loves libraries." },
  { id: "moonveil",   element: "hush",  name: "Moonveil",   desc: "A silk-winged creature of dusk." },
  { id: "silentpaw",  element: "hush",  name: "Silentpaw",  desc: "A quiet cat who sees what's hidden." },
];

// Primordials are unique named Familiars (level 9)
const PRIMORDIALS = [
  { id: "vael",     element: "ember", name: "Vael, the First Ember",    desc: "The spark that first taught warmth." },
  { id: "thalass",  element: "tide",  name: "Thalass, Keeper of Depths", desc: "The tide that remembers every shore." },
  { id: "tarn",     element: "stone", name: "Mosswarden Tarn",          desc: "Older than any mountain's name." },
  { id: "aero",     element: "gust",  name: "Aero, the Unhurried Wind", desc: "The breath between two thoughts." },
  { id: "solune",   element: "glow",  name: "Solune, Dawnsinger",       desc: "Sings the sun over the horizon." },
  { id: "nocta",    element: "hush",  name: "Nocta, Keeper of Quiet",   desc: "Holds the silence between stars." },
];

// ============================================================================
// QUIZ SETS (pre-built)
// ============================================================================
const DEFAULT_QUIZZES = [
  {
    id: "q_science_cells",
    title: "Cells: The Building Blocks",
    subject: "Science",
    grade: "6-8",
    author: "Lumora Academy",
    builtin: true,
    questions: [
      { prompt: "What is the basic unit of life?", choices: ["Atom","Cell","Molecule","Tissue"], correct: 1, explanation: "Cells are the smallest units that can be considered alive." },
      { prompt: "Which organelle is known as the powerhouse of the cell?", choices: ["Nucleus","Ribosome","Mitochondria","Golgi body"], correct: 2, explanation: "Mitochondria produce ATP, the cell's main energy currency." },
      { prompt: "Plant cells have this structure that animal cells lack:", choices: ["Cell membrane","Nucleus","Cell wall","Cytoplasm"], correct: 2, explanation: "Cell walls give plant cells their rigid shape." },
      { prompt: "DNA is primarily stored in the:", choices: ["Mitochondria","Nucleus","Ribosome","Vacuole"], correct: 1, explanation: "The nucleus holds the cell's genetic material." },
      { prompt: "Which of these is NOT a type of cell?", choices: ["Neuron","Photon","Red blood cell","Skin cell"], correct: 1, explanation: "Photons are particles of light — not cells." },
    ],
  },
  {
    id: "q_math_fractions",
    title: "Fractions Warmup",
    subject: "Math",
    grade: "4-6",
    author: "Lumora Academy",
    builtin: true,
    questions: [
      { prompt: "Which is larger?", choices: ["1/2","1/3","1/4","1/5"], correct: 0, explanation: "1/2 means one of two equal parts — the biggest slice here." },
      { prompt: "1/2 + 1/4 = ?", choices: ["2/6","3/4","1/6","2/4"], correct: 1, explanation: "Convert 1/2 to 2/4, then 2/4 + 1/4 = 3/4." },
      { prompt: "What is 3/6 simplified?", choices: ["1/3","1/2","2/3","3/4"], correct: 1, explanation: "Divide top and bottom by 3." },
      { prompt: "Which fraction equals 0.25?", choices: ["1/2","1/3","1/4","1/5"], correct: 2, explanation: "One quarter of a whole is 0.25." },
      { prompt: "2/3 of 9 = ?", choices: ["3","5","6","7"], correct: 2, explanation: "9 ÷ 3 × 2 = 6." },
    ],
  },
  {
    id: "q_history_ancient",
    title: "Echoes of the Ancient World",
    subject: "History",
    grade: "6-9",
    author: "Lumora Academy",
    builtin: true,
    questions: [
      { prompt: "Which river was central to ancient Egyptian civilization?", choices: ["Tigris","Nile","Indus","Yangtze"], correct: 1, explanation: "The Nile's annual floods fed Egyptian agriculture." },
      { prompt: "The Great Wall was built primarily in which country?", choices: ["Japan","Korea","China","Mongolia"], correct: 2, explanation: "Construction spanned many Chinese dynasties." },
      { prompt: "Who wrote the Iliad and Odyssey?", choices: ["Virgil","Homer","Plato","Sappho"], correct: 1, explanation: "Homer is the traditional attributed poet." },
      { prompt: "Which city was destroyed by Vesuvius in 79 AD?", choices: ["Rome","Pompeii","Athens","Carthage"], correct: 1, explanation: "Pompeii was buried under volcanic ash." },
      { prompt: "The hanging gardens were in which city?", choices: ["Babylon","Memphis","Thebes","Ur"], correct: 0, explanation: "The Hanging Gardens of Babylon were one of the Seven Wonders." },
    ],
  },
  {
    id: "q_language_vocab",
    title: "Vocabulary: Words of Wonder",
    subject: "Language Arts",
    grade: "5-8",
    author: "Lumora Academy",
    builtin: true,
    questions: [
      { prompt: "'Luminous' most nearly means:", choices: ["Heavy","Bright","Quiet","Sharp"], correct: 1, explanation: "Luminous means giving off light." },
      { prompt: "An antonym of 'brave' is:", choices: ["Bold","Cowardly","Clever","Kind"], correct: 1, explanation: "Cowardly is the opposite of brave." },
      { prompt: "A 'cacophony' is a:", choices: ["Sweet melody","Harsh mixture of sounds","Soft whisper","Single note"], correct: 1, explanation: "Cacophony describes jarring, discordant sound." },
      { prompt: "Someone 'meticulous' is:", choices: ["Careless","Very careful","Loud","Quick"], correct: 1, explanation: "A meticulous person pays close attention to detail." },
      { prompt: "'Ephemeral' means:", choices: ["Lasting forever","Short-lived","Made of stone","Underground"], correct: 1, explanation: "Something ephemeral lasts only a short time." },
    ],
  },
];

// ============================================================================
// ACHIEVEMENTS
// ============================================================================
const ACHIEVEMENTS = [
  // Scholar
  { id: "first_correct",   name: "First Light",        category: "Scholar",   desc: "Answer your first question correctly.",               condition: (s) => s.stats.totalCorrect >= 1, lumens: 25 },
  { id: "correct_10",      name: "Apprentice Scholar", category: "Scholar",   desc: "Answer 10 questions correctly.",                      condition: (s) => s.stats.totalCorrect >= 10, lumens: 50 },
  { id: "correct_100",     name: "Devoted Scholar",    category: "Scholar",   desc: "Answer 100 questions correctly.",                     condition: (s) => s.stats.totalCorrect >= 100, lumens: 200 },
  { id: "streak_5",        name: "On A Roll",          category: "Scholar",   desc: "Get a streak of 5 correct in a row.",                 condition: (s) => s.stats.bestStreak >= 5, lumens: 75 },
  { id: "streak_20",       name: "Unbroken",           category: "Scholar",   desc: "Get a streak of 20 correct in a row.",                condition: (s) => s.stats.bestStreak >= 20, lumens: 250 },
  { id: "flawless",        name: "Flawless Tome",      category: "Scholar",   desc: "Finish a quiz with a perfect score.",                 condition: (s) => s.stats.perfectRuns >= 1, lumens: 100 },
  // Collector
  { id: "first_familiar",  name: "New Companion",      category: "Collector", desc: "Obtain your first Familiar.",                         condition: (s) => s.familiars.length >= 1, lumens: 25 },
  { id: "collect_5",       name: "Fledgling Keeper",   category: "Collector", desc: "Collect 5 Familiars.",                                condition: (s) => s.familiars.length >= 5, lumens: 50 },
  { id: "collect_20",      name: "Menagerie",          category: "Collector", desc: "Collect 20 Familiars.",                               condition: (s) => s.familiars.length >= 20, lumens: 150 },
  { id: "elementalist",    name: "Elementalist",       category: "Collector", desc: "Own at least one Familiar of every element.",         condition: (s) => Object.keys(ELEMENTS).every(e => s.familiars.some(f => f.element === e)), lumens: 300 },
  { id: "first_rare",      name: "A Rare Find",        category: "Collector", desc: "Obtain a Radiant or better Familiar.",                condition: (s) => s.familiars.some(f => RARITIES[f.rarity].tier >= 4), lumens: 100 },
  { id: "starlit",         name: "Starlit",            category: "Collector", desc: "Obtain a Celestial-tier Familiar.",                   condition: (s) => s.familiars.some(f => f.rarity === "celestial"), lumens: 500 },
  { id: "origins",         name: "Age of Origins",     category: "Collector", desc: "Claim a Primordial Familiar.",                        condition: (s) => s.familiars.some(f => f.rarity === "primordial"), lumens: 2000 },
  // Strategist
  { id: "duel_win",        name: "First Duel",         category: "Strategist",desc: "Win a Spell Duel.",                                   condition: (s) => s.stats.duelsWon >= 1, lumens: 75 },
  { id: "duel_5",          name: "Duelist",            category: "Strategist",desc: "Win 5 Spell Duels.",                                  condition: (s) => s.stats.duelsWon >= 5, lumens: 200 },
  { id: "alchemist",       name: "Apprentice Alchemist",category:"Strategist",desc: "Complete the Alchemy Lab.",                           condition: (s) => s.stats.alchemyRuns >= 1, lumens: 75 },
  { id: "safebreaker",     name: "Safebreaker",        category: "Strategist",desc: "Complete a Memory Vault run.",                        condition: (s) => s.stats.vaultRuns >= 1, lumens: 75 },
  { id: "echo_clear",      name: "Echoed",             category: "Strategist",desc: "Clear the Echo Chamber tournament.",                  condition: (s) => s.stats.echoChambersCleared >= 1, lumens: 300 },
  // Mentor
  { id: "trade_first",     name: "Fair Exchange",      category: "Mentor",    desc: "Complete your first trade in the Exchange Hall.",     condition: (s) => s.stats.tradesCompleted >= 1, lumens: 75 },
  { id: "first_skill",     name: "First Spell",        category: "Mentor",    desc: "Unlock your first Spell School skill.",               condition: (s) => (s.skills||[]).length >= 1, lumens: 75 },
  { id: "skill_branch",    name: "Branch Mastered",    category: "Mentor",    desc: "Complete any full branch of the Spell School.",       condition: (s) => {
      const branches = ["scholar","duelist","collector"];
      return branches.some(b => SKILLS.filter(sk => sk.branch === b).every(sk => (s.skills||[]).includes(sk.id)));
    }, lumens: 300 },
  // Creator
  { id: "first_quiz",      name: "Scribe",             category: "Creator",   desc: "Create your first quiz set.",                         condition: (s) => s.stats.quizzesCreated >= 1, lumens: 100 },
  { id: "three_quizzes",   name: "Loremaster",         category: "Creator",   desc: "Create 3 quiz sets.",                                 condition: (s) => s.stats.quizzesCreated >= 3, lumens: 250 },
  // Dedication
  { id: "level_5",         name: "Rising Apprentice",  category: "Dedication",desc: "Reach player level 5.",                               condition: (s) => s.level >= 5, lumens: 100 },
  { id: "level_10",        name: "Adept",              category: "Dedication",desc: "Reach player level 10.",                              condition: (s) => s.level >= 10, lumens: 300 },
  // Hidden
  { id: "against_grain",   name: "Against the Grain",  category: "Hidden",    desc: "Win a Spell Duel using an elementally disadvantaged Familiar.", condition: (s) => s.stats.upsetWins >= 1, lumens: 250, hidden: true },
];

// ============================================================================
// BADGES
// ============================================================================
const BADGES = [
  { id: "b_apprentice",  name: "Apprentice",       tier: "common",       desc: "Welcome to Lumora.",                                   unlock: () => true },
  { id: "b_scholar",     name: "Scholar",          tier: "distinguished",desc: "Earned by answering 100 questions correctly.",        unlock: (s) => s.stats.totalCorrect >= 100 },
  { id: "b_duelist",     name: "Duelist",          tier: "distinguished",desc: "Earned by winning 5 Spell Duels.",                    unlock: (s) => s.stats.duelsWon >= 5 },
  { id: "b_collector",   name: "Collector",        tier: "distinguished",desc: "Earned by collecting 10 Familiars.",                  unlock: (s) => s.familiars.length >= 10 },
  { id: "b_archmage",    name: "Archmage",         tier: "prestige",     desc: "Earned by reaching player level 10.",                 unlock: (s) => s.level >= 10 },
  { id: "b_starlit",     name: "Starlit",          tier: "prestige",     desc: "Earned by obtaining a Celestial Familiar.",           unlock: (s) => s.familiars.some(f => RARITIES[f.rarity].tier >= 6) },
  { id: "b_primordial",  name: "Primordial",       tier: "prestige",     desc: "Earned by claiming a Primordial.",                    unlock: (s) => s.familiars.some(f => f.rarity === "primordial") },
  { id: "b_founding",    name: "Founding Apprentice", tier: "legacy",    desc: "Among the first Apprentices of Lumora.",              unlock: () => true },
  { id: "b_scribe",      name: "Scribe",           tier: "character",    desc: "Earned by creating a quiz set.",                      unlock: (s) => s.stats.quizzesCreated >= 1 },
  { id: "b_mentor",      name: "Mentor",           tier: "character",    desc: "Earned by helping your class (played 5+ quizzes).",   unlock: (s) => s.stats.quizzesPlayed >= 5 },
];

const BADGE_TIER_STYLES = {
  common:        { bg: "bg-slate-700/40",                       border: "border-slate-500/40", text: "text-slate-200" },
  distinguished: { bg: "bg-indigo-700/40",                       border: "border-indigo-400/50", text: "text-indigo-100" },
  prestige:      { bg: "bg-gradient-to-br from-amber-700/40 to-rose-700/40", border: "border-amber-300/50", text: "text-amber-100" },
  legacy:        { bg: "bg-gradient-to-br from-emerald-700/40 to-teal-700/40", border: "border-emerald-300/50", text: "text-emerald-100" },
  character:     { bg: "bg-gradient-to-br from-pink-700/30 to-purple-700/30", border: "border-pink-300/40", text: "text-pink-100" },
};

// ============================================================================
// SPELL SCHOOL (SKILL TREE)
// ============================================================================

const SKILL_BRANCHES = {
  scholar:   { name: "Scholar",   color: "#5db4e8", desc: "Knowledge compounds." },
  duelist:   { name: "Duelist",   color: "#f27052", desc: "Power in the arena." },
  collector: { name: "Collector", color: "#b084e0", desc: "Fortune favors the keeper." },
};

const SKILLS = [
  // Scholar
  { id: "bookworm",        branch: "scholar",   tier: 1, cost: 1, prereq: null,             name: "Bookworm",         desc: "+5% XP from all sources." },
  { id: "scholars_eye",    branch: "scholar",   tier: 2, cost: 2, prereq: "bookworm",        name: "Scholar's Eye",    desc: "Question explanations visible even on correct answers." },
  { id: "master_scholar",  branch: "scholar",   tier: 3, cost: 3, prereq: "scholars_eye",    name: "Master Scholar",   desc: "Additional +15% XP and +5% lumens." },
  // Duelist
  { id: "iron_will",       branch: "duelist",   tier: 1, cost: 1, prereq: null,             name: "Iron Will",        desc: "+20 starting HP in Spell Duels and Echo Chamber." },
  { id: "counterstrike",   branch: "duelist",   tier: 2, cost: 2, prereq: "iron_will",       name: "Counterstrike",    desc: "Deal +5 bonus damage per correct answer in Duels." },
  { id: "archon",          branch: "duelist",   tier: 3, cost: 3, prereq: "counterstrike",   name: "Archon",           desc: "20% chance to crit in Duels — a critical strike deals 50 damage." },
  // Collector
  { id: "lucky_charm",     branch: "collector", tier: 1, cost: 1, prereq: null,             name: "Lucky Charm",      desc: "+5% chance to earn a Familiar from games." },
  { id: "silver_tongue",   branch: "collector", tier: 2, cost: 2, prereq: "lucky_charm",     name: "Silver Tongue",    desc: "+10% lumens from all sources." },
  { id: "collector_prime", branch: "collector", tier: 3, cost: 3, prereq: "silver_tongue",   name: "Collector's Prime",desc: "Claim one free single wish every 7 days." },
];

function availableSkillPoints(player) {
  const total = Math.max(0, player.level - 2);
  const spent = (player.skills || []).reduce((sum, id) => {
    const s = SKILLS.find(x => x.id === id);
    return sum + (s?.cost || 0);
  }, 0);
  return total - spent;
}

function canUnlockSkill(player, skill) {
  if ((player.skills || []).includes(skill.id)) return false;
  if (skill.prereq && !(player.skills || []).includes(skill.prereq)) return false;
  return availableSkillPoints(player) >= skill.cost;
}

function hasSkill(player, id) { return (player.skills || []).includes(id); }

// ============================================================================
// ECHO CHAMBER RIVALS
// ============================================================================

const RIVALS = [
  { id: "quill",   name: "Quill the Apprentice", color: "#5db4e8", maxHp: 60,  damage: 15, desc: "A nervous first-year with surprising instincts." },
  { id: "thorn",   name: "Thorn the Adept",      color: "#f27052", maxHp: 100, damage: 22, desc: "A silver-medalist duelist of the eastern hall." },
  { id: "vaelora", name: "Sage Vaelora",         color: "#b084e0", maxHp: 150, damage: 30, desc: "The feared professor. Has not lost a bout in years." },
];

// ============================================================================
// EXCHANGE HALL (NPC MERCHANTS)
// ============================================================================

const MERCHANTS = [
  { id: "alchemist", name: "The Wandering Alchemist", color: "#8fd9b8", desc: "Trades between the elements." },
  { id: "hermit",    name: "Old Hermit Finch",        color: "#c4915c", desc: "Exchanges Familiars for lumens." },
  { id: "broker",    name: "Starlit Broker",          color: "#f472b6", desc: "Whispers duplicates into something grander." },
];

// Seeded PRNG so merchant offers are deterministic per "day"
function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
}

function dayOfEra() {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 6)); // rotates every 6 hours
}

function generateMerchantOffers(seed) {
  const rand = seededRand(seed);
  const pickEl = () => Object.keys(ELEMENTS)[Math.floor(rand() * 6)];
  const pickRarity = (bias = 0) => {
    const r = rand();
    if (r < 0.55 + bias) return "glimmer";
    if (r < 0.82 + bias) return "shimmer";
    if (r < 0.95) return "gleam";
    return "radiant";
  };

  // Alchemist: trades an element's Familiar for another element's Familiar of same rarity
  const wantEl = pickEl();
  let giveEl = pickEl();
  while (giveEl === wantEl) giveEl = pickEl();
  const tradeRarity = pickRarity();

  // Hermit: wants any Familiar of a specific rarity, offers lumens
  const hermitRarity = rand() < 0.6 ? "glimmer" : "shimmer";
  const hermitLumens = hermitRarity === "glimmer" ? 75 : 180;

  // Broker: wants 2 Familiars of the same rarity, offers one of the next tier up
  const brokerFromRarity = rand() < 0.7 ? "glimmer" : "shimmer";
  const brokerToRarity = brokerFromRarity === "glimmer" ? "shimmer" : "gleam";

  return [
    {
      merchantId: "alchemist",
      wants: { type: "familiar_element_rarity", element: wantEl, rarity: tradeRarity },
      gives: { type: "familiar_element_rarity", element: giveEl, rarity: tradeRarity },
      label: `Any ${ELEMENTS[wantEl].name} ${RARITIES[tradeRarity].name} for a ${ELEMENTS[giveEl].name} ${RARITIES[tradeRarity].name}`,
    },
    {
      merchantId: "hermit",
      wants: { type: "familiar_rarity", rarity: hermitRarity },
      gives: { type: "lumens", amount: hermitLumens },
      label: `Any ${RARITIES[hermitRarity].name} Familiar for ${hermitLumens} lumens`,
    },
    {
      merchantId: "broker",
      wants: { type: "two_same_rarity", rarity: brokerFromRarity },
      gives: { type: "familiar_rarity", rarity: brokerToRarity },
      label: `Two ${RARITIES[brokerFromRarity].name}s for one ${RARITIES[brokerToRarity].name}`,
    },
  ];
}

function familiarsMatchingWant(player, want) {
  if (want.type === "familiar_element_rarity") {
    return player.familiars.filter(f => f.element === want.element && f.rarity === want.rarity);
  }
  if (want.type === "familiar_rarity" || want.type === "two_same_rarity") {
    return player.familiars.filter(f => f.rarity === want.rarity);
  }
  return [];
}

function canFulfillOffer(player, offer) {
  const matching = familiarsMatchingWant(player, offer.wants);
  if (offer.wants.type === "two_same_rarity") return matching.length >= 2;
  return matching.length >= 1;
}

// ============================================================================
// PUBLIC LIBRARY (shared storage keys)
// ============================================================================

const LIB_PREFIX = "lumora_lib:";

// ============================================================================
// HELPERS: PERSISTENCE & INIT
// ============================================================================

const STORAGE_KEY = "lumora_save_v1";

const initialPlayerState = () => ({
  name: "Apprentice",
  lumens: 200,
  level: 1,
  xp: 0,
  familiars: [],
  achievements: [],        // list of achievement ids earned
  badges: ["b_apprentice","b_founding"],
  equippedBadges: ["b_apprentice"],
  customQuizzes: [],
  skills: [],
  publishedQuizIds: [],    // local cache of IDs player has published
  merchantOffers: null,
  merchantSeed: null,
  lastFreeWishDay: null,
  stats: {
    totalCorrect: 0,
    totalAnswered: 0,
    bestStreak: 0,
    currentStreak: 0,
    perfectRuns: 0,
    duelsWon: 0,
    alchemyRuns: 0,
    vaultRuns: 0,
    echoChambersCleared: 0,
    tradesCompleted: 0,
    quizzesPlayed: 0,
    quizzesCreated: 0,
    upsetWins: 0,
  },
  onboarded: false,
});

const xpForLevel = (lv) => 100 + (lv - 1) * 50;

function addXp(state, amount) {
  const next = { ...state, xp: state.xp + amount };
  while (next.xp >= xpForLevel(next.level)) {
    next.xp -= xpForLevel(next.level);
    next.level += 1;
    next.lumens += 50; // level-up bonus
  }
  return next;
}

function rollRarity() {
  const total = Object.values(RARITIES).reduce((a, r) => a + r.weight, 0);
  let roll = Math.random() * total;
  for (const key of RARITY_ORDER) {
    roll -= RARITIES[key].weight;
    if (roll <= 0) return key;
  }
  return "glimmer";
}

function randomSpecies() {
  return SPECIES[Math.floor(Math.random() * SPECIES.length)];
}

function makeFamiliar(rarityOverride) {
  const rarity = rarityOverride || rollRarity();
  let species;
  if (rarity === "primordial") {
    species = PRIMORDIALS[Math.floor(Math.random() * PRIMORDIALS.length)];
  } else {
    species = randomSpecies();
  }
  const activeElement = rarity === "prismatic" ? Object.keys(ELEMENTS)[Math.floor(Math.random()*6)] : species.element;
  return {
    uid: `f_${Date.now()}_${Math.floor(Math.random()*9999)}`,
    speciesId: species.id,
    name: species.name,
    desc: species.desc,
    element: species.element,
    activeElement,
    rarity,
    obtainedAt: Date.now(),
    isPrimordial: rarity === "primordial",
  };
}

function checkNewAchievements(state) {
  const earned = new Set(state.achievements);
  const newly = [];
  let lumensGained = 0;
  for (const a of ACHIEVEMENTS) {
    if (!earned.has(a.id) && a.condition(state)) {
      earned.add(a.id);
      newly.push(a);
      lumensGained += a.lumens || 0;
    }
  }
  return { achievements: [...earned], newly, lumensGained };
}

function checkNewBadges(state) {
  const current = new Set(state.badges);
  const newly = [];
  for (const b of BADGES) {
    if (!current.has(b.id) && b.unlock(state)) {
      current.add(b.id);
      newly.push(b);
    }
  }
  return { badges: [...current], newly };
}

// Skill-based multipliers
function lumensMultiplier(player) {
  let m = 1;
  if (hasSkill(player, "silver_tongue")) m += 0.10;
  if (hasSkill(player, "master_scholar")) m += 0.05;
  return m;
}
function xpMultiplier(player) {
  let m = 1;
  if (hasSkill(player, "bookworm")) m += 0.05;
  if (hasSkill(player, "master_scholar")) m += 0.15;
  return m;
}
function familiarDropBonus(player) {
  return hasSkill(player, "lucky_charm") ? 0.05 : 0;
}
function duelStartingHp(player) {
  return hasSkill(player, "iron_will") ? 120 : 100;
}
function duelBonusDamage(player) {
  return hasSkill(player, "counterstrike") ? 5 : 0;
}
function hasArchonCrit(player) {
  return hasSkill(player, "archon");
}

const DAY_MS = 24 * 60 * 60 * 1000;
function currentDayIndex() { return Math.floor(Date.now() / DAY_MS); }
function canClaimFreeWish(player) {
  if (!hasSkill(player, "collector_prime")) return false;
  const last = player.lastFreeWishDay || 0;
  return currentDayIndex() - last >= 7;
}

// ============================================================================
// FAMILIAR ART (procedural SVG)
// ============================================================================

function FamiliarArt({ familiar, size = 100 }) {
  const s = SPECIES.find(sp => sp.id === familiar.speciesId) || PRIMORDIALS.find(p => p.id === familiar.speciesId);
  const el = ELEMENTS[familiar.activeElement || familiar.element];
  const rarity = RARITIES[familiar.rarity];
  const speciesId = familiar.speciesId;

  // Rarity-based effects
  const hasAura = rarity.tier >= 4;
  const hasHalo = rarity.tier >= 5;
  const hasOrbits = rarity.tier === 6;
  const isPrismatic = familiar.rarity === "prismatic";
  const isEclipsed = familiar.rarity === "eclipsed";
  const isPrimordial = familiar.rarity === "primordial";
  const hasParticles = rarity.tier >= 3;
  const hasGlow = rarity.tier >= 2;

  const mainColor = isEclipsed ? "#1a0f2e" : el.color;
  const accentColor = isEclipsed ? "#6b21a8" : "#fff";

  const bodyShape = (() => {
    // Map species to a shape
    switch (speciesId) {
      case "emberfox": return <FoxShape color={mainColor} accent={accentColor} />;
      case "flamelet": return <BlobShape color={mainColor} accent={accentColor} />;
      case "volcanix": return <DragonShape color={mainColor} accent={accentColor} />;
      case "bubblefin": return <FishShape color={mainColor} accent={accentColor} />;
      case "coralpup": return <PupShape color={mainColor} accent={accentColor} />;
      case "tidekin": return <RibbonShape color={mainColor} accent={accentColor} />;
      case "rockling": return <BeetleShape color={mainColor} accent={accentColor} />;
      case "mossback": return <TortoiseShape color={mainColor} accent={accentColor} />;
      case "geodewing": return <MothShape color={mainColor} accent={accentColor} />;
      case "breezeling": return <WispShape color={mainColor} accent={accentColor} />;
      case "cloudpuff": return <CloudShape color={mainColor} accent={accentColor} />;
      case "skylark": return <BirdShape color={mainColor} accent={accentColor} />;
      case "sparkmote": return <StarShape color={mainColor} accent={accentColor} />;
      case "dawnwing": return <ButterflyShape color={mainColor} accent={accentColor} />;
      case "starlitcub": return <CubShape color={mainColor} accent={accentColor} />;
      case "whisperling": return <WispShape color={mainColor} accent={accentColor} />;
      case "moonveil": return <ButterflyShape color={mainColor} accent={accentColor} />;
      case "silentpaw": return <FoxShape color={mainColor} accent={accentColor} />;
      // Primordials use unique shapes
      case "vael": return <DragonShape color={mainColor} accent="#fff4d1" big />;
      case "thalass": return <RibbonShape color={mainColor} accent="#fff4d1" big />;
      case "tarn": return <TortoiseShape color={mainColor} accent="#fff4d1" big />;
      case "aero": return <BirdShape color={mainColor} accent="#fff4d1" big />;
      case "solune": return <ButterflyShape color={mainColor} accent="#fff4d1" big />;
      case "nocta": return <FoxShape color={mainColor} accent="#fff4d1" big />;
      default: return <BlobShape color={mainColor} accent={accentColor} />;
    }
  })();

  return (
    <div
      className="relative inline-block"
      style={{
        width: size,
        height: size,
        filter: isPrismatic ? "none" : undefined,
        animation: isPrismatic ? "prism 4s linear infinite" : undefined,
      }}
    >
      {/* Aura/glow background */}
      {hasGlow && (
        <div
          className="absolute inset-0 rounded-full animate-pulse-glow"
          style={{
            background: `radial-gradient(circle, ${rarity.glow}55 0%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />
      )}

      {hasAura && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${rarity.glow}88 20%, transparent 60%)`,
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Halo ring */}
      {hasHalo && (
        <div
          className="absolute left-1/2 top-0 rounded-full border-2"
          style={{
            width: size * 0.7,
            height: size * 0.12,
            borderColor: rarity.glow,
            transform: "translateX(-50%) translateY(-20%)",
            boxShadow: `0 0 12px ${rarity.glow}`,
          }}
        />
      )}

      {/* Orbiting stars (celestial) */}
      {hasOrbits && (
        <>
          {[0, 120, 240].map((deg, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: "50%", top: "50%",
                animation: `orbit 4s linear infinite`,
                animationDelay: `${-i * 1.33}s`,
              }}
            >
              <Star size={size * 0.12} fill={rarity.glow} color={rarity.glow} />
            </div>
          ))}
        </>
      )}

      {/* Sparkle particles */}
      {hasParticles && (
        <>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 20}%`,
                top: `${10 + (i % 2) * 60}%`,
                animation: `sparkle 2s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <Sparkles size={size * 0.12} color={rarity.glow} fill={rarity.glow} />
            </div>
          ))}
        </>
      )}

      {/* Primordial crown effect */}
      {isPrimordial && (
        <div
          className="absolute inset-[-10%] rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, ${el.color}22, transparent, ${el.color}66, transparent, ${el.color}22)`,
            animation: "nebula 8s linear infinite",
          }}
        />
      )}

      {/* Main creature body */}
      <div className="absolute inset-0 flex items-center justify-center animate-float">
        <svg viewBox="0 0 100 100" width={size * 0.8} height={size * 0.8}>
          {bodyShape}
        </svg>
      </div>
    </div>
  );
}

// Procedural creature shapes - simple but charming
function FoxShape({ color, accent }) {
  return (
    <g>
      <ellipse cx="50" cy="62" rx="26" ry="20" fill={color} />
      <circle cx="50" cy="45" r="22" fill={color} />
      <polygon points="33,30 40,20 45,32" fill={color} />
      <polygon points="67,30 60,20 55,32" fill={color} />
      <polygon points="35,30 41,25 43,32" fill={accent} opacity="0.6" />
      <polygon points="65,30 59,25 57,32" fill={accent} opacity="0.6" />
      <circle cx="42" cy="46" r="3" fill="#1a0e2e" />
      <circle cx="58" cy="46" r="3" fill="#1a0e2e" />
      <circle cx="41" cy="45" r="1" fill="#fff" />
      <circle cx="57" cy="45" r="1" fill="#fff" />
      <ellipse cx="50" cy="54" rx="3" ry="2" fill="#1a0e2e" />
      <path d="M 76 70 Q 92 60 88 85" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="88" cy="85" r="5" fill={accent} opacity="0.7" />
    </g>
  );
}
function BlobShape({ color, accent }) {
  return (
    <g>
      <path d="M 50 20 Q 75 25 78 55 Q 75 80 50 82 Q 25 80 22 55 Q 25 25 50 20 Z" fill={color} />
      <path d="M 50 22 Q 72 28 72 50 Q 68 42 58 40 Q 50 38 50 22 Z" fill={accent} opacity="0.3" />
      <circle cx="42" cy="48" r="3" fill="#1a0e2e" />
      <circle cx="58" cy="48" r="3" fill="#1a0e2e" />
      <circle cx="41" cy="47" r="1" fill="#fff" />
      <circle cx="57" cy="47" r="1" fill="#fff" />
      <path d="M 44 58 Q 50 62 56 58" stroke="#1a0e2e" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}
function DragonShape({ color, accent, big }) {
  return (
    <g>
      <ellipse cx="50" cy="60" rx="22" ry="18" fill={color} />
      <circle cx="50" cy="42" r="18" fill={color} />
      <polygon points="36,28 40,18 46,30" fill={color} />
      <polygon points="64,28 60,18 54,30" fill={color} />
      <path d="M 50 25 L 47 12 L 53 12 Z" fill={accent} opacity="0.6" />
      <circle cx="43" cy="43" r="3" fill="#1a0e2e" />
      <circle cx="57" cy="43" r="3" fill="#1a0e2e" />
      <circle cx="42" cy="42" r="1" fill={big ? "#fff4d1" : "#fff"} />
      <circle cx="56" cy="42" r="1" fill={big ? "#fff4d1" : "#fff"} />
      <path d="M 22 55 Q 10 50 8 65 Q 15 68 25 62" fill={color} opacity="0.85" />
      <path d="M 78 55 Q 90 50 92 65 Q 85 68 75 62" fill={color} opacity="0.85" />
      <path d="M 22 58 Q 14 56 12 65" stroke={accent} strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M 78 58 Q 86 56 88 65" stroke={accent} strokeWidth="1" fill="none" opacity="0.4" />
    </g>
  );
}
function FishShape({ color, accent }) {
  return (
    <g>
      <ellipse cx="48" cy="50" rx="28" ry="18" fill={color} />
      <polygon points="20,50 8,38 8,62" fill={color} />
      <path d="M 48 35 L 58 25 L 52 38 Z" fill={color} opacity="0.85" />
      <circle cx="58" cy="46" r="3" fill="#1a0e2e" />
      <circle cx="57" cy="45" r="1" fill="#fff" />
      <circle cx="30" cy="42" r="5" fill={accent} opacity="0.3" />
      <circle cx="40" cy="55" r="3" fill={accent} opacity="0.3" />
      <circle cx="80" cy="30" r="2" fill={accent} opacity="0.6" />
      <circle cx="85" cy="35" r="1.5" fill={accent} opacity="0.6" />
    </g>
  );
}
function PupShape({ color, accent }) {
  return (
    <g>
      <ellipse cx="50" cy="65" rx="22" ry="16" fill={color} />
      <circle cx="50" cy="45" r="20" fill={color} />
      <ellipse cx="33" cy="35" rx="7" ry="10" fill={color} />
      <ellipse cx="67" cy="35" rx="7" ry="10" fill={color} />
      <circle cx="42" cy="46" r="3" fill="#1a0e2e" />
      <circle cx="58" cy="46" r="3" fill="#1a0e2e" />
      <circle cx="41" cy="45" r="1" fill="#fff" />
      <circle cx="57" cy="45" r="1" fill="#fff" />
      <ellipse cx="50" cy="54" rx="3" ry="2" fill="#1a0e2e" />
      <path d="M 46 58 Q 50 62 54 58" stroke="#1a0e2e" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="60" r="2" fill={accent} opacity="0.4" />
      <circle cx="70" cy="62" r="2" fill={accent} opacity="0.4" />
    </g>
  );
}
function RibbonShape({ color, accent }) {
  return (
    <g>
      <path d="M 20 30 Q 40 20 50 40 Q 60 60 80 50 Q 70 70 50 60 Q 30 70 20 50 Q 10 35 20 30 Z" fill={color} opacity="0.9"/>
      <path d="M 22 32 Q 40 24 48 40" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="25" cy="40" r="3" fill="#1a0e2e" />
      <circle cx="24" cy="39" r="1" fill="#fff" />
    </g>
  );
}
function BeetleShape({ color, accent }) {
  return (
    <g>
      <ellipse cx="50" cy="55" rx="28" ry="22" fill={color} />
      <line x1="50" y1="35" x2="50" y2="75" stroke="#1a0e2e" strokeWidth="1" opacity="0.3" />
      <path d="M 50 35 Q 30 40 28 50" stroke={accent} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M 50 35 Q 70 40 72 50" stroke={accent} strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="42" cy="42" r="3" fill="#1a0e2e" />
      <circle cx="58" cy="42" r="3" fill="#1a0e2e" />
      <circle cx="41" cy="41" r="1" fill="#fff" />
      <circle cx="57" cy="41" r="1" fill="#fff" />
      <line x1="35" y1="28" x2="30" y2="20" stroke={color} strokeWidth="2" />
      <line x1="65" y1="28" x2="70" y2="20" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="20" r="2" fill={accent} opacity="0.6" />
      <circle cx="70" cy="20" r="2" fill={accent} opacity="0.6" />
    </g>
  );
}
function TortoiseShape({ color, accent, big }) {
  return (
    <g>
      <ellipse cx="50" cy="60" rx="30" ry="18" fill={color} />
      <ellipse cx="50" cy="55" rx="26" ry="18" fill={color} />
      <path d="M 35 55 Q 45 50 50 55 Q 55 50 65 55" stroke={accent} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="50" cy="60" r="3" fill={accent} opacity="0.4" />
      <circle cx="35" cy="55" r="2" fill={accent} opacity="0.4" />
      <circle cx="65" cy="55" r="2" fill={accent} opacity="0.4" />
      <circle cx="78" cy="55" r="7" fill={color} />
      <circle cx="81" cy="53" r="2" fill="#1a0e2e" />
      <circle cx="82" cy="52" r="0.5" fill={big ? "#fff4d1" : "#fff"} />
      <ellipse cx="45" cy="40" rx="4" ry="3" fill={accent} opacity="0.6" />
      <ellipse cx="55" cy="38" rx="3" ry="4" fill={accent} opacity="0.7" />
    </g>
  );
}
function MothShape({ color, accent }) {
  return (
    <g>
      <path d="M 50 50 Q 20 35 15 55 Q 20 70 50 60 Z" fill={color} opacity="0.9" />
      <path d="M 50 50 Q 80 35 85 55 Q 80 70 50 60 Z" fill={color} opacity="0.9" />
      <ellipse cx="50" cy="50" rx="4" ry="14" fill="#1a0e2e" />
      <circle cx="48" cy="38" r="2" fill="#1a0e2e" />
      <circle cx="52" cy="38" r="2" fill="#1a0e2e" />
      <line x1="48" y1="38" x2="40" y2="28" stroke="#1a0e2e" strokeWidth="1" />
      <line x1="52" y1="38" x2="60" y2="28" stroke="#1a0e2e" strokeWidth="1" />
      <circle cx="28" cy="50" r="4" fill={accent} opacity="0.5" />
      <circle cx="72" cy="50" r="4" fill={accent} opacity="0.5" />
    </g>
  );
}
function WispShape({ color, accent }) {
  return (
    <g>
      <path d="M 50 25 Q 32 40 35 60 Q 40 78 50 78 Q 60 78 65 60 Q 68 40 50 25 Z" fill={color} opacity="0.88" />
      <path d="M 50 28 Q 38 42 40 58" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="44" cy="46" r="3" fill="#1a0e2e" />
      <circle cx="56" cy="46" r="3" fill="#1a0e2e" />
      <circle cx="43" cy="45" r="1" fill="#fff" />
      <circle cx="55" cy="45" r="1" fill="#fff" />
      <path d="M 44 56 Q 50 60 56 56" stroke="#1a0e2e" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="30" r="2" fill={accent} opacity="0.6" />
      <circle cx="70" cy="32" r="1.5" fill={accent} opacity="0.6" />
    </g>
  );
}
function CloudShape({ color, accent }) {
  return (
    <g>
      <circle cx="35" cy="55" r="15" fill={color} />
      <circle cx="50" cy="50" r="18" fill={color} />
      <circle cx="65" cy="55" r="15" fill={color} />
      <circle cx="45" cy="62" r="13" fill={color} />
      <circle cx="55" cy="62" r="13" fill={color} />
      <circle cx="45" cy="52" r="3" fill="#1a0e2e" />
      <circle cx="55" cy="52" r="3" fill="#1a0e2e" />
      <circle cx="44" cy="51" r="1" fill="#fff" />
      <circle cx="54" cy="51" r="1" fill="#fff" />
      <path d="M 45 60 Q 50 63 55 60" stroke="#1a0e2e" strokeWidth="1.5" fill="none" />
    </g>
  );
}
function BirdShape({ color, accent, big }) {
  return (
    <g>
      <ellipse cx="50" cy="55" rx="18" ry="22" fill={color} />
      <circle cx="50" cy="40" r="15" fill={color} />
      <polygon points="50,45 60,48 50,52" fill={accent} />
      <path d="M 30 55 Q 15 50 25 65" fill={color} opacity="0.85" />
      <path d="M 70 55 Q 85 50 75 65" fill={color} opacity="0.85" />
      <circle cx="44" cy="40" r="3" fill="#1a0e2e" />
      <circle cx="56" cy="40" r="3" fill="#1a0e2e" />
      <circle cx="43" cy="39" r="1" fill={big ? "#fff4d1" : "#fff"} />
      <circle cx="55" cy="39" r="1" fill={big ? "#fff4d1" : "#fff"} />
      <line x1="45" y1="78" x2="45" y2="85" stroke="#1a0e2e" strokeWidth="1.5" />
      <line x1="55" y1="78" x2="55" y2="85" stroke="#1a0e2e" strokeWidth="1.5" />
    </g>
  );
}
function StarShape({ color, accent }) {
  return (
    <g>
      <polygon points="50,20 58,42 82,42 63,56 70,80 50,66 30,80 37,56 18,42 42,42" fill={color} />
      <polygon points="50,28 55,44 70,44 58,54 62,68 50,60 38,68 42,54 30,44 45,44" fill={accent} opacity="0.6" />
      <circle cx="46" cy="48" r="2" fill="#1a0e2e" />
      <circle cx="54" cy="48" r="2" fill="#1a0e2e" />
    </g>
  );
}
function ButterflyShape({ color, accent, big }) {
  return (
    <g>
      <path d="M 50 50 Q 25 25 15 45 Q 15 65 40 62 Q 48 58 50 50 Z" fill={color} opacity="0.9"/>
      <path d="M 50 50 Q 75 25 85 45 Q 85 65 60 62 Q 52 58 50 50 Z" fill={color} opacity="0.9"/>
      <path d="M 50 52 Q 30 48 25 55 Q 25 72 45 70 Q 48 65 50 52 Z" fill={color} opacity="0.85"/>
      <path d="M 50 52 Q 70 48 75 55 Q 75 72 55 70 Q 52 65 50 52 Z" fill={color} opacity="0.85"/>
      <circle cx="28" cy="42" r="3" fill={accent} opacity="0.7" />
      <circle cx="72" cy="42" r="3" fill={accent} opacity="0.7" />
      <ellipse cx="50" cy="52" rx="3" ry="16" fill="#1a0e2e" />
      <circle cx="48" cy="40" r="1.5" fill={big ? "#fff4d1" : "#fff"} />
      <circle cx="52" cy="40" r="1.5" fill={big ? "#fff4d1" : "#fff"} />
    </g>
  );
}
function CubShape({ color, accent }) {
  return (
    <g>
      <ellipse cx="50" cy="65" rx="22" ry="15" fill={color} />
      <circle cx="50" cy="48" r="20" fill={color} />
      <circle cx="35" cy="35" r="7" fill={color} />
      <circle cx="65" cy="35" r="7" fill={color} />
      <circle cx="35" cy="35" r="4" fill={accent} opacity="0.4" />
      <circle cx="65" cy="35" r="4" fill={accent} opacity="0.4" />
      <circle cx="42" cy="48" r="3" fill="#1a0e2e" />
      <circle cx="58" cy="48" r="3" fill="#1a0e2e" />
      <circle cx="41" cy="47" r="1" fill="#fff" />
      <circle cx="57" cy="47" r="1" fill="#fff" />
      <ellipse cx="50" cy="55" rx="3" ry="2" fill="#1a0e2e" />
      <path d="M 46 60 Q 50 64 54 60" stroke="#1a0e2e" strokeWidth="1.5" fill="none" />
      <circle cx="35" cy="55" r="1" fill={accent} opacity="0.9" />
      <circle cx="65" cy="58" r="1" fill={accent} opacity="0.9" />
      <circle cx="30" cy="70" r="1" fill={accent} opacity="0.9" />
      <circle cx="70" cy="70" r="1" fill={accent} opacity="0.9" />
    </g>
  );
}

// ============================================================================
// SHARED UI PIECES
// ============================================================================

function StarryBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, #1a1236 0%, #0a0618 50%, #050210 100%)" }} />
      <div className="absolute inset-0 animate-nebula opacity-40" style={{
        background: "radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 40%)"
      }} />
      {[...Array(50)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random() * 0.8 + 0.2,
            animation: `pulse-glow ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

function Panel({ children, className = "", glow = false }) {
  return (
    <div className={`relative rounded-2xl ${glow ? "animate-glow-pulse" : ""} ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(30,20,55,0.7) 0%, rgba(20,15,40,0.8) 100%)",
        border: "1px solid rgba(232,200,117,0.2)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}>
      {children}
    </div>
  );
}

function GoldButton({ children, onClick, disabled, className = "", size = "md", variant = "primary" }) {
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    primary: "text-[#1a0e2e]",
    secondary: "text-amber-200",
    ghost: "text-amber-200 bg-transparent",
  };
  const bgStyle = variant === "primary"
    ? { background: "linear-gradient(135deg, #f5d76e 0%, #e8c875 50%, #c9a04a 100%)", boxShadow: "0 4px 14px rgba(232,200,117,0.4)" }
    : variant === "secondary"
    ? { background: "linear-gradient(135deg, rgba(232,200,117,0.15), rgba(232,200,117,0.05))", border: "1px solid rgba(232,200,117,0.4)" }
    : { background: "transparent", border: "1px solid rgba(232,200,117,0.3)" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-display font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 ${sizes[size]} ${variants[variant]} ${className}`}
      style={bgStyle}
    >
      {children}
    </button>
  );
}

function RarityBadge({ rarity, small }) {
  const r = RARITIES[rarity];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-display font-semibold ${small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}`}
      style={{
        background: `${r.color}22`,
        color: r.color,
        border: `1px solid ${r.color}66`,
        textShadow: `0 0 8px ${r.glow}`,
      }}
    >
      {r.name}
    </span>
  );
}

function ElementIcon({ element, size = 16 }) {
  const el = ELEMENTS[element];
  const Icon = el.icon;
  return <Icon size={size} style={{ color: el.color }} />;
}

function Toast({ message, type = "info", onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  const colors = {
    info: "border-sky-400/50 bg-sky-900/60",
    success: "border-emerald-400/50 bg-emerald-900/60",
    achievement: "border-amber-400/70 bg-amber-900/70",
    warn: "border-rose-400/50 bg-rose-900/60",
  };
  return (
    <div className={`fixed top-6 right-6 z-50 rounded-xl backdrop-blur-md border px-4 py-3 max-w-sm font-body animate-scale-in ${colors[type]}`}>
      <div className="text-amber-100 text-sm">{message}</div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function Lumora() {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(initialPlayerState());
  const [screen, setScreen] = useState("home");
  const [subScreen, setSubScreen] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [activeMode, setActiveMode] = useState(null);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [libraryQuizCache, setLibraryQuizCache] = useState([]); // ephemeral play-throughs

  const pushToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, message, type }]);
  };

  // Load from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPlayer(p => ({ ...initialPlayerState(), ...parsed }));
      }
    } catch (e) {}
    setLoading(false);
  }, []);

  // Save to storage on change
  useEffect(() => {
    if (loading) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(player)); } catch (e) {}
  }, [player, loading]);

  // Apply state change, automatically checking for new achievements/badges
  const applyChange = (updater) => {
    setPlayer(prev => {
      let next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      const ach = checkNewAchievements(next);
      next = { ...next, achievements: ach.achievements, lumens: next.lumens + ach.lumensGained };
      const bg = checkNewBadges(next);
      next = { ...next, badges: bg.badges };
      // toasts
      ach.newly.forEach(a => pushToast(`Achievement: ${a.name}  ·  +${a.lumens || 0} lumens`, "achievement"));
      bg.newly.forEach(b => pushToast(`New badge: ${b.name}`, "success"));
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-display text-amber-200" style={{ background: "#0a0618" }}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin" size={36} />
          <div>Opening the Academy gates…</div>
        </div>
      </div>
    );
  }

  const allQuizzes = [...DEFAULT_QUIZZES, ...(player.customQuizzes || []), ...libraryQuizCache];
  const activeQuiz = allQuizzes.find(q => q.id === activeQuizId);

  return (
    <>
      <style>{FONTS_CSS}</style>
      <div className="min-h-screen w-full font-body text-amber-50 relative overflow-x-hidden" style={{ background: "#0a0618" }}>
        <StarryBackground />

        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(ts => ts.filter(x => x.id !== t.id))} />
        ))}

        <div className="relative z-10">
          <TopBar player={player} onGoHome={() => { setScreen("home"); setSubScreen(null); }} />

          <main className="max-w-7xl mx-auto px-4 pb-20 pt-4">
            {screen === "home" && (
              <HomeScreen
                player={player}
                onNavigate={(s) => setScreen(s)}
                onStartMode={(mode) => { setActiveMode(mode); setScreen("play_pick_quiz"); }}
              />
            )}
            {screen === "play_pick_quiz" && (
              <PickQuizScreen
                quizzes={allQuizzes}
                mode={activeMode}
                onBack={() => setScreen("home")}
                onPick={(qid) => { setActiveQuizId(qid); setScreen("play_game"); }}
              />
            )}
            {screen === "play_game" && activeQuiz && (
              <GameScreen
                quiz={activeQuiz}
                mode={activeMode}
                player={player}
                onFinish={(result) => {
                  handleGameFinish(result, activeQuiz, activeMode, applyChange, pushToast);
                  setScreen("play_result");
                  setSubScreen(result);
                }}
                onQuit={() => setScreen("home")}
              />
            )}
            {screen === "play_result" && subScreen && (
              <ResultScreen
                result={subScreen}
                quiz={activeQuiz}
                mode={activeMode}
                onHome={() => { setScreen("home"); setSubScreen(null); }}
                onRetry={() => setScreen("play_game")}
              />
            )}
            {screen === "collection" && (
              <CollectionScreen player={player} onBack={() => setScreen("home")} />
            )}
            {screen === "wishing_pool" && (
              <WishingPoolScreen
                player={player}
                onBack={() => setScreen("home")}
                onWish={(count) => handleWish(count, player, applyChange, pushToast)}
              />
            )}
            {screen === "scriptorium" && !editingQuizId && (
              <ScriptoriumScreen
                player={player}
                onBack={() => setScreen("home")}
                onCreateNew={() => setEditingQuizId("new")}
                onEdit={(id) => setEditingQuizId(id)}
                onDelete={(id) => {
                  applyChange(p => ({
                    ...p,
                    customQuizzes: p.customQuizzes.filter(q => q.id !== id),
                    publishedQuizIds: (p.publishedQuizIds || []).filter(pid => pid !== id),
                  }));
                }}
                onPublish={async (quiz) => {
                  pushToast("Publishing requires a backend — coming soon!", "warn");
                }}
                onUnpublish={async (quizId) => {
                  applyChange(p => ({
                    ...p,
                    publishedQuizIds: (p.publishedQuizIds || []).filter(pid => pid !== quizId),
                  }));
                  pushToast("Quiz removed from the library.", "info");
                }}
                onPlayLibrary={async (item) => {
                  // Library play requires a backend — disabled in local build
                  return;
                }}
              />
            )}
            {screen === "scriptorium" && editingQuizId && (
              <QuizEditorScreen
                existing={editingQuizId === "new" ? null : player.customQuizzes.find(q => q.id === editingQuizId)}
                onCancel={() => setEditingQuizId(null)}
                onSave={(quiz) => {
                  const isNew = editingQuizId === "new";
                  applyChange(p => {
                    const list = isNew
                      ? [...p.customQuizzes, quiz]
                      : p.customQuizzes.map(q => q.id === quiz.id ? quiz : q);
                    return {
                      ...p,
                      customQuizzes: list,
                      stats: { ...p.stats, quizzesCreated: isNew ? p.stats.quizzesCreated + 1 : p.stats.quizzesCreated },
                    };
                  });
                  pushToast(isNew ? "Quiz saved to the Scriptorium" : "Quiz updated", "success");
                  setEditingQuizId(null);
                }}
              />
            )}
            {screen === "spell_school" && (
              <SpellSchoolScreen
                player={player}
                onBack={() => setScreen("home")}
                onUnlock={(skillId) => {
                  const skill = SKILLS.find(s => s.id === skillId);
                  applyChange(p => {
                    if (!skill || !canUnlockSkill(p, skill)) return p;
                    return { ...p, skills: [...(p.skills || []), skillId] };
                  });
                  pushToast(`Skill learned: ${skill?.name}`, "success");
                }}
              />
            )}
            {screen === "exchange" && (
              <ExchangeScreen
                player={player}
                onBack={() => setScreen("home")}
                onTrade={(action) => {
                  if (action.type === "refresh_seed") {
                    applyChange(p => ({ ...p, merchantSeed: action.seed, merchantOffers: action.offers }));
                    return;
                  }
                  if (action.type === "execute") {
                    const offer = action.offer;
                    const chosen = action.chosenFamiliars;
                    applyChange(p => {
                      let next = {
                        ...p,
                        familiars: p.familiars.filter(f => !chosen.includes(f.uid)),
                      };
                      // Give reward
                      if (offer.gives.type === "lumens") {
                        next = { ...next, lumens: next.lumens + offer.gives.amount };
                      } else if (offer.gives.type === "familiar_element_rarity") {
                        // Build a familiar of given element/rarity
                        const pool = SPECIES.filter(sp => sp.element === offer.gives.element);
                        const species = pool[Math.floor(Math.random() * pool.length)];
                        const f = {
                          uid: `f_${Date.now()}_${Math.floor(Math.random()*9999)}`,
                          speciesId: species.id,
                          name: species.name,
                          desc: species.desc,
                          element: species.element,
                          activeElement: species.element,
                          rarity: offer.gives.rarity,
                          obtainedAt: Date.now(),
                          isPrimordial: false,
                        };
                        next = { ...next, familiars: [...next.familiars, f] };
                      } else if (offer.gives.type === "familiar_rarity") {
                        const f = makeFamiliar(offer.gives.rarity);
                        next = { ...next, familiars: [...next.familiars, f] };
                      }
                      next = { ...next, stats: { ...next.stats, tradesCompleted: next.stats.tradesCompleted + 1 } };
                      return next;
                    });
                    pushToast("Trade complete.", "success");
                  }
                }}
              />
            )}
            {screen === "achievements" && (
              <AchievementsScreen player={player} onBack={() => setScreen("home")} />
            )}
            {screen === "badges" && (
              <BadgesScreen
                player={player}
                onBack={() => setScreen("home")}
                onEquip={(id) => {
                  applyChange(p => {
                    let eq = p.equippedBadges.slice();
                    if (eq.includes(id)) eq = eq.filter(x => x !== id);
                    else if (eq.length < 3) eq = [...eq, id];
                    else { eq.shift(); eq.push(id); }
                    return { ...p, equippedBadges: eq };
                  });
                }}
              />
            )}
            {screen === "profile" && (
              <ProfileScreen
                player={player}
                onBack={() => setScreen("home")}
                onRename={(name) => applyChange({ name })}
                onReset={() => {
                  applyChange(() => initialPlayerState());
                  pushToast("Your journey has been reset.", "warn");
                }}
              />
            )}
          </main>

          <footer className="text-center text-xs text-amber-200/30 py-6 font-serif italic">
            Lumora Academy · where knowledge kindles light
          </footer>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// TOP BAR
// ============================================================================

function TopBar({ player, onGoHome }) {
  const xpNeeded = xpForLevel(player.level);
  const pct = Math.min(100, (player.xp / xpNeeded) * 100);
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md" style={{ background: "linear-gradient(180deg, rgba(10,6,24,0.95), rgba(10,6,24,0.8))", borderBottom: "1px solid rgba(232,200,117,0.15)" }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <button onClick={onGoHome} className="flex items-center gap-2 group">
          <div className="relative">
            <Sparkles size={28} className="text-amber-300 group-hover:rotate-12 transition-transform" />
            <div className="absolute inset-0 blur-md bg-amber-300 opacity-40" />
          </div>
          <div className="font-display text-2xl shimmer-text tracking-widest">LUMORA</div>
        </button>
        <div className="flex-1" />
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-300/20 bg-amber-900/10">
          <Coins size={16} className="text-amber-300" />
          <span className="font-display text-amber-100 font-semibold">{player.lumens.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-300/20 bg-purple-900/10">
          <Star size={16} className="text-purple-300" fill="currentColor" />
          <span className="font-display text-purple-100 font-semibold">Lv {player.level}</span>
          <div className="w-16 h-1.5 rounded-full bg-purple-900/60 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// HOME SCREEN
// ============================================================================

function HomeScreen({ player, onNavigate, onStartMode }) {
  const modes = [
    { id: "standard", name: "Quick Quiz",       desc: "Answer questions, earn lumens.",          icon: BookOpen, color: "#5db4e8" },
    { id: "duel",     name: "Spell Duel",       desc: "Duel an AI rival with Familiar powers.",  icon: Swords,   color: "#f27052" },
    { id: "alchemy",  name: "Alchemy Lab",      desc: "Brew potions by answering questions.",    icon: FlaskConical,    color: "#8fd9b8" },
    { id: "vault",    name: "Memory Vault",     desc: "Speed-crack vaults before the alarm.",    icon: KeyRound, color: "#f5d76e" },
    { id: "echo",     name: "Echo Chamber",     desc: "A tournament: face three rivals in sequence.", icon: Users, color: "#b084e0" },
  ];

  const equipped = player.equippedBadges
    .map(id => BADGES.find(b => b.id === id))
    .filter(Boolean);

  const latestFamiliar = player.familiars[player.familiars.length - 1];
  const skillPoints = availableSkillPoints(player);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <section className="text-center py-8">
        <div className="font-serif italic text-amber-200/60 text-sm mb-2">Welcome back, {player.name}</div>
        <h1 className="font-display text-4xl sm:text-5xl shimmer-text tracking-widest mb-2">THE ACADEMY</h1>
        <div className="font-serif italic text-amber-100/50 text-sm">Choose your path of study.</div>
        {equipped.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {equipped.map(b => (
              <div key={b.id} className={`px-2.5 py-1 rounded-full border ${BADGE_TIER_STYLES[b.tier].bg} ${BADGE_TIER_STYLES[b.tier].border}`}>
                <span className={`font-display text-xs ${BADGE_TIER_STYLES[b.tier].text}`}>{b.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Game Modes */}
      <section>
        <div className="font-display tracking-widest text-amber-200/80 text-sm mb-3 flex items-center gap-2">
          <span className="w-8 h-px bg-amber-300/40" />
          HALLS OF PRACTICE
          <span className="flex-1 h-px bg-amber-300/40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {modes.map((m, idx) => (
            <button key={m.id} onClick={() => onStartMode(m.id)}
              className="animate-fade-in-up text-left group"
              style={{ animationDelay: `${idx * 0.08}s` }}>
              <Panel className="p-4 hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center relative"
                    style={{ background: `${m.color}20`, border: `1px solid ${m.color}40` }}>
                    <m.icon size={22} style={{ color: m.color }} />
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition" style={{ boxShadow: `0 0 20px ${m.color}88` }} />
                  </div>
                  <div className="font-display text-lg text-amber-100">{m.name}</div>
                </div>
                <div className="text-xs text-amber-200/60 font-serif leading-relaxed">{m.desc}</div>
              </Panel>
            </button>
          ))}
        </div>
      </section>

      {/* The Pillars */}
      <section>
        <div className="font-display tracking-widest text-amber-200/80 text-sm mb-3 flex items-center gap-2">
          <span className="w-8 h-px bg-amber-300/40" />
          THE PILLARS OF LUMORA
          <span className="flex-1 h-px bg-amber-300/40" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <PillarCard icon={Gem}     label="Collection"   sub={`${player.familiars.length} Familiars`} onClick={() => onNavigate("collection")} color="#b084e0"/>
          <PillarCard icon={Wand2}   label="Wishing Pool" sub="Summon new Familiars"                   onClick={() => onNavigate("wishing_pool")} color="#f472b6" glow/>
          <PillarCard icon={BookOpen}label="Scriptorium"  sub="Create & share quizzes"                 onClick={() => onNavigate("scriptorium")} color="#5db4e8"/>
          <PillarCard icon={Network} label="Spell School" sub={skillPoints > 0 ? `${skillPoints} skill point${skillPoints === 1 ? "" : "s"} to spend` : "Unlock abilities as you level"} onClick={() => onNavigate("spell_school")} color="#86efac" glow={skillPoints > 0}/>
          <PillarCard icon={Store}   label="Exchange Hall"sub="Trade with wandering merchants"         onClick={() => onNavigate("exchange")} color="#c4915c"/>
          <PillarCard icon={Trophy}  label="Trophy Hall"  sub={`${player.achievements.length}/${ACHIEVEMENTS.length} achievements`} onClick={() => onNavigate("achievements")} color="#f5d76e"/>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <button onClick={() => onNavigate("badges")} className="col-span-1 text-left">
          <Panel className="p-4 hover:scale-[1.01] transition-all h-full">
            <div className="flex items-center gap-2 mb-2">
              <Award size={18} className="text-amber-300" />
              <div className="font-display text-amber-100">Badges</div>
            </div>
            <div className="text-xs text-amber-200/60 font-serif">{player.badges.length} earned · {player.equippedBadges.length}/3 equipped</div>
          </Panel>
        </button>

        <button onClick={() => onNavigate("profile")} className="col-span-1 text-left">
          <Panel className="p-4 hover:scale-[1.01] transition-all h-full">
            <div className="flex items-center gap-2 mb-2">
              <User size={18} className="text-amber-300" />
              <div className="font-display text-amber-100">Profile</div>
            </div>
            <div className="text-xs text-amber-200/60 font-serif">Stats & settings</div>
          </Panel>
        </button>

        {latestFamiliar && (
          <Panel className="col-span-1 p-4">
            <div className="flex items-center gap-3">
              <FamiliarArt familiar={latestFamiliar} size={72} />
              <div className="flex-1 min-w-0">
                <div className="font-display text-amber-100 text-sm truncate">{latestFamiliar.name}</div>
                <RarityBadge rarity={latestFamiliar.rarity} small />
                <div className="text-xs text-amber-200/50 font-serif italic mt-1">newest companion</div>
              </div>
            </div>
          </Panel>
        )}
      </section>
    </div>
  );
}

function PillarCard({ icon: Icon, label, sub, onClick, color, glow }) {
  return (
    <button onClick={onClick} className="text-left group">
      <Panel className={`p-4 hover:scale-[1.02] transition-all ${glow ? "animate-glow-pulse" : ""}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
            <Icon size={20} style={{ color }} />
          </div>
          <div>
            <div className="font-display text-amber-100 text-sm">{label}</div>
            <div className="text-[11px] text-amber-200/60 font-serif">{sub}</div>
          </div>
        </div>
      </Panel>
    </button>
  );
}

// ============================================================================
// PICK QUIZ SCREEN
// ============================================================================

function PickQuizScreen({ quizzes, mode, onBack, onPick }) {
  const modeNames = {
    standard: "Quick Quiz",
    duel: "Spell Duel",
    alchemy: "Alchemy Lab",
    vault: "Memory Vault",
    echo: "Echo Chamber",
  };
  return (
    <div className="space-y-4 animate-fade-in-up">
      <BackBar onBack={onBack} title={`Choose a Quiz · ${modeNames[mode] || "Play"}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {quizzes.map((q, i) => (
          <button key={q.id} onClick={() => onPick(q.id)} className="text-left animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <Panel className="p-4 hover:scale-[1.02] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="font-display text-amber-100">{q.title}</div>
                {q.builtin && <span className="text-[10px] font-display text-amber-300/80 border border-amber-300/30 rounded-full px-2 py-0.5">Academy</span>}
              </div>
              <div className="text-xs text-amber-200/60 font-serif italic mb-3">{q.subject} · Grades {q.grade} · {q.questions.length} questions</div>
              <div className="flex items-center gap-2 text-[11px] text-amber-200/50 font-body">
                <BookOpen size={12} />
                <span>{q.author}</span>
              </div>
            </Panel>
          </button>
        ))}
      </div>
    </div>
  );
}

function BackBar({ onBack, title, right }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center border border-amber-300/20 hover:border-amber-300/50 hover:bg-amber-300/10 transition-all">
        <ArrowLeft size={18} className="text-amber-200" />
      </button>
      <h2 className="font-display text-xl text-amber-100 tracking-wide flex-1">{title}</h2>
      {right}
    </div>
  );
}

// ============================================================================
// GAME SCREEN
// ============================================================================

function GameScreen({ quiz, mode, player, onFinish, onQuit }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [lumensEarned, setLumensEarned] = useState(0);
  const finishedRef = useRef(false);

  // Mode-specific state
  const startingHp = duelStartingHp(player);
  const [duelState, setDuelState] = useState(() => {
    if (mode === "duel") return { playerHp: startingHp, foeHp: 100, lastCrit: false };
    if (mode === "echo") return { playerHp: startingHp, foeHp: RIVALS[0].maxHp, rivalIdx: 0, rivalsDefeated: 0, intermission: false };
    return null;
  });
  const [potions, setPotions] = useState(mode === "alchemy" ? 0 : 0);
  const [vaultTimer, setVaultTimer] = useState(mode === "vault" ? 60 : 0);
  const [locked, setLocked] = useState(false);

  const maxQuestions = mode === "echo" ? Math.min(15, Math.max(quiz.questions.length * 3, 9)) : quiz.questions.length;

  // Vault timer
  useEffect(() => {
    if (mode !== "vault") return;
    if (locked) return;
    if (vaultTimer <= 0) return;
    const t = setInterval(() => setVaultTimer(v => {
      if (v <= 1) {
        clearInterval(t);
        // time's up — finish
        setTimeout(() => finishGame(true), 200);
        return 0;
      }
      return v - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [mode, locked, vaultTimer]);

  const q = quiz.questions[qIdx % quiz.questions.length];
  const totalQuestions = maxQuestions;

  const handleAnswer = (i) => {
    if (showResult || locked) return;
    setSelected(i);
    const correct = i === q.correct;
    setShowResult(true);

    // Pre-compute what the values will be after this answer settles
    const newScore = score + (correct ? 1 : 0);
    const newStreak = correct ? streak + 1 : 0;
    const newBestStreak = Math.max(bestStreak, newStreak);
    const newLumens = lumensEarned + (correct ? 10 : 0);

    if (correct) {
      setScore(newScore);
      setStreak(newStreak);
      setBestStreak(newBestStreak);
      setLumensEarned(newLumens);
      if (mode === "duel") {
        const bonus = duelBonusDamage(player);
        const isCrit = hasArchonCrit(player) && Math.random() < 0.2;
        const dmg = isCrit ? 50 : 25 + bonus;
        setDuelState(d => ({ ...d, foeHp: Math.max(0, d.foeHp - dmg), lastCrit: isCrit }));
      }
      if (mode === "echo") {
        const bonus = duelBonusDamage(player);
        const isCrit = hasArchonCrit(player) && Math.random() < 0.2;
        const dmg = isCrit ? 50 : 25 + bonus;
        setDuelState(d => {
          const newFoeHp = Math.max(0, d.foeHp - dmg);
          return { ...d, foeHp: newFoeHp, lastCrit: isCrit };
        });
      }
      if (mode === "alchemy") setPotions(p => p + 1);
    } else {
      setStreak(0);
      if (mode === "duel") {
        setDuelState(d => ({ ...d, playerHp: Math.max(0, d.playerHp - 20) }));
      }
      if (mode === "echo") {
        setDuelState(d => ({ ...d, playerHp: Math.max(0, d.playerHp - RIVALS[d.rivalIdx].damage) }));
      }
      if (mode === "vault") {
        setLocked(true);
        setTimeout(() => setLocked(false), 3500);
      }
    }

    setTimeout(() => {
      setSelected(null);
      setShowResult(false);
      if (qIdx + 1 >= totalQuestions) {
        finishGame(false, { score: newScore, lumens: newLumens, bestStreak: newBestStreak });
      } else {
        setQIdx(qIdx + 1);
      }
    }, mode === "vault" && !correct ? 3600 : 1800);
  };

  const finishGame = (timeout = false, overrides = {}) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const finalScore = overrides.score ?? score;
    const finalLumens = overrides.lumens ?? lumensEarned;
    const finalBestStreak = overrides.bestStreak ?? bestStreak;
    const perfect = finalScore === totalQuestions && !timeout && mode !== "echo";
    const duelWon = mode === "duel" && duelState && duelState.foeHp <= 0;
    const duelLost = mode === "duel" && duelState && duelState.playerHp <= 0;
    const echoCleared = mode === "echo" && duelState && duelState.rivalsDefeated >= RIVALS.length;
    const baseLumens = finalLumens + (perfect ? 25 : 0) + (duelWon ? 30 : 0) + (echoCleared ? 200 : 0);
    onFinish({
      score: finalScore,
      total: totalQuestions,
      perfect,
      lumensEarned: baseLumens,
      bestStreak: finalBestStreak,
      mode,
      duelWon,
      duelLost,
      echoCleared,
      echoRivalsDefeated: duelState?.rivalsDefeated || 0,
      timeout,
      potions,
    });
  };

  // Duel win check
  useEffect(() => {
    if (mode === "duel" && duelState) {
      if (duelState.foeHp <= 0 || duelState.playerHp <= 0) {
        setTimeout(() => finishGame(false), 900);
      }
    }
  // eslint-disable-next-line
  }, [duelState]);

  // Echo Chamber rival progression
  useEffect(() => {
    if (mode !== "echo" || !duelState || duelState.intermission) return;
    if (duelState.playerHp <= 0) {
      setTimeout(() => finishGame(false), 900);
      return;
    }
    if (duelState.foeHp <= 0) {
      const nextIdx = duelState.rivalIdx + 1;
      const newDefeated = duelState.rivalsDefeated + 1;
      if (nextIdx >= RIVALS.length) {
        // Cleared tournament
        setDuelState(d => ({ ...d, rivalsDefeated: newDefeated, intermission: true }));
        setTimeout(() => finishGame(false), 1400);
      } else {
        // Intermission → next rival
        setDuelState(d => ({ ...d, intermission: true, rivalsDefeated: newDefeated }));
        setTimeout(() => {
          setDuelState(d => ({
            ...d,
            foeHp: RIVALS[nextIdx].maxHp,
            rivalIdx: nextIdx,
            intermission: false,
            // restore 25% HP between rivals
            playerHp: Math.min(duelStartingHp(player), d.playerHp + Math.round(duelStartingHp(player) * 0.25)),
          }));
        }, 1800);
      }
    }
  // eslint-disable-next-line
  }, [duelState]);

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <button onClick={onQuit} className="text-amber-200/70 hover:text-amber-100 font-body text-sm flex items-center gap-1">
          <X size={16} /> Leave
        </button>
        <div className="font-display text-amber-200 text-sm tracking-wide">{quiz.title}</div>
        <div className="font-body text-amber-200/60 text-sm">{qIdx + 1} / {totalQuestions}</div>
      </div>

      {/* Mode-specific panels */}
      {mode === "duel" && duelState && (
        <DuelPanel duelState={duelState} startingHp={duelStartingHp(player)} />
      )}
      {mode === "echo" && duelState && (
        <EchoPanel duelState={duelState} startingHp={duelStartingHp(player)} />
      )}
      {mode === "alchemy" && (
        <AlchemyPanel potions={potions} />
      )}
      {mode === "vault" && (
        <VaultPanel timer={vaultTimer} locked={locked} />
      )}

      {/* Progress */}
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full transition-all duration-500" style={{
          width: `${((qIdx) / totalQuestions) * 100}%`,
          background: "linear-gradient(90deg, #f5d76e, #ec4899)",
        }}/>
      </div>

      <Panel className="p-6">
        <div className="text-center mb-6">
          <div className="font-serif text-xl sm:text-2xl text-amber-100 leading-relaxed">{q.prompt}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {q.choices.map((choice, i) => {
            const isSelected = selected === i;
            const isCorrect = showResult && i === q.correct;
            const isWrong = showResult && isSelected && i !== q.correct;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showResult || locked}
                className={`relative p-4 rounded-xl text-left font-body text-amber-50 transition-all
                  ${!showResult && !locked ? "hover:scale-[1.02] hover:border-amber-300/60" : ""}
                  ${isCorrect ? "border-emerald-400" : isWrong ? "border-rose-400" : "border-amber-300/20"}
                  border-2`}
                style={{
                  background: isCorrect ? "rgba(16, 185, 129, 0.15)" : isWrong ? "rgba(244, 63, 94, 0.15)" : "rgba(255,255,255,0.03)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-sm border border-amber-300/30">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1">{choice}</div>
                  {isCorrect && <Check size={18} className="text-emerald-400" />}
                  {isWrong && <X size={18} className="text-rose-400" />}
                </div>
              </button>
            );
          })}
        </div>
        {showResult && q.explanation && (
          <div className="mt-4 p-3 rounded-lg bg-amber-300/5 border border-amber-300/20 text-sm font-serif italic text-amber-100/80 animate-fade-in-up">
            {q.explanation}
          </div>
        )}
        {!showResult && hasSkill(player, "scholars_eye") && q.explanation && (
          <div className="mt-4 p-3 rounded-lg bg-sky-300/5 border border-sky-300/20 text-xs font-serif italic text-sky-100/60 flex items-start gap-2">
            <Eye size={14} className="mt-0.5 flex-shrink-0" />
            <span>Scholar's Eye reveals: {q.explanation}</span>
          </div>
        )}
      </Panel>

      <div className="flex items-center justify-between text-sm font-body text-amber-200/70">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Check size={14} className="text-emerald-400" /> {score}</span>
          <span className="flex items-center gap-1"><Zap size={14} className="text-amber-300" /> Streak {streak}</span>
        </div>
        <div className="flex items-center gap-1">
          <Coins size={14} className="text-amber-300" /> +{lumensEarned}
        </div>
      </div>
    </div>
  );
}

function DuelPanel({ duelState, startingHp = 100 }) {
  const playerPct = (duelState.playerHp / startingHp) * 100;
  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={14} className="text-emerald-300" />
            <span className="font-display text-sm text-amber-100">You</span>
            {duelState.lastCrit && <span className="text-[10px] font-display text-amber-300 animate-pulse">CRIT!</span>}
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all" style={{ width: `${playerPct}%` }} />
          </div>
          <div className="text-xs text-amber-200/50 mt-1">{duelState.playerHp} HP</div>
        </div>
        <Swords size={24} className="text-rose-400/60" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 justify-end">
            <span className="font-display text-sm text-amber-100">Rival</span>
            <Shield size={14} className="text-rose-300" />
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-to-l from-rose-400 to-rose-500 transition-all ml-auto" style={{ width: `${duelState.foeHp}%`, marginLeft: "auto" }} />
          </div>
          <div className="text-xs text-amber-200/50 mt-1 text-right">{duelState.foeHp} HP</div>
        </div>
      </div>
    </Panel>
  );
}

function EchoPanel({ duelState, startingHp = 100 }) {
  const rival = RIVALS[duelState.rivalIdx];
  const playerPct = (duelState.playerHp / startingHp) * 100;
  const foePct = (duelState.foeHp / rival.maxHp) * 100;
  return (
    <Panel className="p-4">
      {duelState.intermission ? (
        <div className="py-6 text-center animate-scale-in">
          {duelState.rivalsDefeated >= RIVALS.length ? (
            <>
              <Crown size={36} className="text-amber-300 mx-auto mb-2" />
              <div className="font-display text-xl shimmer-text tracking-widest">ECHO CHAMBER CLEARED</div>
            </>
          ) : (
            <>
              <div className="font-serif italic text-amber-200/70 text-sm mb-2">{rival.name} falls.</div>
              <div className="font-display text-lg text-amber-100">
                Next: {RIVALS[duelState.rivalIdx + 1]?.name}
              </div>
              <div className="text-xs text-amber-200/60 font-serif italic mt-1">{RIVALS[duelState.rivalIdx + 1]?.desc}</div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={14} style={{ color: rival.color }} />
              <span className="font-display text-sm" style={{ color: rival.color }}>{rival.name}</span>
            </div>
            <div className="flex items-center gap-1">
              {RIVALS.map((r, i) => (
                <div key={r.id}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: i < duelState.rivalsDefeated ? "#e8c875" :
                                i === duelState.rivalIdx ? rival.color : "rgba(255,255,255,0.15)",
                    boxShadow: i === duelState.rivalIdx ? `0 0 8px ${rival.color}` : "none",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={12} className="text-emerald-300" />
                <span className="font-display text-xs text-amber-100">You</span>
                {duelState.lastCrit && <span className="text-[10px] font-display text-amber-300 animate-pulse">CRIT!</span>}
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all" style={{ width: `${playerPct}%` }} />
              </div>
              <div className="text-[10px] text-amber-200/50 mt-0.5">{duelState.playerHp} HP</div>
            </div>
            <Swords size={18} className="text-rose-400/60" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 justify-end">
                <span className="font-display text-xs text-amber-100">Rival</span>
                <Shield size={12} style={{ color: rival.color }} />
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full transition-all ml-auto" style={{ width: `${foePct}%`, marginLeft: "auto", background: `linear-gradient(270deg, ${rival.color}, ${rival.color}aa)` }} />
              </div>
              <div className="text-[10px] text-amber-200/50 mt-0.5 text-right">{duelState.foeHp} HP</div>
            </div>
          </div>
        </>
      )}
    </Panel>
  );
}

function AlchemyPanel({ potions }) {
  return (
    <Panel className="p-4 flex items-center gap-3">
      <FlaskConical className="text-emerald-300" size={20} />
      <div className="flex-1">
        <div className="font-display text-amber-100 text-sm">Alchemy Lab</div>
        <div className="text-xs text-amber-200/60 font-serif italic">Each correct answer brews a potion.</div>
      </div>
      <div className="flex items-center gap-1 font-display text-emerald-300 text-lg">
        <span>🧪</span>
        <span>×{potions}</span>
      </div>
    </Panel>
  );
}

function VaultPanel({ timer, locked }) {
  const lowTime = timer <= 15;
  return (
    <Panel className={`p-4 ${locked ? "border-rose-400/50" : ""}`}>
      <div className="flex items-center gap-3">
        <KeyRound className={locked ? "text-rose-400" : "text-amber-300"} size={20} />
        <div className="flex-1">
          <div className="font-display text-amber-100 text-sm">
            {locked ? "LOCKED OUT — Alarm triggered!" : "Memory Vault"}
          </div>
          <div className="text-xs text-amber-200/60 font-serif italic">Crack the vault before time runs out.</div>
        </div>
        <div className={`font-display text-2xl tabular-nums ${lowTime ? "text-rose-400 animate-pulse" : "text-amber-200"}`}>
          {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
        </div>
      </div>
    </Panel>
  );
}

// ============================================================================
// RESULT SCREEN
// ============================================================================

function ResultScreen({ result, quiz, mode, onHome, onRetry }) {
  const pct = Math.round((result.score / result.total) * 100);
  const modeLabel = { standard: "Quiz", duel: "Spell Duel", alchemy: "Alchemy Lab", vault: "Memory Vault", echo: "Echo Chamber" }[mode];
  const title =
    result.echoCleared ? "The Chamber Falls Silent" :
    result.perfect ? "Flawless!" :
    result.duelWon ? "Victory!" :
    result.duelLost ? "Defeat" :
    result.timeout ? "Time's Up" :
    mode === "echo" ? `${result.echoRivalsDefeated}/3 Rivals Felled` :
    "Well Done";

  return (
    <div className="max-w-xl mx-auto animate-scale-in">
      <Panel className="p-8 text-center relative overflow-hidden">
        {result.perfect && (
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{
            background: "radial-gradient(circle at center, rgba(245, 215, 110, 0.3) 0%, transparent 70%)"
          }} />
        )}
        <div className="relative">
          <div className="font-serif italic text-amber-200/50 text-sm mb-2">{modeLabel} · {quiz.title}</div>
          <div className="font-display text-5xl shimmer-text tracking-widest mb-6">{title}</div>
          <div className="flex items-center justify-center gap-6 mb-6">
            <Stat label="Score" value={`${result.score}/${result.total}`} />
            <Stat label="Accuracy" value={`${pct}%`} />
            <Stat label="Best Streak" value={result.bestStreak} />
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-300/40 bg-amber-300/10 mb-6">
            <Coins size={18} className="text-amber-300" />
            <span className="font-display text-amber-100 text-lg">+{result.lumensEarned} lumens</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <GoldButton variant="secondary" onClick={onRetry}>Try Again</GoldButton>
            <GoldButton onClick={onHome}>Return to Academy</GoldButton>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-display text-3xl text-amber-100">{value}</div>
      <div className="text-xs text-amber-200/50 font-serif italic uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ============================================================================
// COLLECTION SCREEN
// ============================================================================

function CollectionScreen({ player, onBack }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = player.familiars.filter(f => {
    if (filter === "all") return true;
    if (filter in ELEMENTS) return f.element === filter;
    if (filter in RARITIES) return f.rarity === filter;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const ta = RARITIES[a.rarity].tier;
    const tb = RARITIES[b.rarity].tier;
    return tb - ta;
  });

  return (
    <div className="space-y-4 animate-fade-in-up">
      <BackBar onBack={onBack} title={`Collection · ${player.familiars.length} Familiars`} />

      <div className="flex gap-2 flex-wrap">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>All</FilterChip>
        {Object.entries(ELEMENTS).map(([k, v]) => (
          <FilterChip key={k} active={filter === k} onClick={() => setFilter(k)} color={v.color}>
            <v.icon size={12} style={{ color: v.color }} /> {v.name}
          </FilterChip>
        ))}
      </div>

      {player.familiars.length === 0 ? (
        <Panel className="p-10 text-center">
          <Sparkles size={40} className="text-amber-300 mx-auto mb-3 opacity-60" />
          <div className="font-display text-amber-100 mb-2">No Familiars yet</div>
          <div className="text-sm text-amber-200/60 font-serif italic">Visit the Wishing Pool to summon your first companion.</div>
        </Panel>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {sorted.map(f => (
            <button key={f.uid} onClick={() => setSelected(f)} className="text-left">
              <Panel className="p-3 hover:scale-105 transition-all h-full">
                <div className="flex justify-center mb-2 h-24 items-center">
                  <FamiliarArt familiar={f} size={96} />
                </div>
                <div className="text-center">
                  <div className="font-display text-sm text-amber-100 truncate">{f.name}</div>
                  <div className="mt-1"><RarityBadge rarity={f.rarity} small /></div>
                </div>
              </Panel>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <FamiliarModal familiar={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children, color }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-display flex items-center gap-1 border transition-all
        ${active ? "border-amber-300/60 bg-amber-300/15 text-amber-100" : "border-white/10 text-amber-200/60 hover:border-white/30"}`}
      style={active && color ? { borderColor: color, color } : {}}
    >
      {children}
    </button>
  );
}

function FamiliarModal({ familiar, onClose }) {
  const rarity = RARITIES[familiar.rarity];
  const el = ELEMENTS[familiar.activeElement || familiar.element];
  const abilities = getFamiliarAbilities(familiar);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up" onClick={onClose}>
      <Panel className="max-w-md w-full p-6 relative animate-scale-in" >
        <button onClick={onClose} className="absolute top-3 right-3 text-amber-200/60 hover:text-amber-100">
          <X size={20} />
        </button>
        <div className="flex justify-center mb-4">
          <FamiliarArt familiar={familiar} size={140} />
        </div>
        <div className="text-center mb-4">
          <div className="font-display text-xl text-amber-100 mb-1">{familiar.name}</div>
          <div className="flex items-center justify-center gap-2">
            <RarityBadge rarity={familiar.rarity} />
            <span className="text-xs text-amber-200/60 flex items-center gap-1">
              <el.icon size={12} style={{ color: el.color }} /> {el.name}
            </span>
          </div>
        </div>
        <div className="text-sm text-amber-200/70 font-serif italic text-center mb-4">{familiar.desc}</div>
        <div className="border-t border-amber-300/10 pt-4">
          <div className="font-display text-xs text-amber-200/70 tracking-widest mb-2">ABILITIES</div>
          <ul className="space-y-1.5">
            {abilities.map((a, i) => (
              <li key={i} className="text-sm text-amber-100/90 flex items-start gap-2">
                <Zap size={14} className="text-amber-300 mt-0.5 flex-shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </div>
  );
}

function getFamiliarAbilities(f) {
  const rarity = RARITIES[f.rarity];
  const el = ELEMENTS[f.activeElement || f.element];
  const base = {
    ember: "+10% damage in Spell Duel",
    tide:  "Restore 5 HP per correct answer in Duel",
    stone: "Fortify: score can't drop this match",
    gust:  "Extra time on timed questions",
    glow:  "Reveal one wrong answer as a hint",
    hush:  "First question's answers stay longer",
  };
  const lines = [base[f.element]];
  if (rarity.tier >= 2) lines.push("+5% bonus lumens from this Familiar");
  if (rarity.tier >= 3) lines.push("Leaves an elemental trail during matches");
  if (rarity.tier >= 4) lines.push("Aura: ability strength increased by 15%");
  if (rarity.tier >= 5) lines.push("Second ability unlocked: double lumens on streaks of 5+");
  if (rarity.tier >= 6) lines.push("Passive: +1% lumens gained across all modes");
  if (f.rarity === "prismatic") lines.push("Prismatic: choose the active element before each match");
  if (f.rarity === "eclipsed") lines.push(`Eclipsed: ${el.name} ability is inverted — affects opponent instead of you`);
  if (f.rarity === "primordial") lines.push("Primordial: a bespoke ability unique to this being");
  return lines;
}

// ============================================================================
// WISHING POOL
// ============================================================================

// ============================================================================
// WISH REVEAL ANIMATION
// ============================================================================

// Rarity reveal config: how many fakeouts, sweep speeds, special effects
const REVEAL_CONFIG = {
  glimmer:    { fakeouts: [], sweepMs: 600, finalSweepMs: 600, lockEffect: "none",        familiarReveal: "fade",     totalMs: 1400 },
  shimmer:    { fakeouts: ["glimmer"], sweepMs: 200, finalSweepMs: 700, lockEffect: "sparkle",     familiarReveal: "fade",     totalMs: 2200 },
  gleam:      { fakeouts: ["glimmer","shimmer"], sweepMs: 180, finalSweepMs: 800, lockEffect: "pulse",       familiarReveal: "fade",     totalMs: 2800 },
  radiant:    { fakeouts: ["glimmer","shimmer","gleam"], sweepMs: 160, finalSweepMs: 900, lockEffect: "shockwave",   familiarReveal: "open",     totalMs: 3400 },
  luminous:   { fakeouts: ["glimmer","shimmer","gleam","radiant"], sweepMs: 150, finalSweepMs: 1000, lockEffect: "beams",       familiarReveal: "open",     totalMs: 4000 },
  celestial:  { fakeouts: ["glimmer","shimmer","gleam","radiant","luminous"], sweepMs: 140, finalSweepMs: 1100, lockEffect: "stars",       familiarReveal: "orbit",    totalMs: 4500 },
  prismatic:  { fakeouts: ["glimmer","shimmer","gleam","radiant","luminous","celestial"], sweepMs: 130, finalSweepMs: 1200, lockEffect: "rainbow",     familiarReveal: "orbit",    totalMs: 5000 },
  eclipsed:   { fakeouts: ["glimmer","shimmer","gleam","radiant","luminous","celestial","prismatic"], sweepMs: 120, finalSweepMs: 1400, lockEffect: "crack",       familiarReveal: "vortex",   totalMs: 5800 },
  primordial: { fakeouts: ["glimmer","shimmer","gleam","radiant","luminous","celestial","prismatic","eclipsed"], sweepMs: 110, finalSweepMs: 1800, lockEffect: "burst",       familiarReveal: "primordial", totalMs: 7000 },
};

const TILE_ROWS = 8;
const TILE_COLS = 12;
const WAVE_COLS = 3; // 8x3 wave-block

function WishReveal({ familiars, onComplete, onSkipAll }) {
  const [revealIdx, setRevealIdx] = useState(0); // which familiar in queue
  // Sort by ascending rarity
  const sorted = [...familiars].sort((a, b) => RARITIES[a.rarity].tier - RARITIES[b.rarity].tier);
  const current = sorted[revealIdx];

  if (!current) return null;

  const advanceQueue = () => {
    if (revealIdx + 1 >= sorted.length) {
      onComplete();
    } else {
      setRevealIdx(revealIdx + 1);
    }
  };

  return (
    <SingleRevealStage
      key={revealIdx}
      familiar={current}
      onComplete={advanceQueue}
      onSkipAll={onSkipAll}
      progress={`${revealIdx + 1} / ${sorted.length}`}
    />
  );
}

function SingleRevealStage({ familiar, onComplete, onSkipAll, progress }) {
  const config = REVEAL_CONFIG[familiar.rarity];
  const finalRarity = familiar.rarity;
  // Sequence of colors to cycle through: fakeouts then final
  const sequence = [...config.fakeouts, finalRarity];

  // Phase tracking: which color sweep we're on, and whether we're showing the lock-in / familiar
  const [phase, setPhase] = useState("sweeping"); // "sweeping" | "locked" | "familiar"
  const [seqIdx, setSeqIdx] = useState(0);
  const [showFamiliar, setShowFamiliar] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef(null);
  const skippedRef = useRef(false);
  const completedRef = useRef(false);

  const currentColor = RARITIES[sequence[seqIdx]].color;
  const currentGlow = RARITIES[sequence[seqIdx]].glow;
  const isFinalColor = seqIdx === sequence.length - 1;
  const sweepDuration = isFinalColor ? config.finalSweepMs : config.sweepMs;

  // Drive the sweep sequence forward
  useEffect(() => {
    if (phase !== "sweeping") return;
    if (skippedRef.current) return;
    const t = setTimeout(() => {
      if (seqIdx < sequence.length - 1) {
        setSeqIdx(seqIdx + 1);
      } else {
        // Final color sweep done — go to lock effect
        setPhase("locked");
      }
    }, sweepDuration);
    return () => clearTimeout(t);
  // eslint-disable-next-line
  }, [seqIdx, phase]);

  // Once locked, after the lock effect plays, show the familiar
  useEffect(() => {
    if (phase !== "locked") return;
    const lockMs = lockEffectDuration(config.lockEffect);
    const t = setTimeout(() => {
      setShowFamiliar(true);
      setPhase("familiar");
    }, lockMs);
    return () => clearTimeout(t);
  // eslint-disable-next-line
  }, [phase]);

  // Once familiar is showing, allow advance after a beat
  useEffect(() => {
    if (phase !== "familiar") return;
    const t = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, familiarHoldDuration(familiar.rarity));
    return () => clearTimeout(t);
  // eslint-disable-next-line
  }, [phase]);

  const skipFakeoutsAndFinal = () => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setSeqIdx(sequence.length - 1);
    setPhase("locked");
  };

  const handleTap = () => {
    setTapCount(c => c + 1);
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      if (tapCount + 1 >= 2) {
        // Double tap → skip ALL remaining wishes, jump to results
        onSkipAll();
      } else {
        // Single tap → skip current animation
        skipFakeoutsAndFinal();
      }
      setTapCount(0);
    }, 280);
  };

  return (
    <div
      onClick={handleTap}
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
      style={{ background: "#0a0618" }}
    >
      {/* The tile grid */}
      <RevealTileGrid
        sequence={sequence}
        currentSeqIdx={seqIdx}
        sweepMs={sweepDuration}
        phase={phase}
      />

      {/* Lock-in effects layer */}
      {phase === "locked" && (
        <LockEffect effect={config.lockEffect} color={currentColor} glow={currentGlow} />
      )}

      {/* Familiar reveal */}
      {showFamiliar && (
        <FamiliarRevealLayer familiar={familiar} reveal={config.familiarReveal} />
      )}

      {/* HUD: progress + skip hint */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1 pointer-events-none">
        <div className="text-amber-200/60 font-display text-xs tracking-widest">{progress}</div>
        <div className="text-amber-200/40 font-serif italic text-[10px]">tap to skip · double-tap for all</div>
      </div>
    </div>
  );
}

function lockEffectDuration(effect) {
  return {
    none: 0,
    sparkle: 400,
    pulse: 500,
    shockwave: 700,
    beams: 800,
    stars: 900,
    rainbow: 1000,
    crack: 1100,
    burst: 1400,
  }[effect] || 0;
}
function familiarHoldDuration(rarity) {
  const tier = RARITIES[rarity].tier;
  if (tier >= 9) return 3500;
  if (tier >= 7) return 2800;
  if (tier >= 5) return 2200;
  return 1500;
}

function RevealTileGrid({ sequence, currentSeqIdx, sweepMs, phase }) {
  // Each tile gets a flip delay based on (col / WAVE_COLS) wave index + diagonal position within wave
  // We render TILE_ROWS * TILE_COLS tiles. Each one knows the color it should currently be.
  const tiles = [];
  for (let r = 0; r < TILE_ROWS; r++) {
    for (let c = 0; c < TILE_COLS; c++) {
      tiles.push({ r, c });
    }
  }
  return (
    <div className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${TILE_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${TILE_ROWS}, 1fr)`,
      }}
    >
      {tiles.map(({ r, c }) => (
        <RevealTile
          key={`${r}-${c}`}
          row={r}
          col={c}
          sequence={sequence}
          currentSeqIdx={currentSeqIdx}
          sweepMs={sweepMs}
          phase={phase}
        />
      ))}
    </div>
  );
}

function RevealTile({ row, col, sequence, currentSeqIdx, sweepMs, phase }) {
  // A tile's "current color" is determined by: which sequence index is "currently sweeping",
  // and whether this tile's diagonal-position has been reached by the sweep.
  // We approximate by computing a per-tile delay (0 to sweepMs) based on diagonal distance from top-left.
  const waveIdx = Math.floor(col / WAVE_COLS); // 0..3
  const colInWave = col % WAVE_COLS;
  const diagonal = row + colInWave; // 0..(TILE_ROWS - 1 + WAVE_COLS - 1)
  const maxDiag = TILE_ROWS - 1 + WAVE_COLS - 1;

  // Base delay within a single sweep: wave-block first (waveIdx * waveMs), then diagonal within
  const totalWaves = Math.ceil(TILE_COLS / WAVE_COLS); // 4
  const perWaveMs = sweepMs / totalWaves;
  const waveDelay = waveIdx * perWaveMs;
  const diagDelay = (diagonal / maxDiag) * perWaveMs * 0.9;
  const myDelay = waveDelay + diagDelay;

  // Compute current color: sequence index whose "sweep window" covers the current time relative to phase
  // For simplicity: render the color of sequence[currentSeqIdx] if my delay < (we're past it)
  // Otherwise render the previous color
  const [colorIdx, setColorIdx] = useState(-1); // -1 = unflipped (dark)
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (currentSeqIdx < 0) return;
    setFlipping(true);
    const t = setTimeout(() => {
      setColorIdx(currentSeqIdx);
      setFlipping(false);
    }, myDelay);
    return () => clearTimeout(t);
  }, [currentSeqIdx, myDelay]);

  const color = colorIdx < 0 ? "#1a1236" : RARITIES[sequence[colorIdx]].color;
  const glow = colorIdx < 0 ? "transparent" : RARITIES[sequence[colorIdx]].glow;
  const isFinalColor = colorIdx === sequence.length - 1 && currentSeqIdx === sequence.length - 1;

  return (
    <div
      className="relative"
      style={{
        background: color,
        transition: `background-color 180ms ease-out`,
        boxShadow: isFinalColor ? `inset 0 0 12px ${glow}88, 0 0 6px ${glow}66` : `inset 0 0 0 1px rgba(0,0,0,0.2)`,
        transform: flipping ? "scale(0.95)" : "scale(1)",
        transitionProperty: "background-color, transform, box-shadow",
        transitionDuration: "180ms",
      }}
    />
  );
}

function LockEffect({ effect, color, glow }) {
  if (effect === "none") return null;
  if (effect === "sparkle") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              background: glow,
              boxShadow: `0 0 12px ${glow}`,
              animation: `sparkle 0.8s ease-out forwards`,
              animationDelay: `${Math.random() * 0.3}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (effect === "pulse") {
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{
          width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(circle, ${glow}88 0%, transparent 70%)`,
          animation: `shockwave 0.8s ease-out forwards`,
        }} />
      </div>
    );
  }
  if (effect === "shockwave") {
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{
          width: 160, height: 160, borderRadius: "50%",
          border: `4px solid ${glow}`,
          boxShadow: `0 0 30px ${glow}`,
          animation: `shockwave 0.9s ease-out forwards`,
        }} />
      </div>
    );
  }
  if (effect === "beams") {
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute"
            style={{
              width: 6, height: "60vh",
              background: `linear-gradient(to top, transparent, ${glow}, transparent)`,
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: "center bottom",
              animation: `light-beam 0.9s ease-out forwards`,
              animationDelay: `${i * 0.04}s`,
              boxShadow: `0 0 20px ${glow}`,
            }}
          />
        ))}
      </div>
    );
  }
  if (effect === "stars") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 200;
          return (
            <div key={i} className="absolute"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                animation: `sparkle 1s ease-out forwards`,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <Star size={48} fill={glow} color={glow} style={{ filter: `drop-shadow(0 0 12px ${glow})` }} />
            </div>
          );
        })}
      </div>
    );
  }
  if (effect === "rainbow") {
    return (
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 30%, ${glow}33 60%, transparent 100%)`,
          animation: `hue-rotate-once 1s linear forwards`,
          mixBlendMode: "screen",
        }}
      />
    );
  }
  if (effect === "crack") {
    return (
      <>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "#000",
          animation: `screen-flash 0.2s ease-out forwards`,
        }}/>
        <div className="absolute left-0 right-0 top-1/2 pointer-events-none" style={{
          height: 4,
          background: `linear-gradient(90deg, transparent, #fff, ${glow}, #fff, transparent)`,
          boxShadow: `0 0 40px #fff, 0 0 80px ${glow}`,
          animation: `crack 1.1s ease-out forwards`,
          transformOrigin: "center",
        }}/>
      </>
    );
  }
  if (effect === "burst") {
    return (
      <>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "#000",
          animation: `screen-flash 0.3s ease-out forwards`,
        }}/>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ animation: `screen-shake 0.6s ease-out` }}>
          <div style={{
            width: 200, height: 200, borderRadius: "50%",
            background: `radial-gradient(circle, #fff 0%, ${glow} 30%, ${color} 60%, transparent 100%)`,
            boxShadow: `0 0 100px ${glow}, 0 0 200px ${color}`,
            animation: `burst 1.4s ease-out forwards`,
          }}/>
        </div>
      </>
    );
  }
  return null;
}

function FamiliarRevealLayer({ familiar, reveal }) {
  const rarity = RARITIES[familiar.rarity];
  const isPrimordial = reveal === "primordial";
  const isVortex = reveal === "vortex";

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
      {/* Open / vortex backdrop */}
      {(reveal === "open" || reveal === "orbit") && (
        <div className="absolute"
          style={{
            width: 360, height: 360, borderRadius: "50%",
            background: `radial-gradient(circle, rgba(10,6,24,1) 0%, rgba(10,6,24,0.6) 60%, transparent 100%)`,
            animation: `reveal-zoom 0.6s ease-out forwards`,
          }}
        />
      )}
      {isVortex && (
        <div className="absolute" style={{
          width: 400, height: 400, borderRadius: "50%",
          background: `conic-gradient(from 0deg, transparent, ${rarity.glow}aa, transparent, ${rarity.glow}aa, transparent)`,
          animation: `vortex-spin 1.2s ease-out forwards`,
        }}/>
      )}

      <div className="relative animate-scale-in" style={{
        animation: isPrimordial ? "reveal-zoom 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards" : "reveal-zoom 0.6s ease-out forwards",
      }}>
        <FamiliarArt familiar={familiar} size={isPrimordial ? 240 : 180} />
      </div>

      {(reveal === "orbit" || isPrimordial) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 90, 180, 270].map((deg, i) => (
            <div key={i} className="absolute" style={{
              animation: `orbit 3s linear infinite`,
              animationDelay: `${-i * 0.75}s`,
            }}>
              <Sparkles size={20} color={rarity.glow} fill={rarity.glow} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="font-display text-2xl text-amber-100 mb-1" style={{
          textShadow: `0 0 16px ${rarity.glow}`,
        }}>
          {familiar.name}
        </div>
        <div><RarityBadge rarity={familiar.rarity} /></div>
        {isPrimordial && (
          <div className="mt-3 font-display text-xs tracking-[0.4em] text-amber-300 animate-fade-in-up" style={{
            animationDelay: "0.8s",
          }}>
            ✦ PRIMORDIAL ✦
          </div>
        )}
      </div>
    </div>
  );
}


function WishingPoolScreen({ player, onBack, onWish }) {
  const [pulling, setPulling] = useState(false);
  const [revealing, setRevealing] = useState(null); // array of familiars during reveal
  const [revealed, setRevealed] = useState(null);   // results grid after reveal

  const WISH_COST = 100;
  const TEN_WISH_COST = 900;
  const freeAvailable = canClaimFreeWish(player);

  const doWish = async (count, free = false) => {
    const cost = free ? 0 : (count === 10 ? TEN_WISH_COST : WISH_COST);
    if (!free && player.lumens < cost) return;
    setPulling(true);
    setRevealed(null);
    setRevealing(null);
    const results = await onWish(count, { free });
    setTimeout(() => {
      setPulling(false);
      setRevealing(results);
    }, 600);
  };

  const finishReveal = () => {
    setRevealed(revealing);
    setRevealing(null);
  };

  return (
    <div className="space-y-4 animate-fade-in-up">
      <BackBar onBack={onBack} title="The Wishing Pool" />
      <Panel className="p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-60" style={{
          background: "radial-gradient(circle at center, rgba(232, 200, 117, 0.2) 0%, transparent 60%)",
        }} />
        <div className="relative">
          <div className="mx-auto w-40 h-40 rounded-full mb-6 relative" style={{
            background: "radial-gradient(circle, rgba(232,200,117,0.4), rgba(132,94,194,0.2), transparent)",
            animation: "pulse-glow 3s ease-in-out infinite",
          }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <Wand2 size={64} className="text-amber-200 animate-float" />
            </div>
          </div>
          <div className="font-serif italic text-amber-200/70 text-sm mb-4 max-w-md mx-auto">
            Cast your lumens into the pool. The water remembers every wish — and sometimes, something answers.
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <GoldButton
              variant="secondary"
              size="lg"
              onClick={() => doWish(1)}
              disabled={pulling || revealing || player.lumens < WISH_COST}
            >
              Wish · {WISH_COST} <Coins size={14} className="inline ml-1" />
            </GoldButton>
            <GoldButton
              size="lg"
              onClick={() => doWish(10)}
              disabled={pulling || revealing || player.lumens < TEN_WISH_COST}
            >
              10× Wish · {TEN_WISH_COST} <Coins size={14} className="inline ml-1" />
            </GoldButton>
            {freeAvailable && (
              <GoldButton
                variant="secondary"
                size="lg"
                onClick={() => doWish(1, true)}
                disabled={pulling || revealing}
                className="animate-glow-pulse"
              >
                <Gift size={14} className="inline mr-1" /> Free Weekly Wish
              </GoldButton>
            )}
          </div>
          <div className="text-[11px] text-amber-200/50 mt-3 font-serif italic">
            10× wishes guarantee at least one Gleam or higher.
            {hasSkill(player, "collector_prime") && !freeAvailable && " · Your free wish returns within the week."}
          </div>
        </div>
      </Panel>

      {pulling && !revealing && (
        <Panel className="p-10 text-center">
          <div className="mx-auto w-24 h-24 rounded-full relative animate-pulse-glow" style={{
            background: "radial-gradient(circle, #e8c875, transparent)",
          }}>
            <div className="absolute inset-0 rounded-full animate-spin" style={{
              border: "3px solid transparent",
              borderTopColor: "#e8c875",
              borderRightColor: "#ec4899",
            }} />
          </div>
          <div className="font-display text-amber-200 mt-4 tracking-widest">WEAVING FATE…</div>
        </Panel>
      )}

      {revealing && (
        <WishReveal
          familiars={revealing}
          onComplete={finishReveal}
          onSkipAll={finishReveal}
        />
      )}

      {revealed && !pulling && (
        <Panel className="p-6 animate-scale-in">
          <div className="font-display text-amber-200 tracking-widest mb-4 text-center text-sm">YOUR SUMMONS</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {revealed.map((f, i) => (
              <div key={f.uid} className="text-center animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex justify-center mb-2 h-24 items-center">
                  <FamiliarArt familiar={f} size={96} />
                </div>
                <div className="font-display text-xs text-amber-100 truncate">{f.name}</div>
                <RarityBadge rarity={f.rarity} small />
              </div>
            ))}
          </div>
        </Panel>
      )}

      <div className="text-center">
        <div className="font-display text-amber-200/70 text-xs tracking-widest mb-2">DROP RATES</div>
        <div className="inline-flex flex-wrap justify-center gap-2">
          {RARITY_ORDER.map(r => {
            const total = Object.values(RARITIES).reduce((a, x) => a + x.weight, 0);
            const pct = (RARITIES[r].weight / total * 100).toFixed(2);
            return (
              <div key={r} className="text-[11px] px-2 py-1 rounded-full border"
                style={{ borderColor: `${RARITIES[r].color}66`, color: RARITIES[r].color }}>
                {RARITIES[r].name} · {pct}%
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCRIPTORIUM
// ============================================================================

function ScriptoriumScreen({ player, onBack, onCreateNew, onEdit, onDelete, onPublish, onUnpublish, onPlayLibrary }) {
  const [tab, setTab] = useState("mine"); // "mine" | "library"
  const [libraryItems, setLibraryItems] = useState(null); // null = loading
  const [libraryErr, setLibraryErr] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (tab !== "library") return;
    // Library requires a backend — disabled in local build
    setLibraryItems([]);
    setLibraryErr(null);
    return;
    let cancelled = false;
    (async () => {
      setLibraryItems(null);
      setLibraryErr(null);
      try {
        const list = await window.storage.list(LIB_PREFIX, true);
        const keys = (list?.keys || []).filter(k => k.startsWith(LIB_PREFIX));
        const items = [];
        for (const key of keys.slice(0, 50)) {
          try {
            const got = await window.storage.get(key, true);
            if (got && got.value) {
              const parsed = JSON.parse(got.value);
              items.push({ ...parsed, _key: key });
            }
          } catch (e) {
            // skip broken entry
          }
        }
        items.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
        if (!cancelled) setLibraryItems(items);
      } catch (e) {
        if (!cancelled) setLibraryErr(String(e?.message || e));
      }
    })();
    return () => { cancelled = true; };
  }, [tab, refreshKey]);

  const publishedIds = new Set(player.publishedQuizIds || []);

  return (
    <div className="space-y-4 animate-fade-in-up">
      <BackBar
        onBack={onBack}
        title="The Scriptorium"
        right={tab === "mine" ? <GoldButton onClick={onCreateNew}><Plus size={14} className="inline mr-1" /> New Set</GoldButton> : null}
      />
      <div className="font-serif italic text-amber-200/60 text-sm max-w-xl">
        A quiet scriptorium lined with illuminated manuscripts. Here you shape your own sets of questions — and share them with other Apprentices.
      </div>

      <div className="flex gap-2">
        <TabBtn active={tab === "mine"} onClick={() => setTab("mine")}>
          <BookOpen size={14} className="inline mr-1.5" /> My Quizzes · {player.customQuizzes.length}
        </TabBtn>
        <TabBtn active={tab === "library"} onClick={() => setTab("library")}>
          <Globe size={14} className="inline mr-1.5" /> Public Library
        </TabBtn>
        {tab === "library" && (
          <button onClick={() => setRefreshKey(k => k + 1)} className="ml-auto text-amber-200/60 hover:text-amber-100 text-xs font-body flex items-center gap-1">
            <RotateCw size={12} /> Refresh
          </button>
        )}
      </div>

      {tab === "mine" && (
        player.customQuizzes.length === 0 ? (
          <Panel className="p-10 text-center">
            <BookOpen size={40} className="text-amber-300 mx-auto mb-3 opacity-60" />
            <div className="font-display text-amber-100 mb-2">Your scriptorium awaits</div>
            <div className="text-sm text-amber-200/60 font-serif italic mb-4">Create your first quiz set to begin.</div>
            <GoldButton onClick={onCreateNew}><Plus size={14} className="inline mr-1" /> Create a Set</GoldButton>
          </Panel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {player.customQuizzes.map(q => {
              const isPublished = publishedIds.has(q.id);
              return (
                <Panel key={q.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-amber-100 mb-1 truncate">{q.title}</div>
                      <div className="text-xs text-amber-200/60 font-serif italic mb-3">{q.subject} · Grades {q.grade} · {q.questions.length} questions</div>
                    </div>
                    {isPublished && (
                      <span className="text-[10px] font-display text-emerald-300 border border-emerald-300/40 rounded-full px-2 py-0.5 flex items-center gap-1 flex-shrink-0">
                        <CheckCircle2 size={10} /> Published
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <GoldButton variant="secondary" size="sm" onClick={() => onEdit(q.id)}>
                      <Edit size={12} className="inline mr-1" /> Edit
                    </GoldButton>
                    {isPublished ? (
                      <GoldButton variant="ghost" size="sm" onClick={() => onUnpublish(q.id)}>
                        <Globe size={12} className="inline mr-1" /> Unpublish
                      </GoldButton>
                    ) : (
                      <GoldButton variant="ghost" size="sm" onClick={() => onPublish(q)}>
                        <Upload size={12} className="inline mr-1" /> Publish
                      </GoldButton>
                    )}
                    <GoldButton variant="ghost" size="sm" onClick={() => { if (confirm(`Delete "${q.title}"?`)) onDelete(q.id); }}>
                      <Trash2 size={12} className="inline" />
                    </GoldButton>
                  </div>
                </Panel>
              );
            })}
          </div>
        )
      )}

      {tab === "library" && (
        <>
          {libraryItems === null && !libraryErr && (
            <Panel className="p-8 text-center">
              <Loader2 className="animate-spin text-amber-300 mx-auto mb-2" size={28} />
              <div className="text-amber-200/60 font-serif italic text-sm">Gathering manuscripts from across the Academy…</div>
            </Panel>
          )}
          {libraryErr && (
            <Panel className="p-6 text-center">
              <div className="text-amber-100 text-sm">The library shelves seem dusty. Try refreshing.</div>
            </Panel>
          )}
          {libraryItems && libraryItems.length === 0 && (
            <Panel className="p-10 text-center">
              <Library size={40} className="text-amber-300 mx-auto mb-3 opacity-60" />
              <div className="font-display text-amber-100 mb-2">The shelves are empty</div>
              <div className="text-sm text-amber-200/60 font-serif italic">Be the first to publish — your set will appear here for every Apprentice to play.</div>
            </Panel>
          )}
          {libraryItems && libraryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {libraryItems.map(item => (
                <Panel key={item._key} className="p-4">
                  <div className="font-display text-amber-100 mb-1 truncate">{item.title}</div>
                  <div className="text-xs text-amber-200/60 font-serif italic mb-2">{item.subject} · Grades {item.grade} · {item.questions?.length || 0} questions</div>
                  <div className="flex items-center gap-2 text-[11px] text-amber-200/50 mb-3">
                    <User size={11} />
                    <span>{item.authorName || "Unknown"}</span>
                    <span className="text-amber-200/30">·</span>
                    <Play size={10} />
                    <span>{item.plays || 0} plays</span>
                  </div>
                  <GoldButton variant="secondary" size="sm" onClick={() => onPlayLibrary(item)}>
                    <Play size={12} className="inline mr-1" /> Play
                  </GoldButton>
                </Panel>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-display transition-all border
        ${active ? "border-amber-300/60 bg-amber-300/15 text-amber-100" : "border-white/10 text-amber-200/60 hover:border-white/30"}`}>
      {children}
    </button>
  );
}

function QuizEditorScreen({ existing, onCancel, onSave }) {
  const [title, setTitle] = useState(existing?.title || "");
  const [subject, setSubject] = useState(existing?.subject || "Custom");
  const [grade, setGrade] = useState(existing?.grade || "All");
  const [questions, setQuestions] = useState(existing?.questions || [blankQuestion()]);

  function blankQuestion() {
    return { prompt: "", choices: ["", "", "", ""], correct: 0, explanation: "" };
  }

  const setQuestion = (i, patch) => {
    setQuestions(qs => qs.map((q, idx) => idx === i ? { ...q, ...patch } : q));
  };
  const setChoice = (qi, ci, val) => {
    setQuestions(qs => qs.map((q, idx) => idx === qi ? { ...q, choices: q.choices.map((c, j) => j === ci ? val : c) } : q));
  };
  const addQuestion = () => setQuestions(qs => [...qs, blankQuestion()]);
  const removeQuestion = (i) => setQuestions(qs => qs.length > 1 ? qs.filter((_, idx) => idx !== i) : qs);

  const canSave = title.trim() && questions.every(q =>
    q.prompt.trim() && q.choices.every(c => c.trim())
  );

  const handleSave = () => {
    const quiz = {
      id: existing?.id || `cq_${Date.now()}`,
      title: title.trim(),
      subject,
      grade,
      author: "You",
      questions: questions.map(q => ({ ...q, prompt: q.prompt.trim(), choices: q.choices.map(c => c.trim()), explanation: q.explanation?.trim() || "" })),
    };
    onSave(quiz);
  };

  return (
    <div className="space-y-4 animate-fade-in-up max-w-3xl mx-auto">
      <BackBar
        onBack={onCancel}
        title={existing ? "Edit Quiz Set" : "New Quiz Set"}
        right={<GoldButton onClick={handleSave} disabled={!canSave}><Save size={14} className="inline mr-1" /> Save</GoldButton>}
      />

      <Panel className="p-5 space-y-3">
        <Input label="Title" value={title} onChange={setTitle} placeholder="e.g. Earth's Layers" />
        <div className="grid grid-cols-2 gap-3">
          <Select label="Subject" value={subject} onChange={setSubject} options={["Custom","Math","Science","History","Language Arts","Geography","Art","Music","Physical Education","Other"]} />
          <Select label="Grade Band" value={grade} onChange={setGrade} options={["All","K-2","3-5","4-6","5-8","6-9","9-12"]} />
        </div>
      </Panel>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <Panel key={i} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="font-display text-sm text-amber-200/80">Question {i + 1}</div>
              <button onClick={() => removeQuestion(i)} className="text-amber-200/50 hover:text-rose-400" disabled={questions.length <= 1}>
                <Trash2 size={16} />
              </button>
            </div>
            <Input label="Prompt" value={q.prompt} onChange={(v) => setQuestion(i, { prompt: v })} placeholder="What is …?" textarea />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              {q.choices.map((c, ci) => (
                <div key={ci} className="flex items-center gap-2">
                  <button
                    onClick={() => setQuestion(i, { correct: ci })}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-display text-xs border-2 transition-all flex-shrink-0
                      ${q.correct === ci ? "border-emerald-400 bg-emerald-400/20 text-emerald-300" : "border-amber-300/20 text-amber-200/60 hover:border-amber-300/40"}`}
                    title="Mark as correct"
                  >
                    {String.fromCharCode(65 + ci)}
                  </button>
                  <input
                    type="text"
                    value={c}
                    onChange={(e) => setChoice(i, ci, e.target.value)}
                    placeholder={`Answer ${String.fromCharCode(65 + ci)}`}
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-amber-300/20 text-amber-50 text-sm focus:outline-none focus:border-amber-300/60"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Input label="Explanation (shown after answer)" value={q.explanation || ""} onChange={(v) => setQuestion(i, { explanation: v })} placeholder="Optional — help learners understand." />
            </div>
          </Panel>
        ))}
      </div>

      <button onClick={addQuestion} className="w-full py-4 rounded-xl border-2 border-dashed border-amber-300/30 hover:border-amber-300/60 text-amber-200 font-display tracking-widest text-sm transition-all">
        <Plus size={16} className="inline mr-2" /> ADD QUESTION
      </button>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, textarea }) {
  return (
    <div>
      <label className="block font-display text-[11px] text-amber-200/60 tracking-widest mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-amber-300/20 text-amber-50 text-sm font-serif focus:outline-none focus:border-amber-300/60 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-amber-300/20 text-amber-50 text-sm focus:outline-none focus:border-amber-300/60"
        />
      )}
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block font-display text-[11px] text-amber-200/60 tracking-widest mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-amber-300/20 text-amber-50 text-sm focus:outline-none focus:border-amber-300/60"
      >
        {options.map(o => <option key={o} value={o} className="bg-[#1a1236]">{o}</option>)}
      </select>
    </div>
  );
}

// ============================================================================
// SPELL SCHOOL SCREEN
// ============================================================================

function SpellSchoolScreen({ player, onBack, onUnlock }) {
  const available = availableSkillPoints(player);
  const unlocked = new Set(player.skills || []);
  const branches = Object.keys(SKILL_BRANCHES);

  return (
    <div className="space-y-4 animate-fade-in-up">
      <BackBar onBack={onBack} title="The Spell School" right={
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-300/30 bg-amber-300/10">
          <Sparkles size={14} className="text-amber-300" />
          <span className="font-display text-amber-100 text-sm">{available} skill point{available === 1 ? "" : "s"}</span>
        </div>
      } />
      <div className="font-serif italic text-amber-200/60 text-sm max-w-xl">
        Three branches grow from the same root. Earn one skill point each time you reach a new level past the second. Prerequisites must be unlocked in order.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {branches.map(bkey => {
          const b = SKILL_BRANCHES[bkey];
          const branchSkills = SKILLS.filter(s => s.branch === bkey);
          const unlockedInBranch = branchSkills.filter(s => unlocked.has(s.id)).length;
          const totalInBranch = branchSkills.length;
          return (
            <Panel key={bkey} className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${b.color}22`, border: `1px solid ${b.color}55` }}>
                  {bkey === "scholar" && <BookOpen size={16} style={{ color: b.color }} />}
                  {bkey === "duelist" && <Swords size={16} style={{ color: b.color }} />}
                  {bkey === "collector" && <Gem size={16} style={{ color: b.color }} />}
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg" style={{ color: b.color }}>{b.name}</div>
                  <div className="text-[11px] text-amber-200/50 font-serif italic">{b.desc} · {unlockedInBranch}/{totalInBranch}</div>
                </div>
              </div>

              {/* Skill nodes connected by vertical lines */}
              <div className="relative pt-4">
                <div className="absolute left-4 top-8 bottom-8 w-px" style={{ background: `${b.color}33` }} />
                <div className="space-y-3 relative">
                  {branchSkills.map((skill, i) => {
                    const isUnlocked = unlocked.has(skill.id);
                    const canUnlock = canUnlockSkill(player, skill);
                    return (
                      <div key={skill.id} className="flex items-start gap-3 relative">
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                            ${isUnlocked ? "border-amber-300 bg-amber-300/20" : canUnlock ? "border-amber-300/60 animate-pulse-glow" : "border-white/15 bg-white/5"}`}
                            style={isUnlocked ? { boxShadow: `0 0 12px ${b.color}aa` } : {}}>
                            {isUnlocked ? <Check size={14} className="text-amber-300" /> : <Lock size={12} className="text-amber-200/40" />}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className={`font-display text-sm ${isUnlocked ? "text-amber-100" : canUnlock ? "text-amber-100" : "text-amber-200/50"}`}>
                              {skill.name}
                            </div>
                            <span className="text-[10px] font-display px-1.5 py-0.5 rounded-full border border-amber-300/30 text-amber-300">
                              {skill.cost} pt{skill.cost === 1 ? "" : "s"}
                            </span>
                          </div>
                          <div className="text-xs text-amber-200/60 font-serif italic mt-0.5">{skill.desc}</div>
                          {!isUnlocked && (
                            <button
                              onClick={() => onUnlock(skill.id)}
                              disabled={!canUnlock}
                              className="mt-2 text-[11px] font-display tracking-wider px-2.5 py-1 rounded border transition-all
                                disabled:opacity-30 disabled:cursor-not-allowed"
                              style={{
                                borderColor: canUnlock ? `${b.color}aa` : "rgba(255,255,255,0.1)",
                                color: canUnlock ? b.color : "rgba(255,255,255,0.3)",
                                background: canUnlock ? `${b.color}15` : "transparent",
                              }}
                            >
                              {canUnlock ? "UNLOCK" : skill.prereq && !unlocked.has(skill.prereq) ? "LOCKED" : "NEED POINTS"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// EXCHANGE HALL SCREEN
// ============================================================================

function ExchangeScreen({ player, onBack, onTrade }) {
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Current-seed offers
  const seed = dayOfEra();
  const offers = (player.merchantSeed === seed && player.merchantOffers) ? player.merchantOffers : generateMerchantOffers(seed);

  // Cache offers to player state when seed mismatches
  useEffect(() => {
    if (player.merchantSeed !== seed) {
      onTrade({ type: "refresh_seed", seed, offers });
    }
  // eslint-disable-next-line
  }, [seed]);

  // Time until rotation
  const nextRotationMs = (Math.floor(Date.now() / (1000 * 60 * 60 * 6)) + 1) * (1000 * 60 * 60 * 6) - Date.now();
  const hoursLeft = Math.floor(nextRotationMs / (1000 * 60 * 60));
  const minsLeft = Math.floor((nextRotationMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="space-y-4 animate-fade-in-up">
      <BackBar onBack={onBack} title="The Exchange Hall" right={
        <div className="text-[11px] text-amber-200/60 font-serif italic">Rotates in {hoursLeft}h {minsLeft}m</div>
      } />
      <div className="font-serif italic text-amber-200/60 text-sm max-w-xl">
        Three traders stop at the Hall each day. Each will take something from your collection in exchange for something else. Offers rotate every six hours.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MERCHANTS.map((m, i) => {
          const offer = offers[i];
          if (!offer) return null;
          const canFulfill = canFulfillOffer(player, offer);
          return (
            <Panel key={m.id} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: `${m.color}22`, border: `1px solid ${m.color}55` }}>
                  <User size={20} style={{ color: m.color }} />
                </div>
                <div>
                  <div className="font-display text-amber-100 text-sm">{m.name}</div>
                  <div className="text-[11px] text-amber-200/50 font-serif italic">{m.desc}</div>
                </div>
              </div>

              <div className="rounded-xl p-3 mb-3" style={{ background: `${m.color}08`, border: `1px solid ${m.color}25` }}>
                <div className="font-display text-[10px] tracking-widest text-amber-200/50 mb-1">THEY WANT</div>
                <OfferPart want={offer.wants} />
                <div className="my-2 flex items-center gap-2">
                  <span className="flex-1 h-px" style={{ background: `${m.color}30` }} />
                  <ArrowLeftRight size={14} style={{ color: m.color }} />
                  <span className="flex-1 h-px" style={{ background: `${m.color}30` }} />
                </div>
                <div className="font-display text-[10px] tracking-widest text-amber-200/50 mb-1">THEY GIVE</div>
                <OfferPart give={offer.gives} />
              </div>

              <GoldButton
                variant={canFulfill ? "primary" : "secondary"}
                size="sm"
                disabled={!canFulfill}
                onClick={() => setSelectedOffer({ merchant: m, offer })}
                className="w-full"
              >
                {canFulfill ? "Make Trade" : "Missing Offering"}
              </GoldButton>
            </Panel>
          );
        })}
      </div>

      {selectedOffer && (
        <TradeConfirmModal
          player={player}
          merchant={selectedOffer.merchant}
          offer={selectedOffer.offer}
          onClose={() => setSelectedOffer(null)}
          onConfirm={(chosenFamiliars) => {
            onTrade({ type: "execute", offer: selectedOffer.offer, chosenFamiliars });
            setSelectedOffer(null);
          }}
        />
      )}
    </div>
  );
}

function OfferPart({ want, give }) {
  const part = want || give;
  if (part.type === "familiar_element_rarity") {
    const el = ELEMENTS[part.element];
    return (
      <div className="flex items-center gap-2 text-sm text-amber-100">
        <span style={{ color: el.color }}>{ELEMENTS[part.element].name}</span>
        <span className="text-amber-200/40">·</span>
        <RarityBadge rarity={part.rarity} small />
      </div>
    );
  }
  if (part.type === "familiar_rarity") {
    return (
      <div className="flex items-center gap-2 text-sm text-amber-100">
        <span>Any Familiar</span>
        <RarityBadge rarity={part.rarity} small />
      </div>
    );
  }
  if (part.type === "two_same_rarity") {
    return (
      <div className="flex items-center gap-2 text-sm text-amber-100">
        <span>Two Familiars</span>
        <RarityBadge rarity={part.rarity} small />
      </div>
    );
  }
  if (part.type === "lumens") {
    return (
      <div className="flex items-center gap-2 text-sm text-amber-100">
        <Coins size={14} className="text-amber-300" />
        <span className="font-display">{part.amount} lumens</span>
      </div>
    );
  }
  return null;
}

function TradeConfirmModal({ player, merchant, offer, onClose, onConfirm }) {
  const matching = familiarsMatchingWant(player, offer.wants);
  const needed = offer.wants.type === "two_same_rarity" ? 2 : 1;
  const [chosen, setChosen] = useState([]);

  const toggle = (uid) => {
    setChosen(cur => {
      if (cur.includes(uid)) return cur.filter(x => x !== uid);
      if (cur.length >= needed) return cur;
      return [...cur, uid];
    });
  };

  const canConfirm = chosen.length === needed;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up" onClick={onClose}>
      <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <Panel className="p-6 relative animate-scale-in">
          <button onClick={onClose} className="absolute top-3 right-3 text-amber-200/60 hover:text-amber-100">
            <X size={18} />
          </button>
          <div className="font-display text-amber-100 text-lg mb-1">{merchant.name}</div>
          <div className="text-xs text-amber-200/60 font-serif italic mb-4">
            Choose {needed === 1 ? "the Familiar" : "two Familiars"} to offer in trade. {needed === 1 ? "It will be given" : "They will be given"} away — this cannot be undone.
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 max-h-64 overflow-y-auto scrollbar-thin pr-1">
            {matching.map(f => {
              const isChosen = chosen.includes(f.uid);
              return (
                <button key={f.uid} onClick={() => toggle(f.uid)}
                  className={`p-2 rounded-lg border-2 transition-all ${isChosen ? "border-amber-300 bg-amber-300/10" : "border-white/10 hover:border-white/30"}`}>
                  <div className="flex justify-center mb-1 h-16 items-center">
                    <FamiliarArt familiar={f} size={64} />
                  </div>
                  <div className="text-[10px] font-display text-amber-100 truncate">{f.name}</div>
                  <div className="mt-0.5 flex justify-center"><RarityBadge rarity={f.rarity} small /></div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-amber-200/60 font-body">
              {chosen.length} / {needed} chosen
            </div>
            <div className="flex gap-2">
              <GoldButton variant="ghost" size="sm" onClick={onClose}>Cancel</GoldButton>
              <GoldButton size="sm" disabled={!canConfirm} onClick={() => onConfirm(chosen)}>Confirm Trade</GoldButton>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

// ============================================================================
// ACHIEVEMENTS SCREEN
// ============================================================================

function AchievementsScreen({ player, onBack }) {
  const categories = [...new Set(ACHIEVEMENTS.map(a => a.category))];
  const earnedSet = new Set(player.achievements);

  return (
    <div className="space-y-4 animate-fade-in-up">
      <BackBar onBack={onBack} title={`Trophy Hall · ${player.achievements.length}/${ACHIEVEMENTS.length}`} />
      {categories.map(cat => {
        const items = ACHIEVEMENTS.filter(a => a.category === cat);
        const earnedCount = items.filter(a => earnedSet.has(a.id)).length;
        return (
          <section key={cat}>
            <div className="font-display tracking-widest text-amber-200/80 text-sm mb-2 flex items-center gap-2">
              <span className="w-8 h-px bg-amber-300/40" />
              {cat.toUpperCase()}
              <span className="text-amber-200/40 text-xs">{earnedCount}/{items.length}</span>
              <span className="flex-1 h-px bg-amber-300/40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map(a => {
                const earned = earnedSet.has(a.id);
                const showHidden = a.hidden && !earned;
                return (
                  <Panel key={a.id} className={`p-4 ${!earned && !showHidden ? "opacity-60" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${earned ? "" : "grayscale"}`}
                        style={{
                          background: earned ? "linear-gradient(135deg, rgba(245,215,110,0.3), rgba(245,215,110,0.1))" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${earned ? "rgba(245,215,110,0.5)" : "rgba(255,255,255,0.1)"}`,
                        }}>
                        {earned ? <Trophy size={18} className="text-amber-300" /> : showHidden ? <Lock size={16} className="text-amber-200/40" /> : <Trophy size={18} className="text-amber-200/30" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-sm text-amber-100 mb-0.5">{showHidden ? "??? Hidden" : a.name}</div>
                        <div className="text-xs text-amber-200/60 font-serif italic">{showHidden ? "Discover this in your own time." : a.desc}</div>
                        {earned && a.lumens > 0 && (
                          <div className="mt-2 text-[11px] text-amber-300 flex items-center gap-1">
                            <Coins size={11} /> {a.lumens} awarded
                          </div>
                        )}
                      </div>
                    </div>
                  </Panel>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ============================================================================
// BADGES SCREEN
// ============================================================================

function BadgesScreen({ player, onBack, onEquip }) {
  const earned = new Set(player.badges);
  const equipped = new Set(player.equippedBadges);
  return (
    <div className="space-y-4 animate-fade-in-up">
      <BackBar onBack={onBack} title={`Badges · ${player.badges.length}/${BADGES.length}`} />
      <div className="font-serif italic text-amber-200/60 text-sm">
        Tap earned badges to equip (up to 3). Equipped badges appear next to your name in matches.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {BADGES.map(b => {
          const isEarned = earned.has(b.id);
          const isEquipped = equipped.has(b.id);
          const tierStyle = BADGE_TIER_STYLES[b.tier];
          return (
            <button key={b.id} onClick={() => isEarned && onEquip(b.id)} disabled={!isEarned}>
              <Panel className={`p-4 text-left h-full transition-all
                ${isEarned ? "hover:scale-[1.02]" : "opacity-50 cursor-not-allowed"}
                ${isEquipped ? "ring-2 ring-amber-300/60" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tierStyle.bg} ${tierStyle.border} border`}>
                    {isEarned ? <Award size={22} className={tierStyle.text} /> : <Lock size={18} className="text-amber-200/40" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-display text-amber-100 text-sm">{b.name}</div>
                      {isEquipped && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-300/20 border border-amber-300/40 text-amber-200 font-display">EQUIPPED</span>}
                    </div>
                    <div className="text-[10px] font-display tracking-widest uppercase text-amber-200/50 mb-1">{b.tier}</div>
                    <div className="text-xs text-amber-200/60 font-serif italic">{b.desc}</div>
                  </div>
                </div>
              </Panel>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// PROFILE SCREEN
// ============================================================================

function ProfileScreen({ player, onBack, onRename, onReset }) {
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(player.name);
  const xpNeeded = xpForLevel(player.level);

  return (
    <div className="space-y-4 animate-fade-in-up max-w-2xl mx-auto">
      <BackBar onBack={onBack} title="Profile" />
      <Panel className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #f5d76e 0%, #ec4899 100%)" }}>
            <User size={28} className="text-[#1a0e2e]" />
          </div>
          <div className="flex-1">
            {renaming ? (
              <div className="flex items-center gap-2">
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-amber-300/30 text-amber-50 text-sm" />
                <GoldButton size="sm" onClick={() => { onRename(newName.trim() || "Apprentice"); setRenaming(false); }}>Save</GoldButton>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="font-display text-2xl text-amber-100">{player.name}</div>
                <button onClick={() => setRenaming(true)} className="text-amber-200/60 hover:text-amber-100"><Edit size={14} /></button>
              </div>
            )}
            <div className="text-xs text-amber-200/60 font-serif italic">Apprentice of Lumora Academy</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <Stat label="Level" value={player.level} />
          <Stat label="XP" value={`${player.xp}/${xpNeeded}`} />
          <Stat label="Lumens" value={player.lumens.toLocaleString()} />
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full transition-all"
            style={{ width: `${(player.xp / xpNeeded) * 100}%`, background: "linear-gradient(90deg, #f5d76e, #ec4899)" }} />
        </div>
      </Panel>

      <Panel className="p-6">
        <div className="font-display text-amber-100 mb-3">Lifetime Stats</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm font-body">
          <StatRow label="Questions answered" value={player.stats.totalAnswered} />
          <StatRow label="Correct answers" value={player.stats.totalCorrect} />
          <StatRow label="Best streak" value={player.stats.bestStreak} />
          <StatRow label="Perfect runs" value={player.stats.perfectRuns} />
          <StatRow label="Spell Duels won" value={player.stats.duelsWon} />
          <StatRow label="Alchemy runs" value={player.stats.alchemyRuns} />
          <StatRow label="Vault runs" value={player.stats.vaultRuns} />
          <StatRow label="Echo Chambers cleared" value={player.stats.echoChambersCleared || 0} />
          <StatRow label="Trades completed" value={player.stats.tradesCompleted || 0} />
          <StatRow label="Skills learned" value={(player.skills || []).length} />
          <StatRow label="Quizzes played" value={player.stats.quizzesPlayed} />
          <StatRow label="Quizzes created" value={player.stats.quizzesCreated} />
          <StatRow label="Familiars" value={player.familiars.length} />
          <StatRow label="Achievements" value={`${player.achievements.length}/${ACHIEVEMENTS.length}`} />
          <StatRow label="Badges" value={`${player.badges.length}/${BADGES.length}`} />
        </div>
      </Panel>

      <Panel className="p-6">
        <div className="font-display text-amber-100 mb-2">Danger Zone</div>
        <div className="text-xs text-amber-200/60 font-serif italic mb-3">Reset your save. All progress, Familiars, and custom quizzes will be erased.</div>
        <GoldButton variant="ghost" onClick={() => { if (confirm("Really reset your entire journey? This cannot be undone.")) onReset(); }}>
          <RotateCw size={14} className="inline mr-1" /> Reset Progress
        </GoldButton>
      </Panel>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5">
      <span className="text-amber-200/60 text-xs font-serif italic">{label}</span>
      <span className="font-display text-amber-100">{value}</span>
    </div>
  );
}

// ============================================================================
// GAME RESULT HANDLER
// ============================================================================

function handleGameFinish(result, quiz, mode, applyChange, pushToast) {
  applyChange(p => {
    const lumensMul = lumensMultiplier(p);
    const xpMul = xpMultiplier(p);
    const dropBonus = familiarDropBonus(p);
    const scaledLumens = Math.round(result.lumensEarned * lumensMul);
    let next = {
      ...p,
      lumens: p.lumens + scaledLumens,
      stats: {
        ...p.stats,
        totalAnswered: p.stats.totalAnswered + result.total,
        totalCorrect: p.stats.totalCorrect + result.score,
        bestStreak: Math.max(p.stats.bestStreak, result.bestStreak),
        perfectRuns: p.stats.perfectRuns + (result.perfect ? 1 : 0),
        duelsWon: p.stats.duelsWon + (result.duelWon ? 1 : 0),
        alchemyRuns: p.stats.alchemyRuns + (mode === "alchemy" ? 1 : 0),
        vaultRuns: p.stats.vaultRuns + (mode === "vault" && !result.timeout ? 1 : 0),
        echoChambersCleared: p.stats.echoChambersCleared + (result.echoCleared ? 1 : 0),
        quizzesPlayed: p.stats.quizzesPlayed + 1,
        upsetWins: p.stats.upsetWins + (result.duelWon && Math.random() < 0.3 ? 1 : 0),
      },
    };
    // Grant XP
    const xpGain = Math.round((result.score * 5 + (result.perfect ? 25 : 0) + (result.duelWon ? 30 : 0) + (result.echoCleared ? 80 : 0)) * xpMul);
    next = addXp(next, xpGain);
    // Echo Chamber clear → guaranteed Radiant+ drop
    if (result.echoCleared) {
      const forced = Math.random() < 0.2 ? "luminous" : "radiant";
      const f = makeFamiliar(forced);
      next.familiars = [...next.familiars, f];
      pushToast(`The Echo Chamber yields ${f.name} (${RARITIES[f.rarity].name}).`, "achievement");
    } else if (result.perfect || result.duelWon) {
      const f = makeFamiliar();
      next.familiars = [...next.familiars, f];
      pushToast(`A wild companion approaches! You earned ${f.name} (${RARITIES[f.rarity].name})`, "success");
    } else {
      const baseDropChance = result.score >= Math.ceil(result.total * 0.7) ? 0.3 : 0;
      if (baseDropChance > 0 && Math.random() < baseDropChance + dropBonus) {
        const f = makeFamiliar("glimmer");
        next.familiars = [...next.familiars, f];
        pushToast(`A Glimmer ${f.name} follows you home.`, "success");
      }
    }
    return next;
  });
}

async function handleWish(count, player, applyChange, pushToast, opts = {}) {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(makeFamiliar());
  }
  // Pity system for 10x wishes — guarantee at least Gleam
  if (count === 10 && !results.some(f => RARITIES[f.rarity].tier >= 3)) {
    const pityRarity = Math.random() < 0.3 ? "radiant" : "gleam";
    results[Math.floor(Math.random() * results.length)] = makeFamiliar(pityRarity);
  }
  const isFree = opts.free === true;
  const cost = isFree ? 0 : (count === 10 ? 900 : 100);
  applyChange(p => ({
    ...p,
    lumens: p.lumens - cost,
    familiars: [...p.familiars, ...results],
    lastFreeWishDay: isFree ? currentDayIndex() : p.lastFreeWishDay,
  }));
  // Celebrate rare pulls
  const bestPull = results.reduce((best, f) => RARITIES[f.rarity].tier > RARITIES[best.rarity].tier ? f : best);
  if (RARITIES[bestPull.rarity].tier >= 5) {
    pushToast(`✨ A ${RARITIES[bestPull.rarity].name} arrives: ${bestPull.name}!`, "achievement");
  } else if (RARITIES[bestPull.rarity].tier >= 3) {
    pushToast(`A ${RARITIES[bestPull.rarity].name} ${bestPull.name} answers your wish.`, "success");
  }
  return results;
}
