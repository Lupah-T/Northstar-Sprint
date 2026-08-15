# Test Documentation & Verification Report

**Project:** Northstar Support Assistant MVP  
**Version:** 1.0.0  
**Test Location:** [`/test-screenshots`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots)  
**Documentation Date:** August 2026  
**Status:** Completed & Verified  

---

## 1. Executive Summary

This document provides a comprehensive test documentation and verification report for the **Northstar Support Assistant** self-service web application. The testing process validates both core functional modules of the MVP:

1. **Returns & Refunds Module:** Verification of order status tracking, return eligibility validation, return lifecycle transitions, refund statuses, and error handling for unknown order IDs.
2. **Stock Availability Module:** Verification of product catalog querying, variant-level stock checking (in-stock, low-stock, and out-of-stock states), and error handling for non-existent products.

All test scenarios were executed against the active application interface and corroborated by visual evidence recorded in the [`test-screenshots/`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots) repository directory.

---

## 2. Test Environment & Architecture

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, CSS | Client-side user interface with tabbed self-service views |
| **Backend API** | Node.js, Express | RESTful API managing business logic and error responses |
| **Database** | MongoDB, Mongoose | Data persistence for Customers, Orders, Returns, Products, and Inventory |
| **Test Evidence** | PNG / JPG Screenshots | Captured visual execution proofs in [`test-screenshots/`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots) |

---

## 3. Test Cases & Execution Details

### 3.1. Returns & Refunds Test Suite (TEST 1 – TEST 8)

---

#### Test Case TC-RET-01: Approved Return with Completed Refund
- **Evidence:** [`TEST 1.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%201.jpg)
- **Module:** Returns & Refunds
- **Test Objective:** Verify that an order with an approved return and completed refund displays accurate status information.
- **Input Data:** `Order ID = NS1001`
- **Execution Steps:**
  1. Navigate to the **Returns & Refunds** tab.
  2. Input `NS1001` into the **Order ID** field.
  3. Click the **Check Return** button.
- **Expected Result:**
  - Order ID: `NS1001`
  - Return eligibility: `Eligible`
  - Return status: `Approved`
  - Refund status: `Completed`
- **Actual Result (Screenshot Evidence):**
  - Order ID: `NS1001`
  - Return eligibility: `Eligible`
  - Return status: `Approved`
  - Refund status: `Completed`
- **Status:** **PASS**

---

#### Test Case TC-RET-02: Ineligible Order with Rejected Return
- **Evidence:** [`TEST 2.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%202.jpg)
- **Module:** Returns & Refunds
- **Test Objective:** Verify that an ineligible order with a rejected return correctly displays non-eligibility and non-applicable refund status.
- **Input Data:** `Order ID = NS1002`
- **Execution Steps:**
  1. Navigate to the **Returns & Refunds** tab.
  2. Input `NS1002` into the **Order ID** field.
  3. Click the **Check Return** button.
- **Expected Result:**
  - Order ID: `NS1002`
  - Return eligibility: `Not Eligible`
  - Return status: `Rejected`
  - Refund status: `Not Applicable`
- **Actual Result (Screenshot Evidence):**
  - Matches expected outcome exactly.
- **Status:** **PASS**

---

#### Test Case TC-RET-03: Approved Return with Pending Refund
- **Evidence:** [`TEST 3.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%203.jpg)
- **Module:** Returns & Refunds
- **Test Objective:** Verify that an approved return with a pending refund displays appropriate status flags.
- **Input Data:** `Order ID = NS1003`
- **Execution Steps:**
  1. Select **Returns & Refunds** tab.
  2. Enter `NS1003` in **Order ID**.
  3. Submit via **Check Return**.
- **Expected Result:**
  - Order ID: `NS1003`
  - Return eligibility: `Eligible`
  - Return status: `Approved`
  - Refund status: `Pending`
- **Actual Result (Screenshot Evidence):**
  - Displayed Order ID `NS1003`, Return eligibility `Eligible`, Return status `Approved`, Refund status `Pending`.
- **Status:** **PASS**

---

#### Test Case TC-RET-04: Return In Transit with Pending Refund
- **Evidence:** [`TEST 4.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%204.jpg)
- **Module:** Returns & Refunds
- **Test Objective:** Verify return tracking for an item that is currently in transit back to the warehouse.
- **Input Data:** `Order ID = NS2001`
- **Execution Steps:**
  1. Select **Returns & Refunds** tab.
  2. Enter `NS2001` in **Order ID**.
  3. Submit via **Check Return**.
- **Expected Result:**
  - Order ID: `NS2001`
  - Return eligibility: `Eligible`
  - Return status: `In Transit`
  - Refund status: `Pending`
- **Actual Result (Screenshot Evidence):**
  - Matches expected return status `In Transit` and refund status `Pending`.
- **Status:** **PASS**

---

#### Test Case TC-RET-05: Return in Processing State with Pending Refund
- **Evidence:** [`TEST 5.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%205.jpg)
- **Module:** Returns & Refunds
- **Test Objective:** Verify lifecycle state handling when return is actively undergoing warehouse processing.
- **Input Data:** `Order ID = NS2002`
- **Execution Steps:**
  1. Select **Returns & Refunds** tab.
  2. Enter `NS2002` in **Order ID**.
  3. Click **Check Return**.
- **Expected Result:**
  - Order ID: `NS2002`
  - Return eligibility: `Eligible`
  - Return status: `Processing`
  - Refund status: `Pending`
- **Actual Result (Screenshot Evidence):**
  - Confirmed `Processing` return status and `Pending` refund status displayed.
- **Status:** **PASS**

---

#### Test Case TC-RET-06: Received Return with Processing Refund
- **Evidence:** [`TEST 6.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%206.jpg)
- **Module:** Returns & Refunds
- **Test Objective:** Verify display of received return status transitioning to refund processing.
- **Input Data:** `Order ID = NS2003`
- **Execution Steps:**
  1. Select **Returns & Refunds** tab.
  2. Enter `NS2003` in **Order ID**.
  3. Click **Check Return**.
- **Expected Result:**
  - Order ID: `NS2003`
  - Return eligibility: `Eligible`
  - Return status: `Received`
  - Refund status: `Processing`
- **Actual Result (Screenshot Evidence):**
  - Confirmed `Received` return status and `Processing` refund status displayed.
- **Status:** **PASS**

---

#### Test Case TC-RET-07: Ineligible Return - Policy Window Expired (Past 30 Days)
- **Evidence:** [`TEST 7.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%207.jpg)
- **Module:** Returns & Refunds
- **Test Objective:** Verify deflection message and status when an order is past the 30-day return policy window.
- **Input Data:** `Order ID = NS2004`
- **Execution Steps:**
  1. Select **Returns & Refunds** tab.
  2. Enter `NS2004` in **Order ID**.
  3. Click **Check Return**.
- **Expected Result:**
  - Order ID: `NS2004`
  - Return eligibility: `Not Eligible`
  - Return status: `Past 30 Days`
  - Refund status: `Not Applicable`
- **Actual Result (Screenshot Evidence):**
  - Confirmed `Not Eligible` return eligibility and `Past 30 Days` return status.
- **Status:** **PASS**

---

#### Test Case TC-RET-08: Non-Existent Order ID Error Handling (Negative Test)
- **Evidence:** [`TEST 8.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%208.jpg)
- **Module:** Returns & Refunds
- **Test Objective:** Verify graceful client-side error presentation when searching for a non-existent Order ID.
- **Input Data:** `Order ID = NS9999`
- **Execution Steps:**
  1. Select **Returns & Refunds** tab.
  2. Enter non-existent ID `NS9999` in **Order ID**.
  3. Click **Check Return**.
- **Expected Result:**
  - HTTP 404 status handled gracefully.
  - User-friendly error alert displayed: `"Order NS9999 was not found"`.
  - No technical stack traces or unhandled promise rejections shown to the user.
- **Actual Result (Screenshot Evidence):**
  - Pink error banner displayed with exact message: `"Order NS9999 was not found"`.
- **Status:** **PASS**

---

### 3.2. Stock Availability Test Suite (Test 9 – TEST 14)

---

#### Test Case TC-STK-01: Available Product Variant Stock Query
- **Evidence:** [`Test 9.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/Test%209.jpg)
- **Module:** Stock Availability
- **Test Objective:** Verify stock query for a valid product and an in-stock variant.
- **Input Data:**
  - `Product = P1001`
  - `Variant = Size 42`
- **Execution Steps:**
  1. Navigate to the **Stock Availability** tab.
  2. Enter `P1001` in the **Product** input field.
  3. Enter `Size 42` in the **Variant (optional)** input field.
  4. Click **Check Availability**.
- **Expected Result:**
  - Product: `Northstar Running Shoe`
  - Variant: `Size 42`
  - Availability: `Available`
  - Quantity: `6`
- **Actual Result (Screenshot Evidence):**
  - Displayed product name `Northstar Running Shoe`, variant `Size 42`, availability `Available`, quantity `6`.
- **Status:** **PASS**

---

#### Test Case TC-STK-02: Out of Stock Product Variant Query
- **Evidence:** [`test 10.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/test%2010.jpg)
- **Module:** Stock Availability
- **Test Objective:** Verify behavior when checking an existing product variant that has 0 remaining stock.
- **Input Data:**
  - `Product = P1001`
  - `Variant = Size 44`
- **Execution Steps:**
  1. Select **Stock Availability** tab.
  2. Enter `P1001` in **Product**.
  3. Enter `Size 44` in **Variant**.
  4. Click **Check Availability**.
- **Expected Result:**
  - Product: `Northstar Running Shoe`
  - Variant: `Size 44`
  - Availability: `Out of Stock`
- **Actual Result (Screenshot Evidence):**
  - Displayed product name `Northstar Running Shoe`, variant `Size 44`, availability `Out of Stock`.
- **Status:** **PASS**

---

#### Test Case TC-STK-03: Apparel Variant Availability (T-Shirt)
- **Evidence:** [`TEST 11.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%2011.jpg)
- **Module:** Stock Availability
- **Test Objective:** Verify stock availability for apparel items with size strings (Medium).
- **Input Data:**
  - `Product = P1002`
  - `Variant = Medium`
- **Execution Steps:**
  1. Select **Stock Availability** tab.
  2. Enter `P1002` in **Product**.
  3. Enter `Medium` in **Variant**.
  4. Click **Check Availability**.
- **Expected Result:**
  - Product: `Northstar T-Shirt`
  - Variant: `Medium`
  - Availability: `Available`
  - Quantity: `10`
- **Actual Result (Screenshot Evidence):**
  - Correctly returned `Northstar T-Shirt`, `Medium`, `Available`, quantity `10`.
- **Status:** **PASS**

---

#### Test Case TC-STK-04: Apparel Variant High Stock (Winter Parka Large)
- **Evidence:** [`TEST 12.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%2012.jpg)
- **Module:** Stock Availability
- **Test Objective:** Verify query for outerwear apparel variant with full inventory.
- **Input Data:**
  - `Product = P2001`
  - `Variant = Large`
- **Execution Steps:**
  1. Select **Stock Availability** tab.
  2. Enter `P2001` in **Product**.
  3. Enter `Large` in **Variant**.
  4. Click **Check Availability**.
- **Expected Result:**
  - Product: `Northstar Winter Parka`
  - Variant: `Large`
  - Availability: `Available`
  - Quantity: `15`
- **Actual Result (Screenshot Evidence):**
  - Correctly returned `Northstar Winter Parka`, `Large`, `Available`, quantity `15`.
- **Status:** **PASS**

---

#### Test Case TC-STK-05: Apparel Variant Low Stock (Winter Parka Medium)
- **Evidence:** [`TEST 13.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%2013.jpg)
- **Module:** Stock Availability
- **Test Objective:** Verify query for variant with low remaining inventory.
- **Input Data:**
  - `Product = P2001`
  - `Variant = Medium`
- **Execution Steps:**
  1. Select **Stock Availability** tab.
  2. Enter `P2001` in **Product**.
  3. Enter `Medium` in **Variant**.
  4. Click **Check Availability**.
- **Expected Result:**
  - Product: `Northstar Winter Parka`
  - Variant: `Medium`
  - Availability: `Available`
  - Quantity: `2`
- **Actual Result (Screenshot Evidence):**
  - Correctly returned `Northstar Winter Parka`, `Medium`, `Available`, quantity `2`.
- **Status:** **PASS**

---

#### Test Case TC-STK-06: Non-Existent Product Error Handling (Negative Test)
- **Evidence:** [`TEST 14.jpg`](file:///c:/Users/Administrator/Northstar-Sprint/test-screenshots/TEST%2014.jpg)
- **Module:** Stock Availability
- **Test Objective:** Verify error handling when searching for a product ID that does not exist in the database.
- **Input Data:**
  - `Product = P9999`
  - `Variant = Size 45`
- **Execution Steps:**
  1. Select **Stock Availability** tab.
  2. Enter non-existent ID `P9999` in **Product**.
  3. Enter `Size 45` in **Variant**.
  4. Click **Check Availability**.
- **Expected Result:**
  - HTTP 404 response handled gracefully.
  - User-friendly error alert displayed: `"Product P9999 was not found"`.
- **Actual Result (Screenshot Evidence):**
  - Pink error banner displayed with message: `"Product P9999 was not found"`.
- **Status:** **PASS**

---

## 4. Requirements Traceability Matrix

| Requirement Ref | Requirement Description | Test Case ID | Test Screenshot Evidence | Verification Result |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-RET-01** | Query order by ID and return eligibility | TC-RET-01, TC-RET-02 | `TEST 1.jpg`, `TEST 2.jpg` | **Verified (PASS)** |
| **REQ-RET-02** | Return status tracking (Approved, Rejected, In Transit, Processing, Received, Past 30 Days) | TC-RET-01 through TC-RET-07 | `TEST 1.jpg` through `TEST 7.jpg` | **Verified (PASS)** |
| **REQ-RET-03** | Refund status tracking (Completed, Not Applicable, Pending, Processing) | TC-RET-01 through TC-RET-07 | `TEST 1.jpg` through `TEST 7.jpg` | **Verified (PASS)** |
| **REQ-RET-04** | Error handling for non-existent order ID | TC-RET-08 | `TEST 8.jpg` | **Verified (PASS)** |
| **REQ-STK-01** | Product stock inquiry by product ID | TC-STK-01 to TC-STK-05 | `Test 9.jpg` to `TEST 13.jpg` | **Verified (PASS)** |
| **REQ-STK-02** | Variant-specific stock inquiry (e.g. Size, Color) | TC-STK-01 to TC-STK-05 | `Test 9.jpg` to `TEST 13.jpg` | **Verified (PASS)** |
| **REQ-STK-03** | Out-of-stock indicator when quantity is 0 | TC-STK-02 | `test 10.jpg` | **Verified (PASS)** |
| **REQ-STK-04** | Error handling for unknown product ID | TC-STK-06 | `TEST 14.jpg` | **Verified (PASS)** |

---

## 5. Test Summary & Verification Conclusion

- **Total Test Cases Executed:** 14
- **Passed:** 14
- **Failed:** 0
- **Pass Rate:** 100%

### Key Findings
1. **Core Workflows:** All end-to-end user workflows for checking returns, refunds, and stock availability perform as expected.
2. **Deflection Capability:** Ineligible return reasons (e.g., "Past 30 Days", "Rejected") and out-of-stock notifications are immediately presented to the user, fulfilling the business objective to deflect routine support queries.
3. **Error Resilience:** Both modules handle invalid/unknown entities (`NS9999`, `P9999`) with clear, user-friendly notifications without throwing unhandled frontend exceptions.
