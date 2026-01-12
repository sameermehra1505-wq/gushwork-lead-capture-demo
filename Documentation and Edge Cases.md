
## How I Would Roll This Out to 3 Different Customers

To roll this system out to multiple customers, I would treat the lead capture script and automation workflow as **shared infrastructure**, while keeping customer-specific details configurable.

For each customer, the rollout would follow these steps:

1. **Customer Setup**

   * Assign a unique `customer_name`
   * Define the primary contact (POC email)
   * Create a dedicated Google Sheet (or tab) for that customer

2. **Script Deployment**

   * The same universal `lead-capture.js` script would be reused
   * Only configuration values (customer name, webhook URL, optional source labels) would differ
   * The script would be embedded on the customer’s website regardless of CMS (static site, WordPress, custom HTML, etc.)

3. **Workflow Configuration**

   * The n8n workflow would remain the same
   * Customer-specific routing (sheet destination, notification email) would be driven by metadata in the payload
   * This avoids maintaining separate workflows per customer and keeps operations scalable

This approach allows onboarding new customers quickly while maintaining a single, maintainable system.

## Scenarios and Edge Cases Accounted For

While designing the system, I considered several real-world scenarios that commonly affect lead quality and reliability:

* **Incomplete Submissions**
  Forms missing critical fields like email or name are flagged early and do not trigger notifications.

* **Spam or Low-Quality Leads**
  Leads that fail validation checks or score below a confidence threshold are marked as “Possible Spam” and stored without notifying the sales team.

* **Duplicate or Repeated Submissions**
  The workflow is designed so duplicate logic (email or phone-based) can be easily added without changing the frontend.

* **Browser and Network Issues**
  The webhook responds immediately to avoid frontend timeouts, ensuring a smooth user experience even if downstream steps fail.

* **Cross-Origin Requests (CORS)**
  Since leads originate from a hosted webpage, browser security restrictions were handled explicitly to allow safe cross-origin submissions.

Overall, the goal was to ensure that **only meaningful, actionable leads reach the customer**, while still preserving data for review and analysis.

## What I Would Build Next With 2 More Weeks

If I had two additional weeks, I would focus on making the system more robust and customer-friendly:

1. **Advanced Spam Protection**

   * Honeypot fields and basic bot detection
   * Optional CAPTCHA or rate limiting for high-traffic sites

2. **Lead Deduplication**

   * Automatically flag repeated leads based on email or phone
   * Prevent duplicate notifications to sales teams

3. **CRM Integration**

   * Sync qualified leads directly to tools like HubSpot or Salesforce
   * Keep Google Sheets as a lightweight fallback or audit log

4. **Customer Dashboard**

   * A simple dashboard to view lead volume, quality trends, and conversion signals
   * This could be built on top of Sheets or a lightweight analytics layer

These improvements would make the system more scalable and closer to a full production-ready lead management platform.

## How I Would Troubleshoot If Leads Aren’t Being Captured

If leads were not being captured, I would debug the system step by step, starting from the frontend and moving backward:

1. **Frontend Verification**

   * Check browser console and network tab to confirm the form submission is firing
   * Ensure the webhook request is being sent successfully

2. **Webhook Validation**

   * Verify the n8n workflow is active and using the production webhook URL
   * Check execution logs to confirm whether requests are reaching the workflow

3. **Workflow Debugging**

   * Inspect each node’s input and output to identify where data may be failing
   * Temporarily disable downstream nodes to isolate the issue

4. **Storage and Notification Checks**

   * Confirm Google Sheets permissions and column mappings
   * Verify email credentials and conditional logic

This structured approach ensures issues can be identified quickly without guessing, and mirrors how production systems are typically debugged.

### Closing Note

The system is built in such a way that it can used in real world scenarios , rather than manually adding dummy data and checking the Workflow Output

