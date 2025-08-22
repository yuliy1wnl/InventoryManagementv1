document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal");
  const form = document.getElementById("productForm");
  const modalTitle = document.getElementById("modalTitle");
  const brandInput = document.getElementById("productBrand");
  const editRowId = document.getElementById("editRowId");

  const productId = document.getElementById("productId");
  const productName = document.getElementById("productName");
  const productStock = document.getElementById("productStock");
  const productPrice = document.getElementById("productPrice");

  const cancelBtn = document.querySelector(".cancel-btn");
  const addProductBtn = document.getElementById("addProductBtn");
  const brandButtons = document.querySelectorAll(".brand-btn");
  const searchInput = document.getElementById("searchInput");
  const inventoryContainer = document.getElementById("inventoryContainer");

  let inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || {
    "NVIDIA": [
      { id: "NV001", name: "RTX 4090", stock: 10, price: 1599 },
      { id: "NV002", name: "RTX 4080", stock: 8, price: 1199 }
    ],
    "AMD": [
      { id: "AMD001", name: "RX 7900 XTX", stock: 12, price: 999 }
    ],
    "Intel": [
      { id: "INT001", name: "Arc A770", stock: 6, price: 349 }
    ]
  };

  function saveData() {
    localStorage.setItem("inventoryData", JSON.stringify(inventoryData));
  }

  function getActiveBrands() {
    return Array.from(brandButtons)
      .filter(btn => btn.classList.contains("active"))
      .map(btn => btn.dataset.brand);
  }

  // --- Create Sections Dynamically ---
  function renderSections() {
    inventoryContainer.innerHTML = "";
    Object.keys(inventoryData).forEach(brand => {
      const section = document.createElement("section");
      section.classList.add("inventory-section");
      section.dataset.brand = brand;
      section.innerHTML = `
        <h2>${brand} GPUs</h2>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      `;
      inventoryContainer.appendChild(section);
    });
    renderTable();
  }

  function renderTable() {
    const activeBrands = getActiveBrands();
    const searchText = searchInput.value.toLowerCase();

    document.querySelectorAll(".inventory-section").forEach(section => {
      const brand = section.dataset.brand;
      const tbody = section.querySelector("tbody");
      tbody.innerHTML = "";

      if (!activeBrands.includes(brand)) {
        section.style.display = "none";
        return;
      } else {
        section.style.display = "block";
      }

      inventoryData[brand]?.forEach((gpu, index) => {
        if (gpu.id.toLowerCase().includes(searchText) || gpu.name.toLowerCase().includes(searchText)) {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${gpu.id}</td>
            <td>${gpu.name}</td>
            <td>${gpu.stock}</td>
            <td>${gpu.price}</td>
            <td>
              <button class="edit" data-brand="${brand}" data-index="${index}">Edit</button>
              <button class="delete" data-brand="${brand}" data-index="${index}">Delete</button>
            </td>
          `;
          tbody.appendChild(row);
        }
      });
    });
  }

  // --- Initial Render ---
  renderSections();

  // --- Brand Filter ---
  brandButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      renderTable();
    });
  });

  // --- Search ---
  searchInput.addEventListener("input", renderTable);

  // --- Add Product ---
  addProductBtn.addEventListener("click", () => {
    modalTitle.textContent = "Add Product";
    form.reset();
    editRowId.value = "";
    modal.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

  // --- Save / Edit ---
  form.addEventListener("submit", e => {
    e.preventDefault();
    const brand = brandInput.value;
    const data = {
      id: productId.value.trim(),
      name: productName.value.trim(),
      stock: parseInt(productStock.value),
      price: parseFloat(productPrice.value)
    };

    if (!inventoryData[brand]) inventoryData[brand] = [];

    if (editRowId.value === "") inventoryData[brand].push(data);
    else inventoryData[brand][editRowId.value] = data;

    saveData();
    renderSections();
    modal.classList.add("hidden");
  });

  // --- Edit / Delete ---
  inventoryContainer.addEventListener("click", e => {
    if (e.target.classList.contains("edit")) {
      const brand = e.target.dataset.brand;
      const index = e.target.dataset.index;
      const gpu = inventoryData[brand][index];

      modalTitle.textContent = `Edit ${brand} GPU`;
      brandInput.value = brand;
      editRowId.value = index;
      productId.value = gpu.id;
      productName.value = gpu.name;
      productStock.value = gpu.stock;
      productPrice.value = gpu.price;

      modal.classList.remove("hidden");
    }

    if (e.target.classList.contains("delete")) {
      const brand = e.target.dataset.brand;
      const index = e.target.dataset.index;
      if (confirm(`Delete ${inventoryData[brand][index].name}?`)) {
        inventoryData[brand].splice(index, 1);
        saveData();
        renderSections();
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', init);

document.addEventListener("DOMContentLoaded", ()=>{
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item =>{
    item.addEventListener("click",()=>{
      const text = item.innerText.trim();

      if(text === "Dashboard"){
        window.location.href = "dashboard.html";
      }
    }); 
  });
});

