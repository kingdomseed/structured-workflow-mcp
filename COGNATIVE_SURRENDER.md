Forwarded this email? Subscribe here for more

We've Always Outsourced Our Thinking. Is AI Different?
======================================================

### Cognitive offloading, cognitive surrender, and what the difference means for design

Dr Maria Panagiotidi

Jun 3

 

READ IN APP

 

Generated with ChatGPT (Oh, the irony)

Picture it¹: London, 2026. You spot a new trendy bakery on social media and decide you want to try it. You look up the address, type it into your GPS, and follow the route. You never memorise the address. On your way there you never think about which roads to take. You arrive without any of that information passing through your brain in a meaningful way — and that's completely fine. Instead, you focus on the latest episode of your favourite podcast.

That is cognitive offloading: redistributing mental effort to an external tool so your brain can focus elsewhere. It’s been part of human cognition for as long as we’ve had tools. Writing things down is cognitive offloading. A shopping list is cognitive offloading. Psychologists have studied it extensively and the verdict is clear: it frees up mental resources, reduces error, and is generally a smart way to navigate a complex world (Risko & Gilbert, 2016). Sure, there have been concerns that over-relying on external tools can erode underlying skills (e.g., the worry that GPS is slowly killing our sense of direction isn’t entirely unfounded). Broadly speaking though, offloading is considered a sensible adaptation rather than a cognitive threat.

The key thing about cognitive offloading is that you remain in charge. You decided to go to the restaurant. You chose which address to enter. You’re still the one making judgements, while the tool just handles the execution.

So what’s different about AI?
-----------------------------

You’ve probably heard the argument that AI is just the latest cognitive offloading tool. Based on a new paper by Shaw and Nave (2025), that framing may be missing something important.

Their argument is that AI doesn’t just handle execution, it generates the judgement itself. Ask your GPS to navigate and it follows your instruction. Ask an AI whether you should take the job, how to respond to that difficult email, or what the diagnosis might be, and it hands you a complete, fluent, confident answer. The thinking has already been done on your behalf. All that’s left is whether you accept it or challenge it.

Shaw and Nave call this cognitive surrender: adopting an AI’s output with minimal critical evaluation, effectively substituting it for your own reasoning. Unlike cognitive offloading — where you delegate a task while staying in the driver’s seat — cognitive surrender is a transfer of the wheel itself. You’re no longer steering; you’re just along for the ride.

To capture this formally, they propose the Tri-System Theory, which extends the classic dual-process framework (System 1: fast and intuitive; System 2: slow and deliberative) by adding a third system:

-   System 1: fast, automatic, gut-feel responses
    
-   System 2: slow, deliberate, effortful reasoning
    
-   System 3: external, AI-generated cognition that operates outside the brain entirely
    

The critical point is that System 3 doesn’t just support Systems 1 and 2 but can bypass them. When that happens, the decision that gets made may reflect the AI’s reasoning rather than yours. You might not even notice the difference.

What the experiments showed
---------------------------

Shaw and Nave tested this across three preregistered studies² (N = 1,372; 9,593 trials). Participants solved problems from an adapted Cognitive Reflection Test (CRT), a set of reasoning questions designed so that the first, intuitive answer is wrong, and getting it right requires pausing to think more carefully. It’s a well-validated tool for studying exactly the tension between fast and slow thinking. An example from the CRT is the classic:


”A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?”

The gut answer is 10 cents, while the correct answer is 5 cents.

Some participants worked alone. Others had access to an embedded AI assistant (ChatGPT; GPT‑4o). Unbeknownst to the participants, the AI was secretly set up to give the correct answer on some trials and a confidently worded but wrong answer on others. Participants could consult the AI or not, and follow or ignore its responses freely.

Here are some of their most interesting findings:

-   Participants consulted the AI on more than half of all trials
    
-   When they did consult it, they followed its advice 93% of the time when it was correct and 80% of the time when it was wrong
    
-   Compared to working alone, having accurate AI raised performance by ~25 percentage points; having faulty AI dropped it by ~15 points
    
-   Access to AI increased confidence by ~12 points regardless of whether the AI was actually right
    

That last finding is the most alarming one. Participants felt more confident in their answers when they’d used the AI, even when approximately half of those AI outputs were wrong, and even without any decline in confidence as errors accumulated. They didn’t know the AI was unreliable, but the point is they didn’t seem to be checking.

The effect size for the gap between accurate and faulty AI trials was large (trial-weighted Cohen’s h = 0.82 — on a scale where 0.2 is small, 0.5 is medium, and 0.8 is large). Accuracy didn’t reflect the participants’ reasoning. It reflected the AI’s quality.

Who surrenders most and least
-----------------------------

Not everyone surrendered equally. Across studies, three individual differences consistently predicted susceptibility:

-   Higher trust in AI → more surrender. These participants consulted the AI more often, followed its wrong answers more frequently, and showed a larger accuracy gap between accurate and faulty trials.
    
-   Higher Need for Cognition (the stable tendency to enjoy and engage in effortful thinking; Cacioppo & Petty, 1982) → more resistance. These participants were more likely to override a wrong answer.
    
-   Higher fluid intelligence → similar resistance, with more override behaviour when the AI was wrong.
    

The uncomfortable implication of this is that the users most likely to surrender to a faulty AI — those who trust it readily and prefer not to engage in analytical thinking — are probably not unusual or outlier users. They’re likely representative of a large proportion of people using consumer-facing AI products today.

Can we reduce cognitive surrender?
----------------------------------

Two follow-up studies tested whether situational factors could reduce cognitive surrender.

Time pressure made things worse. Under a 30-second deadline per question, overall accuracy dropped, and among participants who used the AI regularly, performance became even more tightly coupled to AI quality. When the AI was correct, they outperformed everyone else. When it was wrong, they performed worst of all. Time pressure didn’t make people more independent; instead, it made them more reliant.

This reminds me of autonomous vehicle research. Getting humans to re-engage quickly and effectively when an automated system needs them to intervene is one of the hardest unsolved problems in that field — and automation complacency, the tendency to stop monitoring a system because it's usually right, has been documented across industries for decades (Parasuraman & Manzey, 2010). A similar dynamic seems to be at play here: the more we defer, the less ready we are to take back the wheel when it matters.

Incentives and feedback helped — partially: When participants received a small financial reward for each correct answer and immediate feedback after each response, override rates on faulty AI trials more than doubled (from ~20% to ~42%). The cognitive surrender effect shrank but didn’t disappear with the accuracy gap between accurate and faulty AI remained around 44 percentage points (versus ~50 without incentives).

So motivated reasoning with real-time error signals can reactivate critical evaluation, but in the absence of explicit incentives and feedback, the default is acceptance.

What this means for design
--------------------------

The paper frames cognitive surrender as a design and education challenge rather than a reason to panic.

-   Confidence inflation is a design problem. AI interfaces that present outputs with fluency and authority actively encourage surrender. Even small interventions that signal the AI’s limitations or prompt a moment of verification can partially reactivate deliberative thinking (e.g., uncertainty markers).
    
-   Engagement metrics can mislead. High AI feature usage can look like success in your analytics while masking uncritical adoption. What matters is calibrated engagement — using the AI when it helps and questioning it when something seems off — not maximised engagement. Override behaviour is worth measuring, not just follow rates.
    
-   Your most typical user may be the most vulnerable. The protective factors here (i.e., strong analytic tendency, high cognitive reflection) aren’t evenly distributed. Designing as though all users will independently verify AI outputs isn’t a safe assumption.
    

What the research doesn’t resolve
---------------------------------

A few limitations are worth flagging. The studies were conducted in controlled lab settings using a specific reasoning task, which is excellent for studying the tension between intuitive and deliberative thinking, but doesn’t capture the full range of real-world decisions people make with AI. Whether the same surrender dynamics apply to messier, more ambiguous, or emotionally loaded situations remains an open question.

The studies also offer a single-session snapshot. In real-world use, people interact with AI repeatedly over time, building or eroding trust as they go. Whether cognitive surrender deepens or attenuates with experience and whether people learn to detect unreliable AI outputs over time isn’t yet clear.

The bigger picture
------------------

I could end this by ringing alarm bells but I choose a different approach. This isn’t necessarily a doom and gloom story — it’s an exciting one. We are only beginning to understand what happens when human cognition and AI start working together, and frameworks like Tri-System Theory give us the vocabulary to ask better questions.

How does repeated AI use change the way we think over time? When does collaboration become dependency? How do we design for the full range of human-AI interactions — not just the ideal user, but the one who trusts the AI unconditionally?

There’s a lot of research still to be done. And for designers, researchers, and anyone building with AI, that’s an opportunity to innovate and be creative.