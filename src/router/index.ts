import { createRouter, createWebHashHistory } from "vue-router";

const routes: Array<any> = [
  {
    path: "/",
    redirect: "/dashboard/questionnaire-survey",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/layouts/index.vue"),
    redirect: "/dashboard/questionnaire-survey",
    children: [
      {
        path: "/dashboard/questionnaire-survey",
        name: "QuestionnaireSurvey",
        meta: { title: "问卷调查", navBarRight: "questionnaire-survey" },
        component: () => import("@/views/questionnaire-survey/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
