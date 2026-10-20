export const PROFILE = {
  name: "İLHAN EGEMEN DURMUŞ",
  title: "Bilgisayar Programcısı · Freelancer",
  intro: "Freelance web uygulamaları geliştiriyorum. Boş zamanlarımda oyun denemeleri yapıyorum.",
  about: [
    "Freelancer bilgisayar programcısıyım. Next.js, Supabase ve Vercel ile web uygulamaları geliştiriyorum.",
    "Hobi olarak Godot ile oyun denemeleri yapıyorum. Sade, ölçülebilir ve bakımı kolay çözümleri tercih ederim.",
  ],
  email: "ilhanegemen45@gmail.com",
  github: "https://github.com/HAYALLED",
  linkedin: "https://www.linkedin.com/in/ilhan-egemen-durmu%C5%9F-459bb2330/",
  phonenumber:"905422401362"
} as const;

export type SkillLevel = "top" | "high" | "mid";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export const SKILL_LEVELS: Record<SkillLevel, string> = {
  top: "En iyi olduğum alanlar",
  high: "İleri seviye",
  mid: "Ortalama üstü",
};

export const SKILLS: ReadonlyArray<{ group: string; items: readonly Skill[] }> = [
  {
    group: "Web",
    items: [
      { name: "C#", level: "top" },
      { name: "HTML/CSS", level: "top" },
      { name: "PHP", level: "top" },
      { name: "JavaScript", level: "high" },
      { name: "TypeScript", level: "high" },
      { name: "React", level: "mid" },
      { name: "Next.js", level: "high" },
      { name: "Python", level: "high" },
    ],
  },
  {
    group: "Oyun",
    items: [
      { name: "Godot", level: "high" },
      { name: "GDScript", level: "mid" },
      { name: "C#", level: "top" },
      { name: "making Localization system", level: "high" },
      { name: "making save system", level: "high" },
      { name: "2D", level: "top" },
      { name: "3D", level: "mid" },
    ],
  },
  {
    group: "Backend & Altyapı",
    items: [
      { name: "Microsoft SQL Server,", level: "top" },
      { name: "Supabase", level: "top" },
      { name: "PostgreSQL", level: "high" },
      { name: "Wampserver", level: "high" },
      { name: "Sqlite", level: "high" },
      { name: "Vercel", level: "high" },
      { name: "API Routes", level: "mid" },
    ],
  },
  {
    group: "Diğer",
    items: [
      { name: "Pixel Art", level: "high" },
      { name: "İngilizce", level: "high" },
      { name: "future proof coding", level: "mid" },
      { name: "making clean code or structure", level: "high" },
      { name: "blender 3D modeling", level: "mid" },
      { name: "Environment Artist / Level Designer", level: "high" },
    ],
  },
];

export const NAV_LINKS = [
  { id: "home", label: "Ana Sayfa" },
  { id: "about", label: "Hakkımda" },
  { id: "skills", label: "Yetenekler" },
  { id: "projects", label: "Projeler" },
  { id: "contact", label: "İletişim" },
] as const;