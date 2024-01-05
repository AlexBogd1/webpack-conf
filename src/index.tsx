import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";

import { About } from "@/pages/about";
import { Shop } from "./pages/shop";
import { Suspense } from "react";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "about",
        element: (
          <Suspense fallback='.....'>
            <About />{" "}
          </Suspense>
        ),
      },
      {
        path: "shop",
        element: (
          <Suspense fallback='.....'>
            <Shop />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
