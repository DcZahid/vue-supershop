<template>
    <!-- Table Start -->
    <div class="container-fluid pt-4 px-4 vh-100">
        <div class="row g-4 vh-100">
            <div class="col-12">
                <router-link class="btn btn-primary" :to="{name:'addsale'}">add Sale</router-link>
                <div class="bg-light rounded h-100 p-4">
                    <h6 class="mb-4">sale List</h6>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Invoice</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Category</th>
                                <th scope="col">Sub Category</th>
                                <th  scope="col">Brand</th>
                                <th  scope="col">Product</th>
                                <th  scope="col">Unit</th>
                                <th  scope="col">Price</th>
                                <th  scope="col">Quantity</th>
                                <th  scope="col">Total Price</th>
                                <th  scope="col">Payment</th>
                                <th  scope="col">Date</th>
                                <th  scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody v-for="(d, i) in saleList" :key="i">
                            <tr>
                                <td scope="row">{{ i + 1 }}</td>
                                <td>{{ d.invoice_id}}</td>
                                <td>{{ d.customer.teamable.name}}</td>
                                <td>{{ d.category.name}}</td>
                                <td>{{ d.sub_category.name}}</td>
                                <td>{{ d.brand.name}}</td>
                                <td>{{ d.product.name }}</td>
                                <td>{{ d.unit.name }}</td>
                                 <td>{{ d.sale_price }}</td>
                                <td>{{ d.quantity }}</td>
                                <td>{{( d.quantity * d.sale_price) }}</td>
                                <td>{{ d.payment.method }}</td>
                                <td>{{ d.date }}</td>
                                <td width='150px'>
                                    <button @click="showsale(d.id)" class="btn btn-primary">Edit</button>
                                    <button @click="deleteEmployee(d.id)" class="btn btn-danger">Delete</button>
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
            saleList: [],
            id:0,
        }
    },
    methods: {
        getsale() {
            axios.get('http://127.0.0.1:8000/api/rubon/sale')
                .then((res) => {
                    this.saleList = res.data.data
                    // console.log(res.data.data)
                });
        },
        showsale(id){
            this.$router.push({name:'editsale',params: { id: id }})
        },
        deleteEmployee(id){
            axios.delete("http://127.0.0.1:8000/api/rubon/sale/" + id)
            .then(() => {
                console.log("sale deleted successfully.");
                this.getsale()
            })
            .catch((error)=>{
                console.error("Error deleting sale:",error);
            });
        }
    },
    mounted() {
        this.getsale()
    }
}
</script>