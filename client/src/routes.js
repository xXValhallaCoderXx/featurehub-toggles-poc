import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import MainLayout from "./components/Layout/Main";

export default function RoutesContainer() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/two" element={<PageTwo />} />
          <Route element={<PageOne />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
