import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { ROUTES } from "./utils/routes";
import { Toaster } from "./components/ui/toaster";
import { checkAuth } from "./utils/auth";
import { GlobalProvider } from "./context/index";
import Profile from "./pages/Profile";

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
      path: ROUTES.me,
      element: <Profile />,
      loader: () => checkAuth(),
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
