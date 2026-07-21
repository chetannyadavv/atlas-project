/**
 * Central destination registry.
 *
 * Per 04_World_Design.md: "New destinations should be added without
 * redesigning the world structure." All world/navigation/UI modules
 * should read from this list rather than hardcoding destinations.
 */

export type DestinationId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact";

export interface ProjectEntry {
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  link?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ContactLink {
  label: string;
  value: string;
  href?: string;
}

export type DestinationContent =
  | { kind: "about"; bio: string }
  | { kind: "projects"; items: ProjectEntry[] }
  | { kind: "skills"; categories: SkillCategory[] }
  | { kind: "experience"; message: string }
  | { kind: "contact"; links: ContactLink[] };

export interface Destination {
  id: DestinationId;
  label: string;
  description: string;
  position: [number, number, number];
  dockPosition: [number, number, number];
  content: DestinationContent;
}

const RADIUS = 18;
const DOCK_OFFSET = 3.2;

function circlePosition(index: number, total: number): [number, number, number] {
  const angle = (index / total) * Math.PI * 2;
  return [Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS];
}

function dockPositionFor(pos: [number, number, number]): [number, number, number] {
  const [x, y, z] = pos;
  const len = Math.sqrt(x * x + z * z);
  if (len === 0) return pos;
  const factor = Math.max(0, (len - DOCK_OFFSET) / len);
  return [x * factor, y, z * factor];
}

const RAW_DESTINATIONS: Omit<Destination, "position" | "dockPosition">[] = [
  {
    id: "about",
    label: "About",
    description: "Who I am and how I work.",
    content: {
      kind: "about",
      bio:
        "I'm Chetan Yadav — an engineer who doesn't sit still in one domain. " +
        "One week I'm hand-building a CRDT from scratch to make real-time text sync actually converge; " +
        "the next I'm inside Wireshark and Metasploit, taking systems apart to see exactly where they give in. " +
        "I'm not drawn to security because I want to defend — I'm drawn to it because breaking something " +
        "is the fastest way to actually understand it. That same instinct drives everything I build: " +
        "backend systems, AI-augmented tools, sandboxed judges — I'd rather learn the hard way, from the " +
        "inside, than trust an abstraction I haven't stress-tested myself. Different arenas, same fight.",
    },
  },
  {
    id: "projects",
    label: "Projects",
    description: "Selected work and case studies.",
    content: {
      kind: "projects",
      items: [
        {
          title: "Inkwell — Real-Time Collaborative Text Editor",
          description:
            "A CRDT built from scratch, not borrowed. Implemented RGA (Replicated Growable Array) for " +
            "conflict-free concurrent editing, then identified and fixed its known interleaving anomaly with " +
            "a custom extension based on the Fugue algorithm — the kind of bug you only find by actually " +
            "building the thing yourself instead of importing Yjs or Automerge.",
          highlights: [
            "Hand-built CRDT (RGA \u2192 Fugue-based extension) fixing concurrent multi-character interleaving",
            "WebSocket real-time sync: live multi-user editing, cursor/presence tracking",
            "Offline editing with automatic reconnection and replay",
            "Crash-resistant persistence via append-only op log with snapshot compaction (SQLite)",
            "Deployed to production with room-based password auth and rich-text formatting",
          ],
          tech: ["TypeScript", "React", "Node.js", "WebSockets", "SQLite"],
          link: "https://github.com/chetannyadavv/real-time-collab-editor",
        },
        {
          title: "DevMentor — AI-Augmented Online Judge Platform",
          description:
            "A Docker-based online judge for secure, sandboxed code execution, currently being built in " +
            "deliberate phases: a fully production-grade judge first — auth, versioned problems, sandboxed " +
            "execution, live WebSocket verdicts, leaderboards, observability — before any AI work begins. " +
            "The AI mentor layer is planned as a fully isolated queue/worker so a Claude outage can never " +
            "block judging, a lesson learned from an earlier version that called the AI inline.",
          highlights: [
            "Sandboxed execution of Python, C++, Java with per-test-case verdicts and resource limits",
            "Network-isolated, read-only, non-root Docker containers per submission",
            "Live per-test-case verdicts pushed over WebSockets instead of polling",
            "Submission replay UI stepping through stored per-test artifacts",
            "AI mentor (Claude API) planned as an isolated queue/worker, decoupled from the core judging path",
          ],
          tech: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Docker", "React"],
          link: "https://github.com/chetannyadavv/devMentor",
        },
      ],
    },
  },
  {
    id: "skills",
    label: "Skills",
    description: "Tools and technologies.",
    content: {
      kind: "skills",
      categories: [
        {
          category: "Security & Networking",
          items: [
            "Wireshark",
            "Nmap",
            "Metasploit (msfvenom + msfconsole)",
            "TCP/IP",
            "Firewalls",
            "Linux",
          ],
        },
        {
          category: "Programming",
          items: [
            "Python (Scapy, Requests, OS, Socket)",
            "C",
            "C++",
            "Bash Scripting",
            "SQL",
          ],
        },
        {
          category: "AI & ML",
          items: [
            "HuggingFace Transformers",
            "LoRA / PEFT",
            "Model Fine-tuning",
            "LLM Inference",
          ],
        },
        {
          category: "Web & Tools",
          items: ["Node.js", "Express.js", "Git", "GitHub", "REST APIs"],
        },
      ],
    },
  },
  {
    id: "experience",
    label: "Experience",
    description: "Professional history.",
    content: {
      kind: "experience",
      message:
        "Still at sea. This ship hasn't docked at a harbor yet — no full-time role logged so far. " +
        "The voyage so far has been self-directed: building Inkwell and DevMentor, taking systems apart " +
        "to see how they fail. First proper harbor's still ahead.",
    },
  },
  {
    id: "contact",
    label: "Contact",
    description: "Get in touch.",
    content: {
      kind: "contact",
      links: [
        {
          label: "Email",
          value: "chetannyadavv@gmail.com",
          href: "mailto:chetannyadavv@gmail.com",
        },
        {
          label: "GitHub",
          value: "github.com/chetannyadavv",
          href: "https://github.com/chetannyadavv/",
        },
        { label: "Location", value: "New Delhi, India" },
      ],
    },
  },
];

export const DESTINATIONS: Destination[] = RAW_DESTINATIONS.map((d, i) => {
  const position = circlePosition(i, RAW_DESTINATIONS.length);
  return {
    ...d,
    position,
    dockPosition: dockPositionFor(position),
  };
});
