import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/Auth/SignIn.vue'
import SignUp from '@/views/Auth/SignUp.vue'
import DashboardView from '@/views/Admin/DashboardView.vue'
import UserDashboardView from '@/views/User/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import TicketBookingView from '@/views/Admin/TicketBooking/DashboardView.vue'
import TravelScheduleDashboardView from '@/views/Admin/TravelSchedule/DashboardView.vue'
import PaymentDashboardView from '@/views/Admin/Payment/DashboardView.vue'
import TicketBookingCreateView from '@/views/Admin/TicketBooking/CreateView.vue'
import TravelReportDashboardView from '@/views/Admin/TravelReport/DashboardView.vue'
import InvoiceView from '@/views/User/UserManagement/InvoiceView.vue'
import UserBookings from '@/views/User/UserManagement/UserBookings.vue'
import PaymentView from '@/views/Admin/PaymentView.vue'
import UploadPaymentView from '@/views/User/UserManagement/UploadPaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: UserDashboardView
    },
    {
      path: '/invoice/:id',
      name: 'Invoice Pembayaran',
      component: InvoiceView
    },
    {
      path: '/booking/history/:id',
      name: 'Booking History',
      component: UserBookings
    },
    {
      path: '/upload-payment/:id',
      name: 'Upload Payment',
      component: UploadPaymentView
    },
    {
      path: '/payment/history/:id',
      name: 'Payment History',
      component: PaymentView
    },
    {
      path: '/sign-in',
      name: 'Sign In Pages',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'Sign Up Pages',
      component: SignUp,
      meta: {
        title: 'Create Cart Items'
      }
    },
    { 
      path: '/admin/dashboard',
      name: 'AdminDashboard',
       component: DashboardView,
       meta: {
        title: 'Admin Dashboard',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    { 
      path: '/admin/ticket-bookings',
      name: 'Manajement Pemesanan Ticket', 
      component: TicketBookingView,
      meta: {
        title: 'Pemesanan Ticket Dashboard',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    { 
      path: '/admin/ticket-bookings/create',
      name: 'Tambah Data Pemesanan Ticket', 
      component: TicketBookingCreateView,
      meta: {
        title: 'Tambah Data Pemesanan Ticket',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    { 
      path: '/admin/travel-schedules',
      name: 'Manajement Penjadwalan Travel', 
      component: TravelScheduleDashboardView,
      meta: {
        title: 'Penjadwalan Travel Dashboard',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    { 
      path: '/admin/travel-reports',
      name: 'Laporan Travel', 
      component: TravelReportDashboardView,
      meta: {
        title: 'Laporan Travel Dashboard',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/admin/payments',
      name: 'Manajement Payments', 
      component: PaymentDashboardView,
      meta: {
        title: 'Pemesanan Ticket Dashboard',
        requiresAuth: true,
        roles: ['admin']
      }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.user?.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/sign-in');
  } else if (to.meta.requiresAuth && to.meta.roles && !to.meta.roles.includes(userRole)) {
    next('/');
  } else {
    next();
  }
});
export default router
