<script setup lang="ts">
const terminal = ref<HTMLDivElement>();
let resizeObserver: ResizeObserver | null = null;
const isMobile = ref(false);

onMounted(async () => {
  isMobile.value = window.innerWidth < 768;
  const { Terminal } = await import("xterm");
  const { FitAddon } = await import("@xterm/addon-fit");
  await import("xterm/css/xterm.css");

  const term = new Terminal({
    fontSize: 13,
    allowTransparency: true,
    theme: {
      background: "rgba(0, 0, 0, 0)",
      foreground: "#ffffff",
    },
  });

  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(terminal.value!);
  fitAddon.fit();

  const r = "\x1b[0m";
  const bold = "\x1b[1m";
  const green = "\x1b[32m";
  const cyan = "\x1b[36m";
  const gray = "\x1b[90m";
  const white = "\x1b[97m";
  const ok = `${green}[ OK ]${r}`;

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const steps = [
    ["Mounting filesystems", 80],
    ["Loading dependencies", 120],
    ["Compiling personality", 200],
    ["Warming up the coffee", 150],
    ["Questioning life choices", 300],
    ["Writing clean code", 180],
  ] as const;

  term.writeln(`${bold}${cyan}pedro-os${r} ${gray}v1.0.0 — booting...${r}`);
  term.writeln(``);

  for (const [label, ms] of steps) {
    await delay(ms);
    term.writeln(`  ${ok}  ${label}`);
  }

  await delay(300);
  term.writeln(``);
  term.writeln(`  ${gray}${"─".repeat(term.cols - 4)}${r}`);
  term.writeln(``);
  term.writeln(`  ${bold}${white}Welcome to my portfolio.${r}`);
  term.writeln(
    `  ${gray}I am a programmer who thrives on the challenges that come with writing code. Planning, problem-solving, and pushing through complexity, that's what drives me. I never get tired of learning, and I firmly believe there's no problem that can't be solved. ${r}`,
  );
  term.writeln(``);
  term.writeln(
    ` ${cyan}JavaScript${r} ${cyan}TypeScript${r}  ${cyan}Vue${r}  ${cyan}Nuxt${r}  ${cyan}React${r}  ${cyan}Nextjs${r}  ${cyan}Python${r}  ${cyan}FastAPI${r}  ${cyan}Go${r}`,
  );

  const link = (label: string, url: string) =>
    `\x1b]8;;${url}\x07${cyan}${label}${r}\x1b]8;;\x07`;

  term.writeln(
    `  ${gray}github   ${r}${link("github.com/PedroPereiraN", "https://github.com/PedroPereiraN")}`,
  );
  term.writeln(
    `  ${gray}linkedin ${r}${link("linkedin.com/in/pedropereiran", "https://linkedin.com/in/pedropereiran")}`,
  );
  term.writeln(
    `  ${gray}email    ${r}${link("peapn.13@gmail.com", "mailto:peapn.13@gmail.com")}`,
  );
  term.writeln(``);
  term.write(`  ${green}$${r} `);

  resizeObserver = new ResizeObserver(() => fitAddon.fit());
  resizeObserver.observe(terminal.value!);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <div class="w-full h-[50vh] md:h-[60vh] lg:h-[70vh]" :style="{ perspective: '1200px' }">
    <div
      class="w-full h-full backdrop-blur-md bg-white/5 border border-white/15 rounded-2xl overflow-hidden p-4"
      :style="{
        transform: isMobile ? 'none' : 'rotateY(-18deg) rotateX(3deg)',
        transformStyle: 'preserve-3d',
        boxShadow: '20px 20px 60px rgba(0,0,0,0.5), -4px 0 20px rgba(0,0,0,0.3)',
      }"
    >
      <div ref="terminal"></div>
    </div>
  </div>
</template>
