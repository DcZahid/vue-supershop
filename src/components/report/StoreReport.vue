<template>
    <!-- Table Start -->
    <div class="container-fluid pt-4 px-4 vh-100">
        <div class="row g-4 vh-100">
            <div class="col-12">
                <!-- <router-link class="btn btn-primary" :to="{name:'addproduct'}">add product</router-link> -->
                <div class="bg-light rounded h-100 p-4">
                    <h6 class="mb-4">Product store Report</h6>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Sub Category Name</th>
                                <th scope="col">Brand Name</th>
                                <th scope="col">Purchase Quantity</th>
                                <th scope="col">Sale Quantity</th>
                                <th scope="col">Current Stock</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody v-for="(d, i) in productList" :key="i">
                            <tr>
                                <td scope="row">{{ i + 1 }}</td>
                                <td>{{ d.name }}</td>
                                <td>{{ d.category.name }}</td>
                                <td>{{ d.sub_category.name }}</td>
                                <td>{{ d.brand.name }}</td>

                                <td>
                                    {{totalQuantity(d.purchase) }}
                                </td>

                                <td> {{ totalQuantity(d.sale) }} </td>

                                <td>{{totalQuantity(d.purchase) - totalQuantity(d.sale) }}</td>
                                <td>available</td>
                                <td width='150px'>
                                    <!-- <button @click="showProduct(d.id)" class="btn btn-primary">Edit</button> -->
                                    <button @click="deleteProduct(d.id)" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
    <!-- Table End -->
</template>
<script>
import axios from 'axios';
// import EditProduct from './EditProduct.vue';
export default {
    data() {
        return {
            productList: [],
            id: 0,
        }
    },
    methods: {
        getProduct() {
            axios.get('http://127.0.0.1:8000/api/zahid/product')
                .then((res) => {
                    this.productList = res.data.data
                    // console.log(res.data.data)
                });
        },
        showProduct(id) {
            this.$router.push({ name: 'editproduct', params: { id: id } })
        },
        deleteProduct(id) {
            axios.delete("http://127.0.0.1:8000/api/zahid/product/" + id)
                .then(() => {
                    console.log("Category deleted successfully.");
                    this.getProduct()
                })
                .catch((error) => {
                    console.error("Error deleting category:", error);
                });
        },
        totalQuantity(data) {
            let total = 0;
            if (data.length !== 0) {
                for (let i = 0; i < data.length; i++) {
                    total += data[i].quantity; // Assuming each sale has an 'amount' property
                }
            }
            return total;
        },
    },

    mounted() {
        this.getProduct()

    }
}
</script>