import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./routes/AppRoutes";
import BrandLoader from "./components/BrandLoader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading
        ? <BrandLoader key="loader" />
        : <AppRoutes key="app" />
      }
    </AnimatePresence>
  );
}
