import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/Dashboard";
import { ROUTES } from "./utils/routes";
import { Toaster } from "./components/ui/toaster";
import { GlobalProvider } from "./context/index";
import Profile from "./pages/Profile";
import NewTransaction from "./pages/NewTransation";
import MyTransactions from "./pages/MyTransactions";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.home,
      element: <Home />,
    },
    {
      path: ROUTES.signup,
      element: <SignUp />,
    },
    {
      path: ROUTES.dashboard,
      element: <DashBoard />,
    },
    {
      path: ROUTES.newTransactions,
      element: <NewTransaction />,
    },
    {
      path: ROUTES.myTransactions,
      element: <MyTransactions />,
    },
    {
      path: ROUTES.me,
      element: <Profile />,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </GlobalProvider>
  );
}

export default App;
