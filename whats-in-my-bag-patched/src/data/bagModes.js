import {
  Laptop, Plug, BookOpen, Wallet, BatteryCharging, GlassWater, Notebook, Pen,
  Globe, Headphones, Shirt, Footprints, Droplets,
  GraduationCap, Plane, Briefcase, Dumbbell,
} from "lucide-react";

// Master catalogue of items. Modes pick from it, so nothing is duplicated.
const CATALOG = {
  laptop: { name: "Laptop", icon: Laptop },
  charger: { name: "Charger", icon: Plug },
  book: { name: "Book", icon: BookOpen },
  notebook: { name: "Notebook", icon: Notebook },
  pen: { name: "Pen", icon: Pen },
  wallet: { name: "Wallet", icon: Wallet },
  powerbank: { name: "Power Bank", icon: BatteryCharging },
  bottle: { name: "Water Bottle", icon: GlassWater },
  passport: { name: "Passport", icon: Globe },
  headphones: { name: "Headphones", icon: Headphones },
  clothes: { name: "Sports Clothes", icon: Shirt },
  towel: { name: "Towel", icon: Droplets },
  shoes: { name: "Shoes", icon: Footprints },
};

const pick = (...ids) => ids.map((id) => ({ id, ...CATALOG[id] }));

export const bagModes = {
  campus: {
    name: "Campus Mode",
    icon: GraduationCap,
    description: "Everything you need for class.",
    items: pick("laptop", "charger", "book", "notebook", "pen", "wallet", "powerbank", "bottle"),
    essentials: ["laptop", "charger", "book", "wallet"],
  },
  travel: {
    name: "Travel Mode",
    icon: Plane,
    description: "Pack smart for your journey.",
    items: pick("passport", "wallet", "charger", "powerbank", "headphones", "bottle", "book", "laptop"),
    essentials: ["passport", "wallet", "charger", "powerbank"],
  },
  work: {
    name: "Work Mode",
    icon: Briefcase,
    description: "Stay productive wherever you work.",
    items: pick("laptop", "charger", "notebook", "pen", "wallet", "powerbank", "headphones", "bottle"),
    essentials: ["laptop", "charger", "notebook", "wallet"],
  },
  gym: {
    name: "Gym Mode",
    icon: Dumbbell,
    description: "Don’t forget your workout essentials.",
    items: pick("clothes", "towel", "bottle", "shoes", "headphones", "powerbank", "wallet"),
    essentials: ["clothes", "shoes", "bottle", "towel"],
  },
};
