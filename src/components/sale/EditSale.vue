<template>
    <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
            <div class="col-sm-12 col-xl-12">
                <div class="bg-light rounded h-100 p-4">
                    <h6 class="mb-4">Edit Sale Form</h6>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Invoice</label>
                        <input type="text" class="form-control" v-model="invoice_id" id="exampleInputEmail1"
                            aria-describedby="emailHelp">

                        <label for="exampleInputEmail1" class="form-label">customer Name</label>
                        <select v-model="customer_id" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Choose customer Name</option>
                            <option v-for="(d, i) in customerList" :key="i" :value="d.id">{{ d.teamable.name }}</option>
                        </select>

                        <label for="exampleInputEmail1" class="form-label">Category Name</label>
                        <select v-model="category_id" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Choose Category Name</option>
                            <option v-for="(d, i) in categoryList" :key="i" :value="d.id">{{ d.name }}</option>
                        </select>

                        <label for="exampleInputEmail1" class="form-label">Sub Category Name</label>
                        <select v-model="sub_category_id" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Choose Sub Category Name</option>
                            <option v-for="(d, i) in sub_categoryList" :key="i" :value="d.id">{{ d.name }}</option>
                        </select>
                        <label for="exampleInputEmail1" class="form-label">Brand Name</label>
                        <select v-model="brand_id" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Choose Brand Name</option>
                            <option v-for="(d, i) in brandList" :key="i" :value="d.id">{{ d.name }}</option>
                        </select>

                        <label for="exampleInputEmail1" class="form-label">Product Name</label>
                        <select v-model="product_id" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Choose Product Name</option>
                            <option v-for="(d, i) in productList" :key="i" :value="d.id">{{ d.name }}</option>
                        </select>

                        <label for="exampleInputEmail1" class="form-label">Unit Name</label>
                        <select v-model="unit_id" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Choose Unit Name</option>
                            <option v-for="(d, i) in unitList" :key="i" :value="d.id">{{ d.name }}</option>
                        </select>

                        <!-- <label for="exampleInputEmail1" class="form-label">Price</label>
                        <input type="number" class="form-control" v-model="price" id="exampleInputEmail1"
                            aria-describedby="emailHelp"> -->

                        <label for="exampleInputEmail1" class="form-label">Sale Price</label>
                        <input type="number" class="form-control" v-model="sale_price" id="exampleInputEmail1"
                            aria-describedby="emailHelp">

                        <label for="exampleInputEmail1" class="form-label">Quantity</label>
                        <input type="number" class="form-control" v-model="quantity" id="exampleInputEmail1"
                            aria-describedby="emailHelp">

                        <!-- <label for="exampleInputEmail1" class="form-label">Total Price</label>
                        <input type="number" class="form-control" v-model="total_price" id="exampleInputEmail1"
                            aria-describedby="emailHelp"> -->

                        <label for="exampleInputEmail1" class="form-label">Payment Method</label>
                        <select v-model="payment_id" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Choose Payment Name</option>
                            <option v-for="(d, i) in paymentList" :key="i" :value="d.id">{{ d.method }}</option>
                        </select>

                        <label for="exampleInputEmail1" class="form-label">Date</label>
                        <input type="date" class="form-control" v-model="date" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                    <button @click="updateSale()" class="btn btn-primary mt-2 active">Update</button>
                    <!-- <button v-else @click="updateCate" class="btn btn-primary">Update</button>  -->

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
            customerList: [],
            categoryList: [],
            sub_categoryList: [],
            brandList: [],
            productList: [],
            paymentList: [],
            unitList: [],
            invoice_id: '',
            customer_id: 0,
            category_id: 0,
            sub_category_id: 0,
            brand_id: 0,
            product_id: 0,
            unit_id: 0,
            payment_id: 0,
            quantity: '',
            // total_price: '',
            date: '',
            sale_price: '',
            id: this.$route.params.id,
            url: "http://127.0.0.1:8000/api/rubon/sale",
        }
    },
    methods: {
        getInvoice() {
            const a = new Date().getTime().toString().slice(7);
            this.invoice_id = "INV:" + a
        },
        getcustomer() {
            axios.get("http://127.0.0.1:8000/api/zahid/customer")
                .then((res) => {
                    this.customerList = res.data.data
                    // console.log(res.data.data)http://127.0.0.1:8000/api/minhaj/customer
                })
        },
        getCategory() {
            axios.get("http://127.0.0.1:8000/api/zahid/category")
                .then((res) => {
                    this.categoryList = res.data.data
                    // console.log(res.data.data)
                })
        },
        getSubCategory() {
            axios.get("http://127.0.0.1:8000/api/zahid/sub_category")
                .then((res) => {
                    this.sub_categoryList = res.data.data
                    // console.log(res.data.data)
                })
        },
        getBrand() {
            axios.get("http://127.0.0.1:8000/api/zahid/brand")
                .then((res) => {
                    this.brandList = res.data.data
                    // console.log(res.data.data)
                })
        },
        getProduct() {
            axios.get("http://127.0.0.1:8000/api/zahid/product")
                .then((res) => {
                    this.productList = res.data.data
                    // console.log(res.data.data)
                })
        },
        getUnit() {
            axios.get("http://127.0.0.1:8000/api/rubon/unit")
                .then((res) => {
                    this.unitList = res.data.data
                    // console.log(res.data.data)
                })
        },
        getPayment() {
            axios.get("http://127.0.0.1:8000/api/rubon/payment")
                .then((res) => {
                    this.paymentList = res.data.data
                    // console.log(res.data.data)
                })
        },
        getSale() {
            axios.get(`${this.url}/${this.id}/edit`)
                .then((res) => {
                    const dt = res.data.data;
                    this.invoice_id = dt.invoice_id;
                    this.customer_id = dt.customer_id;
                    this.category_id = dt.category_id;
                    this.sub_category_id = dt.sub_category_id;
                    this.brand_id = dt.brand_id;
                    this.product_id = dt.product_id;
                    this.unit_id = dt.unit_id;
                    this.sale_price = dt.sale_price;
                    this.quantity = dt.quantity;
                    this.payment_id = dt.payment_id;
                    this.date = dt.date;
                })
        },
        updateSale() {
            const allData = {
                invoice_id: this.invoice_id,
                customer_id: this.customer_id,
                category_id: this.category_id,
                sub_category_id: this.sub_category_id,
                brand_id: this.brand_id,
                product_id: this.product_id,
                unit_id: this.unit_id,
                sale_price: this.sale_price,
                quantity: this.quantity,
                payment_id: this.payment_id,
                date: this.date
            };
            axios.put(`${this.url}/${this.id}`, allData)
                .then((response) => {
                    this.$router.push({ name: 'sale' })
                });
        },
    },
    mounted() {
        this.getCategory()
        this.getSubCategory()
        this.getBrand()
        this.getProduct()
        this.getcustomer()
        this.getInvoice()
        this.getUnit()
        this.getPayment()
        this.getSale()
    }
}
</script>