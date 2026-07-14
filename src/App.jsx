import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./routes/AppRoutes";
import BrandLoader from "./components/BrandLoader";

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  return (
    <AnimatePresence mode="sync">
      {loading
        ? <BrandLoader key="loader" onDone={done} />
        : <AppRoutes    key="app" />
      }
    </AnimatePresence>
  );
}
