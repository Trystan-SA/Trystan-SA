// Long-form article content as structured blocks

export const BODIES = {
  qa: [
    { type: 'p', text: "For most of my career, the QA function was a paradox: critical, under-resourced, and the first thing to be sacrificed at the altar of velocity. The arrival of capable coding agents in 2025 didn't just shift the math, it inverted it." },
    { type: 'p', text: 'What follows is the workflow we now run on three production products. It catches roughly 84% of regressions before a human ever sees them, and the engineers who built it have not written a Selenium test in six months.' },
    { type: 'h2', text: 'The architecture in one diagram' },
    { type: 'p', text: 'Three loops, each with a clear contract.' },
    { type: 'code', lang: 'bash', text: 'spec ──▶ planner ──▶ runner ──▶ verifier\n              ▲                       │\n              └───────  retry  ────────┘' },
    { type: 'p', text: 'The planner reads the product spec and produces a task graph. The runner drives the actual application: a real browser, a real backend, real fixtures. The verifier inspects every state transition against the original intent.' },
    { type: 'h2', text: 'The three guardrails' },
    { type: 'p', text: 'An autonomous QA loop is, by default, a confidently wrong machine. These are the constraints that made it useful.' },
    { type: 'h3', text: '1. Deterministic fixtures' },
    { type: 'p', text: 'The agent gets a frozen database snapshot per run. Non-deterministic time and randomness are stubbed at the boundary. If a test passes, it must pass tomorrow for the same input.' },
    { type: 'h3', text: '2. A bounded action space' },
    { type: 'p', text: 'Letting the model freely click anything on the page is how you end up with bug reports about the cookie banner. We exposed a typed action API:' },
    { type: 'code', lang: 'typescript', text: "type Action =\n  | { kind: 'click'; testId: string }\n  | { kind: 'fill'; testId: string; value: string }\n  | { kind: 'wait_for'; testId: string }\n  | { kind: 'assert'; expr: string };\n\nasync function step(a: Action): Promise<StepResult> { /* … */ }" },
    { type: 'h3', text: '3. A second model as the verifier' },
    { type: 'p', text: 'The model writing the tests cannot also be the model judging them. We use a smaller, cheaper model with a different prompt as the adversarial reader, and we only escalate to a human when the two disagree.' },
    { type: 'h2', text: "What it doesn't replace" },
    { type: 'p', text: "Exploratory testing. The kind where a human notices that a button feels mushy, or that the empty state is sad. We didn't try, and you shouldn't either." }
  ],
  hiring: [
    { type: 'p', text: 'I removed the live-coding round from my interview loop fourteen months ago. I have hired eleven engineers since. Not one of them has shipped worse code than the engineers I hired the old way.' },
    { type: 'h2', text: 'What we replaced it with' },
    { type: 'p', text: 'A two-hour collaborative working session on a real, scoped problem from our backlog. Candidates use whatever tools they actually use day-to-day: Cursor, Copilot, ChatGPT, their own mother. We pay them for their time.' },
    { type: 'h2', text: "What we're now actually selecting for" },
    { type: 'p', text: 'Three things, in order of weight:' },
    { type: 'ul', items: [
      'Taste: the ability to look at three plausible solutions and explain why one is correct for this codebase.',
      'Decomposition: turning a vague product ask into a sequence of changes a teammate could review.',
      "Communication under uncertainty: saying 'I don't know yet' followed by a credible plan to find out."
    ]},
    { type: 'p', text: "Notice what's not on that list. Memorizing language trivia. Reversing a binary tree on a whiteboard. Being able to outpace an LLM at typing." },
    { type: 'h2', text: 'The objection I hear most' },
    { type: 'p', text: '"But how do you know they can actually code?" You watch them code. For two hours. On a real problem. With their real tools. The signal is enormous.' }
  ],
  playbook: [
    { type: 'p', text: 'Five rituals I install on day one with any engineering team I take over. None of them are standups.' },
    { type: 'h2', text: '1. The Friday demo' },
    { type: 'p', text: 'Thirty minutes, voluntary, low-stakes. Anyone can show anything they shipped or are working on. Three rules: no slides, no metrics, no apologies. The function is to remind ourselves what work looks like.' },
    { type: 'h2', text: '2. The architecture office hour' },
    { type: 'p', text: "One hour a week, on the calendar, where I sit and answer architecture questions. The forcing function is that questions get asked. The second-order effect is that I find out what's actually being built." },
    { type: 'h2', text: '3. The blameless retro, ruthlessly enforced' },
    { type: 'p', text: 'After every incident, every missed deadline, every surprising customer escalation. The output is a list of system changes, never a list of people changes.' },
    { type: 'h2', text: '4. The personal one-on-one' },
    { type: 'p', text: "Forty-five minutes, every other week, no agenda set by me. If they have nothing to talk about, we end early. Most of the time, they don't." },
    { type: 'h2', text: '5. The kill list' },
    { type: 'p', text: 'A standing doc where anyone can nominate a process, meeting, or tool to be retired. Quarterly review. About a third get killed. The team feels lighter.' }
  ],
  aws: [
    { type: 'p', text: 'We were paying $14,200 a month to AWS. Twelve weeks later, we were paying $4,100 a month (to Hetzner, Cloudflare, and a few small SaaS) for the same product, serving the same customers, with better p95 latency.' },
    { type: 'p', text: "This is not a screed against AWS. It's an honest accounting of what the migration cost, what it bought, and the spreadsheet I wish I'd had at the start." },
    { type: 'h2', text: 'The starting bill' },
    { type: 'p', text: 'Roughly:' },
    { type: 'ul', items: [
      'EKS + worker nodes: $4,800/mo',
      'RDS Postgres (Multi-AZ): $3,100/mo',
      'S3 + CloudFront egress: $2,400/mo',
      'ElastiCache + MSK: $1,900/mo',
      'Observability (CloudWatch + X-Ray): $1,200/mo',
      'Everything else: $800/mo'
    ]},
    { type: 'h2', text: 'The destination' },
    { type: 'p', text: 'Three Hetzner AX102 dedicated boxes, two as a Postgres primary/replica pair (with WAL shipping to a third), one running the application via Docker Compose behind Cloudflare. Object storage on Cloudflare R2. Logs to a self-hosted Grafana stack.' },
    { type: 'code', lang: 'yaml', text: '# fly.toml? no. compose.yaml? yes.\nservices:\n  app:\n    image: registry.lattice.dev/app:${SHA}\n    deploy:\n      replicas: 6\n    healthcheck:\n      test: ["CMD", "curl", "-fsS", "http://localhost:8080/healthz"]\n      interval: 5s' },
    { type: 'h2', text: 'What broke' },
    { type: 'p', text: 'Honest list, no embellishment:' },
    { type: 'ul', items: [
      'We lost autoscaling. We replaced it with capacity headroom and a runbook.',
      'We lost cross-region failover. We replaced it with an honest conversation with our customers.',
      "We had a 14-minute outage in week three because I misconfigured pgBackRest. My fault, not Hetzner's."
    ]},
    { type: 'h2', text: "What didn't" },
    { type: 'p', text: "Almost everything else. The application didn't change. Our deploys got faster. Our bill got predictable. The team is happier." }
  ],
  mono: [
    { type: 'p', text: "I've shipped both. Here's the framework I now use to choose, and why most teams making the call are answering the wrong question." },
    { type: 'h2', text: 'The wrong question' },
    { type: 'p', text: '"Should we use microservices?" is a wrong question because it asks about the destination instead of the journey. The right question is: what\'s the smallest unit of independent deployment that this team can sustain?' },
    { type: 'h2', text: 'The framework' },
    { type: 'p', text: 'Three axes. Score each from 1 to 5.' },
    { type: 'ul', items: [
      'Team size and topology',
      'Deployment frequency you actually need',
      'Operational maturity (monitoring, on-call, rollback)'
    ]},
    { type: 'p', text: 'Sum is 3–7: monolith. 8–11: modular monolith. 12–15: services, but only if you can name the bounded contexts without consulting a diagram.' }
  ],
  eval: [
    { type: 'p', text: "The hardest engineering problem in shipping LLM features is not prompting. It's knowing whether your last change made things better or worse." },
    { type: 'h2', text: 'Why traditional testing fails' },
    { type: 'p', text: 'A unit test asserts equality. An LLM output is rarely equal to anything. A snapshot test catches drift, but every prompt change invalidates every snapshot, so you stop running them.' },
    { type: 'h2', text: 'What we run instead' },
    { type: 'p', text: 'A continuous eval pipeline with three layers: deterministic guards (latency, token count, schema validity), graded rubrics (judged by a stronger model), and human spot-checks on a stratified sample.' }
  ],
  secure: [
    { type: 'p', text: 'Twenty-three controls to ship on day one of a new SaaS. They will not save you from a determined attacker, but they will let you sleep, pass an audit, and not headline an incident report.' },
    { type: 'h2', text: 'Identity' },
    { type: 'ul', items: [
      'SSO from day one. No local password fallback for staff.',
      'Hardware-key MFA enforced via policy, not docs.',
      'A break-glass account, in a safe, on paper.'
    ]},
    { type: 'h2', text: 'Data' },
    { type: 'ul', items: [
      'Encryption at rest is table stakes. Encryption with customer-managed keys is the differentiator.',
      'PII tagged in the schema, not in your head.'
    ]}
  ],
  oss: [
    { type: 'p', text: "Maintainer burnout is a feature of the system, not a bug. Here's the structural changes I made." },
    { type: 'h2', text: 'Move the issue tracker' },
    { type: 'p', text: 'GitHub Issues is a fire hose. Discussions is a coffee shop. The same content lives differently in each.' }
  ],
  product: [
    { type: 'p', text: 'On the shape of the engineer that ships the most value per quarter, and why traditional ladders fail to recognize them.' },
    { type: 'h2', text: 'Symptoms of the archetype' },
    { type: 'ul', items: [
      'They open the design tool unprompted.',
      'They have customer-call recordings on their second monitor.',
      "Their PRs cite the metric they're trying to move."
    ]}
  ],
  events: [
    { type: 'p', text: "Yes, your team can ship a Kafka cluster in a week. No, that does not mean you've adopted event-driven design." },
    { type: 'h2', text: 'Pitfall 1: events as RPC in disguise' },
    { type: 'p', text: 'If your event is named "PleaseDoTheThing" and has one consumer, you\'ve built RPC with extra steps.' }
  ],
  game: [
    { type: 'p', text: 'What architecting enterprise SaaS by day taught me about scoping a game by night, and the things it absolutely did not.' },
    { type: 'p', text: 'Mostly: that frame budgets are unforgiving in a way no API SLO ever is. A 16ms missed budget is a felt thing.' }
  ],
  zerotrust: [
    { type: 'p', text: 'How a two-person platform team replaced four SaaS subscriptions with 200 lines of Cloudflare Access policy.' },
    { type: 'h2', text: 'What we replaced' },
    { type: 'ul', items: [
      "A bastion-host VPN we'd been paying $400/month for",
      'A separate IdP-aware reverse proxy',
      'A SaaS for sharing internal dashboards externally',
      'A separate audit-log aggregator'
    ]}
  ]
};
