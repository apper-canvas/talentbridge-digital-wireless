import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Root from "@/layouts/Root";
import { getRouteConfig } from "@/router/route.utils";
import Layout from "@/components/organisms/Layout";
// Lazy load all page components
const Home = lazy(() => import("@/components/pages/Home"));
const Jobs = lazy(() => import("@/components/pages/Jobs"));
const JobDetail = lazy(() => import("@/components/pages/JobDetail"));
const Employers = lazy(() => import("@/components/pages/Employers"));
const PostJob = lazy(() => import("@/components/pages/PostJob"));
const EmployerDashboard = lazy(() => import("@/components/pages/EmployerDashboard"));
const About = lazy(() => import("@/components/pages/About"));
const Contact = lazy(() => import("@/components/pages/Contact"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));
const Login = lazy(() => import("@/components/pages/Login"));
const Signup = lazy(() => import("@/components/pages/Signup"));
const Callback = lazy(() => import("@/components/pages/Callback"));
const ErrorPage = lazy(() => import("@/components/pages/ErrorPage"));
const ResetPassword = lazy(() => import("@/components/pages/ResetPassword"));
const PromptPassword = lazy(() => import("@/components/pages/PromptPassword"));

const createRoute = ({
  path,
  index,
  element,
  access,
  children,
  ...meta
}) => {
  let configPath;
  if (index) {
    configPath = "/";
  } else {
    configPath = path.startsWith('/') ? path : `/${path}`;
  }

  const config = getRouteConfig(configPath);
  const finalAccess = access || config?.allow;

  const route = {
    ...(index ? { index: true } : { path }),
    element: element ? <Suspense fallback={<div>Loading.....</div>}>{element}</Suspense> : element,
    handle: {
      access: finalAccess,
      ...meta,
    },
  };

  if (children && children.length > 0) {
    route.children = children;
  }

  return route;
};

// Define main routes with lazy loading and Suspense
const mainRoutes = [
  createRoute({
    path: "",
    index: true,
    element: <Home />
  }),
  createRoute({
    path: "jobs",
    element: <Jobs />
  }),
  createRoute({
    path: "job/:id",
    element: <JobDetail />
  }),
  createRoute({
    path: "employers",
    element: <Employers />
  }),
  createRoute({
    path: "employers/post-job",
    element: <PostJob />
  }),
  createRoute({
    path: "employers/dashboard",
    element: <EmployerDashboard />
  }),
  createRoute({
    path: "about",
    element: <About />
  }),
  createRoute({
    path: "contact",
    element: <Contact />
  }),
  createRoute({
    path: "*",
    element: <NotFound />
  })
];

const authRoutes = [
  createRoute({
    path: "login",
    element: <Login />
  }),
  createRoute({
    path: "signup",
    element: <Signup />
  }),
  createRoute({
    path: "callback",
    element: <Callback />
  }),
  createRoute({
    path: "error",
    element: <ErrorPage />
  }),
  createRoute({
    path: "reset-password/:appId/:fields",
    element: <ResetPassword />
  }),
createRoute({
    path: "prompt-password/:appId/:emailAddress/:provider",
    element: <PromptPassword />
  })
];

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [...mainRoutes]
      },
      ...authRoutes
    ]
  }
];

export const router = createBrowserRouter(routes);