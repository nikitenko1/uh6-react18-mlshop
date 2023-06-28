import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import UsersTable from "../../components/table/UsersTable";
import FormEditUsers from "../../components/forms/FormEditUsers";
import Paginate from "../../components/shared/Paginate";

const Users = () => {
  const { users, totalPage } = useSelector((state) => state.admin);

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="overflow-hidden">
            <UsersTable people={users} />
            <Paginate totalPage={totalPage} />
          </div>
        }
      />
      <Route path="edit/:id" element={<FormEditUsers />} />
    </Routes>
  );
};

export default Users;
