# StreamPro - Product Requirements Document

**Project:** StreamPro (IPTV Streaming Platform)  
**Date:** 2026-03-19  
**Status:** Planning

---

## Overview

StreamPro is an IPTV streaming service platform with an existing Next.js web application. This PRD outlines the technical infrastructure required to protect the business from platform bans, automate sales via AI agents, implement compliant payment processing, and build automated customer retention.

**Note:** Geniustv is a separate platform owned by the same user.

---

## Phase 1: Traffic Infrastructure & Anti-Ban Shield

### Objective
Protect the Reddit account and main domain by isolating traffic through a cloaked bridge page.

### Requirements

| Task | Description |
|------|-------------|
| **1.1** | Configure **streampro.space** as a bridge Landing Page. Must be free of trigger words ("IPTV", "M3U", "Server"). Disguise as a generic streaming tutorial blog or tech support contact page. |
| **1.2** | Implement dynamic redirection on streampro.space. Users from Reddit see a CTA button ("Talk to Support" or "Get Access") that redirects to WhatsApp Business API or Telegram bot. |
| **1.3** | Block all indexing for the main domain using `robots.txt` and `noindex` meta tags. Keep it private and accessible only to paying customers. |

---

## Phase 2: AI Agent Development (Sales & Triage)

### Objective
Automate lead conversion from Reddit traffic without manual intervention.

### Requirements

| Task | Description |
|------|-------------|
| **2.1** | Connect WhatsApp Business API or Telegram bot to an LLM (OpenAI/Claude) using LangChain, n8n, or Make. |
| **2.2** | Train AI Agent with strict System Prompt: Act as friendly technical advisor. Flow: Greet → Ask device type (Smart TV, Firestick, PC) → Offer 2-hour free trial → Output pricing ($15, $35, $50, $75) **only when explicitly asked**. |
| **2.3** | Integrate bot with Strong 8k panel (via API or webhook) to auto-generate 2-hour trial credentials. If no API, set up webhook to private Telegram channel for manual generation with bot handling delivery. |

### Pricing Tiers
- **$15** - Basic
- **$35** - Standard  
- **$50** - Premium
- **$75** - Ultimate

---

## Phase 3: Payment Gateway & Camouflaging

### Objective
Secure cash flow and prevent payment processors from freezing funds due to IPTV-related ToS violations.

### Requirements

| Task | Description |
|------|-------------|
| **3.1** | Build e-commerce facade on main domain (or hidden subdomain) using WooCommerce. Create fictitious legal digital products matching pricing tiers. Examples: "Basic Network Consulting - 1 Month" ($15), "Annual Tech Support Package" ($75). |
| **3.2** | Connect AI bot to specific checkout links. When user confirms plan (e.g., 6-month), bot sends camouflaged $50 product link. |
| **3.3** | Integrate cryptocurrency payment gateway (Binance Pay, NowPayments). Configure bot to offer 10% discount or 1 extra free month for crypto payments (USDT/TRX). |

---

## Phase 4: Retention System & Automated Churn Prevention

### Objective
Secure renewals on autopilot.

### Requirements

| Task | Description |
|------|-------------|
| **4.1** | Set up lightweight database (Airtable/Google Sheets) with webhook integration. Log upon payment: Client Name, Contact Info (WA/Telegram ID), Plan Tier (1/3/6/12 months), Expiration Date. |
| **4.2** | Program daily Cron Job to parse database. |
| **4.3** | Configure automated reminder: Exactly 3 days before expiration, send automated WhatsApp/Telegram message with direct renewal payment link. |

---

## Technical Stack Summary

| Component | Technology |
|-----------|------------|
| Landing Page | Next.js (streampro.space) |
| Main Store | WooCommerce / Next.js (geniustv.store) |
| Bot Framework | n8n / LangChain / Make |
| LLM | OpenAI API / Claude API |
| Payment | Crypto (USDT/TRC20) + Camouflaged WooCommerce |
| Database | Airtable / Google Sheets |
| Panel | Strong 8k (API/Webhook) |

---

## Next Steps

1. Deploy streampro.space with cloaked landing page
2. Set up WhatsApp/Telegram bot with LLM integration
3. Configure payment camouflage strategy
4. Implement retention database and automation
