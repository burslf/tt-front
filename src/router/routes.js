const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MainPage.vue") }],
  },
  {
    path: "/explore",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ExplorePage.vue") }],
  },
  {
    path: "/raise-capital",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RaiseCapitalPage.vue") },
    ],
  },
  {
    path: "/project/:idname",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/ProjectDetailsPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
