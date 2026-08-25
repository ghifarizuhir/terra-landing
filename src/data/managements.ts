// src/data/managements.ts — Terra — AI for ITSM: clear knowledge + real AI skills (full SKILL.md structure) per management.
export type SkillDetail = {
  name: string
  stage?: string
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
        name: 'Auto-log enrichment',
        stage: '01 · Detect & log',
        description: 'Use when monitoring floods the queue with raw alert bursts, incidents arrive with empty fields, or responders retype what the payload already says',
        overview: 'Auto-log enrichment turns a burst of correlated alerts into one clean incident: duplicates merge, and service, component, start time and error signature are copied from the structured payload into the ticket. Core principle: one outage is one ticket — and the alert already knows most of its own fields. The AI copies structured facts; it never invents values it cannot find.',
        whenToUse: [
          'Burst of related alerts from one service within minutes (CPU + health-check + latency)',
          'Incident created by monitoring webhook arrives with blank description or missing affected-service',
          'Responders spend minutes copying host, error text and timestamps from dashboards into the ticket',
          'When NOT to use: alerts are genuinely distinct failures — merging hides independent outages; or a clean manual report is already complete',
        ],
        corePattern: {
          before: '// Before: humans triage alert storms by hand\nfunction log(alerts) {\n  // 14 CPU alerts + 2 health-checks → 16 tickets? copy-paste each\n  return alerts.map((a) => createTicket(a)) // queue floods\n}',
          after: '// After: cluster, merge, enrich\nfunction log(alerts) {\n  const clusters = clusterByServiceAndSignature(alerts, { windowMin: 5 })\n  return clusters.map((c) => createTicket({\n    service: c.service, component: c.component, startedAt: c.firstSeen,\n    errorSignature: c.signature, mergedAlerts: c.size,\n  })) // one incident per cluster, fields pre-filled from payload\n}',
        },
        quickReference: {
          headers: ['Signal', 'Action', 'Rule'],
          rows: [
            ['Same service + same signature ≤5 min', 'Merge into one incident', 'keep alert count'],
            ['Different signature or service', 'Separate incidents', 'never cross-merge'],
            ['Structured field in payload', 'Copy into ticket', 'mark as auto-filled'],
            ['Field not in payload', 'Leave empty for human', 'do not guess'],
          ],
        },
        how: 'Fingerprint each alert by service + error signature, time-window clustering merges bursts, structured extraction copies fields into the draft incident. Output: one incident per cluster with auto-filled fields marked as such. Maintenance windows are excluded. Human-entered fields are never overwritten.',
        commonMistakes: [
          'Merging across services or signatures → two outages hidden as one. Fix: strict fingerprint match.',
          'Overwriting responder edits with payload data. Fix: auto-fill only empty fields.',
          'Creating tickets during maintenance windows. Fix: check change/maintenance calendar first.',
        ],
        example: '14 “CPU >90%” + 2 health-check fails on checkout-api in 4 minutes → 1 INC pre-filled: Payments / checkout-api / started 09:12 / signature “cpu-saturation” / “16 alerts merged”.',
      },
      {
        name: 'Auto-triage & priority',
        stage: '02 · Triage',
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
        stage: '04 · Communicate',
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
      {
        name: 'Similar-incident detection',
        stage: '03 · Diagnose',
        description: 'Use when responders ask “has this happened before?”, duplicate incidents pile up in the queue, or restore-path knowledge lives only in senior heads',
        overview: 'Similar-incident detection surfaces past incidents that resemble the current one — by title, symptom and affected service. Core principle: if it happened before, the fastest path to restore is what worked last time. The AI links candidates, it never merges; humans decide whether two incidents are truly the same.',
        whenToUse: [
          'New incident looks familiar (“same 504 as last week”) but nobody remembers the INC number',
          'Multiple reporters file separate tickets for one outage — duplicates flood the queue',
          'Major incident needs known workarounds from previous occurrences, fast',
          'When NOT to use: similarity below threshold or different affected service — a false link actively misleads restoration',
        ],
        corePattern: {
          before: '// Before: matching by human memory\nfunction findSimilar(incident) {\n  // senior: “I think this was INC-something last month?”\n  return searchByMemory() // slow, misses, does not scale\n}',
          after: '// After: AI ranks candidates, human confirms\nfunction findSimilar(incident) {\n  const matches = embedAndRank(incident, resolvedIncidents)\n  // [{id: "INC-1042", sim: 0.88, resolution: "rollback v2.3"}]\n  return matches.filter((m) => m.sim >= 0.75) // human confirms link/duplicate\n}',
        },
        quickReference: {
          headers: ['Match', 'Action', 'Rule'],
          rows: [
            ['sim ≥0.85 + same service', 'Suggest as duplicate', 'merge only with confirm'],
            ['sim 0.75–0.85', 'Suggest as related', 'link both directions'],
            ['sim <0.75', 'No suggestion', 'avoid false leads'],
            ['Duplicate confirmed', 'Carry over workaround + comms', 'restore faster'],
          ],
        },
        how: 'Embed title + description + affected service, rank against resolved incidents from the last 180 days, boost same-service matches. Output: top-3 {incidentId, similarity, prior resolution summary}. Pattern: suggest links, never auto-merge; feed confirmed links back so recurring clusters surface to problem management.',
        commonMistakes: [
          'Auto-merging high-similarity pairs → two distinct outages collapse into one. Fix: human confirms every merge.',
          'Keyword-only matching (“timeout”) → noisy false links across unrelated services. Fix: embedding + same-service boost.',
          'Linking without resolution context → match found but no “what fixed it”. Fix: always show prior resolution summary.',
        ],
        example: 'INC “Checkout timeout 504” → INC-1042 same title resolved 6 days ago (0.88) → suggests duplicate + “fixed by rollback v2.3” → responder reuses workaround in minutes instead of rediscovering it.',
      },
      {
        name: 'Resolution suggester',
        stage: '05 · Resolve & restore',
        description: 'Use when the diagnosis is clear but responders stare at the ticket unsure what to do, or MTTR is dominated by “what now?” instead of work',
        overview: 'Resolution suggester ranks candidate actions for a diagnosed incident — workarounds and fixes drawn from similar resolved incidents and matched runbooks — each with its past success rate and source. Core principle: during an outage, restore first, root-cause later; the fastest safe action beats the perfect fix. The AI suggests and ranks; only humans execute.',
        whenToUse: [
          'Diagnosis points at a known failure mode (same signature resolved before)',
          'A runbook exists but nobody on shift remembers which one or trusts it',
          'P1 needs an interim workaround while engineering prepares the real fix',
          'When NOT to use: genuinely novel failure with no history — escalate to deeper expertise instead of dressing up a guess',
        ],
        corePattern: {
          before: '// Before: fix chosen under pressure\nfunction resolve(incident) {\n  // “try restarting? redeploy? someone check the runbook?”\n  return loudestOpinion() // slow, inconsistent, untracked\n}',
          after: '// After: ranked candidates with evidence\nfunction resolve(incident) {\n  const options = rankActions(incident, history, runbooks)\n  // [{action:"rollback v2.3", source:"INC-1042", success:1.0}, {action:"RB-07 §3"}]\n  return options // human picks and executes\n}',
        },
        quickReference: {
          headers: ['Candidate', 'Shown as', 'Rule'],
          rows: [
            ['Past resolution ≥0.85 match', '“Proven” + success rate', 'cite incident'],
            ['Runbook step match', 'Steps + link', 'flag staleness'],
            ['Partial similarity', 'Options ranked', 'no single answer'],
            ['No history at all', 'Say so honestly', 'escalate, do not guess'],
          ],
        },
        how: 'Reuses similar-incident embeddings, joins each candidate with its resolution record and duration, ranks by same-service × recency × past success. Output: top-3 {action, source link, success rate, blast radius}. Execution always stays with the human; outcomes are written back so rankings improve.',
        commonMistakes: [
          'Presenting an unverified suggestion as “proven”. Fix: label every candidate with its evidence.',
          'Hiding blast radius (“rollback also drops in-flight orders”). Fix: show side effects next to action.',
          'Treating the workaround as the fix — problem never gets the handover. Fix: mark workaround as temporary.',
        ],
        example: 'Diagnosed 504 on checkout → suggests “Rollback to v2.3 — used 4×, 100% success (INC-1042)” ahead of deep-dive; service restored in 12 minutes, root cause goes to Problem.',
      },
      {
        name: 'Closure & handover pack',
        stage: '06 · Close & learn',
        description: 'Use when incidents close as one-liners like “fixed”, postmortems start from a blank page, or problem/knowledge teams chase responders for context',
        overview: 'Closure & handover pack assembles the learning record at close time: timeline digest, impact, actions taken, resolution and open follow-ups — formatted so problem management gets a problem statement and knowledge gets an article stub, not a scavenger hunt. Core principle: learning is part of closing; whatever is not captured now is lost forever.',
        whenToUse: [
          'Any non-trivial incident is about to close with a thin resolution note',
          'An incident closes that has recurred before — recurrence must reach problem management',
          'Major/war-room incident closure where stakeholders expect a record',
          'When NOT to use: trivial password-reset-class tickets — lightweight close is fine',
        ],
        corePattern: {
          before: "// Before: close = type “done”, move on\nfunction close(incident) {\n  incident.resolution = prompt('resolution?') // “fixed”\n  return incident // context evaporates\n}",
          after: '// After: pack generated from the timeline\nfunction close(incident) {\n  const pack = buildClosurePack(incident.timeline)\n  // {summary, impact, actions, followUps} + problem flag + KB draft\n  return reviewAndSave(pack) // human reviews before anything is created\n}',
        },
        quickReference: {
          headers: ['Signal at close', 'Route', 'Rule'],
          rows: [
            ['Recurred ≥2×', 'Propose Problem record', 'human confirms'],
            ['Novel cause + novel fix', 'Draft Knowledge article', 'from timeline only'],
            ['Standard documented fix', 'Link existing article', 'no new article'],
            ['Every closure', 'Summary + impact attached', 'extractive only'],
          ],
        },
        how: 'Extractive assembly from the timeline and comms into four sections (what happened, impact, actions, follow-ups); classifies the learning target (problem / knowledge / none) using recurrence count and novelty; drafts are staged for human review before any record is created. Recurrence counters feed back into similar-incident and triage skills.',
        commonMistakes: [
          'Writing a root cause into the closure — that is problem management’s job, not the closer’s. Fix: record facts, flag for RCA.',
          'Auto-creating problem records or articles without review. Fix: draft and stage, human publishes.',
          'Skipping follow-up capture (“we should add alerting”) — they evaporate. Fix: follow-ups are a required section.',
        ],
        example: 'INC closes after rollback → pack: “504 checkout, 22 min, 12 orders affected, rollback v2.3” + “3rd occurrence in 30 days → propose PRB” + KB stub drafted from timeline, awaiting review.',
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
        stage: '01 · Intake & classify',
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
        name: 'Completeness checker',
        stage: '02 · Validate',
        description: 'Use when requests reach fulfillers missing fields or attachments, and fulfillment starts with a “can you also send me…” email instead of work',
        overview: 'Completeness checker validates a request against its catalog item’s requirements before it enters a queue — missing laptop model, no manager name, absent justification — and asks the requester one consolidated question covering everything at once. Core principle: a request that cannot be fulfilled yet should not look fulfillable; bounce once, completely, or not at all.',
        whenToUse: [
          'Catalog item has required fields/attachments that arrive empty',
          'Fulfillers spend their first touch asking for details instead of fulfilling',
          'Requests bounce back and forth 2–3 times before work can start',
          'When NOT to use: optional fields — nagging over nice-to-haves kills goodwill',
        ],
        corePattern: {
          before: '// Before: discover gaps one email at a time\nfulfill(request) // → “which model?” → wait → “and manager approval?” → wait\n// 3 days lost before real work starts',
          after: '// After: validate once, ask everything at once\nconst gaps = checkRequirements(request, catalogItem.requires)\nreturn gaps.length ? askOnce(gaps) : routeToFulfillment(request)\n// one message, all missing items, with defaults suggested',
        },
        quickReference: {
          headers: ['Check', 'On gap', 'Rule'],
          rows: [
            ['Required field empty', 'Ask in consolidated message', 'suggest common default'],
            ['Attachment missing', 'Request upload link', 'block progression'],
            ['Approval prerequisite', 'Flag to approval stage', 'do not fulfill first'],
            ['Optional field empty', 'Proceed silently', 'never nag'],
          ],
        },
        how: 'Each catalog item declares required fields and attachments; the checker diffs them against the submitted request. All gaps are combined into one clarifying message, ordered by blocking impact, with sensible defaults pre-filled where history shows one dominant answer (e.g. standard laptop model). Requests pass through only when genuinely fulfillable.',
        commonMistakes: [
          'Asking per-field as they are noticed → the 3-email dance returns. Fix: single consolidated ask.',
          'Treating optional as required → friction and abandoned carts. Fix: only catalog-declared requirements.',
          'Guessing values silently → wrong hardware ordered. Fix: suggest defaults visibly, requester confirms.',
        ],
        example: 'Hardware request without model + start date → one message: “Which model? (85% pick MacBook Air) · Start date? · Manager name missing” → completed same day, fulfillment starts next morning.',
      },
      {
        name: 'Approval router',
        stage: '03 · Approve',
        description: 'Use when approvals sit for days with the wrong person, requesters have no idea where theirs is stuck, or every approval chases its approver manually',
        overview: 'Approval router determines who must approve a request — by item type × cost × requester role policy — attaches the context an approver needs to decide fast, and nudges approvals sitting past due. Core principle: approval should take one glance; the AI finds the right pair of eyes and hands them everything on one screen.',
        whenToUse: [
          'Access/costly items waiting on an approval chain nobody is sure about',
          'Approvals routed by org-chart guesswork bounce between managers',
          'Stale approvals age out silently past due dates',
          'When NOT to use: pre-approved zero-cost items with policy-defined auto-approval',
        ],
        corePattern: {
          before: '// Before: who approves this? ask around\nrouteTo(requester.manager) // → “not mine, try IT budget owner”\n// 4 days of forwarding, no record why',
          after: '// After: policy-derived route with context\nconst chain = resolveApprovers(item, cost, role)\nsendForApproval(chain[0], packContext(request))\nonStale(() => remind(chain[0], afterDays: 2))',
        },
        quickReference: {
          headers: ['Signal', 'Action', 'Rule'],
          rows: [
            ['Policy match (item+cost+role)', 'Route to named approver', 'cite policy line'],
            ['No policy match', 'Escalate to service owner', 'never guess silently'],
            ['Approved', 'Release to routing stage', 'context carried'],
            ['Pending > SLA days', 'Auto-remind', 'max 2 reminders'],
          ],
        },
        how: 'Reads the approval matrix (item category, cost threshold, requester role → approver), builds a one-screen context pack (what, why, cost, policy basis), sends with due date, and auto-reminds up to twice before escalating. Every hop and nudge is recorded so the audit trail explains itself.',
        commonMistakes: [
          'Routing by org chart proximity → wrong approver, silent delays. Fix: explicit approval matrix.',
          'Reminding forever → approvers mute the channel. Fix: cap reminders, then escalate.',
          'Sending bare titles (“approve REQ-42”) → slow decisions. Fix: always attach context pack.',
        ],
        example: '“Jira admin access, Finance, $0” → policy: Finance data tools need Data Owner + manager → both get context pack; Data Owner approves day 1, manager reminded day 3, released to IAM routing.',
      },
      {
        name: 'Auto-routing',
        stage: '04 · Route & fulfill',
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
      {
        name: 'Status comms drafter',
        stage: '05 · Deliver & confirm',
        description: 'Use when requesters ask “any update on my laptop?” because fulfillment happens in silence, and closure arrives as a surprise status flip',
        overview: 'Status comms drafter answers “where is my request?” from the fulfillment timeline — ordered, shipped, delivered — and drafts the delivery confirmation message so closure is explicit, not a silent status change. Core principle: silence reads as neglect; the timeline already knows the answer, someone just has to say it.',
        whenToUse: [
          'Requester asks for status on an in-flight request',
          'Fulfillment state changed (ordered/shipped/done) without telling the requester',
          'Request is fulfilled — needs explicit confirmation before closing',
          'When NOT to use: nothing has changed since the last update — do not send empty noise',
        ],
        corePattern: {
          before: '// Before: requester pings, human digs\nonStatusQuestion((req) => readTimelineManually(req)) // 10 min per ping\n// close happens silently; requester finds out by accident',
          after: '// After: draft from timeline\nconst msg = draftFrom(timeline) // “Ordered 12/8 · shipped 15/8 · ETA Mon”\nreturn humanSends(msg)\nonFulfilled((req) => proposeConfirmation(req))',
        },
        quickReference: {
          headers: ['Trigger', 'Draft', 'Rule'],
          rows: [
            ['“Any update?”', 'Timeline digest + ETA', 'extractive only'],
            ['State changed', 'Proactive one-liner', 'send via human'],
            ['Fulfilled', 'Confirmation + how to return issues', 'explicit close'],
            ['No change since last', 'Nothing', 'no empty updates'],
          ],
        },
        how: 'Compresses the fulfillment timeline into 1–2 sentences with the next milestone and date, always extractive (dates and states come from records, not invention). Drafts are sent by humans or auto-posted where policy allows. At fulfillment, proposes the confirmation message that doubles as the closure record.',
        commonMistakes: [
          'Inventing ETAs to sound helpful → broken promises. Fix: only dates that exist in records.',
          'Updating on every micro-change → spam. Fix: meaningful milestones only.',
          'Closing without confirmation → requester reopens or loses trust. Fix: confirmation is part of closure.',
        ],
        example: 'Laptop request → “MacBook ordered 12/8, shipped 15/8, arriving Monday to your desk” sent proactively at ship event → delivery confirmed → closed with requester’s OK.',
      },
      {
        name: 'Demand miner',
        stage: '06 · Close & mine demand',
        description: 'Use when the same manual requests repeat every week yet stay manual, and nobody can prove which new catalog item or automation would pay off first',
        overview: 'Demand miner clusters fulfilled requests over time to expose what people actually keep asking for — and quantifies it: volume, handler time, seasonality. Core principle: the catalog should grow from evidence of repeated demand, not from whoever complained loudest this month.',
        whenToUse: [
          'Quarterly catalog review: which free-text asks recur often enough to become items?',
          'A request type is fulfilled manually 20× a month with the same three steps',
          'Stakeholders debate new self-service flows with no usage data',
          'When NOT to use: one-off unusual requests — no pattern to mine yet',
        ],
        corePattern: {
          before: '// Before: catalog evolves by anecdote\nreviewCatalog() // “I think people want X?”\n// same manual fulfillment continues, cost invisible',
          after: '// After: demand ranked by evidence\nconst clusters = mineDemand(fulfilledRequests, { lookbackDays: 90 })\n// [{pattern: “VPN token reset”, count: 34, avgHandleMin: 18}]\nreturn proposeCatalogItem(clusters[0])',
        },
        quickReference: {
          headers: ['Signal', 'Threshold', 'Proposal'],
          rows: [
            ['Same cluster ≥10× / month', 'Propose catalog item', 'with volume + effort'],
            ['Purely digital + deterministic', 'Propose full automation', 'zero-touch flow'],
            ['Cluster shrinking', 'No action', 'watch'],
            ['One-off requests', 'Ignore', 'no pattern'],
          ],
        },
        how: 'Embeds fulfilled request texts over a trailing quarter, clusters them (same technique family as problem pattern clustering), and joins each cluster with handler time from fulfillment records. Output: ranked list {pattern, volume, total handle time, seasonality} with proposals to add catalog items or automate zero-touch flows. Humans decide what enters the catalog.',
        commonMistakes: [
          'Building catalog items for tiny clusters → shelfware entries. Fix: volume threshold.',
          'Ignoring handler time → big-volume-but-trivial wins crowd out real savings. Fix: rank by minutes × count.',
          'Automating a flaky manual process as-is → automated mess. Fix: flag process health before automation.',
        ],
        example: '90-day mine: “VPN token reset” × 34, 18 min each ≈ 10 hours handled manually → proposal: self-service reset flow, projected full automation of the cluster.',
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
        stage: '01 · Detect & cluster',
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
        name: 'Recurring-impact scorer',
        stage: '02 · Prioritize',
        description: 'Use when the problem backlog is ranked by gut feel, small-but-daily failures sit below one-off P1s, or engineers argue about which RCA to run first',
        overview: 'Recurring-impact scorer ranks the problem backlog by real cost: recurrence frequency × users affected × trend direction. Core principle: for problems, frequency beats severity — a 5-minute failure every day costs more than a one-hour outage once. The AI computes and ranks; humans confirm the priority.',
        whenToUse: [
          'Problem backlog has >10 open PRBs with no clear order',
          'A daily nuisance incident outranks nothing because each occurrence looks small',
          'Planning meeting needs evidence for “why this RCA first”',
          'When NOT to use: brand-new problem with 1 occurrence — no recurrence data to score yet',
        ],
        corePattern: {
          before: '// Before: backlog ordered by loudest voice\nconst queue = problems.sort((a, b) => b.shoutiness - a.shoutiness)\n// daily nuisances starve while big one-offs jump the line',
          after: '// After: score = frequency x impact x trend\nconst scored = problems.map((p) => ({\n  prb: p.id,\n  score: p.occurrences * p.usersAffected * trendFactor(p),\n}))\nreturn scored.sort((a, b) => b.score - a.score) // human confirms top of queue',
        },
        quickReference: {
          headers: ['Input', 'Weight', 'Output'],
          rows: [
            ['Occurrences / 30d', '×3', 'frequency dominates'],
            ['Users affected', '×2', 'breadth matters'],
            ['Trend rising vs flat', '×1.5 / ×1', 'rising beats stable'],
            ['Score ≥ threshold', 'Suggest P-level', 'human confirms'],
          ],
        },
        how: 'Counts occurrences from linked incidents over trailing 30 days, multiplies by distinct users affected and trend factor (rising/flat/falling via week-over-week delta). Output: {score, suggestedP, reason} per problem. Suggestion only — priority changes still need human confirmation, and every factor is shown so the ranking is arguable.',
        commonMistakes: [
          'Scoring on single-incident severity → backlog becomes just another P1 list. Fix: frequency is the dominant factor.',
          'Hiding the formula → engineers distrust the rank. Fix: show factors next to score.',
          'Auto-reprioritizing the board. Fix: suggest, human applies.',
        ],
        example: 'PRB “DB pool exhaustion”: 9 occurrences × 40 users × rising (×1.5) → score 540, suggested P2 — jumps above two older one-off P1s in the ranked backlog.',
      },
      {
        name: 'RCA draft assist',
        stage: '03 · Investigate (RCA)',
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
      {
        name: 'Known-error publisher',
        stage: '04 · Workaround',
        description: 'Use when the cause is understood but the permanent fix is weeks away, and every new incident re-derives the same workaround from scratch',
        overview: 'Known-error publisher turns a diagnosed problem into a findable known-error record: confirmed cause + the best workaround observed across linked incidents, published to knowledge so agents hit it during triage. Core principle: until the fix ships, the workaround is the product — make it impossible not to find.',
        whenToUse: [
          'RCA is confirmed but the permanent fix waits on a change window',
          'Linked incidents show 2+ different workarounds for the same cause — pick and standardize one',
          'Agents keep asking “how did we fix this last time?” in war-rooms',
          'When NOT to use: RCA still unconfirmed — publishing an unproven cause poisons future diagnosis',
        ],
        corePattern: {
          before: '// Before: workaround lives in one engineer’s head\nif (incident.matches(problem)) {\n  return askSeniorHowToMitigate() // slow, inconsistent, leaves with them\n}',
          after: '// After: published known-error surfaces at triage\nconst ke = publishKnownError({\n  cause: problem.rca.rootCause,\n  workaround: bestObserved(problem.linkedIncidents),\n})\n// next similar incident links to ke automatically',
        },
        quickReference: {
          headers: ['Input', 'Output', 'Rule'],
          rows: [
            ['Confirmed RCA', 'Cause section', 'verbatim from RCA'],
            ['Linked incident resolutions', 'One standardized workaround', 'most-used wins'],
            ['No confirmed RCA yet', 'Do not publish', 'wait for confirmation'],
            ['Fix finally ships', 'Retire known-error', 'link to change'],
          ],
        },
        how: 'Extracts cause text from the published RCA and ranks workarounds across linked incidents by success rate and usage count; drafts the known-error record and stages it for human review before publishing. When the permanent-fix change completes, proposes retiring the record so stale workarounds do not linger.',
        commonMistakes: [
          'Publishing before RCA is confirmed → wrong cause becomes canonical. Fix: gate on published RCA.',
          'Listing three workarounds “so teams can choose” → inconsistency returns. Fix: one standard workaround.',
          'Forgetting to retire after the fix → agents apply obsolete mitigations. Fix: tie retirement to change completion.',
        ],
        example: 'PRB “DB pool exhaustion” RCA confirmed → publishes KE: cause “pool never recycled on 504” + workaround “recycle pool via admin job” (used 4/5 times) → next checkout timeout links to it at triage.',
      },
      {
        name: 'Fix-effectiveness check',
        stage: '05 · Verify fix',
        description: 'Use when the permanent fix just shipped and everyone assumes the problem is over, but nobody checked whether incidents actually stopped',
        overview: 'Fix-effectiveness check compares incident recurrence after the permanent fix against the pre-fix baseline and declares a verdict: effective, partial, or no effect. Core principle: shipping is not fixing — only the recurrence curve decides. The AI measures; humans decide what to do about a failing verdict.',
        whenToUse: [
          'Permanent-fix change completed ≥1 week ago — baseline comparison is meaningful',
          'Problem was closed on the assumption that deployment = resolution',
          'Stakeholders ask “is it actually better now?” with no data behind the answer',
          'When NOT to use: fix shipped days ago with near-zero traffic since — sample too small, wait',
        ],
        corePattern: {
          before: '// Before: close because the change went green\nif (change.status === "completed") problem.close() // hope as strategy\n// nobody checks next month',
          after: '// After: verdict from the curve\nconst v = compareRecurrence(problem, {\n  before: last30dBefore(change.completedAt),\n  after: daysSince(change.completedAt),\n}) // {verdict: "partial", reduction: "62%", evidence: clusterIds}\nreturn review(v) // human decides: keep open, adjust, close',
        },
        quickReference: {
          headers: ['Reduction vs baseline', 'Verdict', 'Next'],
          rows: [
            ['≥80%', 'Effective', 'propose close + retire KE'],
            ['30–80%', 'Partial', 'keep open, note residual'],
            ['<30%', 'No effect', 'reopen investigation'],
            ['<1 week of data', 'Inconclusive', 'wait for sample'],
          ],
        },
        how: 'Builds a 30-day pre-fix occurrence baseline from linked incidents, then counts matching occurrences since the fix change completed; same embedding signature as pattern clustering so “similar” means the same thing in both places. Output: {reduction %, verdict, evidence}. Verdicts are proposals attached to the problem — closure still needs a human.',
        commonMistakes: [
          'Judging after 2 quiet days → noise reads as success. Fix: minimum observation window.',
          'Ignoring partial results → residual occurrences have no owner. Fix: partial keeps the problem open.',
          'Comparing different signatures pre/post → false improvement. Fix: reuse clustering embeddings.',
        ],
        example: 'Fix shipped 3 weeks ago: baseline 9/month → now 2/month = 78% reduction → verdict “Partial — keep open”; two residual timeouts share a new signature worth its own look.',
      },
      {
        name: 'Recurrence watchdog',
        stage: '06 · Close & watch',
        description: 'Use when closed problems silently absorb nothing while their failure mode lives on under new titles, and nobody notices the same outage wearing a new name',
        overview: 'Recurrence watchdog keeps watching after a problem closes: if incidents with the same signature re-emerge, it proposes reopening with the fresh cluster as evidence. Core principle: a problem is done when recurrence stops — not when its status says closed. The watch costs nothing; missing the comeback costs the whole RCA again.',
        whenToUse: [
          'Problem closed as “fixed” — start a watch instead of walking away',
          'New incident arrives that matches a closed PRB’s signature',
          'Quarterly hygiene: which closed problems have quietly recurred?',
          'When NOT to use: problem closed as “no fault found” with zero occurrences ever linked — nothing to match against',
        ],
        corePattern: {
          before: '// Before: closed = invisible\nproblem.close()\n// 6 weeks later the same failure returns under a new title — fresh RCA, full price\ncreateBrandNewProblem(incident)',
          after: '// After: closed problems stay watched\nwatchdog.watch(problem, { signatureEmbedding, ttlDays: 90 })\nonMatch((incident, prb) => proposeReopen(prb, [incident])) // evidence attached',
        },
        quickReference: {
          headers: ['Signal', 'Action', 'Threshold'],
          rows: [
            ['New incident sim ≥0.85 to closed PRB', 'Propose reopen', 'cluster attached'],
            ['sim 0.7–0.85', 'Flag for review', 'human judges'],
            ['Quiet through TTL', 'Archive watch', '90 days default'],
            ['Reopen confirmed', 'Restore links + history', 'no cold restart'],
          ],
        },
        how: 'Stores each closed problem’s cluster signature (embeddings of linked incident titles + service) with a 90-day watch TTL. Incoming incidents are matched against closed-problem signatures; strong matches generate a reopen proposal citing the old RCA plus the new cluster. Humans confirm reopens — the AI only proves the case.',
        commonMistakes: [
          'Watching forever → watch list becomes noise. Fix: TTL archive.',
          'Auto-reopening on any weak match → churn and distrust. Fix: reopen needs ≥0.85 or human review.',
          'Reopening empty-handed → engineers relitigate from scratch. Fix: always attach new cluster + old RCA.',
        ],
        example: 'Closed PRB “DB pool exhaustion”: 5 weeks later 3× “checkout latency spike” score 0.88 to its signature → proposal: “Reopen PRB-1042 — same signature, here is why”, old RCA preloaded.',
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
        name: 'Change-request drafter',
        stage: '01 · Log & plan',
        description: 'Use when change requests are thin one-liners like “update DB”, rollout steps are invented per deploy, or rollback is a blank field nobody fills',
        overview: 'Change-request drafter assembles a complete change record from history: intent, rollout steps, verification checks and a rollback plan drawn from similar completed changes on the same service. Core principle: past changes are the template — if no previous change ever used a rollback step, the drafter says so instead of inventing one.',
        whenToUse: [
          'New change created with a short description and empty rollback field',
          'Same service gets changed repeatedly with rewritten-from-scratch plans',
          'Author is junior to change process — needs the structure, not the lecture',
          'When NOT to use: emergency fix mid-incident — speed beats paperwork; draft after the fact',
        ],
        corePattern: {
          before: '// Before: plan typed from memory\nconst chg = { title: "update DB", rollback: null }\n// discovered incomplete at 2am during a failed deploy',
          after: '// After: drafted from similar completed changes\nconst chg = draftFromHistory({ ci: "CI-042", intent })\n// {steps: [...], verify: [...], rollback: from INC/CHG evidence}\nreturn humanEdits(chg) // author confirms every step',
        },
        quickReference: {
          headers: ['Section', 'Source', 'Rule'],
          rows: [
            ['Intent + description', 'Author input + linked CI', 'expanded, not invented'],
            ['Rollout steps', 'Similar completed changes', 'most recent wins'],
            ['Rollback plan', 'What actually worked before', 'never fabricated'],
            ['Verification steps', 'Post-deploy checks used before', 'human edits'],
          ],
        },
        how: 'Finds completed changes touching the same CI/service (embedding + exact CI match), extracts their steps, rollbacks and outcomes; drafts the new record section by section with source links. Output is a staged draft — nothing enters the approval flow until the author edits and submits. Missing sections are flagged, not filled with guesses.',
        commonMistakes: [
          'Copying a rollback plan from an unrelated service → dangerous theater. Fix: same-CI history only.',
          'Auto-submitting drafts into approval → reviewers rubber-stamp noise. Fix: author submits.',
          'Fabricating plausible-sounding steps → hallucinated ops. Fix: extractive, cite sources, flag gaps.',
        ],
        example: '“Update DB” on CI-042 → draft expands to intent + 5 rollout steps + rollback “restore snapshot pre-CHG-118 (worked in 4 min)” + 3 verify checks, each citing its source change.',
      },
      {
        name: 'Risk scoring',
        stage: '02 · Assess risk',
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
        stage: '03 · Map blast radius',
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
      {
        name: 'CAB evidence pack',
        stage: '04 · Approve & schedule',
        description: 'Use when approvers decide from a title and a gut feeling, meetings re-litigate the same questions, or two changes collide on the same service unnoticed',
        overview: 'CAB evidence pack compiles everything an approver needs into one view: risk score, predicted blast radius, rollout and rollback plans, schedule conflicts (change freezes, overlapping changes on the same CI) — plus a draft rationale either way. Core principle: approval quality is bounded by evidence quality; the AI assembles, the board decides.',
        whenToUse: [
          'Change enters approval with prod impact or high risk score',
          'Approvers keep asking “what else touches this CI next week?”',
          'Change freeze calendar exists but nobody checks it before scheduling',
          'When NOT to use: standard pre-approved change (password rotation, patching) with a fixed low-risk path',
        ],
        corePattern: {
          before: '// Before: approval by vibes\ncabReview(change) // “looks fine, who wrote this? ok go”\n// conflicts discovered when two deploys hit one CI in the same window',
          after: '// After: pack first, decision second\nconst pack = assembleEvidence(change)\n// {risk, blastRadius, conflicts: [CHG-131 same CI], freezeCheck}\nreturn cab.decide(pack) // human approve/reject/schedule',
        },
        quickReference: {
          headers: ['Pack section', 'Source', 'Flags'],
          rows: [
            ['Risk + reason', 'Risk scoring', 'high → extra scrutiny'],
            ['Blast radius', 'Impact prediction', 'prod apps listed'],
            ['Conflicts', 'Same-CI changes ±48h', 'overlap warning'],
            ['Freeze calendar', 'Schedule check', 'blocked windows'],
          ],
        },
        how: 'Joins outputs of the earlier stages (risk, impact) with schedule data: other pending changes on the same CIs within a conflict window and active freeze periods. Renders one evidence pack with a drafted approve/defer rationale citing specifics. The board’s decision and any rejection reasons are recorded back for future drafting.',
        commonMistakes: [
          'Auto-approving low-risk packs → approval theater returns via the side door. Fix: humans decide, always.',
          'Conflict window too narrow (same hour) → sequential deploys still collide. Fix: default ±48h.',
          'Packs so long nobody reads them. Fix: one screen — flags up top, evidence behind.',
        ],
        example: 'CHG “DB pool fix” on CI-042 → pack: high risk · 3 apps impacted · conflicts CHG-131 (same CI, +6h) · freeze starts Friday → CAB defers to Monday, rationale recorded.',
      },
      {
        name: 'Post-deploy sentinel',
        stage: '05 · Deploy & verify',
        description: 'Use when deploys go green and everyone walks away, while the real verdict — error rates, latency, business metrics — shows up hours later unwatched',
        overview: 'Post-deploy sentinel watches the affected services during the monitoring period, comparing live metrics against a pre-deploy baseline, and proposes hold or rollback when anomalies appear. Core principle: green pipeline means deployed, not working. The AI watches and alerts; pulling the trigger stays human.',
        whenToUse: [
          'High/critical change just deployed to prod with a monitoring period set',
          'Deploy finished outside overlap hours — no engineer is naturally watching',
          'Service has known wobble where humans need a diff against baseline, not raw dashboards',
          'When NOT to use: low-risk isolated change with trivial verification checks already defined',
        ],
        corePattern: {
          before: '// Before: deploy green → attention moves on\ndeploy(change) // ✅ pipeline passed\n// latency creep found 4h later by users, not by us',
          after: '// After: sentinel compares against baseline\nsentinel.watch({ services: impacted, window: monitoringPeriod })\nonAnomaly((m) => proposeHold(m)) // {metric, delta, baseline, confidence}',
        },
        quickReference: {
          headers: ['Signal', 'Proposal', 'Threshold'],
          rows: [
            ['Error rate vs baseline', 'Propose rollback', 'sustained >2× baseline'],
            ['Latency p95 drift', 'Propose hold', '>50% over baseline'],
            ['Within expected range', 'Report healthy', 'no action noise'],
            ['Any proposal', 'Human executes', 'never auto-trigger'],
          ],
        },
        how: 'Baseline = same weekday/hour window from before deployment, so daily seasonality does not fake anomalies. Watches only the services in the predicted blast radius. Anomalies are proposed as actions with metric evidence attached; rollback execution remains a human decision tied to the change record.',
        commonMistakes: [
          'Alerting on absolute thresholds → normal traffic spikes page everyone. Fix: compare to seasonal baseline.',
          'Watching everything instead of blast radius → noise buries signal. Fix: scope to predicted impact list.',
          'Auto-rollback without human → AI performs a production change. Fix: propose, never execute.',
        ],
        example: 'DB pool fix deploys 18:40 → sentinel watches checkout-api: p95 within baseline all evening → 22:15 error rate 2.4× baseline sustained → proposes rollback with metric diff; engineer approves in 2 minutes.',
      },
      {
        name: 'Closure & drift report',
        stage: '06 · Close & learn',
        description: 'Use when changes close the moment monitoring ends, related incidents later have no link back, and the runbook nobody updated quietly rots',
        overview: 'Closure & drift report closes the loop: it checks whether the change held after the monitoring period (no related incidents, config still matches intent) and lists what should be updated — runbooks, architecture docs, the CI record. Core principle: a change is done when it stopped generating work, not when it deployed green.',
        whenToUse: [
          'Monitoring period completed without rollback — candidate for closure review',
          'Incident appears days/weeks later touching a recently changed CI',
          'Docs and diagrams that reference this service may now be stale',
          'When NOT to use: change was rolled back — it feeds problem/incident records instead',
        ],
        corePattern: {
          before: '// Before: close = status flip\nif (monitoringOver()) change.close()\n// docs say old schema, incidents arrive unlinkable, drift begins',
          after: '// After: closure checks holding power\nconst report = driftCheck({ change, lookbackDays: 30 })\n// {relatedIncidents: 0, docUpdates: [runbook §4], ciFieldsStale: false}\nreturn reviewAndClose(report) // human closes with context',
        },
        quickReference: {
          headers: ['Check', 'Window', 'Outcome'],
          rows: [
            ['Related incidents', '30d post-close', '0 → clean close'],
            ['Config vs intent', 'at close', 'drift flagged'],
            ['Docs referencing CI', 'at close', 'update list'],
            ['Clean result', '-', 'close + archive evidence'],
          ],
        },
        how: 'After the monitoring period, correlates new incidents against the changed CIs (embedding + CI match), diffs current config against the change intent, and lists documents referencing the touched services. Output: one-page report {held: yes/no, follow-ups}. Closure stays a human call; reports attach permanently so future drafting inherits the outcome.',
        commonMistakes: [
          'Closing with open follow-ups (“docs later”) → never happens. Fix: follow-ups are part of the report.',
          'Zero lookback for related incidents → drift invisible. Fix: mandatory 30-day correlation.',
          'Treating rolled-back changes as closures → wrong lessons archived. Fix: rollbacks route to problem/incident.',
        ],
        example: 'DB pool fix, monitoring done → report: held 30d · 0 related incidents · runbook §4 references old pool size → close with 1 doc follow-up assigned, evidence archived for future drafts.',
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
        stage: '01 · Capture',
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
        name: 'Structure & tagging assist',
        stage: '02 · Structure & review',
        description: 'Use when KB drafts are wall-of-text with no sections or tags, reviews bounce for structure instead of substance, and every author formats differently',
        overview: 'Structure & tagging assist shapes a raw draft into a reviewable article: sections per kbType template, suggested tags pulled from content, a readability pass, then routes it to the right technical reviewer. Core principle: reviewers should spend attention on whether the fix is right — not on reformatting. The AI structures; meaning stays with the author.',
        whenToUse: [
          'Draft has no symptom/cause/steps separation — hard to follow mid-incident',
          'Tagging is inconsistent, so search misses articles that exist',
          'Review cycles waste time on “can you restructure this?” feedback',
          'When NOT to use: postmortem with required legal/compliance wording — template may break format rules',
        ],
        corePattern: {
          before: '// Before: reviewer = editor + fact-checker\nreview(rawDraft) // “add steps section, add tags, what’s the symptom here?”\n// 3 rounds of formatting ping-pong before anyone checks the facts',
          after: '// After: structure arrives done, review checks substance\nconst shaped = applyTemplate(draft, kbType) // {symptom, cause, steps, verify}\nshaped.tags = suggestTags(shaped) // from entities in text\nreturn routeForReview(shaped, domainExpert)',
        },
        quickReference: {
          headers: ['Pass', 'Input', 'Output'],
          rows: [
            ['Template sections', 'Raw draft', 'kbType-shaped article'],
            ['Tags', 'Entities in text (CI, app, error)', '5–10 consistent tags'],
            ['Readability', 'Full text', 'flags long steps, jargon'],
            ['Reviewer route', 'Domain of content', 'named technical reviewer'],
          ],
        },
        how: 'Applies the kbType section template by classifying each paragraph into a target slot (extractive move, never rewrite), extracts candidate tags from recognized entities (services, error signatures, products) matched against existing tag vocabulary, flags unreadable steps (>N actions in one line, undefined acronyms), and suggests the reviewer whose past approvals cover this domain. Author confirms all changes.',
        commonMistakes: [
          'Rewriting sentences → meaning drifts in safety-critical runbooks. Fix: move text, do not rewrite it.',
          'Free-form new tags → vocabulary chaos returns. Fix: match existing tag set, propose additions separately.',
          'Routing reviews to whoever is free → wrong expertise approves wrong fixes. Fix: domain-matched reviewers.',
        ],
        example: 'Wall-of-text pool-exhaustion draft → structured {symptom: 504s at peak, cause: pool not recycled, steps: 4} + tags [db, checkout-api, timeout] → routed to the DB platform reviewer.',
      },
      {
        name: 'Context publisher',
        stage: '03 · Publish & target',
        description: 'Use when published articles live only in the portal nobody opens during an outage, while agents needed them inside the ticket',
        overview: 'Context publisher places an approved article where its audience actually works: the portal, the runbook slot of matching CIs, the in-ticket suggestion pool for future similar incidents. Core principle: publishing is placement, not a button — knowledge that surfaces after the incident is trivia.',
        whenToUse: [
          'Article approved but visible only via direct URL / portal search',
          'Runbooks exist for services but never appear when those services fail',
          'Teams argue the KB is useless because nothing shows up mid-ticket',
          'When NOT to use: sensitive internal analysis restricted by policy — placement must respect ACLs first',
        ],
        corePattern: {
          before: '// Before: one button, one place\npublish(kb) // → portal listing #47\n// during next checkout outage, agent never sees it exists',
          after: '// After: placed where work happens\nplace({\n  kb,\n  ciSlots: cisMatching(kb.tags),      // runbook slot on CI pages\n  suggestionPool: embedInto(kb),       // findable by Search relevance\n}) // humans confirm placements',
        },
        quickReference: {
          headers: ['Article type', 'Primary surface', 'Secondary'],
          rows: [
            ['Runbook', 'CI page slot + in-ticket pool', 'Portal'],
            ['Troubleshoot guide', 'In-ticket suggestion pool', 'Portal'],
            ['Postmortem', 'Portal + problem links', 'not in-ticket'],
            ['FAQ', 'Portal', '-'],
          ],
        },
        how: 'Maps kbType + tags to surfaces: matching CIs get the article in their runbook slot, embeddings feed the in-ticket suggestion index used by search relevance, and visibility follows ACLs. Placement changes are proposed as a package the human confirms, so sensitive material never leaks into broad surfaces.',
        commonMistakes: [
          'Publishing everything everywhere → in-ticket noise drowns real matches. Fix: type-based surface rules.',
          'Ignoring ACLs in placement → internal postmortems visible broadly. Fix: ACL check precedes placement.',
          'One-time setup → new CIs miss runbook slots. Fix: placements derive from tags, re-evaluated on CI changes.',
        ],
        example: '“Runbook: DB pool exhausted” → placed on CI-042 runbook slot + embedded into in-ticket suggestions → next 504 shows it at triage without anyone searching.',
      },
      {
        name: 'Search relevance',
        stage: '04 · Find & surface',
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
      {
        name: 'Usefulness tracker',
        stage: '05 · Use & feedback',
        description: 'Use when KB health is measured by page views and thumbs-up, while nobody knows whether articles actually resolve incidents',
        overview: 'Usefulness tracker correlates article usage with outcomes: when an incident linked to an article resolves successfully, the article earns a confirmed success; high views without successes mean findable-but-broken. Core principle: feedback is behavioral — resolution data tells the truth that star ratings flatter.',
        whenToUse: [
          'Quarterly KB review: which articles deserve investment?',
          'An article gets traffic but the same failures keep escalating past it',
          'Deciding where to spend documentation effort next quarter',
          'When NOT to use: brand-new article with <10 exposures — sample too small to judge',
        ],
        corePattern: {
          before: '// Before: popularity as proxy for quality\nrankArticlesBy(views) // SEO wins, usefulness invisible\n// broken runbook keeps collecting views and failed fixes',
          after: '// After: outcome-linked scoring\nconst stats = correlate(kb, resolvedIncidents)\n// {views: 40, confirmedSuccesses: 3, successRate: "low"}\nreturn flagForRework(stats.topProblem)',
        },
        quickReference: {
          headers: ['Pattern', 'Reading', 'Action'],
          rows: [
            ['High views + high success', 'Healthy workhorse', 'keep current'],
            ['High views + low success', 'Findable but broken', 'flag rework'],
            ['Low views + high success', 'Hidden gem', 'improve placement'],
            ['Low views + low success', 'Candidate retire', 'route to watchdog'],
          ],
        },
        how: 'Joins in-ticket suggestions and CI-slot placements with incident outcomes: an incident counts as article-assisted if the article was opened during its lifecycle and the incident did not escalate to problem within the window. Output per article: {views, assisted, successRate, trend}. Flags are proposals attached to articles; humans decide rework or retirement.',
        commonMistakes: [
          'Counting opens as success → views inflation returns. Fix: require positive incident outcome.',
          'Punishing niche articles with tiny samples. Fix: minimum-exposure threshold.',
          'Acting on flags automatically (auto-unpublish) → knowledge loss. Fix: propose, human retires.',
        ],
        example: 'KB-012: 40 views, only 3 assisted resolutions → flagged “findable but broken”; KB-031: 6 views, 5 successes → hidden gem, placement proposal sent.',
      },
      {
        name: 'Freshness watchdog',
        stage: '06 · Maintain & retire',
        description: 'Use when three-year-old runbooks still claim to be truth, the service they describe was redesigned twice, and wrong instructions burn the next on-call',
        overview: 'Freshness watchdog watches staleness signals — linked CI changed, product version moved, no confirmed success in months — and proposes update or retirement with evidence. Core principle: a wrong article is worse than no article; stale knowledge actively misleads at the worst moment.',
        whenToUse: [
          'CI referenced by an article was modified or replaced',
          'Article had zero confirmed successes for N months while its topic recurred',
          'Periodic KB hygiene sweep before audit or review',
          'When NOT to use: reference material that does not decay (architecture decision records) — age alone is not staleness',
        ],
        corePattern: {
          before: '// Before: staleness discovered by victims\nonCall.follows(runbookFrom2023) // steps reference deleted service\n// incident extended by 40 minutes of confusion',
          after: '// After: signals surface before harm\nwatchdog.watch({ kb, signals: [ciChanged, versionDrift, noSuccess] })\nonStale((kb, evidence) => proposeUpdateOrRetire(kb))',
        },
        quickReference: {
          headers: ['Signal', 'Verdict', 'Proposal'],
          rows: [
            ['Linked CI changed', 'Likely stale', 'propose update'],
            ['No success in 6 months', 'Suspect', 'verify against reality'],
            ['Topic retired from estate', 'Obsolete', 'propose archive'],
            ['Contradicts newer article', 'Conflict', 'merge proposal'],
          ],
        },
        how: 'Subscribes to change events on CIs and products referenced in each article’s tags and body entities; combines signal strength (how central was the changed component) with usefulness data from the tracker. Proposals come as evidence packages — what changed, what likely broke, suggested owner — routed to the last author or domain reviewer. Humans update or retire.',
        commonMistakes: [
          'Age-only triggers → good stable articles harassed. Fix: require change/success signals.',
          'Silent auto-archive → teams lose tribal knowledge. Fix: proposals with grace period.',
          'No ownership routing → flags rot next to the articles. Fix: route to last meaningful author.',
        ],
        example: 'CI-042 replaced by CI-077 → watchdog flags “Runbook: DB pool exhausted” referencing deleted CI → proposes update to new topology or archive, routed to former author with diff evidence.',
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
        stage: '01 · Detect signal',
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
        stage: '02 · Mine ideas',
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
      {
        name: 'Impact-effort ranker',
        stage: '03 · Prioritize',
        description: 'Use when the improvement backlog is ordered by whoever shouted last, tiny pet ideas outrank systemic fixes, and nobody can say why the top item is on top',
        overview: 'Impact-effort ranker orders the improvement backlog by expected impact × confidence ÷ effort, where impact comes from evidence attached to each idea — how often the pain recurred, how many people or tickets it touches. Core principle: a backlog is a bet portfolio; rank it by expected return, not by recency or volume of complaining.',
        whenToUse: [
          'Improvement backlog exceeds what the team can do this quarter',
          'Two ideas compete and the debate is opinion vs opinion',
          'Small easy wins crowd out systemic improvements quarter after quarter',
          'When NOT to use: compliance/security-mandated changes — they skip the queue by policy',
        ],
        corePattern: {
          before: '// Before: loudest voice sorts the board\nbacklog.sort((a, b) => b.insistence - a.insistence)\n// systemic fix starves behind 12 quick cosmetic wins',
          after: '// After: expected-return ranking\nconst ranked = backlog.map((i) => ({\n  id: i.id,\n  score: (evidence(i).recurrence * usersTouched(i) * i.confidence) / effortDays(i),\n})).sort((a, b) => b.score - a.score)\nreturn reviewTop(ranked.slice(0, 5))',
        },
        quickReference: {
          headers: ['Factor', 'Source', 'Weight'],
          rows: [
            ['Recurrence of pain', 'Linked incidents/trends', '×3'],
            ['People/tickets touched', 'Records', '×2'],
            ['Confidence in effect', 'Author + history', '×1'],
            ['Effort', 'Estimate S/M/L/XL', '÷ divisor'],
          ],
        },
        how: 'Joins each improvement with its source evidence (mined suggestions carry incident links; trends carry cluster size), computes expected-return score with all factors shown inline, and presents the ranked top slice for human confirmation. Scores are transparent arithmetic — every factor is inspectable so the order can be argued and overridden.',
        commonMistakes: [
          'Opaque scoring → team distrusts and ignores the order. Fix: show factors next to every score.',
          'Impact without recurrence evidence → popularity contest returns. Fix: require linked signals.',
          'Ranking as auto-reordering → planners bypassed. Fix: propose order, humans commit to it.',
        ],
        example: '“DB pool alert” (S, 9 recurrences, 40 users) outscores “restyle status page” (S, 0 links) → ranked #1 for the sprint with its arithmetic shown.',
      },
      {
        name: 'Progress tracker',
        stage: '04 · Implement & track',
        description: 'Use when improvement items enter the board full of energy and die there silently — proposed forever, in_progress with no commits, done meaning nothing happened',
        overview: 'Progress tracker watches each improvement for actual motion across proposed → in_progress → done and surfaces stalled work with age-and-owner evidence before it fossilizes. Core principle: an improvement board works only if stale entries are embarrassing — visibility with gentle pressure is the whole mechanism.',
        whenToUse: [
          'Items sit proposed/in_progress past their due dates with no updates',
          'Weekly sync spends its time asking “what happened to that one?”',
          'Board shows 40% done but nothing measurably changed',
          'When NOT to use: item is actively moving with fresh updates — no signal needed',
        ],
        corePattern: {
          before: '// Before: silent rot\nimprovements.filter(i => i.status === "proposed") // 23 items, oldest: 14 months\n// nobody remembers why any of them mattered',
          after: '// After: stall detection with context\nwatchProgress(improvements, {staleAfterDays: 21})\nonStall((item) => flagWith({ageDays, owner, lastEvent})) // unblock or close honestly',
        },
        quickReference: {
          headers: ['Signal', 'Flag', 'Proposal'],
          rows: [
            ['No update >21d', 'Stalled', 'unblock or descope'],
            ['Due date passed', 'Overdue', 're-commit or drop'],
            ['In_progress >2× estimate', 'Bleeding', 'split or re-estimate'],
            ['Done but unverified', 'Pretend-done', 'route to verifier'],
          ],
        },
        how: 'Tracks state transitions and event freshness per item; when staleness thresholds trip, attaches the evidence package (age, owner, last event, original rationale link from mining) and proposes one of three honest exits: unblock, re-commit with new date, or close as won’t-do. Humans choose — the tracker only makes drift visible.',
        commonMistakes: [
          'Nagging daily → flags muted like approval spam. Fix: one well-evidenced flag per threshold.',
          'Closing stalled items silently → ideas vanish without learning. Fix: closure requires a reason.',
          'Tracking activity instead of progress (“updated docs” ≠ moved metric). Fix: events tied to stages.',
        ],
        example: '“Add DB pool alert” stuck in_progress 34 days → flagged with owner + last event → team splits alerting from dashboard work, first half ships next sprint.',
      },
      {
        name: 'Outcome verifier',
        stage: '05 · Verify outcome',
        description: 'Use when improvements get marked done the moment the task closes, while nobody checks whether the metric they promised actually moved',
        overview: 'Outcome verifier compares the target metric after implementation against the pre-improvement baseline and issues a verdict: verified, partial, or no effect. Core principle: task completion is not improvement — the metric is the only judge, and it votes after, not before.',
        whenToUse: [
          'Implementation marked done with a stated target (“cut MTTR”, “fewer misrouted requests”)',
          'Quarterly review: which shipped improvements actually paid off?',
          'Deciding whether to double down, adjust, or abandon an approach',
          'When NOT to use: improvement has no measurable target defined — send back to planning with a metric requirement',
        ],
        corePattern: {
          before: '// Before: done means done\nimp.close() // “alert added” ✓\n// MTTR unchanged; nobody noticed because nobody looked',
          after: '// After: metric decides\nconst v = verify({\n  metric: imp.target,           // e.g. MTTR for APP-004\n  baseline: windowBefore(imp.doneDate, 30),\n  after: windowAfter(imp.doneDate, 30),\n}) // {verdict: "verified", delta: "-22%"}\nreturn attachEvidence(v)',
        },
        quickReference: {
          headers: ['Metric delta vs baseline', 'Verdict', 'Next'],
          rows: [
            ['Improved ≥20%', 'Verified', 'propose embed + close'],
            ['Improved <20%', 'Partial', 'iterate or accept'],
            ['Flat / worse', 'No effect', 'reopen investigation'],
            ['No target metric', 'Unverifiable', 'return to planning'],
          ],
        },
        how: 'Resolves each improvement’s target to a measurable series (incident metrics, request volumes, KB success rates), builds a pre/post window around completion, and reports the delta with sample sizes so noise is visible. Verdicts attach to the record permanently — feeding practice embedder on success and progress tracker on failure. Humans decide iteration vs acceptance.',
        commonMistakes: [
          'Short windows read noise as victory. Fix: symmetric 30-day windows minimum.',
          'Ignoring confounders (another fix landed same week). Fix: note overlapping changes in evidence.',
          'Verifying only successes → survivorship bias in the board. Fix: verdict required for every done.',
        ],
        example: '“DB pool alert” done → MTTR for checkout incidents: 42 min → 33 min over matched 30-day windows = −21% → verified, forwarded for embedding into runbooks.',
      },
      {
        name: 'Practice embedder',
        stage: '06 · Embed & close',
        description: 'Use when verified improvements stay personal wins — the person who fixed it leaves, and six months later the same problem needs the same heroics again',
        overview: 'Practice embedder converts a verified improvement into the default way of working: runbook steps, checklists, policy lines, catalog defaults — then closes with adoption evidence. Core principle: improvement is not finished when it works once; it is finished when working that way is unavoidable.',
        whenToUse: [
          'Improvement verified by outcome data and ready to become standard',
          'A fix lives in one engineer’s muscle memory or private notes',
          'Similar work keeps being done differently per shift or per person',
          'When NOT to use: outcome unverified — embed facts only after the verifier says they hold',
        ],
        corePattern: {
          before: '// Before: heroics are the process\nimp.close() // alert lives in Dina’s head\n// Dina leaves → next pool exhaustion repeats the discovery, full price',
          after: '// After: standardize, then rest\nembed({\n  runbookUpdates: [steps §4],\n  checklistAdds: ["check pool saturation"],\n}) // adoption confirmed → close with evidence',
        },
        quickReference: {
          headers: ['Target', 'Artifact', 'Adoption proof'],
          rows: [
            ['Incident response', 'Runbook section', 'used in next N incidents'],
            ['Request handling', 'Catalog default/checklist', 'fulfillers follow it'],
            ['Recurring risk', 'Policy/checklist line', 'audit passes'],
          ],
        },
        how: 'Proposes concrete artifact edits — which runbook section, which checklist line, which policy paragraph — derived from the implemented change and its verified evidence. After edits land, tracks early adoption (artifacts referenced in real work) and only then proposes closure. Humans write and approve artifacts; the embedder keeps them from evaporating.',
        commonMistakes: [
          'Embedding by memo (“team please start doing X”) → memory-hole. Fix: edit the actual artifact.',
          'Closing at embed proposal, before adoption evidence. Fix: close requires usage signal.',
          'Embedding unverified improvements → standardizing a mistake. Fix: gate on verifier verdict.',
        ],
        example: 'Verified pool alerting → embedder drafts runbook §4 “check pool saturation first” + triage checklist line → used in next 3 checkout incidents → closed as adopted.',
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
