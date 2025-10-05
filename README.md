# DeltaLearn
## 🧩 Problem Statement

Professionals moving across **countries**, **industries**, or **regulatory systems** often face steep learning curves — not because they lack expertise, but because their existing mental models aren’t leveraged.  

Traditional corporate learning assumes a “blank slate.” In reality, most learners already understand **80–85%** of underlying concepts — what’s missing is context and mapping.  

📊 **Key Metrics Highlighting the Problem**
- **49%** of employees are willing to relocate internationally for work, yet **only 29%** feel confident adapting to new local systems. *(Ipsos, 2024)*  
- **74%** of firms cite **cross-border compliance adaptation** as a top challenge. *(eFlow Global, 2024)*  
- **70%** of digital transformation projects fail due to poor contextual learning and lack of knowledge transfer. *(McKinsey, 2023)*  
- Learners retain **up to 9x more information** when new content is linked to what they already know. *(National Training Labs, 2023)*  

👉 The real gap isn’t *knowledge*, it’s *contextual alignment*.  
**DeltaLearn** bridges that gap by **teaching using the delta** — connecting what professionals already know to what they need to learn, making new systems intuitive and relatable.

---

## 👤 User Story

> **As a** professional moving to a new geography, industry, or compliance regime,  
> **I want** a learning system that understands what I already know and uses that to teach me new concepts,  
> **so that** I can adapt faster, retain knowledge better, and apply my expertise confidently in the new context.

### Example:
> **Priya**, a payments product manager from India, moves to the U.S.  
> She already understands real-time payment rails (UPI, IMPS) and regulatory structures (RBI, NPCI).  
> **DeltaLearn** generates a personalized course that maps her prior knowledge to the U.S. ecosystem (FedNow, ACH, NACHA, CFPB), highlighting analogies and differences.  
> She learns not by starting over — but by **understanding through comparison**.

---

## ⚙️ Key Features

| Feature | Description |
|----------|--------------|
| **Knowledge Mapping** | Finds out the user's background and aligns it with the target domain. |
| **Delta-Based Learning** | Uses *differences* as the teaching scaffold — focusing on contrast and analogy to deepen understanding. |
| **Adaptive Content Generation** | AI-generated modules and slides tailored to the learner’s background. |
| **Cross-Domain Ontology** | Works across verticals — payments, healthcare, accounting, law, tech, etc. |
| **Dynamic Assessment** | Evaluates understanding through contextual scenarios, not rote recall. |
| **Continuous Updates** | Adapts courses automatically when regulations, standards, or systems evolve. |
| **Seamless Integration (Future scope)** | Exports to LMS (SCORM/xAPI), internal wikis, or corporate learning dashboards. |

## Architecture
<img width="3127" height="2034" alt="delta-learn" src="https://github.com/user-attachments/assets/db2ae253-ae49-489b-9799-a604cfebaf40" />

## 🚀 How to Run

### 1️⃣ Install Python dependencies
```bash
pip install -r requirements.txt
```

###  2️⃣ Set environment variables
```bash
export GOOGLE_API_KEY="your-google-api-key"
export OPENAI_API_KEY="your-openai-api-key"
```

### 3️⃣ Run liteLLM
```bash
 litellm --config config.yaml
```

### 4️⃣ Setup UI
```bash
npm i
```

```
npm run dev
```





