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
          <div class="title-row">
            <h2>Manager User</h2>
            <button @click="addNewUser" class="add-user-btn">Add New User</button>
            <input v-model="inputValue" type="text" placeholder="Tìm kiếm người dùng" />
            <button @click="handleSearch">Tìm kiếm</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Gender</th>
                <th>DateOfBirth</th>
                <th>Email</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.gender }}</td>
                <td>{{ user.dateOfBirth }}</td>
                <td>{{ user.email }}</td>
                <td class="option-buttons">
                  <button @click="editUser(user.name)" class="edit-btn">Edit</button>
                  <button @click="deleteUser(user.name)" class="delete-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="isAdd">
        <form @submit.prevent="confirmAdd">
          <h2>Add User</h2>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="nameUser"
              type="text"
              id="name"
              name="name"
              required
            />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </div>
          <div class="form-group">
            <label>Gender</label>
            <div class="radio-group">
              <label><input v-model="gender" type="radio" name="gender" value="male" /> Male</label>
              <label><input v-model="gender" type="radio" name="gender" value="female" /> Female</label>
              <label><input v-model="gender" type="radio" name="gender" value="other" /> Other</label>
            </div>
            <span v-if="errors.gender" class="error">{{ errors.gender }}</span>
          </div>
          <div class="form-group">
            <label for="dob">Date Of Birth</label>
            <input
              v-model="date"
              type="date"
              id="dob"
              name="dob"
              required
            />
            <span v-if="errors.date" class="error">{{ errors.date }}</span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              required
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>
          <div class="button-group">
            <button @click="closeFormAdd" type="button" class="close">Close</button>
            <button type="submit" class="save">Save</button>
          </div>
        </form>
      </div>
      <div v-show="isEdit">
        <form>
          <h2>Edit User</h2>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="nameUser"
              type="text"
              id="name"
              name="name"
              required
            />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </div>
          <div class="form-group">
            <label>Gender</label>
            <div class="radio-group">
              <label><input v-model="gender" type="radio" name="gender" value="male" /> Male</label>
              <label><input v-model="gender" type="radio" name="gender" value="female" /> Female</label>
              <label><input v-model="gender" type="radio" name="gender" value="other" /> Other</label>
            </div>
            <span v-if="errors.gender" class="error">{{ errors.gender }}</span>
          </div>
          <div class="form-group">
            <label for="dob">Date Of Birth</label>
            <input
              v-model="date"
              type="date"
              id="dob"
              name="dob"
              required
            />
            <span v-if="errors.date" class="error">{{ errors.date }}</span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              required
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>
          <div class="button-group">
            <button @click="closeFormEdit" type="button" class="close">Close</button>
            <button @click="submitEdit" class="save">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import swal from 'sweetalert';
import { useRouter } from "vue-router";
import Sideleft from "./Sideleft.vue";
  // const users = [
  //       {
  //         name: "John Doe",
  //         gender: "Male",
  //         dateOfBirth: "1990-01-01",
  //         email: "john.doe@example.com",
  //       },
  //       {
  //         name: "Jane Smith",
  //         gender: "Female",
  //         dateOfBirth: "1992-03-15",
  //         email: "jane.smith@example.com",
  //       },
  //       {
  //         name: "Mike Johnson",
  //         gender: "Male",
  //         dateOfBirth: "1988-06-21",
  //         email: "mike.johnson@example.com",
  //       },
  //       {
  //         name: "Emily Davis",
  //         gender: "Female",
  //         dateOfBirth: "1995-07-12",
  //         email: "emily.davis@example.com",
  //       },
  //       {
  //         name: "Robert Brown",
  //         gender: "Male",
  //         dateOfBirth: "1987-11-30",
  //         email: "robert.brown@example.com",
  //       },
  //       {
  //         name: "Lisa White",
  //         gender: "Female",
  //         dateOfBirth: "1993-02-19",
  //         email: "lisa.white@example.com",
  //       },
  //       {
  //         name: "David Miller",
  //         gender: "Male",
  //         dateOfBirth: "1994-09-10",
  //         email: "david.miller@example.com",
  //       },
  //       {
  //         name: "Sarah Wilson",
  //         gender: "Female",
  //         dateOfBirth: "1991-05-25",
  //         email: "sarah.wilson@example.com",
  //       },
  //       {
  //         name: "Chris Lee",
  //         gender: "Male",
  //         dateOfBirth: "1990-12-11",
  //         email: "chris.lee@example.com",
  //       },
  //       {
  //         name: "Anna Taylor",
  //         gender: "Female",
  //         dateOfBirth: "1989-08-17",
  //         email: "anna.taylor@example.com",
  //       },
  //     ];
  //       localStorage.setItem("users",JSON.stringify(users));
  const listUser = ref(JSON.parse(localStorage.getItem("users")));
  const nameUser = ref("");
  const gender = ref("");
  const email = ref("");
  const date = ref("");
  const isAdd = ref(false);
  const isEdit = ref(false);
  const errors = ref({});
  const nameUserEdit = ref("");
  const inputValue = ref("");
  const router = useRouter();
  const users = ref(listUser.value); 
  const handleSearch = () => {
      const keyword = inputValue.value.toLowerCase();
      if (keyword === "") {
          users.value = listUser.value; 
      } else {
          const find = listUser.value.filter((user) =>
              user.name.toLowerCase().includes(keyword)
          );
          users.value = find;
      }
  };
  
  const addNewUser = () => {
    isAdd.value = !isAdd.value;
  };
  
  const closeFormAdd = () => {
    isAdd.value = false;
    clearForm(); 
  };
  const closeFormEdit = () => {
  isEdit.value = false;
    clearForm(); 
  }
  const clearForm = () => {
    nameUser.value = "";
    gender.value = "";
    email.value = "";
    date.value = "";
    errors.value = {}; 
  };
  
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  
  const isUniqueEmail = (email) => {
    return !listUser.value.some((user) => user.email === email);
  };
  
  const isDateValid = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate <= today;
  };
  
  const validateForm = () => {
    errors.value = {};
    let valid = true;
  
    if (!nameUser.value.trim()) {
      errors.value.name = "Name is required";
      valid = false;
    }
    if (!email.value.trim()) {
      errors.value.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(email.value)) {
      errors.value.email = "Email format is invalid";
      valid = false;
    } else if (!isUniqueEmail(email.value)) {
      errors.value.email = "Email already exists";
      valid = false;
    }
  
    if (!date.value) {
      errors.value.date = "Date of Birth is required";
      valid = false;
    } else if (!isDateValid(date.value)) {
      errors.value.date = "Date of Birth cannot be in the future";
      valid = false;
    }
    return valid;
  };
  
  const confirmAdd = () => {
    if (!validateForm()) {
      return;
    }
    const newUser = {
      name: nameUser.value,
      gender: gender.value,
      email: email.value,
      dateOfBirth: date.value,
    };
  
    listUser.value.push(newUser);
    localStorage.setItem("users", JSON.stringify(listUser.value));
    clearForm();
    isAdd.value = false; 
  };
  const deleteUser = (name) => {
    const filteredUsers = listUser.value.filter((user) => user.name !== name);
    swal({
      title: "Xác nhận xóa",
      text: "Bạn chắc chắn muốn xóa người dùng này chứ ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        listUser.value = filteredUsers;
        localStorage.setItem("users", JSON.stringify(listUser.value));
        swal("Xóa thành công người dùng", {
          icon: "success",
        });
      } else {
        swal("Hủy xóa người dùng");
      }
    });
  };
  const editUser = (name) => {
    isEdit.value = true;
    const find = listUser.value.find((user)=>user.name === name);
    nameUser.value = find.name;
    gender.value = find.gender;
    email.value = find.email;
    date.value = find.dateOfBirth;
    nameUserEdit.value = find.name;
  };
  const submitEdit = () => {
    const userIndex = listUser.value.findIndex((user) => user.name === nameUserEdit.value);
    if (userIndex !== -1) {
      if (!validateForm()) return;
      listUser.value[userIndex] = {
        name: nameUser.value,
        gender: gender.value,
        email: email.value,
        dateOfBirth: date.value,
      };
      localStorage.setItem("users", JSON.stringify(listUser.value));
      clearForm();
      isEdit.value = false;
    } else {
      console.error("User không tồn tại!");
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
  
  .sidebar li.active {
    background-color: #555;
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
  
  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .add-user-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .add-user-btn:hover {
    background-color: #0056b3;
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
  /* Centering the form in the middle of the screen */
  form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    
    /* Center horizontally and vertically */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    /* Optional: make form scrollable if too tall */
    max-height: 90vh;
    overflow-y: auto;
  }
  
  /* Header styles */
  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }
  
  /* Form Group */
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group input[type="date"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
    transition: border-color 0.3s ease;
  }
  
  .form-group input[type="text"]:focus,
  .form-group input[type="email"]:focus,
  .form-group input[type="date"]:focus {
    border-color: #007bff;
    outline: none;
  }
  
  /* Radio Group */
  .radio-group {
    display: flex;
    gap: 10px;
  }
  
  .radio-group label {
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
  }
  
  .radio-group input[type="radio"] {
    margin-right: 5px;
  }
  
  /* Button Group */
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .button-group button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .button-group .close {
    background-color: #f44336;
    color: #fff;
    transition: background-color 0.3s ease;
  }
  
  .button-group .close:hover {
    background-color: #d32f2f;
  }
  
  .button-group .save {
    background-color: #4caf50;
    color: #fff;
    transition: background-color 0.3s ease;
  }
  
  .button-group .save:hover {
    background-color: #388e3c;
  }
  
  </style>
  