import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteUsersApi } from "../../api/adminApi";
import { deleteUser } from "../../redux/slices/adminSlice";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const UsersTable = ({ people }) => {
  const dispatch = useDispatch();

  const deleteUsers = async (id) => {
    const checkDelete = window.confirm("Are you sure !");
    if (!checkDelete) return;
    try {
      const res = await deleteUsersApi(id);
      if (res.data.success) {
        dispatch(deleteUser(id));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (people.length === 0)
    return (
      <div className="h-[100%] flex items-center justify-center">
        <p className="text-[#b2071d] font-semibold">Not a users!</p>
      </div>
    );

  return (
    <div
      className="flex flex-col h-[100%] overflow-auto scrollbar-thin
  scrollbar-thumb-slate-500 scrollbar-thumb-rounded-full"
    >
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow border-b">
          <table className="min-w-full divide-y">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#fff] divide-y">
              {people.map((person) => (
                <tr key={v4()}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-black">{person.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-black">{person.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        person.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {person.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {person.roleId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`edit/${person._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUsers(person._id)}
                      className="text-indigo-600 hover:text-indigo-900 ml-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
