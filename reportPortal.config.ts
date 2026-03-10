
module.exports = {
  endpoint: "https://demo.reportportal.io/api/v1",       // ReportPortal server URL
  apiKey: "YreportPortalKo_jlJli1GcRcSMUIMBoOtSZoh8IFuuXA8Iwo-JfL-paHrjdHEP0Vy8F2N_kyGrqWXc",                                   // Palitan ng token mo mula sa API KEYS tab
  project: "Sample Project",                  // Project name mo sa dashboard
  launch: "Playwright Launch",                          // Pangalan ng launch
  description: "My awesome launch",                     // Optional description
  attributes: [
    { key: "env", value: "uat" },
    { value: "smoke" }
  ],
  mode: 'DEFAULT'                                       // DEFAULT mode recommended
};