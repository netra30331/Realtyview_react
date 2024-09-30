import { Navigate, createBrowserRouter } from "react-router-dom";
import { AUTH } from "../shared/config/constants"
// Layouts
import FullLayout from "@/components/layouts/FullLayout";
import AuthLayout from "@/components/layouts/AuthLayout";
import MainLayout from "@/components/layouts/MainLayout";
// Protected Route
import Protected from "@/shared/config/Protected";
// Pages
import Login from "./login";
import Register from "./register";
import NotFound from "./notFound";
import Dashboard from "./dashboard";
import Home from "./home";
//import Landing from "./landing";
import Lead from "./lead";
import Test from "./test";
import Profile from "./profile"
import ForgotPassword from "./forgotPassword";
import ResetPassword from "./resetPassword";
import Client from "./client";
import Showing from "./showing";
import PublicListing from "./public_listing/PublicListing";
import MyListings from "./myListings";
import SearchListings from "./SearchListings";
//import Expansive from "./SearchListings/Expansive";
import Company from "./SearchListings/Company";
import Team from "./SearchListings/Team";
import Transactions from "./transactions";
import Offer from "./offer";
import Agent from "./agent";
import Annoucements from "./admin/annoucements";
import Affiliates from "./admin/affiliates";
import Teams from "./admin/teams";
import Companies from "./admin/companies";
import LocalAssociations from "./admin/localAssociations";
import StateAssociations from "./admin/stateAssociations";
import MLSAssociations from "./admin/mlsAssociations";
import USStates from "./admin/usStates";
import Amenities from "./admin/listings/amenities";
import Keywords from "./admin/listings/keywords";
import Schemas from "./admin/listings/schemas";
import SchoolDistricts from "./admin/listings/schoolDistricts";
import Agents from "./admin/users/agents";
import Leads from "./admin/users/leads";
import Clients from "./admin/users/clients";
import Posts from "./admin/posts";
import Advertisements from "./admin/advertisements";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FullLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />, //<Landing />,
      },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "listings/:listingURL",
    element: <PublicListing />,
  },
  {
    path: "app",
    element: (
      <Protected auth={[AUTH.USER]} key={"app"}>
        <MainLayout />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "concepts",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "info",
            element: <Profile />,
          },
          {
            path: "company",
            element: <Profile />,
          },
          {
            path: "credentials",
            element: <Profile />,
          },
          {
            path: "settings",
            element: <Profile />,
          },
          {
            path: "verify",
            element: <Profile />,
          },
        ],
      },
      {
        path: "leads",
        element: <Lead />,
      },
      {
        path: "clients",
        element: <Client />,
      },
      {
        path: "agents",
        children: [
          {
            index: true,
            element: <Agent />,
          },
          {
            path: "all",
            element: <Agent />,
          },
          {
            path: "favorite",
            element: <Agent />,
          },
          {
            path: "company",
            element: <Agent />,
          },
          {
            path: "team",
            element: <Agent />,
          },
          {
            path: "myprofile",
            element: <Agent />,
          },
        ],
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "showings",
        element: <Showing />,
      },
      // {
      //   path: "listing/listingurl",
      //   element: <PublicListing />,
      // },
      {
        path: "listings", //Company
        element: <SearchListings />,
      },

      {
        path: "listings/company", //Company
        element: <Company />,
      },
      {
        path: "listings/team", //Team
        element: <Team />,
      },
      {
        path: "transactions", //Team
        element: <Transactions />,
      },
      {
        path: "offers", //Offer Inbox
        element: <Offer />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <Protected auth={[AUTH.ADMIN, AUTH.USER]} key={"admin"}>
        <MainLayout />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "info",
            element: <Profile />,
          },
          {
            path: "company",
            element: <Profile />,
          },
          {
            path: "credentials",
            element: <Profile />,
          },
          {
            path: "settings",
            element: <Profile />,
          },
          {
            path: "verify",
            element: <Profile />,
          },
        ],
      },
      {
        path: "annoucements",
        element: <Annoucements />,
      },
      {
        path: "affiliates",
        element: <Affiliates />,
      },
      {
        path: "teams",
        element: <Teams />,
      },
      {
        path: "Companies",
        element: <Companies />,
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <Agents />,
          },
          {
            path: "agents",
            element: <Agents />,
          },
          {
            path: "leads",
            element: <Leads />,
          },
          {
            path: "clients",
            element: <Clients />,
          },
        ],
      },
      {
        path: "listings/schemas",
        element: <Schemas />,
      },
      {
        path: "listings/amenities",
        element: <Amenities />,
      },
      {
        path: "listings/keywords", //Company
        element: <Keywords />,
      },
      {
        path: "listings/school-districts", //Team
        element: <SchoolDistricts />,
      },
      {
        path: "local-associations", //Team
        element: <LocalAssociations />,
      },
      {
        path: "state-associations", //Team
        element: <StateAssociations />,
      },
      {
        path: "mls-associations", //Team
        element: <MLSAssociations />,
      },
      {
        path: "us-states", //Team
        element: <USStates />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "advertisements",
        element: <Advertisements />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);