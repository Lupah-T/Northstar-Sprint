/**
 * Northstar Support Assistant — app logic
 * Handles: category selection, input validation, API calls (or demo
 * mock data), loading state, success rendering, and error rendering.
 */

(function () {
  "use strict";

  const state = {
    category: "returns", // "returns" | "stock"
  };

  const els = {
    tabReturns: document.getElementById("tab-returns"),
    tabStock: document.getElementById("tab-stock"),
    form: document.getElementById("lookup-form"),
    input: document.getElementById("lookup-input"),
    inputLabel: document.getElementById("input-label"),
    inputHint: document.getElementById("input-hint"),
    submitBtn: document.getElementById("submit-btn"),
    resultArea: document.getElementById("result-area"),
    demoBanner: document.getElementById("demo-banner"),
  };

  const COPY = {
    returns: {
      label: "Order ID",
      hint: "e.g. NR-1001",
      placeholder: "Enter your order ID",
      emptyError: "Enter an order ID first.",
    },
    stock: {
      label: "Product",
      hint: "e.g. blue running shoes size 9",
      placeholder: "Enter a product name or description",
      emptyError: "Enter a product to check first.",
    },
  };

  function init() {
    els.tabReturns.addEventListener("click", () => switchCategory("returns"));
    els.tabStock.addEventListener("click",