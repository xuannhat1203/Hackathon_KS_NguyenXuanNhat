<template>
    <div class="container">
      <div class="sidebar">
        <Sideleft></Sideleft>
      </div>
      <div class="main-content">
        <div class="header">
          <h2>Header</h2>
        </div>
        <div class="user-management">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in paginatedProducts" :key="index">
                <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.price }}</td>
                <td>{{ user.category }}</td>
                <td class="option-buttons">
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Pagination Controls -->
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Sideleft from './Sideleft.vue';
  
  // Mảng sản phẩm (products) như trước
  const products = [
    { id: 1, name: "Laptop Dell XPS 13", price: 1500, category: "Electronics" },
    { id: 2, name: "iPhone 14 Pro", price: 1200, category: "Mobile" },
    { id: 3, name: "Samsung Galaxy S23", price: 1100, category: "Mobile" },
    { id: 4, name: "Sony WH-1000XM5", price: 350, category: "Headphones" },
    { id: 5, name: "Apple MacBook Air M2", price: 1400, category: "Electronics" },
    { id: 6, name: "ASUS ROG Strix G15", price: 1700, category: "Electronics" },
    { id: 7, name: "Nike Air Force 1", price: 120, category: "Shoes" },
    { id: 8, name: "Adidas Ultraboost", price: 180, category: "Shoes" },
    { id: 9, name: "LG OLED TV 55", price: 1300, category: "Electronics" },
    { id: 10, name: "Bose SoundLink Revolve+", price: 300, category: "Speakers" },
    { id: 11, name: "Google Pixel 8", price: 1000, category: "Mobile" },
    { id: 12, name: "Xiaomi Mi 12", price: 800, category: "Mobile" },
    { id: 13, name: "Sony PlayStation 5", price: 500, category: "Gaming" },
    { id: 14, name: "Microsoft Xbox Series X", price: 550, category: "Gaming" },
    { id: 15, name: "JBL Flip 6", price: 120, category: "Speakers" },
    { id: 16, name: "Canon EOS R6", price: 2500, category: "Cameras" },
    { id: 17, name: "GoPro Hero 11", price: 400, category: "Cameras" },
    { id: 18, name: "Fitbit Charge 5", price: 180, category: "Wearables" },
    { id: 19, name: "Garmin Fenix 7", price: 700, category: "Wearables" },
    { id: 20, name: "Sony Alpha A7 IV", price: 3000, category: "Cameras" }
  ];
  const router = useRouter();
  const currentPage = ref(1);
  const itemsPerPage = ref(5);
  const totalPages = computed(() => Math.ceil(products.length / itemsPerPage.value));
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return products.slice(start, end);
  });
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 200px;
    background-color: #333;
    color: white;
    padding-top: 10px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar li {
    padding: 10px 20px;
    cursor: pointer;
  }

  .main-content {
    flex-grow: 1;
    background-color: #f9f9f9;
  }
  
  .header {
    background-color: #e9ecef;
    padding: 15px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .user-management {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f8f9fa;
    text-align: center;
  }
  
  td {
    text-align: center;
  }
  
  .option-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .edit-btn,
  .delete-btn {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-btn {
    background-color: #ffc107;
    color: white;
  }
  
  .edit-btn:hover {
    background-color: #e0a800;
  }
  
  .delete-btn {
    background-color: #dc3545;
    color: white;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
  }
  
  .pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 8px 16px;
    cursor: pointer;
  }
  .active{
    background-color: #fff;
  }
  </style>
  