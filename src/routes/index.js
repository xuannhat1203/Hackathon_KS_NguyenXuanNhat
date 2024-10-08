import Dashboard from "@/views/Dashboard.vue";
import ManagerProduct from "@/views/ManagerProduct.vue";
import ManagerUser from "@/views/ManagerUser.vue";
import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path:"/admin",
        redirect:"/admin/manager-user",
        component: Dashboard
    },
    {
        path:"/admin/manager-product",
        component: ManagerProduct
    },
    {
        path:"/admin/manager-user",
        component:ManagerUser
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes:routes
})
export default router;