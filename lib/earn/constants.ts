export const VOCATIONAL_CATEGORIES = [
  "Tailoring & Stitching",
  "Farming & Agriculture",
  "Driving & Transport",
  "Plumbing & Sanitation",
  "Electrical Work",
  "Carpentry & Woodwork",
  "Mobile Phone Repair",
  "Cooking & Catering",
  "Beauty & Wellness",
  "Masonry & Construction",
  "Solar Panel Installation",
  "Other",
] as const;

export type VocationalCategory = (typeof VOCATIONAL_CATEGORIES)[number];

export type VocationalSkill = {
  id: string;
  userId: string;
  userName: string;
  category: VocationalCategory;
  title: string;
  description: string;
  yearsOfExperience: number;
  status: "self-reported" | "mentor-verified";
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
};
