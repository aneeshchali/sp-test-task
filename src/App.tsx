import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./RouteConfig";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import { ProductProvider } from "./context/ProductProvider";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <RoutesConfig />
        </ProductProvider>
      </AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "!bg-neutral-800 !text-white",
          duration: 2000,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
