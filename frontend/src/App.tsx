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
import TransactionDetails from "./pages/TransactionDetails";
import PrivateRoute from "./utils/auth/ProtectedRoutes";

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
      element: (
        <PrivateRoute>
          <DashBoard />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.newTransactions,
      element: (
        <PrivateRoute>
          <NewTransaction />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.myTransactions,
      element: (
        <PrivateRoute>
          <MyTransactions />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.transactionsById(),
      element: (
        <PrivateRoute>
          <TransactionDetails />,
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.me,
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
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
