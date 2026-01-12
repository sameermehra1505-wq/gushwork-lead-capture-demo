(function () {
  const WEBHOOK_URL = "https://n8n.srv1255557.hstgr.cloud/webhook/6848af3f-7c64-4010-9eb5-e4c7bf4aa6f8";

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("lead-form");
    const statusEl = document.getElementById("status");

    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const payload = {};

      formData.forEach((value, key) => {
        payload[key] = value;
      });

      payload.source_url = window.location.href;
      payload.timestamp = new Date().toISOString();
      payload.customer_name = "Gushwork Demo Client";

      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        statusEl.innerText = "✅ Thank you! We’ll get back to you shortly.";
        form.reset();
      } catch (err) {
        statusEl.innerText = "❌ Something went wrong. Please try again.";
      }
    });
  });
})();
