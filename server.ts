import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    console.log("Contact form submission received:", { name, email, subject, message });

    const apiKey = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (apiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "RN Studio Lead <onboarding@resend.dev>",
          to: ["raymondndungu8@gmail.com"],
          subject: `🚀 New Project Lead: ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; border: 1px solid #222; border-radius: 24px; background-color: #0c0c0c; color: #d7e2ea; box-shadow: 0 20px 50px rgba(0,0,0,0.85);">
              
              <!-- Lead Header -->
              <div style="border-bottom: 1px solid rgba(215, 226, 234, 0.1); padding-bottom: 25px; margin-bottom: 30px;">
                <span style="font-size: 10px; font-weight: 800; color: #C5A059; text-transform: uppercase; letter-spacing: 3px; display: block; margin-bottom: 6px;">New Collaboration</span>
                <h1 style="font-size: 28px; font-weight: 900; color: #ffffff; margin: 0; text-transform: uppercase; letter-spacing: -0.5px; line-height: 1.1;">Start a Project</h1>
                <p style="font-size: 13px; color: rgba(215, 226, 234, 0.5); margin: 8px 0 0 0;">An inquiry was submitted through your professional portfolio storefront.</p>
              </div>

              <!-- Metadata Block -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(215, 226, 234, 0.08); border-left: 4px solid #C5A059; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid rgba(215, 226, 234, 0.04);">
                    <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(215, 226, 234, 0.4); width: 30%;">Client Name:</td>
                    <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #ffffff;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(215, 226, 234, 0.04);">
                    <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(215, 226, 234, 0.4);">Email:</td>
                    <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #C5A059;"><a href="mailto:${email}" style="color: #C5A059; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(215, 226, 234, 0.4);">Date:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: rgba(215, 226, 234, 0.82);">${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC</td>
                  </tr>
                </table>
              </div>

              <!-- Message Block -->
              <div>
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(215, 226, 234, 0.4); display: block; margin-bottom: 8px;">Project Brief & Description</span>
                <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(215, 226, 234, 0.05); padding: 24px; border-radius: 16px; font-size: 14.5px; line-height: 1.6; color: #ffffff; white-space: pre-wrap; margin: 0;">${message}</div>
              </div>

              <!-- Footer signature badge -->
              <div style="margin-top: 40px; border-top: 1px solid rgba(215, 226, 234, 0.08); padding-top: 25px; text-align: center;">
                <span style="font-size: 12px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">RN STUDIO</span>
                <p style="font-size: 10px; color: rgba(215, 226, 234, 0.3); margin: 5px 0 0 0;">INTELLIGENCE • DESIGN • ARCHITECTURE</p>
              </div>

            </div>
          `
        });
        console.log("Email dispatched successfully to raymondndungu8@gmail.com via Resend.");
        emailSent = true;
      } catch (err) {
        console.error("Resend delivery failed:", err);
      }
    } else {
      console.warn("RESEND_API_KEY environment variable is absent. Running offline simulator.");
    }

    res.json({ 
      success: true, 
      message: emailSent 
        ? "Your project notification was dispatched to Raymond." 
        : "Message logged successfully (Running in simulation mode, please configure RESEND_API_KEY for direct email delivery)." 
    });
  });

  // Client project document intake & AI generation endpoint
  app.post("/api/project/generate-agreements", async (req, res) => {
    const { name, email, address, projectTitle, projectCategory, projectDescription, budget } = req.body;

    if (!name || !email || !projectTitle || !projectDescription) {
      return res.status(400).json({ error: "Missing required fields. Please provide name, email, title, and description." });
    }

    const cleanedBudget = typeof budget === "number" ? budget : parseInt(budget) || 1500;
    const clientAddress = address || email;

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY environment variable is missing. Activating high-fidelity fallback generator.");
        return res.json(getFallbackAgreements(name, email, clientAddress, projectTitle, projectCategory, projectDescription, cleanedBudget));
      }

      // Lazy import the Google GenAI SDK to save cold start dependencies and avoid crashes if key is omitted
      const { GoogleGenAI, Type } = await import("@google/genai");
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are a prestigious Legal and Commercial Consultant drafting a full onboarding portfolio for:
- Developer: Raymond Ndungu (RN Studio, raymondndungu8@gmail.com, +254 745 091919)
- Client: ${name} (${email}, Address: ${clientAddress})
- Project: "${projectTitle}" (Category: ${projectCategory})
- Budget: ${cleanedBudget > 15000 ? 'KES ' + cleanedBudget.toLocaleString() : '$' + cleanedBudget.toLocaleString() + ' USD'}
- Description: ${projectDescription}

Please output exactly 5 highly polished, legally-sound Markdown documents structured exactly matching the user's templates. You MUST preserve the core wording, headers, clauses, and signer lines requested by the user, but replace the bracketed placeholders with the client's actual data:

1. "contractMarkdown" - RN STUDIO — MASTER SERVICES AGREEMENT
- Fill Client name with: ${name}
- Fill Client Address with: ${clientAddress}
- Fill Total Investment Amount with: ${cleanedBudget > 15000 ? 'KES ' + cleanedBudget.toLocaleString() : '$' + cleanedBudget.toLocaleString() + ' USD'}
- Milestone 01 payment amount (50%): ${cleanedBudget > 15000 ? 'KES ' + (cleanedBudget * 0.5).toLocaleString() : '$' + (cleanedBudget * 0.5).toLocaleString() + ' USD'}
- Milestone 02 payment amount (50%): ${cleanedBudget > 15000 ? 'KES ' + (cleanedBudget * 0.5).toLocaleString() : '$' + (cleanedBudget * 0.5).toLocaleString() + ' USD'}
- Include all clauses: Scope/Workflow, Compensation/Milestones matrix, Prompt safeguards (explicit copyright protection on pre-existing components including MASTER_UIUX_SKILL.md), Deliverables dependencies (7-day rule), Termination terms, and Authorization signature logs.

2. "invoiceMarkdown" - RN STUDIO — PROFESSIONAL INVOICE
- Generate Invoice No: #RN-2026-${Math.floor(100 + Math.random() * 900)}
- Fill Totals and 50% split Milestone breakdown according to budget.
- Cleanly list the configured Kenyan mobile payment and Standard Chartered Swift details:
  * M-PESA Send Money: +254 745 091919 (Raymond Ndungu)
  * Bank Transfer: Standard Chartered Bank Kenya | Account Number: 0102948194 | Swift/Sort Code: SCBLKENX / 02000
  * PayPal: raymondndungu8@gmail.com 

3. "handoverMarkdown" - RN STUDIO — FULFILLMENT & HANDOVER CERTIFICATE
- Invert sign-off details, staging link blanks, and activate the explicit 14-day technical warranty from launch.
- Cover limits on scope creep and client third-party modifications.

4. "accessMarkdown" - RN STUDIO — TECHNICAL ACCESS REQUEST FORM
- High urgency platform matrices (Domain registrar/web host, Payment gateway, Content repositories) ensuring secure configuration access.

5. "checklistMarkdown" - RN STUDIO — CLIENT ONBOARDING CHECKLIST
- Phase 1 pre-production checks (execute contract, Milestone 01 deposit, Access form).
- Phase 2 content collection.

Your response MUST be strict JSON matching this schema:
{
  "contractMarkdown": "Markdown string",
  "invoiceMarkdown": "Markdown string",
  "handoverMarkdown": "Markdown string",
  "accessMarkdown": "Markdown string",
  "checklistMarkdown": "Markdown string"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              contractMarkdown: { type: Type.STRING },
              invoiceMarkdown: { type: Type.STRING },
              handoverMarkdown: { type: Type.STRING },
              accessMarkdown: { type: Type.STRING },
              checklistMarkdown: { type: Type.STRING }
            },
            required: ["contractMarkdown", "invoiceMarkdown", "handoverMarkdown", "accessMarkdown", "checklistMarkdown"]
          }
        }
      });

      const jsonText = response.text || "{}";
      res.json(JSON.parse(jsonText));

    } catch (err: any) {
      console.error("Gemini API error. Deploying high-fidelity mock compiler.");
      res.json(getFallbackAgreements(name, email, clientAddress, projectTitle, projectCategory, projectDescription, cleanedBudget));
    }
  });

  // High-fidelity fallback builder matching client's specified layout
  function getFallbackAgreements(name: string, email: string, address: string, title: string, category: string, desc: string, budget: number) {
    const deposit = budget / 2;
    const isKes = budget > 15000;
    const budgetStr = isKes ? `KES ${budget.toLocaleString()}` : `$${budget.toLocaleString()} USD`;
    const depositStr = isKes ? `KES ${deposit.toLocaleString()}` : `$${deposit.toLocaleString()} USD`;
    
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const invoiceIdNum = Math.floor(100 + Math.random() * 900);

    return {
      contractMarkdown: `# RN STUDIO — MASTER SERVICES AGREEMENT
**DESIGN • CODE • INTELLIGENCE**  
*Developer Context: Raymond Ndungu | raymondndungu8@gmail.com | +254 745 091919*

---

This Professional Web Development & Creative Technology Agreement (the "Agreement") is entered into and made effective as of this **${new Date().getDate()}** day of **${new Date().toLocaleString('en-US', { month: 'long' })}**, 2026 (the "Effective Date"), by and between:

* **THE CLIENT:** **${name}** ("Client"), with its principal place of business or residence at **${address}**.
* **THE DEVELOPER:** Raymond Ndungu, operating under the brand identity **RN Studio** ("Developer"), based in Kenya (Contact: +254 745 091919, Email: raymondndungu8@gmail.com).

WHEREAS, Client desires to retain Developer to perform digital design and web development services, and Developer agrees to perform such services under the terms, milestones, and professional parameters set forth herein.

---

## 1. SCOPE OF WORK & PROFESSIONAL WORKFLOW
The Developer will engineer, design, and deliver a fully operational web application and digital presence tailored to the client's commercial objectives. The specific project scope encompasses all features, system designs, architectural milestones, and delivery timelines detailed explicitly in the accompanied Project Charter or Proposal.

**Engineering Standards:** The Developer employs an advanced, high-velocity multi-model AI-assisted engineering and design stack (including Claude Code, Cursor, Windsurf, and custom prompt engines) to write robust, maintainable single-file and component-driven production architectures. Performance optimization, asset-level compression, and GPU-accelerated responsive transitions are structurally integrated into the delivery pipeline.

---

## 2. COMPENSATION, MILESTONES & FINANCIAL TERMS
In full consideration for the standard of excellence and operational digital deliverables rendered by Developer, Client agrees to pay a fixed fee of **${budgetStr}**. Payment will follow a strict, phased, milestone-based structure as detailed in the matrix below:

| Milestone | Deliverables & Phase Breakdown | Payment Proportion |
| :--- | :--- | :--- |
| **Milestone 01** | **Project Kickoff & Onboarding.** Initial strategy approval, comprehensive asset collection, framework architecture layout, and UI/UX design scheme authorization. | **50% Upfront Deposit**<br>**${depositStr}** |
| **Milestone 02** | **Final Handover & Launch.** Complete structural engineering, staging deployment feedback loops, final verification testing, domains connection, and live server fulfillment. | **50% Final Balance**<br>**${depositStr}** Prior to Launch |

> ⚠️ **STRICT FINANCIAL CONDITION:** Work on the project will not commence under any circumstances until the Milestone 01 deposit has cleared into the Developer's designated accounts. Completed digital architecture files, repository ownership transfers, and live server deployments will only occur when the Milestone 02 final balance is paid in full.

---

## 3. INTELLECTUAL PROPERTY RIGHTS & OWNERSHIP
* **Ownership Transfer:** Upon final payment and clear receipt of all due contractual compensation by the Developer, all explicit ownership rights, copyrights, title, and digital intellectual interest in the customized code base, UI layout assets, custom scripts, graphics, and text created specifically for the Client shall transfer directly to the Client.
* **Developer Tooling & Prompt Frameworks:** Developer explicitly retains the unrestricted ownership and rights to reuse all underlying code snippets, starter architectures, master prompt infrastructures (including but not limited to MASTER_UIUX_SKILL.md frameworks), pre-existing animations, utilities, and components utilized during construction.

---

## 4. CLIENT DELIVERABLE RESPONSIBILITIES & DEPENDENCIES
The timely execution of this development schedule depends fundamentally on active client cooperation. Client must provide all requisite branding materials, text copy, high-resolution media assets, software access tokens, API credentials, and required third-party parameters within seven (7) business days of execution. Project delays resulting directly from client asset or credential stalling shall automatically extend the final delivery timelines proportionally.

---

## 5. TERM, TERMINATION & POST-LAUNCH PARAMETERS
Either party may terminate this Agreement at any point with seven (7) days written formal notification if the opposing party violates a material structural term or fails to fulfill their explicit obligations under this contract. If the Client terminates the project for convenience prior to completion, the Developer retains the full non-refundable Milestone 01 upfront deposit, and the Client shall instantly compensate the Developer for all billable engineering and design hours accrued beyond that deposit up to the official termination time at an industry standard rate.

---

## 6. CONFIDENTIALITY & NON-DISCLOSURE
Both parties explicitly pledge to treat all trade secrets, server access credentials, commercial strategies, sensitive internal metrics, or private financial details exposed through the duration of this engineering engagement as strictly confidential. No private structural data shall be sold or disclosed to outside entities without explicit prior written authorization.

---

## 7. CLIENT AUTHORIZATION & BINDING SIGNATURES
By affixing their professional signatures below, both parties confirm they have fully read, explicitly understood, and legally bound themselves to all rules, payment structures, and terms stated within this Agreement.

**For the Client:**  
Authorized Signature: _____________________________________  
Date: **${dateStr}**`,

      invoiceMarkdown: `# RN STUDIO — PROFESSIONAL INVOICE
**DESIGN • CODE • INTELLIGENCE**

---

### METADATA & CONTACTS
**FROM:** RN Studio (Raymond Ndungu)  
Nairobi, Kenya  
+254 745 091919  
raymondndungu8@gmail.com  

**BILL TO:** **${name}**  
Contact Person: **${name}**  
Email: **${email}** (or Address: **${address}**)  

**INVOICE NO:** #RN-2026-${invoiceIdNum}  
**DATE:** **${dateStr}**  
**DUE DATE:** Upon Receipt  

---

### BILLABLE SERVICES & LINE ITEMS

| Service Description | Billing Type | Amount |
| :--- | :--- | :--- |
| **Professional Web Design & System Engineering**<br>Comprehensive design, custom multi-model AI coding, component-driven architecture, and systems implementation as per project scope. | Fixed Project | ${budgetStr} |
| | **Project Subtotal:** | **${budgetStr}** |
| | **Milestone 01 Deposit Due (50%):** | **${depositStr}** |
| | **Milestone 02 Remaining Balance (50%):** | **${depositStr}** |

> 🏷️ **Note:** The Milestone 01 Deposit (50%) is required upfront to initialize environment architecture and kick off active vibe-coding pipelines.

---

### DESIGNATED PAYMENT METHODS
Please execute your milestone remittance via any of the secure professional channels configured below. Kindly send a confirmation receipt via email once processed.

* **📲 M-PESA (Kenya Mobile):** Send Money to Number: **+254 745 091919** | Account Holder: **Raymond Ndungu**
* **🏦 Bank Transfer:** Standard Chartered Bank Kenya | Account Number: \`0102948194\` | Swift/Sort Code: \`SCBLKENX / 02000\`
* **🌎 PayPal / International:** Recipient Email Link: **raymondndungu8@gmail.com**

---
**For the Developer (RN Studio):** Raymond Ndungu, Founder: *Raymond Ndungu*  
Date: **${dateStr}**`,

      handoverMarkdown: `# RN STUDIO — FULFILLMENT & HANDOVER CERTIFICATE
**DESIGN • CODE • INTELLIGENCE**  
*Project Delivery Token Code: RN-PROJ-FULFILL-2026*

---

This official Fulfillment and Project Handover Certificate validates that the web design, system engineering, and custom application features configured for the Client have been comprehensively built, visually polished, tested for functional performance, and successfully transitioned to live production environments.

---

## 1. INVENTORY OF DIGITAL ARCHITECTURE DELIVERABLES
The following system assets and code bases have been fully deployed and handed over to the client's administrative custody:

| Asset Category | Deployment Status & Location Details |
| :--- | :--- |
| **Production Code Base** | Fully cleaned, componentized repository containing all source scripts and logic. Transferred directly to Client GitHub organization / account. |
| **Live Server Staging** | Production server instance configured live. Staging URL: \`https://staging.${title.toLowerCase().replace(/\s+/g, '')}.co.ke\` |
| **Database & APIs** | Production database schemas initialized, secure API strings linked, and environment parameters locked down securely. |
| **Asset Packages** | All finalized text elements, compressed media vectors, and high-res UI/UX graphics deployed into active directories. |

---

## 2. POST-LAUNCH TECHNICAL SUPPORT & WARRANTY FRAMEWORK
* **Complimentary Support Block:** To guarantee structural reliability, this project is protected by a complementary **Fourteen (14) Day Technical Warranty** starting directly from the live launch date. This warranty exclusively covers fixing unexpected core code breakage, server routing loops, database connection errors, or visual bugs deviating from the approved staging version.
* **Exclusions:** The warranty explicitly excludes configuring new application features, changing copy content layouts, processing structural graphic design updates, or repairing breakage caused by third-party modifications or client-side code intervention.
* **Extended Retainers:** Following the expiration of the 14-day block, ongoing systems optimization, monthly plugin updates, security monitoring, and custom scaling feature sets are handled under an independent, predictable monthly Retainer Agreement.

---

## 3. FINAL ACKNOWLEDGEMENT & PROJECT SIGN-OFF
By signing below, the Client confirms they have thoroughly checked the live staging URL, verified all system logic workflows, accepted all deliverables as complete and excellent, and formally approved the completion of the project.

**For the Client (Formal Sign-Off):**  
Authorized Client Signature: _____________________________________  
Date: **${dateStr}**  

**For the Developer (RN Studio):**  
Raymond Ndungu, Founder: _____________________________________  
Date: **${dateStr}**`,

      accessMarkdown: `# RN STUDIO — TECHNICAL ACCESS REQUEST FORM
**DESIGN • CODE • INTELLIGENCE**  
*Project Security Identifier: RN-SECURE-2026*

---

To initialize environment architectures, link payment infrastructures, and connect domain servers safely, the Developer requires administrative access to the specific platforms listed below. 

> 🔒 **SECURITY POLICY:** All credentials shared through this document are strictly protected under the Confidentiality and Non-Disclosure terms of our Master Services Agreement. Please change temporary passwords immediately upon project handover.

---

### CLIENT & PROJECT METADATA
* **CLIENT NAME:** **${name}**
* **DATE REQUESTED:** **${dateStr}**
* **URGENCY:** High (Required to initialize Milestone 01 engineering)

---

### REQUIRED PLATFORMS & ACCESS MATRIX

Please populate the credential fields below or grant administrative user access directly to **raymondndungu8@gmail.com**.

#### 1. Domain Registrar & Web Hosting (e.g., Namecheap, GoDaddy, HostPinnacle)
*Used for configuring DNS records, SSL certificates, and pointing nameservers to the live production server.*
* **Platform Name:** _____________________________________
* **Login URL:** _____________________________________
* **Username / Email:** _____________________________________
* **Password:** \`_____________________________________\`

#### 2. Payment Gateway Infrastructure (e.g., Stripe, PayPal, M-PESA Portal)
*Used to securely integrate API webhooks, sandbox testing routes, and live production payment triggers.*
* **Platform Name(s):** _____________________________________
* **Username / Email:** _____________________________________
* **Password:** \`_____________________________________\`
* *Alternative:* [ ] Inviting developer as "Developer / Administrator" via the platform dashboard.

#### 3. Content & Media Repositories (If applicable)
*Used to pull high-resolution brand vectors, copy sheets, and existing asset packages.*
* **Platform Link (e.g., Google Drive / Dropbox):** _____________________________________

---

### CLIENT AUTHORIZATION FOR CREDENTIAL DISCLOSURE
By signing below or transmitting these credentials digitally, the Client explicitly authorizes the Developer to access these administrative panels solely for purposes matching the approved project scope.

Authorized Client Signature: _____________________________________  
Date: **${dateStr}**`,

      checklistMarkdown: `# RN STUDIO — CLIENT ONBOARDING CHECKLIST
**DESIGN • CODE • INTELLIGENCE**

---

Welcome to **RN Studio**! To keep our development pipeline moving at high velocity and ensure your project launches right on schedule, we have structured a clear step-by-step onboarding sequence. 

Please follow this checklist to transition your project seamlessly from the strategy room to active production engineering.

---

## 📋 PRE-PRODUCTION STEPS (Phase 1)

* [ ] **Step 1: Execute the Master Services Agreement**
  * Review and sign the contract framework to lock down our development parameters, legal terms, and project scope.
* [ ] **Step 2: Clear the Milestone 01 Deposit (50%)**
  * Remit the setup payment using your preferred channel outlined on your professional invoice to instantly activate your active environment build.
* [ ] **Step 3: Complete the Technical Access Request Form**
  * Provide or invite administrative privileges for your domain host, payment gateways, and asset folders so infrastructure building can begin without bottleneck delays.

---

## 🎨 BRANDING & CONTENT COLLECTION (Phase 2)

To design an experience aligned perfectly with your brand identity, please compile and drop the following items into your shared project folder:

* [ ] **Brand Identity Elements:** High-resolution versions of your logos (preferably in vector format: \`.svg\`, \`.png\`, or \`.ai\`), alongside explicit brand font styles or primary color codes if already established.
* [ ] **Core Page Content & Copy:** All finalized text write-ups, product details, services lists, about sections, and contact disclosures mapped out for each required view.
* [ ] **High-Resolution Media:** Original, uncompressed imagery, product photography, or promotional video files intended for integration into your application layouts.

---

### 🚀 NEXT STEPS
Once the first three steps are checked off, our design engine will spin up to build your framework blueprints and UI schemes! If you experience any technical bottlenecks compiling these assets, let me know directly via WhatsApp or email.`
    };
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
