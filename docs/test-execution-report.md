# Test Execution Report: Northstar Support Deflection MVP

**Project:** Northstar Retail Co. — Support Deflection MVP  
**Test Suite:** End-to-End Functional UI Validation  
**Execution Date:** August 15, 2026  
**Environment:** Staging / Production Simulation (React SPA + Express REST API + MongoDB Atlas)  
**Total Test Cases Executed:** 14  
**Test Result Summary:** 14 Passed, 0 Failed, 1 Warning / UX Enhancement Note  

---

## 1. Executive Summary

This **Test Execution Report** provides a comprehensive evaluation of the visual and functional test results captured for the **Northstar Support Deflection MVP**. The primary objective of this MVP is to deflect repetitive customer support inquiries by providing automated self-service lookup capabilities across two high-volume operational categories:
1. **Returns & Refunds:** Enabling customers to verify return eligibility, live return shipping/inspection progress, and refund status.
2. **Stock Availability:** Allowing customers to check real-time stock levels and availability for specific products and size/fit variants.

### Summary Metrics

| Metric | Count | Percentage |
|---|---|---|
| **Total Test Scenarios Analyzed** | 14 | 100% |
| **Passed (Functional Success)** | 14 | 100% |
| **Failed (System Errors / Crashes)** | 0 | 0% |
| **Tests with Observations / UX Warnings** | 14 | 100% (Visual/Layout/UX observations noted) |

### Key Takeaways
- **Functional Integrity:** All 14 visual test scenarios executed as intended. The frontend interface seamlessly communicates with the backend REST endpoints to retrieve and display live MongoDB records.
- **Negative & Edge-Case Handling:** Invalid queries (e.g., non-existent Order IDs like `NS9999` and Product IDs like `P9999`) trigger clear, graceful error banners without application crashes or exposed stack traces.
- **Business Rule Conformance:** Returns lifecycle stages (`Approved`, `In Transit`, `Processing`, `Received`, `Past 30 Days`, `Rejected`) and inventory availability states (`Available`, `Out of Stock`) correctly mirror underlying business rules.
- **Identified Improvement Areas:** UI clipping in top card headers, absence of visual badges for low stock (e.g., `Quantity: 2`), lack of variant auto-complete, and an artificial 7.5-second client-side loading delay.

---

## 2. Test Scenarios Breakdown

### Category A: Returns & Refunds (Tests 1 – 8)

---

#### Test Case 1: Completed Return & Refund Verification
* **Image Reference:** `TEST 1.jpg`
* **Feature / Scenario Tested:** Positive Path — Checking an eligible order that has completed both return processing and refund payout.
* **Input Data:**
  * `Order ID:` **`NS1001`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Order ID:** `NS1001`
  * **Return eligibility:** `Eligible`
  * **Return status:** `Approved`
  * **Refund status:** `Completed`
* **Observations & Defects:**
  * **Layout/Visual:** Screenshot header is closely cropped above the input label. Result card displays consistent 2-column key-value layout.
  * **Behavior:** Correctly reflects final settlement state of a completed refund transaction.

---

#### Test Case 2: Ineligible / Rejected Return Query
* **Image Reference:** `TEST 2.jpg`
* **Feature / Scenario Tested:** Business Logic Validation — Querying an order where return eligibility is denied and status is marked Rejected.
* **Input Data:**
  * `Order ID:` **`NS1002`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Order ID:** `NS1002`
  * **Return eligibility:** `Not Eligible`
  * **Return status:** `Rejected`
  * **Refund status:** `Not Applicable`
* **Observations & Defects:**
  * **UX Note:** When an order is rejected, `Refund status` accurately resolves to `Not Applicable`. However, no specific rejection reason (e.g., policy violation, condition) is exposed to the customer.

---

#### Test Case 3: Approved Return with Pending Refund
* **Image Reference:** `TEST 3.jpg`
* **Feature / Scenario Tested:** Lifecycle State — Validating an approved return that is currently awaiting refund disbursement.
* **Input Data:**
  * `Order ID:` **`NS1003`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Order ID:** `NS1003`
  * **Return eligibility:** `Eligible`
  * **Return status:** `Approved`
  * **Refund status:** `Pending`
* **Observations & Defects:**
  * **Layout/Visual:** Navigation tabs (`Returns & Refunds` active with blue underline, `Stock Availability` inactive) are clearly rendered.
  * **Behavior:** Accurately separates return approval from financial execution.

---

#### Test Case 4: Return In-Transit with Pending Refund
* **Image Reference:** `TEST 4.jpg`
* **Feature / Scenario Tested:** Lifecycle State — Tracking an active return package currently in carrier transit.
* **Input Data:**
  * `Order ID:` **`NS2001`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Order ID:** `NS2001`
  * **Return eligibility:** `Eligible`
  * **Return status:** `In Transit`
  * **Refund status:** `Pending`
* **Observations & Defects:**
  * **Layout/Visual:** Subtitle text `"What can we help you with?"` is clipped horizontally across the top container boundary.
  * **Behavior:** Accurately conveys that physical receipt is still pending prior to refund initiation.

---

#### Test Case 5: Return In Warehouse Processing
* **Image Reference:** `TEST 5.jpg`
* **Feature / Scenario Tested:** Lifecycle State — Order return item has arrived at warehouse and is undergoing inspection/processing.
* **Input Data:**
  * `Order ID:` **`NS2002`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Order ID:** `NS2002`
  * **Return eligibility:** `Eligible`
  * **Return status:** `Processing`
  * **Refund status:** `Pending`
* **Observations & Defects:**
  * **Layout/Visual:** Minor top subtitle clipping visible above tab header.
  * **Behavior:** Correctly displays intermediate stage between carrier transit and final approval.

---

#### Test Case 6: Received Return with Refund in Processing
* **Image Reference:** `TEST 6.jpg`
* **Feature / Scenario Tested:** Lifecycle State — Return item officially received by warehouse; refund payout is actively being processed by payment gateway.
* **Input Data:**
  * `Order ID:` **`NS2003`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Order ID:** `NS2003`
  * **Return eligibility:** `Eligible`
  * **Return status:** `Received`
  * **Refund status:** `Processing`
* **Observations & Defects:**
  * **Behavior:** Correctly reflects dual progression where physical logistics is `Received` and finance pipeline is `Processing`.

---

#### Test Case 7: Return Window Expired (Past 30 Days Policy Rule)
* **Image Reference:** `TEST 7.jpg`
* **Feature / Scenario Tested:** Policy Enforcement — Querying an order past the 30-day return eligibility threshold.
* **Input Data:**
  * `Order ID:` **`NS2004`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Order ID:** `NS2004`
  * **Return eligibility:** `Not Eligible`
  * **Return status:** `Past 30 Days`
  * **Refund status:** `Not Applicable`
* **Observations & Defects:**
  * **Behavior:** Clear messaging for the 30-day rule deflection scenario.
  * **UX Note:** A link to the company's full return policy or exceptions FAQ would assist customers who receive this status.

---

#### Test Case 8: Non-Existent Order ID Error Handling
* **Image Reference:** `TEST 8.jpg`
* **Feature / Scenario Tested:** Negative Path / Boundary — Submitting an invalid or non-existent Order ID.
* **Input Data:**
  * `Order ID:` **`NS9999`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Error Banner:** Displays prominent red/pink alert banner: `"Order NS9999 was not found"`
* **Observations & Defects:**
  * **Layout/Visual:** Header text `"NORTHSTAR SUPPORT"` is clipped off at the top; only `"ASSISTANT"` is visible above the subtitle.
  * **Behavior:** Clean 404 intercept; no generic server 500 error or blank state shown.

---

### Category B: Stock Availability (Tests 9 – 14)

---

#### Test Case 9: In-Stock Footwear Variant Query
* **Image Reference:** `Test 9.jpg`
* **Feature / Scenario Tested:** Positive Path — Querying stock for a specific shoe size variant with healthy inventory.
* **Input Data:**
  * `Product:` **`P1001`**
  * `Variant (optional):` **`Size 42`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Product:** `Northstar Running Shoe`
  * **Variant:** `Size 42`
  * **Availability:** `Available`
  * **Quantity:** `6`
* **Observations & Defects:**
  * **Behavior:** Dynamic name resolution (`P1001` -> `Northstar Running Shoe`) works correctly.
  * **UX Note:** Variant entry requires exact case and string format (free-text input).

---

#### Test Case 10: Out-of-Stock Footwear Variant Query
* **Image Reference:** `test 10.jpg`
* **Feature / Scenario Tested:** Inventory Boundary — Querying an active product variant with zero available units.
* **Input Data:**
  * `Product:` **`P1001`**
  * `Variant (optional):` **`Size 44`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Product:** `Northstar Running Shoe`
  * **Variant:** `Size 44`
  * **Availability:** `Out of Stock`
  * **Quantity:** *(Line omitted by frontend conditional rendering)*
* **Observations & Defects:**
  * **Behavior:** Correctly identifies zero quantity as `Out of Stock` and hides the numeric quantity field.
  * **UX Note:** "Out of Stock" is displayed in plain black text inside a gray card; a colored status pill or badge (e.g., Red/Orange) would make this critical status stand out immediately.

---

#### Test Case 11: In-Stock Apparel Variant Query
* **Image Reference:** `TEST 11.jpg`
* **Feature / Scenario Tested:** Positive Path — Querying apparel inventory for a standard size.
* **Input Data:**
  * `Product:` **`P1002`**
  * `Variant (optional):` **`Medium`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Product:** `Northstar T-Shirt`
  * **Variant:** `Medium`
  * **Availability:** `Available`
  * **Quantity:** `10`
* **Observations & Defects:**
  * **Behavior:** Product identification and quantity counter accurately match database seed.

---

#### Test Case 12: In-Stock Outerwear Variant (Ample Quantity)
* **Image Reference:** `TEST 12.jpg`
* **Feature / Scenario Tested:** Positive Path — Querying high-inventory outerwear variant.
* **Input Data:**
  * `Product:` **`P2001`**
  * `Variant (optional):` **`Large`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Product:** `Northstar Winter Parka`
  * **Variant:** `Large`
  * **Availability:** `Available`
  * **Quantity:** `15`
* **Observations & Defects:**
  * **Behavior:** Clean lookup and display of 15 units.

---

#### Test Case 13: Low Stock Outerwear Variant Query
* **Image Reference:** `TEST 13.jpg`
* **Feature / Scenario Tested:** Inventory Threshold / Edge Case — Querying a product variant with critical low stock.
* **Input Data:**
  * `Product:` **`P2001`**
  * `Variant (optional):` **`Medium`**
* **Status:** <span style="color:orange;font-weight:bold;">PASS (UX WARNING)</span>
* **Actual Results:**
  * **Product:** `Northstar Winter Parka`
  * **Variant:** `Medium`
  * **Availability:** `Available`
  * **Quantity:** `2`
* **Observations & Defects:**
  * **UX Observation / Defect:** When only 2 units remain, the status is simply reported as `Available` with no low-stock alert or visual warning (e.g., "Only 2 left in stock!"). Adding a low-stock threshold warning would improve customer transparency and conversion urgency.

---

#### Test Case 14: Non-Existent Product ID Error Handling
* **Image Reference:** `TEST 14.jpg`
* **Feature / Scenario Tested:** Negative Path / Boundary — Submitting an invalid Product ID.
* **Input Data:**
  * `Product:` **`P9999`**
  * `Variant (optional):` **`Size 45`**
* **Status:** <span style="color:green;font-weight:bold;">PASS</span>
* **Actual Results:**
  * **Error Banner:** Displays prominent red/pink alert banner: `"Product P9999 was not found"`
* **Observations & Defects:**
  * **Behavior:** Error handler cleanly traps 404 response and renders an accessible error alert without layout breakage.

---

## 3. Recommendations & Actionable Insights

### A. User Experience & Visual Design Fixes
1. **Header Layout & Container Margins:**
   - *Issue:* Card titles and subtitles (e.g., `"NORTHSTAR SUPPORT ASSISTANT"`, `"What can we help you with?"`) suffer from vertical clipping near top card boundaries in multiple captures.
   - *Fix:* Increase card padding (`padding: 32px 24px`), set explicit line-height on `h1` and `.subtitle`, and ensure container overflow is properly styled.
2. **Status Highlighting & Visual Badges:**
   - *Issue:* Status values (such as `Eligible`, `Rejected`, `Available`, `Out of Stock`) are currently plain text strings within a generic gray background card (`#f8f9fa`).
   - *Fix:* Implement colored badge pills:
     - **Green (`#27ae60`):** `Eligible`, `Approved`, `Completed`, `Available`
     - **Amber/Orange (`#e67e22`):** `In Transit`, `Processing`, `Pending`, `Low Stock (<= 3)`
     - **Red (`#e74c3c`):** `Rejected`, `Not Eligible`, `Past 30 Days`, `Out of Stock`
3. **Low-Stock Alerting:**
   - *Issue:* `Quantity: 2` (Test 13) has no visual indication of scarcity.
   - *Fix:* Introduce a threshold check (`quantity <= 3`) that renders a subtle warning badge (e.g., *"Low Stock — Only 2 units remaining"*).

### B. Functional & Performance Optimizations
1. **Remove Artificial Client-Side Delay:**
   - *Observation:* Code analysis reveals an artificial timer promise (`setTimeout(resolve, 7500)`) in `ReturnsForm.jsx` and `StockForm.jsx`.
   - *Recommendation:* Remove this artificial 7.5s delay before production release to provide instantaneous deflection responses (< 200ms).
2. **Variant Selection UX (Dropdowns vs. Free-Text):**
   - *Issue:* The variant input is currently an unguided free-text input (`<input type="text" placeholder="e.g. Size 42" />`). Slight typos or capitalization mismatches (e.g., `"size 42"` vs `"Size 42"`) result in 404 error responses.
   - *Recommendation:* When a valid Product ID is entered or selected, dynamically query and populate available variants in a `<select>` dropdown.
3. **Case-Insensitive Input Sanitization:**
   - *Recommendation:* Normalize all Order IDs and Product IDs on both frontend and backend using `.toUpperCase().trim()` to prevent user input errors.

### C. Recommended Next Testing Scope
1. **All-Variant Aggregate Stock Testing:**
   - Test queries with product ID only (omitting variant) to ensure total aggregate stock is accurately summed and clearly broken down in UI.
2. **Cross-Browser & Mobile Viewport Testing:**
   - Validate responsiveness across mobile breakpoints (375px, 414px) and tablet resolutions to ensure input forms and result cards do not overflow.
3. **Accessibility (a11y) Audit:**
   - Add ARIA attributes (`aria-live="polite"`, `role="alert"`) to result cards and error banners for screen reader support.
