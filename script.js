/* Simple hash router + page components
   Meets requirements:
   - top nav swaps between “pages” using JS
   - logo click -> home (#/)
   - hover + active feedback (CSS + indicator)
   - footer year + acknowledgement
*/

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const routes = {
  "/": homeView,
  "/televisions": televisionsView,
  "/about": aboutView,
};

function homeView() {
  return `
    <section class="grid cols-2">
      <article class="card">
        <h1>Welcome to Appliance Energy</h1>
        <p>This demo website showcases HTML, CSS, and JavaScript with a lightweight client-side router and a style inspired by the power icon.</p>
        <p>We include placeholder content about appliance energy consumption in the Australian market—e.g., how to read energy labels, typical kWh for common appliances, and simple bill estimates.</p>
        <div class="notice"><strong>Tip:</strong> Energy cost ≈ <em>power (kW) × hours × tariff ($/kWh)</em>. For example, a 0.08&nbsp;kW appliance for 5&nbsp;hours at $0.30/kWh ≈ $0.12.</div>
      </article>

      <article class="card">
        <h2>Australia’s Energy Rating Label (placeholder)</h2>
        <ul>
          <li>Star ratings indicate comparative efficiency within similar product sizes.</li>
          <li>The annual energy consumption (kWh/yr) helps estimate running costs.</li>
          <li>Actual costs depend on usage patterns and your tariff.</li>
        </ul>
        <p><em>Reference placeholder: Australian Government Energy Rating framework.</em></p>
      </article>
    </section>
  `;
}

function televisionsView() {
  return `
    <section class="grid">
      <article class="card">
        <h1>Televisions — Energy Overview</h1>
        <p>Modern LED/LCD TVs vary by size, panel type, and settings. Typical annual consumption ranges roughly from ~60–250 kWh/yr depending on size and features (placeholder figures for demo).</p>
        <table class="table">
          <thead><tr><th>Size</th><th>Typical Power (W)</th><th>Est. kWh/yr*</th></tr></thead>
          <tbody>
            <tr><td>32"</td><td>35–50</td><td>60–80</td></tr>
            <tr><td>43"</td><td>55–85</td><td>90–130</td></tr>
            <tr><td>55"</td><td>80–120</td><td>120–180</td></tr>
            <tr><td>65"</td><td>110–170</td><td>160–230</td></tr>
          </tbody>
        </table>
        <p style="font-size:.9rem;opacity:.8">*Very rough demo estimates. Real values vary by model, settings, and usage.</p>
      </article>

      <article class="card">
        <h2>Quick Cost Estimator</h2>
        <div class="form-row">
          <div>
            <label for="power">Average power (W)</label><br/>
            <input id="power" type="number" min="1" value="100" />
          </div>
          <div>
            <label for="hours">Daily viewing (hours)</label><br/>
            <input id="hours" type="number" step="0.1" min="0" value="4" />
          </div>
          <div>
            <label for="tariff">Tariff ($/kWh)</label><br/>
            <input id="tariff" type="number" step="0.01" min="0" value="0.30" />
          </div>
          <div>
            <button class="button" id="calc">Calculate</button>
          </div>
        </div>
        <p id="result" class="notice" style="margin-top:.75rem">Enter your values and click Calculate.</p>
      </article>
    </section>
  `;
}

function aboutView() {
  return `
    <article class="card">
      <h1>About Us</h1>
      <p>This site is a small interactive demonstration for COS30045 (Task T01). It shows:</p>
      <ul>
        <li>HTML structure and accessible navigation</li>
        <li>CSS styling themed to the logo</li>
        <li>JavaScript routing (no page reloads)</li>
        <li>Simple interactive calculator</li>
        <li>Deployed via GitHub → Vercel</li>
      </ul>

      <h2>GenAI Usage</h2>
      <p>Short notes about GitHub Copilot usage appear in the README. </p>
    </article>
  `;
}

/* Router + nav indicator */
const app = $("#app");
const navButtons = $$(".topnav__link");
const indicator = $(".topnav__indicator");

function render() {
  const path = location.hash.replace("#", "") || "/";
  const view = routes[path] ?? routes["/"];
  app.innerHTML = view();

  // focus main for accessibility
  app.focus();

  // update title + active nav
  document.title = `Appliance Energy | ${titleFromPath(path)}`;
  navButtons.forEach(btn => {
    const active = btn.dataset.route === `#${path}`;
    btn.setAttribute("aria-current", active ? "page" : "false");
    if (active) moveIndicatorTo(btn);
  });

  // attach TV calculator handler if present
  const calcBtn = $("#calc");
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const W = Number($("#power").value || 0);
      const hrs = Number($("#hours").value || 0);
      const tariff = Number($("#tariff").value || 0);
      const kWhPerDay = (W / 1000) * hrs;
      const costPerDay = kWhPerDay * tariff;
      const costPerYear = costPerDay * 365;
      $("#result").innerHTML = `
        <strong>Estimate:</strong> ${kWhPerDay.toFixed(3)} kWh/day ·
        $${costPerDay.toFixed(2)}/day ·
        ~$${costPerYear.toFixed(2)}/year
      `;
    });
  }
}

function titleFromPath(p){
  if (p === "/") return "Home";
  if (p.includes("televisions")) return "Televisions";
  if (p.includes("about")) return "About Us";
  return "Home";
}

function moveIndicatorTo(el){
  const nav = el.parentElement;
  const navRect = nav.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const left = r.left - navRect.left + 3; // padding compensation
  indicator.style.width = `${r.width - 6}px`;
  indicator.style.transform = `translateX(${left}px)`;
}

/* bind nav buttons */
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const route = btn.dataset.route;
    if (route) location.hash = route;
  });
});

/* logo click -> home (already anchor to #/) */

/* boot */
window.addEventListener("hashchange", render);
window.addEventListener("load", () => {
  $("#year").textContent = new Date().getFullYear();
  if (!location.hash) location.hash = "#/"; // default
  render();
});

