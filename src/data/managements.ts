// src/data/managements.ts — Terra — AI for ITSM: clear knowledge + real AI skills (full SKILL.md structure) per management.
export type SkillDetail = {
  name: string
  description?: string
  overview: string
  whenToUse: string | string[]
  whenNotToUse?: string
  corePattern?: { before: string; after: string }
  quickReference?: { headers: string[]; rows: string[][] }
  how: string
  commonMistakes?: string[]
  example?: string
}
export type Management = {
  id: string
  prefix: string
  title: string
  oneLiner: string
  bullets: string[]
  skills: SkillDetail[]
  color: string
  icon: string
  order: number
  lane: 'cycle' | 'parallel' | 'foundation'
}

export const managements: Management[] = [
  {
    id: 'incident', prefix: 'INC-', title: 'Incident Management', oneLiner: 'Restores disrupted service as fast as possible while keeping users informed',
    bullets: [
      'Detects, logs, categorizes and prioritizes incidents by impact and urgency',
      'Restores service via escalation and war-room, communicates progress',
      'Closes with handover to problem and knowledge to prevent recurrence',
    ],
    skills: [
      {
        name: 'Auto-triage & priority',
        description: 'Use when incidents have inconsistent priority, wrong team assignment, or triage queue grows faster than humans can read',
        overview: 'Auto-triage is a reference skill for suggesting priority and assignee from incident text and history. Core principle: history is the training data — past incidents with similar titles taught the model what “P1 + Payments” looks like, so the next “timeout 504” does not need a human to guess. It is a technique, not a rule: the AI suggests, the human confirms.',
        whenToUse: [
          'New incident with short or vague title (“checkout error”, “slow”) — priority is guessed',
          'Queue >10 un-triaged incidents — human reader cannot keep up',
          'Recurring “urgent” that is actually low — P-levels are inconsistent across triagers',
          'Wrong team assigned — incident bounces 2–3 times before correct team',
          'When NOT to use: incident already has a clear runbook match with a fixed priority (use the runbook), or when confidence <0.6 — ask, do not guess',
        ],
        corePattern: {
          before: '// Before: manual triage — human reads, guesses\nfunction triage(incident) {\n  // “504 checkout” → human guesses P2, assigns Network (wrong)\n  return { priority: guess(), team: guess() }\n}',
          after: '// After: AI suggests, human confirms\nfunction triage(incident) {\n  const suggestion = suggestFromHistory(incident, last90Days) // {priority: "P1", team: "Payments", confidence: 0.82}\n  return suggestion.confidence > 0.7 ? suggestion : askClarifying(incident)\n}',
        },
        quickReference: {
          headers: ['Signal', 'Action', 'Threshold'],
          rows: [
            ['Title embedding ≥0.75 + same app', 'Suggest same priority/team', 'confidence ≥0.7'],
            ['Confidence 0.6–0.7', 'Ask 1 clarifying question', 'human picks'],
            ['Confidence <0.6', 'Do not suggest', 'avoid false triage'],
            ['Prod + “timeout 504”', 'Bias to P1', '90% P1 in history'],
          ],
        },
        how: 'Embedding similarity (text-embedding-3-small) against last 90 days, plus keyword match on “timeout”, “down”, “504”. Input: title + description. Output: {priority: P1–P4, team, confidence, reason}. Pattern: suggest, never auto-assign. Store suggestion + human decision for audit. Keep prompt short — title is the signal.',
        commonMistakes: [
          'Auto-assigning without human confirm → wrong team woken at 2am. Fix: suggestion only.',
          'Keyword alone (“urgent” → P1) → over-triage. Fix: require embedding + history.',
          'Ignoring confidence → low-confidence treated as truth. Fix: threshold 0.7.',
        ],
        example: 'INC “Checkout timeout 504” → 3 similar P1s in 7 days to Payments (0.82) → suggests “P1 — Payments, 0.82 — because 3 similar P1s”. Human confirms in one click.',
      },
      {
        name: 'War-room summarization',
        description: 'Use when incident timelines have long scroll, duplicate questions, or shift handovers where newcomers ask what happened so far',
        overview: 'War-room summarization condenses a noisy incident timeline (dozens of comments, status changes) into a 3-bullet handover readable in 30 seconds. Core principle: the timeline is the source of truth — the AI compresses it, never invents. It is a reference skill for handovers, not a decision maker.',
        whenToUse: [
          'Incident has >10 comments or war-room flag is set',
          'Shift handover — newcomer asks “what happened so far?”',
          'Same question asked twice — timeline is too long to read',
          'When NOT to use: incident has <5 comments or is already resolved — summary adds no value',
        ],
        corePattern: {
          before: '// Before: human scrolls 200 comments, copies manually\nconst handover = readAllCommentsAndGuess()\n// duplicate, slow, misses updates',
          after: '// After: AI compresses timeline\nconst summary = summarizeTimeline(comments) // {whatHappened, impact, nextAction}\n// 2–3 sentences, verbatim source, no recommendations',
        },
        quickReference: {
          headers: ['Input', 'Output', 'Rule'],
          rows: [
            ['Timeline comments', '3 bullets: what happened / impact / next', 'chronological'],
            ['Source', 'Verbatim comments only', 'no invention'],
            ['Length', '2–3 sentences', 'no recommendations'],
          ],
        },
        how: 'Chronological summarization of comments into 3 parts: what happened, current impact, next action. Input: timeline. Output: 2–3 sentences. Uses extractive summarization, no LLM recommendations. Trigger on war-room or >10 comments.',
        commonMistakes: [
          'Adding recommendations (“should rollback”) → invented. Fix: summary only, no advice.',
          'Summarizing from title alone → misses timeline. Fix: use comments.',
          'Too long (paragraph) → not scannable. Fix: 2–3 sentences max.',
        ],
        example: '200-comment incident → “Payment gateway 504 since 09:12, 12 orders affected, rollback to v2.3 in progress — ETA 09:40.”',
      },
    ],
    color: 'bg-red-500', icon: 'Siren', order: 1, lane: 'cycle'
  },
  {
    id: 'request', prefix: 'REQ-', title: 'Service Request Management', oneLiner: 'Fulfills approved user needs through a service catalog — not a disruption',
    bullets: [
      'Offers catalog for access, hardware, info and provisioning requests',
      'Validates, routes and fulfills from intake to delivery with due date',
      'Keeps requests separate from incidents — different urgency, different flow',
    ],
    skills: [
      {
        name: 'Intent classification',
        description: 'Use when users write free-text and it is ambiguous whether the input is a service request or an incident, or which catalog item it maps to',
        overview: 'Intent classification decides whether incoming text is a service request or an incident, and which catalog item it maps to. Core principle: the catalog is the vocabulary — the model maps free text to a fixed enum (access/hardware/info/…), not to open-ended labels.',
        whenToUse: [
          'User writes “need laptop” vs “cannot login” — request vs incident is unclear',
          'Requests appear in incident queue or vice versa',
          'Wrong SLA applied because request_type was guessed',
          'When NOT to use: form already has a selected catalog item — no classification needed',
        ],
        corePattern: {
          before: '// Before: human reads, guesses type\nif (text.includes("need")) return "request" // fragile',
          after: '// After: classifier suggests\nconst {type, confidence} = classify(text) // {type:"hardware", confidence:0.91}\nreturn confidence > 0.7 ? type : askQuestion(text)',
        },
        quickReference: {
          headers: ['Signal', 'Result', 'Action'],
          rows: [
            ['Confidence ≥0.7', 'request_type + catalog', 'auto-fill'],
            ['Confidence 0.5–0.7', 'Ask 1 question (2–4 options)', 'human picks'],
            ['Confidence <0.5', 'Leave blank', 'human decides'],
          ],
        },
        how: 'Classifier maps text to request_type enum vs incident. Confidence 0.7 threshold; below, ask one clarifying question with 2–4 options. Input: free text. Output: type + confidence + reason.',
        commonMistakes: [
          'Open-ended labels (“other”) → unsearchable. Fix: fixed enum.',
          'Auto-filing low-confidence → wrong queue. Fix: threshold + question.',
        ],
        example: '“Need MacBook for new hire Budi, start 2026-09-01” → hardware, 0.91.',
      },
      {
        name: 'Auto-routing',
        description: 'Use when a service request is approved and needs assignment to the correct fulfillment team with a realistic due date',
        overview: 'Auto-routing suggests the owner team and a realistic due date for a validated request. Core principle: history is the SLA — past fulfillment times for that catalog item predict the next due date.',
        whenToUse: [
          'Request is approved and sits unassigned',
          'Wrong team gets hardware requests',
          'Due dates are guessed, not based on history',
          'When NOT to use: request already has an owner team assigned',
        ],
        corePattern: {
          before: '// Before: manual routing\nteam = guessFromDepartment(requester) // often wrong',
          after: '// After: history-based\nconst {team, targetDate} = suggestRoute(catalogItem, requesterDept, history)\n// team + median days for that type',
        },
        quickReference: {
          headers: ['Signal', 'Team', 'Due date'],
          rows: [
            ['Hardware + Engineering', 'Workplace', 'median 7 days'],
            ['Access + Finance', 'IAM', 'median 2 days'],
            ['Unknown catalog', 'Ask', 'no guess'],
          ],
        },
        how: 'Matches catalog item + requester department + history to owner team. Suggests targetDate as median fulfillment days for that type. Human approves. Input: catalogItem, requesterDept. Output: team + targetDate + confidence.',
        commonMistakes: [
          'Routing without history → random team. Fix: require 5+ past samples.',
          'Ignoring department → Engineering hardware goes to IT. Fix: include requester dept.',
        ],
        example: 'Hardware from Engineering → Workplace, targetDate 7 days (median for hardware).',
      },
    ],
    color: 'bg-sky-500', icon: 'ClipboardList', order: 0, lane: 'parallel'
  },
  {
    id: 'problem', prefix: 'PRB-', title: 'Problem Management', oneLiner: 'Finds the cause behind repeating incidents so they stop recurring',
    bullets: [
      'Clusters similar incidents to spot patterns (≥3 similar in 7 days)',
      'Investigates root cause and contributing factors, records RCA',
      'Links findings to knowledge so fixes outlive the incident',
    ],
    skills: [
      {
        name: 'Pattern clustering',
        description: 'Use when similar incidents repeat weekly but no problem is created and the team stays in reactive firefighting',
        overview: 'Pattern clustering finds groups of similar incidents that should become a problem. Core principle: recurrence is a graph signal — same app + overlapping title is the cluster, not a single incident’s severity.',
        whenToUse: [
          '≥3 incidents in 7 days share same app and title overlap ≥0.6',
          'Incident marked “recurring”',
          'Same error every week, no PRB created',
          'When NOT to use: single isolated incident with unique title',
        ],
        corePattern: {
          before: '// Before: human notices after 10 repeats\nif (incidents.length > 10) maybeCreateProblem() // too late',
          after: '// After: AI flags early\nconst cluster = findCluster(incidents, {days:7, overlap:0.6})\nif (cluster.size >=3) suggestProblem(cluster)',
        },
        quickReference: {
          headers: ['Signal', 'Threshold', 'Action'],
          rows: [
            ['Same app + title cosine ≥0.6', '3 in 7 days', 'Suggest PRB'],
            ['Recurring flag set', '1', 'Suggest PRB'],
            ['Single unique incident', '-', 'No cluster'],
          ],
        },
        how: 'Title embedding cosine + same appId. Clusters flagged in Pulse. Does not auto-create; suggests. Input: incidents 7d. Output: cluster + score + suggested PRB title.',
        commonMistakes: [
          'Single keyword match → false cluster. Fix: require embedding + app.',
          'Auto-creating PRB → noise. Fix: suggest only.',
        ],
        example: '3× “DB timeout 500” on APP-004 in 5 days → 0.78 → “Create PRB — DB capacity”.',
      },
      {
        name: 'RCA draft assist',
        description: 'Use when a problem has linked incidents but its RCA is blank, inconsistent, or repeatedly written manually',
        overview: 'RCA draft assist generates a root-cause analysis draft from a cluster of linked incidents, ready for the engineer to edit. Core principle: linked incidents are the source — the draft compresses them, never invents.',
        whenToUse: [
          'Problem has 2+ linked incidents and RCA is empty',
          '“What happened” is copied manually each time',
          'RCA structure varies per author',
          'When NOT to use: RCA already published — do not overwrite',
        ],
        corePattern: {
          before: '// Before: blank RCA\nrca = {whatHappened:"", rootCause:""} // engineer writes from scratch',
          after: '// After: draft from linked incidents\nrca = draftFromIncidents(linkedIncidents) // {whatHappened, rootCause, contributingFactors, duration}',
        },
        quickReference: {
          headers: ['Section', 'Source', 'Status'],
          rows: [
            ['whatHappened', 'Linked incidents timeline', 'human edits'],
            ['rootCause', 'Most common error in cluster', 'human confirms'],
            ['contributingFactors', 'History keywords', 'human edits'],
            ['Publish', 'Human', 'draft → published'],
          ],
        },
        how: 'Summarizes linked incidents into RCA sections. Human edits and publishes. Source is linked incidents, so no invented facts. Keeps draft vs published states.',
        commonMistakes: [
          'Inventing root cause without evidence → hallucination. Fix: source is linked incidents only.',
          'Overwriting published RCA → lost. Fix: draft only, human publishes.',
        ],
        example: 'Linked 4 incidents → draft: “What happened: DB pool exhausted at 09:12, 12 orders failed…”',
      },
    ],
    color: 'bg-purple-500', icon: 'SearchX', order: 2, lane: 'cycle'
  },
  {
    id: 'change', prefix: 'CHG-', title: 'Change Management', oneLiner: 'Controls changes to services and infrastructure and verifies they hold',
    bullets: [
      'Plans change with risk, intent and rollback — not just deploy',
      'Verifies outcome after deployment during monitoring period',
      'Holds or rolls back when monitoring shows warning or anomaly',
    ],
    skills: [
      {
        name: 'Risk scoring',
        description: 'Use when changes are created with vague descriptions, every change is marked medium, or production changes have no risk signal',
        overview: 'Risk scoring grades a planned change as low/medium/high/critical before approval. Core principle: description length and environment are the signals — a 10-word prod change is riskier than a 100-word staging change.',
        whenToUse: [
          'Change created, especially for prod or with <50 char description',
          'Every change is “medium” — no differentiation',
          'Prod change with 10-word description',
          'When NOT to use: change already has a thorough risk assessment by author',
        ],
        corePattern: {
          before: '// Before: all medium\nrisk = "medium" // no signal',
          after: '// After: scored\nrisk = score({descLength, env, linkedIncidents}) // short prod + linked → high',
        },
        quickReference: {
          headers: ['Signal', 'Score', 'Hint'],
          rows: [
            ['Desc <50 chars', '+1 risk', 'warn: add details'],
            ['Env prod', '+1 risk', 'higher scrutiny'],
            ['Linked incidents ≥1', '+1 risk', 'suggest rollback plan'],
            ['All three', 'high/critical', 'add verification steps'],
          ],
        },
        how: 'Checks description length, env, linked incidents. Short prod change with linked incidents → high/critical. Suggests, not blocks. Output: risk + reason.',
        commonMistakes: [
          'Blocking high risk → theater. Fix: suggest, not block.',
          'Scoring without env → staging treated as prod. Fix: include env.',
        ],
        example: '“Update DB” 12 words, env prod, linked to 2 incidents → high, suggests adding rollback steps.',
      },
      {
        name: 'Impact prediction',
        description: 'Use when a change touches a CI that has dependencies and the blast radius is discovered only after deploy',
        overview: 'Impact prediction lists which services and apps will be affected if this change is deployed. Core principle: the Service Map is the truth — traverse the dependency graph from the touched CI downstream.',
        whenToUse: [
          'Change touches a CI that has outgoing dependencies',
          '“We didn’t know it would break X” after deploy',
          'When NOT to use: CI has no dependencies (isolated) — no impact',
        ],
        corePattern: {
          before: '// Before: blind deploy\ndeploy(change) // discover impact after',
          after: '// After: predict then deploy\nconst impacted = traverse(CI, dependencies) // downstream CIs + apps\nreview(impacted) // approve with eyes open',
        },
        quickReference: {
          headers: ['Input', 'Output', 'Source'],
          rows: [
            ['CI id', 'Downstream CIs + apps + distance', 'Service Map'],
            ['Isolated CI', 'Empty list', 'no downstream'],
          ],
        },
        how: 'Graph traversal from CI via ci_dependencies downstream. Lists affected apps/CIs with distance. Input: CI id. Output: impact list. Used by incident and change.',
        commonMistakes: [
          'Stale graph → wrong impact. Fix: keep CI graph live.',
          'Only direct deps → misses transitive. Fix: traverse full downstream.',
        ],
        example: 'Change on CI-042 payment-api → predicts: APP-004 Checkout, CI-017 DB, CI-089 cache.',
      },
    ],
    color: 'bg-amber-500', icon: 'GitBranch', order: 3, lane: 'cycle'
  },
  {
    id: 'knowledge', prefix: 'KB-', title: 'Knowledge Management', oneLiner: 'Makes every fix reusable at the moment of need',
    bullets: [
      'Captures runbooks, troubleshooting guides and postmortems as structured articles',
      'Makes knowledge findable inside the incident — not after',
      'Evolves articles from real resolutions, not theory',
    ],
    skills: [
      {
        name: 'Resolution → article',
        description: 'Use when a problem RCA is published or a change is marked achieved but the fix stays in comments and the KB stays empty',
        overview: 'Resolution → article generates a knowledge article draft from a closed problem or change resolution. Core principle: the resolution is the source — the draft prefills from published RCA or change goals, human publishes.',
        whenToUse: [
          'Problem RCA is published',
          'Change is marked achieved',
          'Same incident is solved from scratch each time',
          'When NOT to use: KB already exists for this fix — link, do not duplicate',
        ],
        corePattern: {
          before: '// Before: fix stays in comments\n// “we fixed by increasing pool” — lost in 200 comments',
          after: '// After: draft KB\nkb = draftFromRCA(publishedRCA) // {title, kbType: "runbook", sections}\n// human reviews → publish',
        },
        quickReference: {
          headers: ['Source', 'Draft', 'Action'],
          rows: [
            ['Published RCA', 'Runbook draft', 'human reviews'],
            ['Achieved change', 'Postmortem draft', 'human publishes'],
            ['No source', 'No draft', 'do not invent'],
          ],
        },
        how: 'Prefills title, kbType and sections from published RCA or change goals. Synthetic demo data is labeled as such. Human reviews and publishes.',
        commonMistakes: [
          'Inventing steps without source → wrong runbook. Fix: source is RCA/change only.',
          'Duplicate KB → noise. Fix: check similarity before drafting.',
        ],
        example: 'RCA “DB pool fix” → draft KB “Runbook: DB pool exhausted — increase maxPool to 50” (runbook).',
      },
      {
        name: 'Search relevance',
        description: 'Use when a new incident is created and the right KB article is not suggested, so the team searches manually',
        overview: 'Search relevance suggests the right KB article when a similar incident is opened. Core principle: the incident text is the query — embedding similarity finds the KB whose sections already solved it.',
        whenToUse: [
          'New incident is created',
          '“Is there a runbook for this?” asked',
          'Repeated manual search for same error',
          'When NOT to use: incident is a novel error with no KB — no suggestion',
        ],
        corePattern: {
          before: '// Before: manual search\nresults = search("timeout") // 50 hits, slow',
          after: '// After: AI suggests top 3\nsuggestions = similar(incident, KBs) // [{KB-012, score:0.81}, ...]',
        },
        quickReference: {
          headers: ['Signal', 'Result', 'Threshold'],
          rows: [
            ['Embedding cosine ≥0.75', 'Top 3 KB', 'suggest'],
            ['Score <0.6', 'No suggestion', 'avoid noise'],
          ],
        },
        how: 'Embedding similarity between incident title/description and KB sections. Surfaces top 3 with score. No auto-link; suggests. Input: incident. Output: KB list + scores.',
        commonMistakes: [
          'Auto-linking low score → wrong KB linked. Fix: threshold 0.6, suggest only.',
          'Ignoring sections → title only. Fix: include KB sections in embedding.',
        ],
        example: 'New incident “504 checkout” → suggests KB-012 “Runbook: 504 — check DB pool” (0.81).',
      },
    ],
    color: 'bg-indigo-500', icon: 'BookOpen', order: 4, lane: 'cycle'
  },
  {
    id: 'improvement', prefix: 'IMP-', title: 'Continual Improvement', oneLiner: 'Turns lessons learned into improvements that actually get done',
    bullets: [
      'Collects ideas from incidents, audits and retros',
      'Prioritizes by effort and due date, tracks proposed → done',
      'Makes improvement visible on the board so it happens',
    ],
    skills: [
      {
        name: 'Trend detection',
        description: 'Use when many improvements share the same source or keywords but are treated as isolated and no systemic fix is created',
        overview: 'Trend detection spots repeating improvement themes across retro notes and postmortems. Core principle: repetition is the systemic signal — five “onboarding docs” improvements should become one.',
        whenToUse: [
          'Same theme (“onboarding”) appears 5× in 30 days',
          'Many improvements from retro/audit with overlapping keywords',
          'When NOT to use: single isolated improvement with unique theme',
        ],
        corePattern: {
          before: '// Before: 5 small improvements\nimprovements = ["fix onboarding page", "update onboarding docs", ...] // scattered',
          after: '// After: one systemic\ntrend = cluster(improvements, {source, keywords})\n// “Streamline onboarding docs” (effort M) replaces 5',
        },
        quickReference: {
          headers: ['Signal', 'Cluster size', 'Action'],
          rows: [
            ['Same keywords 5× in 30d', '5', 'Suggest systemic'],
            ['Single unique', '1', 'Keep as is'],
          ],
        },
        how: 'Clusters improvements by source (retro/audit) + keyword overlap. Suggests a systemic improvement to replace many small ones. Input: improvements 30d. Output: trend + suggested title.',
        commonMistakes: [
          'Creating systemic too early (2×) → premature. Fix: threshold 5 in 30d.',
          'Ignoring source → mixes retro and audit. Fix: cluster per source.',
        ],
        example: '5 improvements with “onboarding docs” in 30 days → “Streamline onboarding docs” (M).',
      },
      {
        name: 'Suggestion mining',
        description: 'Use when postmortems contain what could be better but no improvement is created and lessons stay in comments',
        overview: 'Suggestion mining extracts improvement candidates from incident comments and postmortems. Core principle: the postmortem already contains the improvement — “should / could / need to” are the signals.',
        whenToUse: [
          'Postmortem contains “what could be better”',
          'No improvement created after incident',
          'When NOT to use: no retrospective or postmortem — no source',
        ],
        corePattern: {
          before: '// Before: lessons in comments\n// “should add DB pool alert” — stays in comment',
          after: '// After: draft improvement\nconst draft = mine(comments) // "Add DB pool alert (effort S)"\n// human confirms',
        },
        quickReference: {
          headers: ['Pattern', 'Draft', 'Action'],
          rows: [
            ['“should add X”', 'Add X (S)', 'human confirms'],
            ['“need to fix Y”', 'Fix Y (M)', 'human prioritizes'],
          ],
        },
        how: 'Parses comments for “should / could / need to” patterns into draft improvement titles. Human confirms and prioritizes. Input: comments. Output: draft titles.',
        commonMistakes: [
          'Mining without postmortem → noise. Fix: require retro/postmortem.',
          'Too long draft → not actionable. Fix: keep title <10 words + effort.',
        ],
        example: 'Comment “should add DB pool alert” → draft IMP “Add DB pool alert (effort S)”.',
      },
    ],
    color: 'bg-emerald-500', icon: 'TrendingUp', order: 5, lane: 'cycle'
  },
  {
    id: 'asset', prefix: 'AST-', title: 'Asset Management', oneLiner: 'Knows what is owned, where it is, and its lifecycle',
    bullets: [
      'Inventories hardware, licenses and service assets with location and environment',
      'Connects ownership to operational reality — what runs where',
      'Informs cost, compliance and replacement decisions',
    ],
    skills: [
      {
        name: 'Inventory linking',
        description: 'Use when assets have a hostname or name that matches a CI but the link is missing and audits show mismatches',
        overview: 'Inventory linking suggests a link between an asset (inventory) and its running CI (operational graph). Core principle: the hostname is the key — asset.name ↔ CI.hostname should match.',
        whenToUse: [
          'Asset has hostname or name matching a CI',
          'Assets without CI link',
          'Audit mismatches: “which CI is this asset?”',
          'When NOT to use: asset is a license/service with no hostname — no CI to link',
        ],
        corePattern: {
          before: '// Before: manual link\nasset.ci_id = guess() // often wrong',
          after: '// After: suggested link\nconst {ci, confidence} = match(asset, CIs) // {CI-042, 0.92}\n// human confirms',
        },
        quickReference: {
          headers: ['Match', 'Confidence', 'Action'],
          rows: [
            ['Exact hostname', '≥0.9', 'Suggest link'],
            ['Fuzzy (web-042 vs Web_042)', '0.7–0.9', 'Suggest with warning'],
            ['No match', '<0.6', 'No suggestion'],
          ],
        },
        how: 'Matches asset name/hostname to CI hostname via exact + fuzzy. Suggests assets_ext.ci_id with confidence. Human confirms. Input: asset + CIs. Output: CI + confidence.',
        commonMistakes: [
          'Fuzzy without threshold → wrong CI. Fix: 0.7 threshold.',
          'Linking license to CI → nonsense. Fix: only hardware/service with hostname.',
        ],
        example: 'Asset “Web-042” hostname web-042 → suggests link to CI-042 (0.92).',
      },
    ],
    color: 'bg-blue-500', icon: 'Package', order: 6, lane: 'foundation'
  },
  {
    id: 'service-map', prefix: 'CI-', title: 'Service Configuration (Service Map)', oneLiner: 'Maps services as a live graph to see dependencies and predict impact',
    bullets: [
      'Records CIs (server/service) and directed dependencies — not a stale diagram',
      'Answers impact: if this component fails, what else is affected?',
      'Ties configuration to the assets that actually run it',
    ],
    skills: [
      {
        name: 'Dependency mapping',
        description: 'Use when a new CI is created or a description mentions depends on and the graph has isolated nodes or empty impact analysis',
        overview: 'Dependency mapping suggests dependency edges between CIs from descriptions and app links. Core principle: the description already says it — “depends on / calls / uses” are the signals.',
        whenToUse: [
          'New CI is created',
          'Description mentions “depends on”',
          'Graph has isolated nodes',
          'When NOT to use: CI is intentionally isolated — no deps',
        ],
        corePattern: {
          before: '// Before: isolated graph\ngraph = [CI-A, CI-B] // no edge, impact empty',
          after: '// After: suggested edge\nedge = parse("checkout — depends on payment-api") // {from: checkout, to: payment-api, confidence:0.88}',
        },
        quickReference: {
          headers: ['Phrase', 'Edge', 'Confidence'],
          rows: [
            ['depends on', 'checkout → payment-api', '0.88'],
            ['calls', 'service A → service B', '0.75'],
            ['no phrase', 'No suggestion', '-'],
          ],
        },
        how: 'Parses “depends on / calls / uses” mentions + app-CI links to propose ci_dependencies with confidence. Human confirms edge. Input: CI description + app links. Output: edge + confidence.',
        commonMistakes: [
          'Auto-creating edge → wrong graph. Fix: suggest only.',
          'Ignoring app links → misses deps. Fix: include app-CI links.',
        ],
        example: 'CI “checkout-service — depends on payment-api” → suggests edge checkout → payment-api (0.88).',
      },
      {
        name: 'Impact prediction',
        description: 'Use when an incident or change touches a CI and impact is discovered after, not before',
        overview: 'Impact prediction lists all downstream apps and CIs that would be affected if this CI fails. Core principle: the graph already knows — traverse it downstream from the touched CI.',
        whenToUse: [
          'Incident or change touches a CI',
          '“We didn’t know X would break” after deploy',
          'When NOT to use: CI has no downstream — no impact',
        ],
        corePattern: {
          before: '// Before: blind\nimpact = unknown // discover after failure',
          after: '// After: predicted\nimpact = traverse(CI, dependencies) // downstream CIs + apps + distance',
        },
        quickReference: {
          headers: ['Input', 'Output', 'Source'],
          rows: [
            ['CI id', 'Downstream CIs + apps', 'Service Map'],
            ['Isolated CI', 'Empty list', 'no downstream'],
          ],
        },
        how: 'Graph traversal from CI via ci_dependencies downstream. Output: impacted apps/CIs with distance. Used by incident and change. Input: CI id. Output: impact list.',
        commonMistakes: [
          'Stale graph → wrong impact. Fix: keep CI graph live.',
          'Only direct deps → misses transitive. Fix: traverse full downstream.',
        ],
        example: 'Incident on CI-017 DB → predicts: checkout-service, payment-api, 2 apps.',
      },
    ],
    color: 'bg-slate-500', icon: 'Network', order: 7, lane: 'foundation'
  },
]

export const defaultSkills = [
  { name: 'Auto-triage', entityType: 'Incident', reviewType: 'triage' },
  { name: 'RCA Assist', entityType: 'Problem', reviewType: 'rca' },
  { name: 'Change Risk', entityType: 'Change', reviewType: 'risk' },
  { name: 'Knowledge Synthesis', entityType: 'Knowledge', reviewType: 'knowledge' },
  { name: 'Impact Prediction', entityType: 'Config', reviewType: 'impact' },
]
