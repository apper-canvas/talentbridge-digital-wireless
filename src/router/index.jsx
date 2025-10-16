import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
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

// Define main routes with lazy loading and Suspense
const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Home />
      </Suspense>
    )
  },
  {
    path: "jobs",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Jobs />
      </Suspense>
    )
  },
  {
    path: "job/:id",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <JobDetail />
      </Suspense>
    )
  },
  {
    path: "employers",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Employers />
      </Suspense>
    )
  },
  {
    path: "employers/post-job",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <PostJob />
      </Suspense>
    )
  },
  {
    path: "employers/dashboard",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <EmployerDashboard />
      </Suspense>
    )
  },
  {
    path: "about",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <About />
      </Suspense>
    )
  },
  {
    path: "contact",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Contact />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <NotFound />
      </Suspense>
    )
  }
];

// Create routes array with Layout as parent
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes]
  }
];

export const router = createBrowserRouter(routes);