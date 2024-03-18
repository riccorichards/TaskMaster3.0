import { Route, Routes } from "react-router-dom";
import Langding from "./pages/Langding/Langding";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Langding />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
