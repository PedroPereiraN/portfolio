<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

type Project = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

const { data: projects } = await useFetch<Project[]>(
  "https://api.github.com/users/pedropereiran/repos",
);

const skills = [
  {
    label: "HTML",
    icon: "flowbite:html-solid",
  },
  {
    label: "CSS",
    icon: "flowbite:css-solid",
  },
  {
    label: "Javascript",
    icon: "lineicons:javascript",
  },
  {
    label: "Typescript",
    icon: "lineicons:typescript",
  },
  {
    label: "Vue",
    icon: "famicons:logo-vue",
  },
  {
    label: "Nuxt",
    icon: "simple-icons:nuxt",
  },
  {
    label: "React",
    icon: "simple-icons:react",
  },
  {
    label: "Next",
    icon: "meteor-icons:nextjs",
  },
  {
    label: "Nodejs",
    icon: "mdi:nodejs",
  },
  {
    label: "Python",
    icon: "griddy-icons:python",
  },
  {
    label: "Fastapi",
    icon: "bxl:fastapi",
  },
  {
    label: "Golang",
    icon: "fa7-brands:golang",
  },
  {
    label: "Gin",
    icon: "simple-icons:gin",
  },
  {
    label: "Linux",
    icon: "uil:linux",
  },
];
</script>

<template>
  <UHeader>
    <template #title>
      <RouterLink to="/#hero-section"> Pedro Alves Pereira Neto </RouterLink>
    </template>

    <nav class="flex gap-4">
      <UButton variant="link" color="neutral" to="/#about">About</UButton>
      <UButton variant="link" color="neutral" to="/#skills">Skills</UButton>
      <UButton variant="link" color="neutral" to="/#projects"
        >Personal Projects</UButton
      >
    </nav>
  </UHeader>
  <main class="overflow-x-hidden">
    <section
      id="hero-section"
      class="flex items-center justify-center min-w-screen min-h-screen overflow-x-hidden"
    >
      <div class="w-2/6">
        <h1 class="font-bold text-7xl">Pedro Alves Pereira Neto</h1>
        <p class="text-2xl">
          A programmer who thrives on challenges, writes clean and performant
          code, and never stops learning.
        </p>
      </div>
      <HeroTerminal />
    </section>

    <section
      id="about"
      class="flex justify-around items-center px-40 min-w-screen min-h-screen"
    >
      <div class="w-3/5">
        <h2 class="font-bold text-xl">About me</h2>
        <p>
          Full-Stack Developer with over 3 years of experience and a solid
          mastery of the TypeScript ecosystem, specializing in Vue, React and
          Node.js. Additionally, I bring practical knowledge of Python
          (FastAPI). Proven track record in automating operational workflows,
          data modeling, and delivering seamless end-to-end integrations, with a
          strong focus on scalability and clean architecture.
        </p>
      </div>

      <img src="/me.jpeg" class="rounded-full w-56 h-56 object-cover" />
    </section>
    <section
      id="skills"
      class="min-w-screen min-h-screen flex justify-center items-center"
    >
      <div class="w-3/5">
        <p>My best trait? Doing what i need to do.</p>
      </div>
      <div class="w-2/5">
        <h2 class="font-bold text-xl">Skills</h2>
        <div class="h-40 flex flex-col flex-wrap">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="flex gap-2 my-1"
          >
            <Icon :name="skill.icon" size="24" />
            <p>{{ skill.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="min-w-screen min-h-screen p-20">
      <h2 class="font-bold text-xl">Projects</h2>
      <p>A list of my personal projects on github</p>

      <div class="grid grid-cols-3 gap-4 mt-8">
        <a
          v-for="project in (projects ?? ([] as Project[])).filter(
            (p) => p.name !== 'nvim-config',
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
            {{ project.description ?? "No description provided." }}
          </p>
        </a>
      </div>
    </section>
  </main>

  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Pedro Alves Pereira Neto © {{ new Date().getFullYear() }}
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
