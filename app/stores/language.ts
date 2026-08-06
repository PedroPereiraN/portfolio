import { defineStore } from "pinia";
import en from "~/locales/en";
import pt from "~/locales/pt";

type Lang = "en" | "pt";

const locales = { en, pt };

function detectLang(): Lang {
  if (import.meta.client) {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "pt") return saved;
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    if (browser === "pt") return "pt";
  }
  return "en";
}

export const useLanguageStore = defineStore("language", {
  state: () => ({
    lang: "en" as Lang,
  }),
  getters: {
    t: (state) => locales[state.lang],
  },
  actions: {
    init() {
      this.lang = detectLang();
    },
    setLang(lang: Lang) {
      this.lang = lang;
      if (import.meta.client) {
        localStorage.setItem("lang", lang);
      }
    },
    toggle() {
      this.setLang(this.lang === "en" ? "pt" : "en");
    },
  },
});
