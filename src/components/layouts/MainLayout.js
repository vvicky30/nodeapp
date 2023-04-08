import React from "react";
import AdminSideBar from "./AdminSideBar/Sidebar";
import Header from "./Header";

const MainLayout = ({ children, search, setSearch, setPage }) => {
  const role = localStorage.getItem("role");
  return (
    <>
      {role === "1" ? (
        <AdminSideBar />
      ) : (
          <Header
            search={search}
            setSearch={setSearch}
            setPage={setPage} 
            />
      )}
      {children}
    </>
  );
};

export default MainLayout;
