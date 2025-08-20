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

  // Sample starter data
  const inventoryData = {
    "NVIDIA": [
      { id: "NV001", name: "RTX 4090", stock: 10, price: 1599 },
      { id: "NV002", name: "RTX 4080", stock: 8, price: 1199 },
    ],
    "AMD": [
      { id: "AMD001", name: "RX 7900 XTX", stock: 12, price: 999 },
    ],
    "Intel": [
      { id: "INT001", name: "Arc A770", stock: 6, price: 349 },
    ]
  };

  // Render tables
  function renderTable(brand) {
    const tbody = document.querySelector(`section[data-brand="${brand}"] tbody`);
    tbody.innerHTML = "";

    inventoryData[brand].forEach((gpu, index) => {
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
    });
  }

  function renderAll() {
    Object.keys(inventoryData).forEach(renderTable);
  }

  renderAll();

  // Add product button
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const brand = e.target.closest("section").dataset.brand;
      modalTitle.textContent = `Add ${brand} GPU`;
      brandInput.value = brand;
      editRowId.value = "";
      form.reset();
      modal.classList.remove("hidden");
    });
  });

  // Cancel button
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Save product
  form.addEventListener("submit", e => {
    e.preventDefault();
    const brand = brandInput.value;
    const data = {
      id: productId.value,
      name: productName.value,
      stock: parseInt(productStock.value),
      price: parseFloat(productPrice.value),
    };

    if (editRowId.value === "") {
      inventoryData[brand].push(data);
    } else {
      inventoryData[brand][editRowId.value] = data;
    }

    renderTable(brand);
    modal.classList.add("hidden");
  });

  // Edit & Delete actions
  document.body.addEventListener("click", e => {
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
      inventoryData[brand].splice(index, 1);
      renderTable(brand);
    }
  });
});