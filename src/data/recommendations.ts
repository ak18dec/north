export interface Recommendation {
  id: string
  title: string
  score: number // 0-100
  time: string // "~45 min"
  impact: string // "High career impact"
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  category: string
  tags: string[]
  summary: string // 2-3 sentences
  explanation: string // Why it matters to the user
  keyConcepts: string[]
  nextStep: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  payoff: 'High' | 'Medium' | 'Low'
}

export const recommendations: Recommendation[] = [
  {
    id: 'java-virtual-threads',
    title: 'Java Virtual Threads: The End of Thread-Pool Tuning',
    score: 94,
    time: '~45 min read',
    impact: 'High career impact',
    priority: 'HIGH',
    category: 'Backend',
    tags: ['Java', 'Concurrency', 'Performance'],
    summary:
      'Project Loom ships virtual threads as a stable feature in modern Java, letting you write simple blocking code that scales to millions of concurrent tasks. The platform now multiplexes lightweight virtual threads onto a small pool of OS carrier threads, eliminating most reactive-style complexity. For request-per-thread services, this is the biggest concurrency shift since the executor framework.',
    explanation:
      'You listed Java and Spring Boot as core skills and are targeting Staff Engineer. Virtual threads directly affect how you architect high-throughput services — and Spring Boot 3.2+ already supports them out of the box. Understanding the carrier-thread model will let you delete reactive workarounds you no longer need.',
    keyConcepts: [
      'Carrier threads vs. virtual threads and how mounting/unmounting works',
      'Why "pinning" happens with synchronized blocks and how to avoid it',
      'Structured concurrency for safe task scoping',
      'Migrating a thread-pool-tuned service to virtual threads',
      'When NOT to use virtual threads (CPU-bound work)',
    ],
    nextStep:
      'Spin up a Spring Boot 3.2 service, set spring.threads.virtual.enabled=true, and load-test a blocking endpoint against the old thread pool to feel the difference.',
    difficulty: 'Medium',
    payoff: 'High',
  },
  {
    id: 'ai-coding-agents',
    title: 'AI Coding Agents: From Autocomplete to Autonomous PRs',
    score: 91,
    time: '~30 min read',
    impact: 'High career impact',
    priority: 'HIGH',
    category: 'AI Tooling',
    tags: ['AI', 'Productivity', 'Emerging'],
    summary:
      'Coding agents like Copilot Workspace and autonomous PR bots are moving from inline suggestions to multi-step task execution: reading an issue, planning, editing files, and opening a pull request. The skill that matters is no longer typing code faster — it is decomposing work and reviewing agent output critically. Teams that adopt this well are seeing meaningful throughput gains on routine work.',
    explanation:
      'As you grow toward Staff, your leverage comes from how well your team ships, not just your own keystrokes. Knowing how to orchestrate and safely review coding agents is becoming a core senior-engineer skill and a frequent interview topic.',
    keyConcepts: [
      'Task decomposition for agent-friendly work units',
      'Reviewing agent-generated diffs without rubber-stamping',
      'Guardrails: tests, CI gates, and scoped permissions',
      'When agents help (boilerplate, migrations) vs. hurt (novel design)',
      'Measuring real productivity impact, not vanity metrics',
    ],
    nextStep:
      'Pick one well-defined ticket this week and drive it entirely through a coding agent, then write a short retro on where it saved or cost you time.',
    difficulty: 'Easy',
    payoff: 'High',
  },
  {
    id: 'mcp-servers',
    title: 'MCP Servers: A Standard Protocol for AI Tool Integration',
    score: 89,
    time: '~40 min read',
    impact: 'High career impact',
    priority: 'HIGH',
    category: 'AI Tooling',
    tags: ['AI', 'Integration', 'Emerging'],
    summary:
      'The Model Context Protocol (MCP) is an open standard that lets AI assistants connect to tools, data sources, and APIs through a uniform interface. Instead of bespoke glue for every integration, you expose capabilities as an MCP server that any compatible client can use. It is quickly becoming the USB-C of AI tooling.',
    explanation:
      'You work with microservices and AWS. MCP servers are essentially well-scoped service adapters for AI clients — a natural extension of skills you already have. Being early here positions you to lead AI-integration work on your team.',
    keyConcepts: [
      'MCP architecture: hosts, clients, and servers',
      'Exposing tools, resources, and prompts safely',
      'Transport options (stdio vs. HTTP) and auth concerns',
      'Mapping existing internal APIs to MCP capabilities',
      'Security: least-privilege scopes for AI access',
    ],
    nextStep:
      'Build a tiny MCP server that wraps one read-only internal API, then connect it to an MCP-capable client and watch it call your tool.',
    difficulty: 'Medium',
    payoff: 'High',
  },
  {
    id: 'opentelemetry-observability',
    title: 'Observability with OpenTelemetry: Tracing Across Microservices',
    score: 86,
    time: '~50 min read',
    impact: 'Medium career impact',
    priority: 'MEDIUM',
    category: 'Platform',
    tags: ['Observability', 'Microservices', 'Distributed Systems'],
    summary:
      'OpenTelemetry has become the vendor-neutral standard for traces, metrics, and logs, letting you instrument once and export anywhere. Distributed tracing stitches a single request across dozens of services so you can finally see where latency actually goes. For microservice fleets, it turns "it is slow somewhere" into a precise span.',
    explanation:
      'Microservices and System Design are on your profile. Strong observability is what separates teams that debug production confidently from teams that guess. This is consistently valued in Staff-level system-design discussions.',
    keyConcepts: [
      'Traces, spans, and context propagation',
      'Auto-instrumentation vs. manual spans',
      'The OTel Collector and exporter pipelines',
      'Correlating traces with metrics and logs',
      'Sampling strategies to control cost',
    ],
    nextStep:
      'Add OpenTelemetry auto-instrumentation to two of your services and trace a single request end-to-end through a backend like Jaeger or Tempo.',
    difficulty: 'Medium',
    payoff: 'Medium',
  },
  {
    id: 'platform-engineering',
    title: 'Platform Engineering: Golden Paths and Internal Developer Platforms',
    score: 83,
    time: '~35 min read',
    impact: 'Medium career impact',
    priority: 'MEDIUM',
    category: 'Platform',
    tags: ['Platform', 'DevEx', 'Emerging'],
    summary:
      'Platform engineering reframes infrastructure as a product: an Internal Developer Platform (IDP) offers "golden paths" so application teams ship without becoming Kubernetes experts. The goal is self-service with guardrails, reducing cognitive load while keeping standards enforced. It is the structured successor to "you build it, you run it" DevOps.',
    explanation:
      'With AWS and Microservices experience and a Staff goal, platform thinking is exactly the kind of org-wide leverage that defines senior impact. Designing golden paths is a strong narrative for promotion.',
    keyConcepts: [
      'Internal Developer Platforms and the platform-as-product mindset',
      'Golden paths vs. paved roads',
      'Self-service with guardrails (policy as code)',
      'Backstage and developer portals',
      'Measuring developer experience (DORA, cognitive load)',
    ],
    nextStep:
      'Map one painful onboarding workflow on your team and sketch the golden path that would remove three manual steps.',
    difficulty: 'Easy',
    payoff: 'Medium',
  },
  {
    id: 'spring-ai',
    title: 'Spring AI: Building AI Features Inside Spring Boot',
    score: 88,
    time: '~40 min read',
    impact: 'High career impact',
    priority: 'HIGH',
    category: 'Backend',
    tags: ['Java', 'Spring Boot', 'AI'],
    summary:
      'Spring AI brings a familiar, Spring-idiomatic abstraction over chat models, embeddings, and vector stores, so Java teams can add AI features without leaving their stack. It handles prompt templating, structured output mapping, and retrieval-augmented generation with the same dependency-injection patterns you already use. For Spring shops, it is the lowest-friction on-ramp to building AI products.',
    explanation:
      'This sits squarely at the intersection of your strongest skill (Spring Boot) and the fastest-growing area (AI). It is arguably the single highest-ROI topic on this feed for your exact profile and Staff goal.',
    keyConcepts: [
      'ChatClient abstraction and prompt templates',
      'Structured output mapping to Java records',
      'Embeddings and vector stores for RAG',
      'Advisors for memory and retrieval',
      'Swapping model providers without rewriting code',
    ],
    nextStep:
      'Add the Spring AI starter to an existing service and build a single RAG endpoint that answers questions over one internal document set.',
    difficulty: 'Medium',
    payoff: 'High',
  },
]

export function getRecommendationById(id: string): Recommendation | undefined {
  return recommendations.find((r) => r.id === id)
}
