# Northstar Sprint — Support Deflection MVP

## Project Overview

Northstar Retail Co. is a mid-size e-commerce company whose support team receives a large number of repetitive customer questions.

This project is a **5-day Support Deflection MVP** designed to reduce manual support-ticket handling by allowing customers to receive automated answers for common support questions.

The MVP focuses on two support categories:

* **Returns & Refunds**
* **Stock Availability**

The goal is not to build a production-ready enterprise platform. The goal is to build a **working, demoable MVP** that proves the support-deflection approach works.

---

## MVP Features

### 1. Returns & Refunds

Customers should be able to:

* Check whether an order is eligible for return.
* View the current return status.
* View the refund status.
* Receive a clear response for unknown or invalid orders.

Example:

```text
Customer:
Can I return order NS1001?

System:
Order NS1001 is eligible for return.
Return status: Approved
Refund status: Pending
```

### 2. Stock Availability

Customers should be able to:

* Search for a product.
* Check whether a product is in stock.
* Check availability for a specific variant or size where applicable.
* Receive a clear response when an item is unavailable or does not exist.

Example:

```text
Customer:
Do you have Product P1001 in size 42?

System:
Product P1001, size 42:
Available — 6 units in stock.
```

---

## Proposed Architecture

The MVP will use a simple architecture suitable for a short sprint:

```text
Customer
   |
   v
Frontend / Support Assistant
   |
   v
Backend API
   |
   v
Database
```

### Components

**Frontend**

Provides the customer-facing support interface.

**Backend**

Handles requests, business logic, validation, and communication with the database.

**Database**

Stores customers, orders, returns/refunds, products, and inventory data.

**Testing**

Validates the individual components and complete customer workflows.

**DevOps & Documentation**

Handles basic setup/deployment support and project documentation.

---

## Suggested Technology Stack

The project intentionally avoids unnecessary complexity.

Possible stack:

* Frontend: HTML/CSS/JavaScript or React
* Backend: Flask or Node.js/Express
* Database: SQLite or PostgreSQL
* Testing: Pytest or the testing framework appropriate to the chosen backend
* Version Control: Git + GitHub
* Project Management: GitHub Projects
* Collaboration: Google Meet + team communication channel

The team should choose technologies that members already understand and can deliver reliably within the sprint.

---

## Team

| Member   | GitHub Username                                               | Role                      |
| -------- | ------------------------------------------------------------- | ------------------------- |
| Member 1 | [**Lupah-T**](https://github.com/Lupah-T)                     | Team Lead + Backend       |
| Member 2 | [**devmanu-m**](https://github.com/devmanu-m)                 | Frontend                  |
| Member 3 | [**Kamoing98**](https://github.com/Kamoing98)                 | Database + Business Logic |
| Member 4 | [**shaquelle254kenya**](https://github.com/shaquelle254kenya) | Testing / QA              |
| Member 5 | [**wayua-web**](https://github.com/wayua-web)                 | DevOps + Documentation    |

> Team roles can be adjusted by team agreement and should remain documented in the Team Charter.

---

## Repository Structure

The project is expected to follow a structure similar to:

```text
Northstar-Sprint/
│
├── README.md
├── TEAM-CHARTER.md
├── GO-LIVE-NOTE.md
│
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   ├── api.md
│   └── meeting-notes.md
│
├── frontend/
│
├── backend/
│
├── tests/
│
└── .gitignore
```

The exact structure may change depending on the technology chosen.

---

## Git Workflow

The `main` branch contains the integrated project.

Team members work on assigned branches:

```text
main
├── feature/backend-api
├── feature/frontend
├── feature/database
├── test/mvp-testing
└── docs/devops
```

### Workflow

```text
GitHub Issue
     |
     v
Assigned Member
     |
     v
Working Branch
     |
     v
Code / Documentation
     |
     v
Commit
     |
     v
Push
     |
     v
Pull Request
     |
     v
Review
     |
     v
Merge into main
     |
     v
GitHub Task → DONE
```

---

## Commit Convention

All commits should follow:

```text
<type>: <what changed> - <why it matters>
```

### Examples

```text
feat: add returns API - enables automated return status checks
```

```text
feat: add stock lookup API - enables product availability checks
```

```text
fix: handle unavailable products - prevents misleading responses
```

```text
test: add return scenarios - verifies refund workflow
```

```text
docs: add deployment guide - supports project handover
```

Avoid vague commit messages such as:

```text
wip
updates
changes
stuff
final
test
```

---

## Project Board

GitHub Projects is the official task-management system.

### Board Statuses

```text
TODO → IN PROGRESS → REVIEW → DONE
```

### Required Task Information

Every task should contain:

* Owner
* Priority
* Definition of Done
* Clear description
* A scope that can reasonably be completed within approximately 4 hours

### Priority Levels

* 🔴 **Critical** — Required for the MVP or submission.
* 🟠 **High** — Important for quality and delivery.
* 🟡 **Medium** — Useful but can be simplified if time is limited.
* 🟢 **Low** — Optional.

---

## Current MVP Priorities

### Critical

* Define MVP requirements.
* Create database schema.
* Create and seed the database.
* Build Returns & Refunds API.
* Build Stock Availability API.
* Build the basic Support Assistant UI.
* Integrate frontend and backend.
* Perform end-to-end testing.
* Maintain GitHub auditability.

### High

* Validation and error handling.
* Automated/API testing.
* Regression testing.
* Final documentation.
* Go-Live Readiness Note.

### Medium

* Simple deployment.
* Optional UI improvements.
* Non-essential enhancements.

---

## Data Model

The MVP is expected to use data similar to:

```text
customers
    |
    +---- orders
             |
             +---- returns

products
    |
    +---- inventory
```

Example entities:

### Customers

```text
customer_id
name
email
```

### Orders

```text
order_id
customer_id
order_date
status
```

### Returns

```text
return_id
order_id
return_status
refund_status
request_date
refund_date
```

### Products

```text
product_id
name
category
```

### Inventory

```text
inventory_id
product_id
variant
quantity
```

---

## Testing Requirements

Testing should cover both successful and unsuccessful scenarios.

### Returns & Refunds

* Valid order.
* Eligible return.
* Ineligible return.
* Pending refund.
* Completed refund.
* Unknown order.
* Invalid order ID.
* Missing order ID.

### Stock Availability

* Product is in stock.
* Product is out of stock.
* Specific variant/size is available.
* Specific variant/size is unavailable.
* Unknown product.
* Invalid search.
* Missing search input.

### End-to-End Testing

The complete workflow should be verified:

```text
Frontend
   ↓
Backend API
   ↓
Database
   ↓
Response
   ↓
Frontend
```

---

## Remote Collaboration

The team works remotely.

### Communication

Primary communication channel:

`[Insert Discord / Slack / WhatsApp channel]`

### Meetings

Google Meet will be used for team meetings.

### Working Rule

Important project decisions should be documented in GitHub Issues, Pull Requests, or project documentation rather than existing only in chat.

### Blockers

Members should report blockers as soon as possible.

A member should not remain silently blocked on a critical task.

---

## Contribution and Audit Trail

The project must provide evidence that the work was genuinely collaborative.

The audit trail includes:

* Git commits.
* Branch history.
* Pull Requests.
* Pull Request reviews.
* GitHub Project task movement.
* Task ownership.
* Documentation edits where applicable.

Each significant contribution should be traceable:

```text
Task
 ↓
Member
 ↓
Branch
 ↓
Commit
 ↓
Pull Request
 ↓
Review
 ↓
Merge
```

Meaningless commits must not be created merely to increase activity.

---

## Sprint Plan

### Day 1

* Confirm requirements.
* Confirm team roles.
* Finalize Team Charter.
* Configure GitHub repository and Project Board.
* Create core tasks.
* Design and implement database foundation.
* Start backend and frontend work in parallel.
* Prepare test cases.
* Start documentation.

### Day 2

* Complete core APIs.
* Complete main frontend workflows.
* Integrate frontend with backend.
* Run API and integration tests.
* Fix critical defects.
* Continue documentation and deployment preparation.

### Day 3

* Complete end-to-end testing.
* Fix remaining critical/high issues.
* Verify contribution and audit trail.
* Finalize Go-Live Readiness Note.
* Prepare final demonstration.
* Complete final submission.

---

## Definition of Done

A task should only move to **DONE** when its specific Definition of Done has been satisfied.

In general:

* Implementation is complete.
* Relevant tests pass.
* No known blocking defect remains.
* Required documentation is updated.
* Required review has been completed.
* GitHub task status has been updated.

---

## Out of Scope

Because the sprint is short, the following are not required unless the core MVP is already complete:

* Kubernetes.
* Complex microservice architecture.
* Advanced AI agents.
* Payment processing.
* Production-grade authentication.
* Large-scale cloud infrastructure.
* Complex analytics.
* Non-essential UI animations.
* Additional support categories.

The team should prioritize **working functionality and traceable collaboration** over unnecessary technical complexity.

---

## Final Deliverables

The project should produce:

1. **Working Support Deflection MVP**

   * Returns & Refunds
   * Stock Availability

2. **Team Charter**

3. **GitHub Project Board**

   * 10+ granular tasks
   * Owners
   * Priorities
   * Definitions of Done
   * Status history

4. **Audit Trail**

   * Commits
   * Branches
   * Pull Requests
   * Reviews
   * Board activity

5. **Documentation**

   * README
   * Requirements
   * Architecture
   * API/setup instructions

6. **Go-Live Readiness Note**

   * What works
   * Known limitations
   * What Northstar needs to do next

7. **Individual Assessment**

   * Day-1 baseline/self-assessment
   * Confidential Peer Reliability Index

---

## Project Goal

> **Build a small, reliable Support Deflection MVP that demonstrates how Northstar can reduce repetitive support tickets, while maintaining a clear and verifiable record of genuine team collaboration.**

---
