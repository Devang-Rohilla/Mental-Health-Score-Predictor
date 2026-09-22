export const GENDER_OPTIONS = ["Male", "Female"];

export const ACADEMIC_LEVEL_OPTIONS = ["Undergraduate", "Graduate", "High School"];

export const PLATFORM_OPTIONS = [
  "Facebook",
  "LinkedIn",
  "Instagram",
  "Snapchat",
  "Twitter",
  "YouTube",
  "TikTok",
  "LINE",
  "KakaoTalk",
  "VKontakte",
  "WhatsApp",
  "WeChat",
];

export const PURPOSE_OPTIONS = ["Networking", "Education", "Entertainment", "News"];

export const STRESS_OPTIONS = ["Low", "Medium", "High", "Very High"];

export const COUNTRY_OPTIONS = [
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "South Korea",
  "Brazil",
  "Mexico",
  "South Africa",
  "Nigeria",
  "Philippines",
  "Indonesia",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
  "Singapore",
];

export const INITIAL_FORM_STATE = {
  age: "",
  gender: "",
  country: "",
  academic_level: "",
  most_used_platform: "",
  purpose_of_use: "",
  avg_daily_usage_hours: "",
  daily_unlocks: "",
  study_hours: "",
  physical_activity_hours: "",
  sleep_hours_per_night: "",
  stress_level: "",
};

// Field groupings drive the three-step wizard in PredictionForm.
export const STEP_FIELDS = {
  0: ["age", "gender", "country", "academic_level"],
  1: ["most_used_platform", "purpose_of_use", "avg_daily_usage_hours", "daily_unlocks"],
  2: ["study_hours", "physical_activity_hours", "sleep_hours_per_night", "stress_level"],
};

export const STEP_META = [
  { title: "Personal info", caption: "The basics about you" },
  { title: "Digital habits", caption: "How you use social media" },
  { title: "Lifestyle & wellbeing", caption: "Rest, movement, and mind" },
];
