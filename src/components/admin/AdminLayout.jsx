import "./AdminLayout";
import "../../styles/admin.css";

import { Outlet } from "react-router-dom";
import AdminMenu from "./AdminMenu";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminMenu />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
