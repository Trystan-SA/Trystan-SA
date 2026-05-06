// Long-form guide content. Each guide is keyed by slug and contains an
// `intro` (rendered above the chapter list) and a `chapters` array.
//
// Block types supported by GuideBody.svelte:
//   { type: 'p',       text }                              paragraph
//   { type: 'h3',      text }                              section heading inside a chapter
//   { type: 'ul',      items: string[] }                   bullet list
//   { type: 'ol',      items: string[] }                   numbered list
//   { type: 'code',    lang, text }                        code block (uses CodeBlock component)
//   { type: 'callout', kind: 'note'|'warn'|'tip', text }   pulled-out aside
//   { type: 'quote',   text, who }                         italic blockquote with optional attribution

export const GUIDE_BODIES = {
  'writing-efficient-prompts': {
    intro: [
      {
        type: 'p',
        text: "A prompt is not a wish. It is a program — a deterministic-ish function from (system prompt, conversation, tools, current message) to a stream of tokens. Every byte you send shapes both the output and the bill, and the model is far more sensitive to how the prompt is arranged than most engineers expect."
      },
      {
        type: 'p',
        text: "What follows is the mental model I rebuilt after a year of shipping LLM features in production. It is the foundation I wish I'd had before my first prompt went to a paying customer. We'll cover how the model actually reads what you send it, why context windows behave more like budgets than buffers, why prompt caching is the highest-ROI lever most teams ignore, and the four levers I tune — in order — before I ever consider switching models."
      },
      {
        type: 'callout',
        kind: 'note',
        text: 'This guide is model-agnostic but draws specific examples from the Anthropic, OpenAI, and Google APIs. Where pricing or behaviour differs by provider, I name names.'
      }
    ],
    chapters: [
      {
        slug: 'mental-model',
        title: 'How an LLM actually reads',
        blocks: [
          {
            type: 'p',
            text: "An LLM does not read your prompt. It sees a flat sequence of tokens and predicts the next one, then the next, then the next. That is the entire algorithm. There is no comprehension pass, no inner reflection, no understanding step — unless you explicitly ask the model to generate one, in which case you are simply paying for more tokens to scaffold its own reasoning."
          },
          {
            type: 'p',
            text: 'Three consequences fall out of that, and almost every prompt-engineering rule you have ever heard is a corollary of one of them.'
          },
          { type: 'h3', text: '1. Order matters' },
          {
            type: 'p',
            text: "Transformer attention attends to every token in parallel, but training, positional encodings and decoding biases all conspire to weight recent and boundary tokens more strongly than tokens buried in the middle. This is the well-documented “lost-in-the-middle” effect: bury an instruction in the middle of a 50-page document and the model will weight it less than a one-line instruction at the bottom of the prompt. Put the question last."
          },
          { type: 'h3', text: '2. Repetition is signal' },
          {
            type: 'p',
            text: "Models trade off many constraints at once. If a constraint is non-negotiable, repeat it near the output. “Respond in JSON” mentioned at both the start and end of the prompt outperforms one mention by a measurable margin on every model I have tested. It feels redundant to humans; to a next-token predictor it is a stronger conditional distribution."
          },
          { type: 'h3', text: '3. Specificity is compression' },
          {
            type: 'p',
            text: "Vague prompts force the model to interpolate from training data, which means regression toward the average web-flavoured answer. A specific prompt collapses the search space. “Write a function” is a request for the median Stack Overflow snippet. “Write a TypeScript function that takes a Postgres connection and returns the top 10 customers by lifetime value, using prepared statements” is a request for one specific function."
          },
          {
            type: 'callout',
            kind: 'tip',
            text: 'A useful test: if a prompt could plausibly come from five different jobs, it will produce five different answers across runs. Add the constraints that make it come from exactly one.'
          },
          { type: 'h3', text: 'Tokens are not characters' },
          {
            type: 'p',
            text: "One token is roughly four characters of English, but code, JSON, and non-English text tokenize worse. JSON keys repeat across every record; XML tags repeat. A 200-row JSON response can easily double in token count compared to the equivalent CSV. Whitespace, indentation, comments — all paid for. This compounds at scale: a 10 % size reduction on the most-called prompt in your system can be the cheapest infra win of the quarter."
          },
          {
            type: 'code',
            lang: 'typescript',
            text: "// Same data. Roughly 2x the tokens.\nconst asJson = JSON.stringify({\n  customer_id: 42, customer_name: 'Acme', plan_type: 'pro'\n});\n\n// Compact form, when schema is known and stable.\nconst asCsv = '42,Acme,pro';"
          }
        ]
      },
      {
        slug: 'context-budget',
        title: 'The context window is a budget, not a buffer',
        blocks: [
          {
            type: 'p',
            text: "Every model advertises a maximum context: 200k tokens for Claude Sonnet/Opus, 1M for some Gemini variants, 128k–200k for the GPT line, often more for the long-context experiments. Treat the headline number as a ceiling, not a target. Three properties of long contexts matter far more than the number itself."
          },
          { type: 'h3', text: '1. Attention is roughly quadratic' },
          {
            type: 'p',
            text: "Self-attention scales as O(n²) with input length. Doubling the prompt does not double the compute — it roughly quadruples it. Production models use sparse, sliding-window or low-rank approximations to keep this manageable, but you still feel it: latency climbs, throughput drops, and per-token recall declines as context grows. A 100k-token prompt is not 50× more expensive than a 2k prompt; it's worse, and slower per output token."
          },
          { type: 'h3', text: '2. Output is the latency bottleneck' },
          {
            type: 'p',
            text: "Input tokens are processed in parallel during the prefill phase. Output tokens are emitted one at a time during the decode phase. A request with 5k input and 2k output spends most of its wall-clock time generating those 2k tokens, not reading the 5k. If you are optimizing for latency, ask for less output before you trim input. Tighten the response schema, request a summary instead of the full text, drop fields nobody reads."
          },
          { type: 'h3', text: '3. Recall is not flat across the context' },
          {
            type: 'p',
            text: 'The lost-in-the-middle effect is real and reproducible. Place the most important information at the start or end of the context, never in the geographic middle. If you have a 30-page reference document and a question about page 14, do not paste the whole document and hope. Retrieve page 14, place it adjacent to the question, and discard the rest.'
          },
          {
            type: 'callout',
            kind: 'warn',
            text: 'Stuffing the entire codebase into context is the most common form of paying more for worse output. RAG, file-search, or agentic tool use beat full-document stuffing on every dimension that matters except setup time.'
          },
          { type: 'h3', text: 'A practical token economy' },
          {
            type: 'p',
            text: 'Three habits keep the budget honest:'
          },
          {
            type: 'ul',
            items: [
              "Pick the format that costs the fewest tokens for the job. CSV beats JSON for tabular data the model will not modify; Markdown beats HTML; concise prose beats both for narrative.",
              "Strip what does not change behaviour. Comments, copyright headers, license blocks, log timestamps in pasted output — none of it improves the answer; all of it is billed.",
              "Cap the output explicitly. A `max_tokens` of 400 with a clear schema is faster, cheaper and more predictable than an unbounded request, even when the model would have produced 350 tokens unprompted."
            ]
          }
        ]
      },
      {
        slug: 'prompt-caching',
        title: 'Prompt caching: the lever most teams ignore',
        blocks: [
          {
            type: 'p',
            text: "Modern providers all offer prompt caching: send the same prefix twice within a TTL, and the second call reads it from cache at a fraction of the input price and a fraction of the latency. Anthropic charges roughly 10 % of base input price for cache reads (with a small write surcharge on the first call); OpenAI and Google have analogous pricing. The TTL is typically 5 minutes by default, with longer options on some providers."
          },
          {
            type: 'p',
            text: "Caching does not change what your prompt says. It changes how you should arrange it."
          },
          { type: 'h3', text: 'The layout rule: stable first, volatile last' },
          {
            type: 'p',
            text: 'A cache hit requires the prefix to match exactly. So everything that does not vary across requests should appear before anything that does. In order of stability:'
          },
          {
            type: 'ol',
            items: [
              'Static system prompt (role, policy, output schema, refusal rules).',
              'Tool definitions and their JSON schemas.',
              'Large reference documents that are reused across users (style guides, taxonomies, the product spec).',
              'Per-user but slowly-changing context (user profile, account-level preferences, long-running thread summaries).',
              'The current conversation turn (recent messages).',
              "The user's current question."
            ]
          },
          {
            type: 'p',
            text: "If you place the user's name into the system prompt because it felt natural, you have just invalidated the cache for every other user. Move it down."
          },
          { type: 'h3', text: 'Cache breakpoints (Anthropic-specific)' },
          {
            type: 'p',
            text: "Anthropic's API exposes explicit cache breakpoints via `cache_control: { type: 'ephemeral' }`. Place them at the natural seam between stable and volatile sections. The provider hashes the prefix up to each breakpoint; the deepest matching prefix wins. Up to four breakpoints per request — use them to mark the system prompt, tool definitions, the document corpus, and the running conversation."
          },
          {
            type: 'code',
            lang: 'typescript',
            text: "await client.messages.create({\n  model: 'claude-opus-4-7',\n  system: [\n    { type: 'text', text: SYSTEM_POLICY },\n    { type: 'text', text: STYLE_GUIDE,\n      cache_control: { type: 'ephemeral' } }     // breakpoint 1: stable\n  ],\n  tools: TOOLS,                                    // implicit cacheable section\n  messages: [\n    { role: 'user', content: [\n      { type: 'text', text: BIG_REFERENCE_DOC,\n        cache_control: { type: 'ephemeral' } },    // breakpoint 2: per-tenant\n      { type: 'text', text: CURRENT_QUESTION }     // volatile, never cached\n    ] }\n  ]\n});"
          },
          { type: 'h3', text: 'What it actually buys you' },
          {
            type: 'p',
            text: "On a chatbot I shipped last year, restructuring the prompt for cache hits dropped p50 latency from ~2.4 s to ~700 ms and cut the API bill by 64 % on the same traffic, with no change in output quality. Same model, same temperature, same eval scores. The only thing that moved was the order of bytes in the request."
          },
          {
            type: 'callout',
            kind: 'tip',
            text: 'A 5-minute TTL is shorter than it sounds for human-driven traffic. If your traffic is bursty, send a synthetic warm-up call when a session opens; the rest of the session rides cached.'
          }
        ]
      },
      {
        slug: 'four-levers',
        title: 'The four levers, in order',
        blocks: [
          {
            type: 'p',
            text: 'When a prompt is underperforming, the fix is almost always one of four things. Try them in this order: each is cheaper than the next, and each tends to reveal whether the next is even necessary.'
          },
          { type: 'h3', text: '1. Structure' },
          {
            type: 'p',
            text: "Sections, headings, XML tags. The model has been trained on enormous quantities of structured documents and responds to them — Anthropic's models in particular are tuned to attend to XML-like tags, and OpenAI's recent models behave the same with Markdown sections. A prompt with `<context>`, `<task>`, `<output_format>` outperforms the same prompt as one wall of text by a wide margin, with zero added information."
          },
          {
            type: 'code',
            lang: 'xml',
            text: '<role>\n  You are a senior backend engineer reviewing migrations.\n</role>\n\n<context>\n  {schema diff and migration SQL go here}\n</context>\n\n<task>\n  List risks. For each: severity (low|med|high), why, and a safer alternative.\n</task>\n\n<output_format>\n  JSON array of { severity, risk, alternative }. No prose.\n</output_format>'
          },
          { type: 'h3', text: '2. Examples (few-shot)' },
          {
            type: 'p',
            text: "One concrete input/output pair beats two paragraphs of description. Three pairs beat one. The model is a phenomenal pattern-matcher; the bottleneck is showing it the pattern, not naming it. Examples are particularly powerful for tasks where the desired output style is implicit: tone of voice, level of detail, formatting choices, edge-case handling."
          },
          {
            type: 'callout',
            kind: 'tip',
            text: "Pick examples that span the boundary cases, not the obvious middle. Show the model what to do when input is ambiguous, when a field is missing, when the question is out of scope. The middle takes care of itself."
          },
          { type: 'h3', text: '3. Instructions' },
          {
            type: 'p',
            text: "Be explicit about what you do not want. “Do not apologize, do not preface, return only the SQL” outperforms “be concise.” Negative instructions are signal: they cut off whole regions of the model's distribution that vague positive instructions leave wide open."
          },
          {
            type: 'p',
            text: "Phrase rules as policy, not as please-and-thank-you. “If the question references PII, refuse and explain why” beats “Please be careful about user privacy.”"
          },
          { type: 'h3', text: '4. Context' },
          {
            type: 'p',
            text: "More context is the last resort, not the first. Adding 30k tokens of documentation to compensate for a vague task is paying to fix a bug somewhere else in the prompt. Sharpen the task, structure the prompt, give an example — and only then ask whether the model is missing the information it needs."
          },
          {
            type: 'p',
            text: "When you do add context, retrieve it. Embed-and-rank, BM25, or even an LLM-driven planner that decides which files to fetch. Almost any retrieval beats stuffing, and the worse your retrieval is, the more you should question whether the task is actually well-scoped."
          }
        ]
      },
      {
        slug: 'patterns',
        title: 'Patterns that pay off',
        blocks: [
          { type: 'h3', text: 'Chain-of-thought and extended thinking, on demand' },
          {
            type: 'p',
            text: "Asking the model to think before answering improves quality on reasoning-heavy tasks, at the cost of latency and tokens. With the current generation of models — Claude's extended thinking, OpenAI's reasoning models, Gemini's thinking budget — you no longer prompt for it; you turn the budget up. With older models, “think step by step before answering” still works and is essentially free except for the output tokens it generates."
          },
          {
            type: 'p',
            text: "Do not ask for chain-of-thought on classification or extraction tasks. The reasoning trace will be longer than the answer and the answer will not be better. Save it for synthesis, planning, math, and judgement calls."
          },
          { type: 'h3', text: 'Output schemas, not output requests' },
          {
            type: 'p',
            text: "If you need JSON, use structured outputs (OpenAI), tool-use mode with a forced tool (Anthropic) or constrained decoding (Gemini, vLLM). The provider will constrain decoding to your schema and remove an entire class of parse errors. When that is not available, give a concrete example of the JSON in the prompt — not a description of it. The model is far better at imitating a shape than at parsing a description of one."
          },
          { type: 'h3', text: 'One model per task' },
          {
            type: 'p',
            text: "Cheap models for classification, extraction, routing, and ranking. Strong models for synthesis, planning, judgement, and code. A pipeline with three Haiku/Mini calls and one Opus/Sonnet/o-series call usually beats four Opus calls on every dimension: cheaper, faster, and the cheap calls actually constrain what the strong one sees."
          },
          {
            type: 'code',
            lang: 'typescript',
            text: "// Cheap router decides intent and extracts entities.\nconst routed = await haiku({\n  system: ROUTER_POLICY,\n  user: userMessage,\n  output_schema: RoutedRequest\n});\n\n// Strong model answers the actual question, with only the extracted slice in context.\nconst answer = await opus({\n  system: ANSWER_POLICY,\n  user: render(routed)\n});"
          },
          { type: 'h3', text: 'System prompt as policy, user prompt as data' },
          {
            type: 'p',
            text: "The system prompt is the place for non-negotiable rules: who the assistant is, what it must refuse, what schema it must obey, what tools it can call. The user prompt is the place for per-request data. Treat anything user-controlled as untrusted: never let it overwrite policy. “Ignore previous instructions” attacks land precisely in the seam where these layers blur."
          },
          { type: 'h3', text: 'Retrieval over stuffing, tools over retrieval' },
          {
            type: 'p',
            text: "If you are about to paste 30k tokens into context, ask whether the model could fetch it on demand instead. Tool use lets the model pull only the pieces it needs, when it needs them, often at a tenth of the input cost. The tradeoff is round-trips and latency — but for any non-trivial corpus, tools beat retrieval beats stuffing."
          }
        ]
      },
      {
        slug: 'anti-patterns',
        title: 'Anti-patterns to retire',
        blocks: [
          {
            type: 'p',
            text: "These are habits I see in almost every prompt I review. None of them survive a serious eval."
          },
          {
            type: 'ul',
            items: [
              "“You are a 10x engineer at FAANG” role-play preludes. The training data does not reward them; benchmarks barely move; you have burned tokens and locked the model into a tone you may not actually want.",
              "Whole-codebase stuffing. RAG, file-search, agent tool use beat it on every dimension that matters except setup time.",
              "One-shot evals. A prompt that looked good once and shipped is the leading cause of silent regressions. Build a small eval set before you tune; it will pay for itself within a week.",
              "Forever-iteration. After three rounds of tweaking, you are either prompting around a model limitation (escalate the model) or solving the wrong problem (re-read the spec).",
              "“Be careful” and “make sure to be accurate.” These are wishes, not constraints. Replace with rules: “If any cited number does not appear verbatim in the source, do not include it.”",
              "Markdown formatting where you actually need data. If a downstream system parses the output, ask for JSON. Markdown is for humans; pretending it is structured will bite you.",
              "Mixing instructions and data without separation. Wrap user-supplied content in a tag and refer to it: `<doc>...</doc>`. Otherwise the model cannot tell where your rules end and the input begins."
            ]
          }
        ]
      },
      {
        slug: 'starter-template',
        title: 'A reusable prompt template',
        blocks: [
          {
            type: 'p',
            text: "Here is the skeleton I start from for almost every new feature. It is opinionated, it is boring, and it gets me 80 % of the way to a working prompt before I have read a single doc page."
          },
          {
            type: 'code',
            lang: 'xml',
            text: '<!-- SYSTEM PROMPT (cacheable, stable) -->\n<role>\n  {who the assistant is, in one sentence}\n</role>\n\n<policy>\n  - {non-negotiable rule 1}\n  - {non-negotiable rule 2}\n  - Refuse if {explicit refusal condition}.\n</policy>\n\n<output_format>\n  {exact schema or example. Not a description.}\n</output_format>\n\n<examples>\n  <example>\n    <input>...</input>\n    <output>...</output>\n  </example>\n  {2–3 examples spanning boundary cases}\n</examples>\n\n<!-- USER PROMPT (volatile, never cached) -->\n<context>\n  {only what is actually needed for THIS request}\n</context>\n\n<task>\n  {one sentence, imperative, specific}\n</task>'
          },
          {
            type: 'p',
            text: 'Three things to notice. The system prompt ends before any user-controlled bytes appear. Output format is shown, not described. Examples come before the task, not after, so the pattern is fresh as the model decodes.'
          },
          { type: 'h3', text: 'When to deviate' },
          {
            type: 'p',
            text: "Drop the examples block when the task is well-known and the schema is enforced by the provider (structured outputs make few-shot less load-bearing). Drop the policy block for one-off internal tooling where the cost of a bad output is a re-run. Otherwise, follow the skeleton."
          }
        ]
      },
      {
        slug: 'getting-better',
        title: 'How to actually get better at this',
        blocks: [
          {
            type: 'p',
            text: "Prompt engineering compounds the same way any other engineering skill does: by measuring what you change. Three habits, in order of leverage:"
          },
          { type: 'h3', text: 'Build evals before you tune' },
          {
            type: 'p',
            text: "A spreadsheet of twenty representative inputs and the answers you wish you got is enough to start. Run it after every prompt change. The act of writing the eval will improve the prompt before you have run it once, because writing down what “good” looks like is half the work. I wrote a longer piece on this in the AI engineering path below."
          },
          { type: 'h3', text: 'Read the docs your provider actually publishes' },
          {
            type: 'p',
            text: "Anthropic's prompt engineering docs, OpenAI's cookbook and reasoning guide, Google's Gemini prompt strategies — all of them are short, all of them are opinionated, and almost none of the prompt-engineering content on Twitter is in them. Read the source."
          },
          { type: 'h3', text: 'Pair-program with a stronger model' },
          {
            type: 'p',
            text: "Ask the strongest available model to critique your prompt. Paste it in, paste a failing input, ask what is wrong. The diagnoses will be uneven, but the suggestions are often non-obvious — and free. A second model as adversarial reader is the cheapest reviewer you will ever hire."
          },
          { type: 'h3', text: 'Where to go next' },
          {
            type: 'p',
            text: 'The articles in the AI engineering reading path on this site walk through the next layers: building evals that survive contact with production, an autonomous QA loop, and how interview loops change once coding agents are real. Start with the eval harness piece — none of the rest holds without it.'
          }
        ]
      }
    ]
  }
};
