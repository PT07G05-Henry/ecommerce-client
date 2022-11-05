import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ProtectedFrom from "../../components/protectedFrom/ProtectedFrom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path) =>
    path !== pathname
      ? "dashBoard__tabBtn"
      : "dashBoard__tabBtn dashBoard__tabBtn-active";
  return (
    <section className="container dashBoard__container">
      <menu className="dashBoard__menu">
        <div className="dashBoard__menu-tabs">
          <button
            className={isActive("/dashboard")}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Profile
          </button>
          <ProtectedFrom Admin Superadmin noRender>
            <button
              className={isActive("/dashboard/history")}
              onClick={() => {
                navigate("/dashboard/history");
              }}
            >
              History
            </button>
          </ProtectedFrom>
          <ProtectedFrom User noRender>
            <button
              className={isActive("/dashboard/products")}
              onClick={() => {
                navigate("/dashboard/products");
              }}
            >
              Products
            </button>
            <button
              className={isActive("/dashboard/createProduct")}
              onClick={() => {
                navigate("/dashboard/createProduct");
              }}
            >
              Create Product
            </button>
            <button
              className={isActive("/dashboard/createCategory")}
              onClick={() => {
                navigate("/dashboard/createCategory");
              }}
            >
              Create Category
            </button>
            <button
              className={isActive("/dashboard/orders")}
              onClick={() => {
                navigate("/dashboard/orders");
              }}
            >
              Orders
            </button>
          </ProtectedFrom>
          <ProtectedFrom User Admin noRender>
            <button
              className={isActive("/dashboard/users")}
              onClick={() => {
                navigate("/dashboard/users");
              }}
            >
              Users
            </button>
          </ProtectedFrom>
        </div>
      </menu>
      <section className="dashBard__tab">
        <Outlet />
      </section>
    </section>
  );
};

export default Dashboard;
