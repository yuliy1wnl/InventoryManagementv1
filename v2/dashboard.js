// ------ Config ------
// Change this to your backend base URL when you have one.
const API_BASE = '/api'; // e.g., 'http://localhost:5000/api'

// ------ Data Sources ------
// 1) Attempt to fetch from real API.
// 2) If it fails, fallback to zeros (assumed DB present with zero values).

const zeroStats = {
  packed: 0, shipped: 0, delivered: 0, invoiced: 0,
  quantityInHand: 0, quantityToReceive: 0,
  lowStock: 0, itemGroups: 0, allItems: 0, unconfirmed: 0,
  poQty: 0, poCost: 0,
  salesTable: [{ channel: 'Direct sales', draft: 0, confirmed: 0, packed: 0, shipped: 0, invoiced: 0 }],
  activePct: 0
};

async function fetchJSON(path){
  try{
    const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
    if(!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  }catch(err){
    // fallback: zeros
    return null;
  }
}

async function getDashboardData(){
  // If you later create endpoints, you can split requests (e.g., /stats, /inventory, /orders)
  // For now, try a single '/dashboard' endpoint; otherwise use zeros.
  const payload = await fetchJSON('/dashboard');
  return payload || structuredClone(zeroStats);
}

// ------ UI Bindings ------
const dom = {
  packed: document.getElementById('packed'),
  shipped: document.getElementById('shipped'),
  delivered: document.getElementById('delivered'),
  invoiced: document.getElementById('invoiced'),
  qtyInHand: document.getElementById('qtyInHand'),
  qtyToReceive: document.getElementById('qtyToReceive'),
  lowStock: document.getElementById('lowStock'),
  itemGroups: document.getElementById('itemGroups'),
  allItems: document.getElementById('allItems'),
  unconfirmed: document.getElementById('unconfirmed'),
  poQty: document.getElementById('poQty'),
  poCost: document.getElementById('poCost'),
  salesTableBody: document.getElementById('salesTableBody'),
  activePct: document.getElementById('activePct'),
  refreshBtn: document.getElementById('refreshBtn'),
  seedBtn: document.getElementById('seedBtn'),
};

// Chart instance (Active Items %)
let activeChart;
function renderActiveChart(percent=0){
  const ctx = document.getElementById('activeItemsChart').getContext('2d');
  if(activeChart) activeChart.destroy();
  activeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Active', 'Other'],
      datasets: [{
        data: [percent, 100 - percent],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}

function updateSalesTable(rows){
  dom.salesTableBody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.channel}</td>
      <td>${r.draft}</td>
      <td>${r.confirmed}</td>
      <td>${r.packed}</td>
      <td>${r.shipped}</td>
      <td>${r.invoiced}</td>
    `;
    dom.salesTableBody.appendChild(tr);
  });
}

// Render all dashboard widgets
function renderDashboard(data){
  dom.packed.textContent = data.packed;
  dom.shipped.textContent = data.shipped;
  dom.delivered.textContent = data.delivered;
  dom.invoiced.textContent = data.invoiced;

  dom.qtyInHand.textContent = formatNumber(data.quantityInHand);
  dom.qtyToReceive.textContent = formatNumber(data.quantityToReceive);

  dom.lowStock.textContent = data.lowStock;
  dom.itemGroups.textContent = data.itemGroups;
  dom.allItems.textContent = data.allItems;
  dom.unconfirmed.textContent = data.unconfirmed;

  dom.poQty.textContent = data.poQty.toFixed(2);
  dom.poCost.textContent = '₹' + data.poCost.toFixed(2);

  dom.activePct.textContent = `${Math.round(data.activePct)}%`;
  renderActiveChart(data.activePct);

  updateSalesTable(data.salesTable);
}

function formatNumber(n){
  return new Intl.NumberFormat().format(n || 0);
}

// Seed demo data on the frontend (no backend)
function seedDemoData(){
  const demo = {
    ...structuredClone(zeroStats),
    packed: 228, shipped: 6, delivered: 10, invoiced: 474,
    quantityInHand: 10458, quantityToReceive: 168,
    lowStock: 3, itemGroups: 39, allItems: 190, unconfirmed: 121,
    poQty: 2.00, poCost: 46.92,
    activePct: 71,
    salesTable: [{ channel: 'Direct sales', draft: 0, confirmed: 50, packed: 0, shipped: 0, invoiced: 102 }]
  };
  renderDashboard(demo);
}

async function init(){
  // initial load (from API or zeros)
  const data = await getDashboardData();
  renderDashboard(data);

  // events
  dom.refreshBtn.addEventListener('click', async () => {
    dom.refreshBtn.disabled = true;
    dom.refreshBtn.textContent = 'Refreshing...';
    const fresh = await getDashboardData();
    renderDashboard(fresh);
    dom.refreshBtn.textContent = 'Refresh from API';
    dom.refreshBtn.disabled = false;
  });
  dom.seedBtn.addEventListener('click', seedDemoData);
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener("DOMContentLoaded", ()=>{
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item =>{
    item.addEventListener("click",()=>{
      const text = item.innerText.trim();

      if(text === "Inventory"){
        window.location.href = "inventoryv2.html";
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const profileDropdown = document.getElementById("profileDropdown");
  const profileMenu = profileDropdown.querySelector(".profile-menu");

  // Toggle dropdown
  profileDropdown.querySelector(".profile-trigger").addEventListener("click", () => {
    profileMenu.classList.toggle("hidden");
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!profileDropdown.contains(e.target)) {
      profileMenu.classList.add("hidden");
    }
  });

  // View Profile
  document.getElementById("viewProfileBtn").addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "login.html";
    }
  });

  // Dynamic profile name
  const loggedInUser = localStorage.getItem("username") || "Zylker";
  document.getElementById("profileName").textContent = loggedInUser;
});
