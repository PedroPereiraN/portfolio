<script setup lang="ts">
const langStore = useLanguageStore();
const t = computed(() => langStore.t);

onMounted(() => langStore.init());

type Project = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

const { data: projects } = await useFetch<Project[]>(
  "https://api.github.com/users/pedropereiran/repos",
);

const ignoreRepos = ["nvim-config", "portfolio"];

const skillGroups = [
  {
    categoryKey: "frontend" as const,
    skills: [
      { label: "JavaScript", icon: "lineicons:javascript" },
      { label: "TypeScript", icon: "lineicons:typescript" },
      { label: "React", icon: "simple-icons:react" },
      { label: "Next.js", icon: "meteor-icons:nextjs" },
      { label: "Vue.js", icon: "famicons:logo-vue" },
      { label: "Nuxt", icon: "simple-icons:nuxt" },
    ],
  },
  {
    categoryKey: "backend" as const,
    skills: [
      { label: "Node.js", icon: "mdi:nodejs" },
      { label: "Python", icon: "griddy-icons:python" },
      { label: "FastAPI", icon: "bxl:fastapi" },
      { label: "PostgreSQL", icon: "simple-icons:postgresql" },
      { label: "Go", icon: "fa7-brands:golang" },
      { label: "Gin", icon: "simple-icons:gin" },
    ],
  },
  {
    categoryKey: "tests" as const,
    skills: [
      { label: "Jest", icon: "simple-icons:jest" },
      { label: "Cypress", icon: "simple-icons:cypress" },
      { label: "Pytest", icon: "simple-icons:pytest" },
      { label: "Go Testing", icon: "fa7-brands:golang" },
      { label: "Testify", icon: "fa7-brands:golang" },
      { label: "GoMock", icon: "fa7-brands:golang" },
    ],
  },
  {
    categoryKey: "devops" as const,
    skills: [
      { label: "Linux", icon: "uil:linux" },
      { label: "Docker", icon: "simple-icons:docker" },
      { label: "Docker Compose", icon: "simple-icons:docker" },
      { label: "Git / GitHub", icon: "simple-icons:github" },
    ],
  },
  {
    categoryKey: "process" as const,
    skills: [
      { label: "Scrum", icon: "simple-icons:scrumalliance" },
      { label: "Jira", icon: "simple-icons:jira" },
      { label: "Azure DevOps", icon: "simple-icons:azuredevops" },
    ],
  },
  {
    categoryKey: "languages" as const,
    skillsKey: "languages" as const,
  },
  {
    categoryKey: "bestTrait" as const,
    skillsKey: "bestTrait" as const,
  },
];
</script>

<template>
  <UHeader :ui="{ toggle: 'hidden' }">
    <template #title>
      <RouterLink to="/#hero-section">Pedro Alves Pereira Neto</RouterLink>
    </template>

    <nav class="hidden md:flex items-center gap-4">
      <UButton variant="link" color="neutral" to="/#about">{{ t.nav.about }}</UButton>
      <UButton variant="link" color="neutral" to="/#skills">{{ t.nav.skills }}</UButton>
      <UButton variant="link" color="neutral" to="/#projects">{{ t.nav.projects }}</UButton>
    </nav>

    <template #right>
      <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" to="https://github.com/PedroPereiraN" target="_blank" aria-label="Github" />
      <UButton icon="i-simple-icons-linkedin" color="neutral" variant="ghost" to="https://linkedin.com/in/pedropereiran" target="_blank" aria-label="LinkedIn" />
      <UButton icon="i-simple-icons-gmail" color="neutral" variant="ghost" to="mailto:peapn.13@gmail.com" aria-label="Email" />
      <USeparator orientation="vertical" class="h-4" />
      <UPopover :ui="{ content: 'p-1' }">
        <UButton variant="ghost" color="neutral" size="sm" icon="i-lucide-globe" trailing-icon="i-lucide-chevron-down">
          {{ langStore.lang === 'en' ? 'English' : 'Português' }}
        </UButton>
        <template #content>
          <div class="flex flex-col">
            <UButton variant="ghost" color="neutral" size="sm" @click="langStore.setLang('en')">English</UButton>
            <UButton variant="ghost" color="neutral" size="sm" @click="langStore.setLang('pt')">Português</UButton>
          </div>
        </template>
      </UPopover>
    </template>
  </UHeader>
  <main class="overflow-x-hidden">
    <section
      id="hero-section"
      class="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-16 lg:px-24 gap-10 overflow-x-hidden"
    >
      <div class="w-full md:w-2/5 text-center md:text-left">
        <h1 class="font-bold text-4xl sm:text-5xl lg:text-7xl">Pedro Alves Pereira Neto</h1>
        <p class="text-lg sm:text-xl lg:text-2xl mt-4">{{ t.hero.subtitle }}</p>
      </div>
      <div class="w-full md:w-3/5">
        <HeroTerminal />
      </div>
    </section>

    <section
      id="about"
      class="flex flex-col-reverse md:flex-row justify-around items-start px-6 md:px-20 lg:px-40 min-h-screen py-16 md:py-32 gap-10"
    >
      <div class="w-full md:w-3/5 flex flex-col gap-10">
        <div>
          <h2 class="font-bold text-3xl mb-3">{{ t.about.title }}</h2>
          <p class="text-muted">{{ t.about.description }}</p>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-6">{{ t.about.experience }}</h3>
          <div class="relative border-l-2 border-default pl-8 flex flex-col gap-10">
            <div class="relative">
              <span class="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-background"></span>
              <div class="flex flex-col gap-1">
                <p class="font-semibold text-base">{{ t.about.job.title }}</p>
                <UBadge color="primary" variant="subtle" class="w-fit">{{ t.about.job.period }}</UBadge>
                <ul class="mt-3 flex flex-col gap-2 text-sm text-muted list-none">
                  <li v-for="item in t.about.job.items" :key="item.label">
                    <span class="font-medium text-default">{{ item.label }}:</span>
                    {{ item.text }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        src="/me.jpeg"
        class="rounded-full w-36 h-36 md:w-56 md:h-56 object-cover self-center md:sticky md:top-32"
      />
    </section>
    <section
      id="skills"
      class="flex flex-col items-center px-6 md:px-20 lg:px-40 py-16 gap-8"
    >
      <div class="text-center">
        <h2 class="font-bold text-3xl">{{ t.skills.title }}</h2>
      </div>

      <div class="w-full flex flex-col gap-6">
        <div v-for="group in skillGroups" :key="group.categoryKey">
          <p class="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
            {{ t.skills.categories[group.categoryKey] }}
          </p>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="skill in (group.skills ?? t.skills[group.skillsKey!])"
              :key="skill.label"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-default bg-white/5 hover:border-primary hover:bg-white/10 transition-all duration-200 cursor-default"
            >
              <Icon :name="skill.icon" size="16" />
              <span class="text-xs font-medium">{{ skill.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="min-h-screen px-6 md:px-16 lg:px-20 py-16">
      <h2 class="font-bold text-xl">{{ t.projects.title }}</h2>
      <p>{{ t.projects.subtitle }}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <a
          v-for="project in (projects ?? ([] as Project[])).filter(
            (p) => !ignoreRepos.includes(p.name),
          )"
          :key="project.id"
          class="flex flex-col gap-3 p-5 rounded-xl border border-gray-700 hover:border-gray-400 transition-colors duration-200 cursor-pointer"
          target="_blank"
          :href="project.html_url"
        >
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-base truncate">
              {{ project.name }}
            </h3>
            <Icon
              name="lucide:external-link"
              size="16"
              class="shrink-0 opacity-50"
            />
          </div>
          <p class="text-sm opacity-60 leading-relaxed line-clamp-3">
            {{ project.description ?? t.projects.noDescription }}
          </p>
        </a>
      </div>
    </section>
  </main>

  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        {{ t.footer.copy }} {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/PedroPereiraN"
        target="_blank"
        aria-label="Github"
      />
      <UButton
        icon="i-simple-icons-linkedin"
        color="neutral"
        variant="ghost"
        to="https://linkedin.com/in/pedropereiran"
        target="_blank"
        aria-label="linkedin"
      />
      <UButton
        icon="i-simple-icons-gmail"
        color="neutral"
        variant="ghost"
        to="emailto:peapn.13@gmail.com"
        aria-label="email"
      />
    </template>
  </UFooter>
</template>
