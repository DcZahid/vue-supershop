<template>
    <div class="container-fluid pt-4 px-4">
      <div class="row g-4">
        <div class="col-sm-12 col-xl-12">
          <div class="bg-light rounded h-100 p-4">
            <h6 class="mb-4">Product Form</h6>
  
            <div v-for="(product, index) in products" :key="index" class="mb-3">
              <div class="mb-3">
                <!-- Category Selection -->
                <label for="category" class="form-label">Category Name</label>
                <select v-model="product.category_id" @change="fetchSubCategories(index)" class="form-select mb-3">
                  <option value="0">Choose Category Name</option>
                  <option v-for="(category, i) in categoryList" :key="i" :value="category.id">{{ category.name }}</option>
                </select>
              </div>
  
              <div class="mb-3">
                <!-- SubCategory Selection -->
                <label for="subCategory" class="form-label">SubCategory Name</label>
                <select v-model="product.sub_category_id" class="form-select mb-3" :disabled="product.sub_categoryList.length === 0">
                  <option value="0">Choose SubCategory Name</option>
                  <option v-for="(subCategory, i) in product.sub_categoryList" :key="i" :value="subCategory.id">{{ subCategory.name }}</option>
                </select>
              </div>
  
              <div class="mb-3">
                <!-- Brand Selection -->
                <label for="brand" class="form-label">Brand Name</label>
                <select v-model="product.brand_id" class="form-select mb-3">
                  <option value="0">Choose Brand Name</option>
                  <option v-for="(brand, i) in brandList" :key="i" :value="brand.id">{{ brand.name }}</option>
                </select>
              </div>
  
              <div class="mb-3">
                <!-- Product Name -->
                <label for="productName" class="form-label">Product Name</label>
                <input type="text" class="form-control" v-model="product.name" required>
              </div>
  
              <button @click="removeProduct(index)" class="btn btn-danger mt-2">Remove</button>
            </div>
  
            <button @click="addProduct" class="btn btn-secondary mt-2">Add Product</button>
            <button @click="save" class="btn btn-primary mt-2">Save All</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        categoryList: [],
        brandList: [],
        products: [
          {
            name: '',
            category_id: 0,
            sub_category_id: 0,
            brand_id: 0,
            sub_categoryList: []
          }
        ]
      };
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/zahid/category");
          this.categoryList = response.data.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async fetchBrands() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/zahid/brand");
          this.brandList = response.data.data;
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      },
      async fetchSubCategories(index) {
        if (this.products[index].category_id) {
          try {
            const response = await axios.get("http://127.0.0.1:8000/api/zahid/sub_category", {
              params: { category_id: this.products[index].category_id }
            });
            this.products[index].sub_categoryList = response.data.data;
          } catch (error) {
            console.error('Error fetching subcategories:', error);
          }
        } else {
          this.products[index].category.sub_categoryList = [];
        }
      },
      addProduct() {
        this.products.push({
          name: '',
          category_id: 0,
          sub_category_id: 0,
          brand_id: 0,
          sub_categoryList: []
        });
      },
      removeProduct(index) {
        this.products.splice(index, 1);
      },
      async save() {
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/zahid/product", {
            products: this.products
          });
          console.log(response);
          this.resetForm();
          this.$router.push({ name: 'product' });
        } catch (error) {
          console.error('Error saving products:', error);
        }
      },
      resetForm() {
        this.products = [
          {
            name: '',
            category_id: 0,
            sub_category_id: 0,
            brand_id: 0,
            sub_categoryList: []
          }
        ];
      }
    },
    mounted() {
      this.fetchCategories();
      this.fetchBrands();
    }
  };
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 10px;
  }
  </style>
  