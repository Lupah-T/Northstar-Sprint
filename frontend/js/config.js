/**
 * Northstar Support Assistant — configuration
 *
 * Adjust API_BASE_URL and the endpoint paths once Member 1 (Backend/API)
 * confirms the real routes. Everything else in app.js reads from here,
 * so this is the ONLY file you should need to touch to go from demo to live.
 */

const CONFIG = {
  // Toggle this to false once the real backend is deployed and reachable.
  DEMO_MODE: true,

  // Base URL of Member 1's backend. Update when it's deployed
  // (e.g. "https://northstar-api.onrender.com" or a local dev URL).
  API_BASE_URL: "http://localhost:3000",

  ENDPOINTS: {
    // Expected: GET {API_BASE_URL}/api/returns/:orderId
    returns: (orderId) => `/api/returns/${encodeURIComponent(orderId)}`,

    // Expected: GET