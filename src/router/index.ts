import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/Main.vue'),
      children: [
          {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
          },
          {
            path: '/cards',
            name: 'cards',
            component: () => import('../views/CardsView.vue')
          },
          {
            path: '/transactions',
            name: 'transactions',
            component: () => import('../views/TransactionsView.vue')
          },
          {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/Setting.vue')
          },
          
        ]

    }
  ]
})

export default router
