<template>
    <div class="sidebar">
      <ul>
        <li class="dashboard">Dashboard</li>
        <li>
          <router-link active-class="active" to="/admin/manager-user">Manager User</router-link>
        </li>
        <li>
          <router-link active-class="active" to="/admin/manager-product">Manager Product</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style>
    .sidebar {
      width: 200px;
      background-color: #2c3e50;
      color: #ecf0f1; 
      padding-top: 20px;
      height: 100vh;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); 
    }
  
    .sidebar ul {
      list-style-type: none;
      padding: 0;
    }
  
    .sidebar li {
      margin: 10px 0; 
    }
  
    .sidebar li a {
      display: block; 
      padding: 15px 20px; 
      color: inherit;
      text-decoration: none; 
      border-radius: 5px; 
      transition: background-color 0.3s; 
    }
  
    .sidebar li a:hover {
      background-color: #34495e;
    }
  
    .sidebar li a.active {
      background-color: #fff; 
      color: #2c3e50; 
    }
  
    .dashboard {
      font-weight: bold; 
      font-size: 18px; 
      padding: 15px 20px; 
    }
  </style>
  