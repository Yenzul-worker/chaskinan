ChaskiÑan — Product Scope v1
Status: Draft for review Owner: Jennifer Calvo Last updated: 2026-08-04

1. Product summary
One-liner: ChaskiÑan connects trail and road runners with their coaches, replacing PDF training plans and daily WhatsApp reports with a single shared plan that both sides can see and update.
Problem. Today a coach designs a monthly plan, exports it to PDF, and sends it over WhatsApp. Runners report every session back through the same channel. The result is that the plan and the execution live in two different places: the coach has no consolidated view of adherence, and the runner has no reliable source of truth when the plan changes mid-week.
Value hypothesis. If the plan and the completion record live in the same product, a coach can support the same number of runners with materially less messaging overhead, and a runner always knows what today's session is without asking.
Target for v1. A working demo that shows one coach, three runners, one assigned plan, and a week of completion data — end to end.
2. Personas
2.1 Yenzul — the runner (primary)
Context: trains 6–7 days a week, targets 2–3 goal races a year. Trains outdoors and on different terrains like track, rolling road, treadmill, flat road.
Today: Receives a monthly PDF, screenshots the current week, reports each session to her coach on WhatsApp with split times.
Pains: Plan changes arrive as chat messages and get lost. She cannot tell how many kilometres she has run this month without adding it up manually.
Goals: Know today's session without opening a PDF; log completion in under 30 seconds; see whether he is actually progressing.

2.2 Jorge Berrios — the coach (primary)
Context: Coaches 5–50 runners across road and trail, from 5 km to 100 miles. Runs his coaching as a business. Also he has other type of job
Today: Builds plans in a spreadsheet, exports monthly PDFs, and answers a continuous stream of WhatsApp reports. Adherence tracking lives in his head.
Goals: Reuse plan structures across similar athletes instead of rebuilding each one; see at a glance who is falling behind.
Pains: Volume of messages scales linearly with roster size. He discovers a runner has skipped three key sessions only when they get injured.
Success looks like: He opens one screen and immediately sees which runners need attention this week.
3. User stories — v1
Ten stories, ordered by build sequence. Each is independently demonstrable.
Legend: Priority M = Must, S = Should. Estimate in story points (Fibonacci).

US-01 — Sign up and log in with a role
As a coach or runner I want to create an account and log in under my role So that I only see the features that apply to how I use the product.
Priority: M · Estimate: 5 · Depends on: —
Acceptance criteria
Given I am on the sign-up screen, when I submit name, email, password and a role of coach or runner, then an account is created and I am logged in.
Given an email already registered, when I try to sign up with it, then I see "This email is already registered" and no duplicate account is created.
Given a password shorter than 8 characters, when I submit, then I see a validation error before any request is sent.
Given I log in as a coach, then I land on the coach dashboard and coach-only routes are reachable.
Given I log in as a runner, then I land on my week view and coach-only routes return 403 — enforced server-side, not only by hiding UI.
Given invalid credentials, then I see one generic message ("Email or password is incorrect") that does not reveal whether the email exists.
Given a valid session, then it persists across app restarts and expires after 30 days.
Out of scope: social login, password reset (add as a fast follow), email verification, 2FA

US-02 — Coach generates an invitation code
As a coach I want to generate an invitation code for my team So that runners can connect to me without me entering their details manually.
Priority: M · Estimate: 3 · Depends on: US-01
Acceptance criteria
Given I am a logged-in coach, when I open my team page, then I see my active invitation code and a button to copy it.
Given I have an active code, when I regenerate it, then the previous code stops working immediately.
The code is at least 8 characters, non-sequential, and case-sensitive on entry.
Codes expire after 30 days; an expired code is rejected with a distinct message.

US-03 — Runner joins a coach with an invitation code
As a runner I want to join my coach using the code they gave me So that I receive the plans he assigns to me.
Priority: M · Estimate: 3 · Depends on: US-02
Acceptance criteria
Given I am a registered runner with no coach, when I enter a valid, unexpired code, then I am linked to that coach and appear in their roster.
Given an invalid or expired code, then I see "That code is not valid" and remain unlinked.
Given I already belong to a coach, when I enter a different valid code, then I am asked to confirm the change before the previous link is replaced.
After joining, the coach's name is visible in my profile.
v1 constraint: a runner belongs to at most one coach. The schema should not make many-to-many impossible later.
US-04 — Runner sets a season goal
As a runner I want to record my goal race or my general objective So that my coach can build a plan around the right target.
Priority: M · Estimate: 3 · Depends on: US-01
Acceptance criteria
Given I have a goal race, when I open the goal form, then I can enter date, distance, surface (road / trail), and — for trail — D+ and D− in meters.
Given I have no goal race, when I select "General fitness", then no race fields are required and the goal is stored as general.
Given a race date in the past, when I submit, then I see a validation error.
Given a saved goal, then my coach sees it on my profile and in the roster list.
I can edit or replace my goal at any time; only one goal is active at a time in v1.

US-05 — Coach builds a plan template
As a coach I want to build a reusable plan of weeks and daily sessions So that I do not rebuild the same structure for every runner with the same target.
Priority: M · Estimate: 13 · Depends on: US-01
Acceptance criteria
Given I am a coach, when I create a template, then I name it and set a target category (5k, 10k, half, marathon, ultra_50_60, ultra_70_80, ultra_90_100, ultra_100mi) and a duration in weeks.
Given an open template, when I add a session to a day, then I can set type like ( easy, long_run, tempo, intervals, vo2max, hills, strength, recovery, race, rest), distance or duration, target pace or effort zone, recovery, and a purpose note.
A day accepts 0, 1 or 2 sessions (AM/PM). A day with no session renders as rest.
Given a built week, when I duplicate it, then all its sessions are copied to the target week.
Given an incomplete session (no type), when I save, then I see which field is missing.
Templates are private to the coach who created them.
This is the largest story in v1 and the most likely to overrun. If it does, split it: (a) create template shell + week scaffold, (b) daily session editor, (c) week duplication. Ship (a) and (b); (c) is a convenience.

US-06 — Coach assigns a plan to a runner
As a coach I want to assign a plan to a runner with a start date So that they see the right sessions on the right dates.
Priority: M · Estimate: 5 · Depends on: US-03, US-04, US-05
Acceptance criteria
Given a runner in my roster, when I open their profile, then I see their goal and a list of my templates.
Given I select a template and a start date, when I assign it, then the plan is copied to the runner and mapped to calendar dates.
Given the runner has no goal, then the 5 km category is suggested as the default — but I can override it.
Given an assigned plan, when I edit a session in the original template, then the runner's assigned plan is unchanged.
Given a runner who already has an active plan, when I assign a new one, then I confirm before the previous plan is archived.

US-07 — Runner views the training week ⭐ demo opener
As a runner I want to see my week as a calendar So that I can organise travel and equipment and execute each session correctly.
Priority: M · Estimate: 8 · Depends on: US-06
Acceptance criteria
Given an assigned plan, when I open the app, then I see the current week with all seven days.
Each day shows: session type, distance or duration, target pace or effort, recovery, and the coach's purpose note.
Today is visually distinguished from other days.
Given a rest day, then it is shown explicitly as rest, not as an empty cell.
I can navigate to the previous and next week.
Given no assigned plan, then I see an empty state explaining that my coach has not assigned a plan yet.
The week view is legible on a 375 px-wide screen.

US-08 — Runner marks a session as completed
As a runner I want to mark whether I completed a session and note any changes I made So that my coach knows what I actually did, not only what was prescribed.
Priority: M · Estimate: 5 · Depends on: US-07
Acceptance criteria
Given a session on today or a past date, when I open it, then I can set status to completed, partial, or missed.
Given status partial or missed, then a note field is required (one line, max 280 characters) describing the deviation.
Given status completed, then the note is optional.
Each status renders with a distinct visual treatment in the week view; a past session with no status shows as pending.
Given a future session, then I cannot set a status.
I can change a status after setting it; the last update timestamp is stored.
Deferred to Phase 2: splits, HR, cadence, ascent, RPE, shoes (see US-12).

US-09 — Runner views progress summary
As a runner I want a summary of my volume and adherence So that I can see whether I am actually progressing.
Priority: S · Estimate: 5 · Depends on: US-08
Acceptance criteria
The summary shows, for the current week and the plan to date: total prescribed km, total completed km, sessions completed vs. prescribed, and adherence as a percentage.
Adherence = completed ÷ (completed + partial + missed + past-pending), counting only sessions whose date has passed. partial counts as 0.5. This formula is displayed on hover or in a help note.
Given no completed sessions, then totals show 0 and adherence shows "—", not NaN or 0%.
Rest days are excluded from all denominators.

US-10 — Coach monitors the roster
As a coach I want to see all my runners with their goals and adherence, and drill into one So that I can spot who needs attention before they get injured.
Priority: M · Estimate: 8 · Depends on: US-08
Acceptance criteria
Given I am a coach, when I open my dashboard, then I see a list of my runners with name, goal (or "General fitness"), goal date, and adherence for the last 7 days.
The list is sortable by adherence ascending, so the runners needing attention surface first.
The list paginates or virtualises beyond 20 runners.
Given I select a runner, then I see their assigned plan in week view with each session's status and deviation note.
The drill-down breaks completion down by session type, so I can see whether key sessions (vo2max, long_run, tempo) are being missed specifically.
Given a runner with no assigned plan, then the row shows "No plan assigned" instead of 0% adherence.
4. Phase 2 — planned, not in v1
Kept as intent, not specification. These are refined when v1 ships.
US-11 — Coach notifications on runner updates. The system functions without it; it is a retention feature, not a core loop feature.
US-12 — Structured session logging. Per-session entry with RPE, AM/PM, totals (distance, time, avg pace, HR avg/max, cadence avg/max, ascent) and a splits table. Blocked on v1 proving that runners log at all.
US-13 — Coach adjusts a plan mid-cycle. Coach edits upcoming sessions based on observed adherence. The original document proposed AI-generated session suggestions here — treat that as a separate research spike, not part of US-13. The manual edit path must work first and stand alone.
US-14 — Race-day plan from a GPX file. Elevation-aware pacing strategy. Requires GPX parsing and an elevation-adjusted pace model.

5. Non-goals for v1
Garmin / Strava sync: Garmin approval takes weeks; Strava's API terms restrict this use case. Both are external dependencies with no controllable timeline.
Payments and billing: An entire subsystem — methods (card, Yape), plan approval, invoicing, refunds. Weeks of work that proves nothing about the core loop.
Video hosting: A URL field on a session is in scope; uploading, transcoding and storing video is not.
Coach marketplace / discovery: Depends on payments. Coaches bring their own runners in v1 via invitation codes.
Multi-coach runners, assistant coaches, teams: Data model should permit it; v1 does not build it.



6. Demo opening
US-07. This is the opening beat: the week calendar, everything for the week visible at once, no PDF.