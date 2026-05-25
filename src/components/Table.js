import React, { useState } from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";

import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";

import {
  toggleChangeAction,
  updateAction,
  deleteAction
} from "../redux/reducer";

import {
  useSelector,
  useDispatch
} from "react-redux";

const Table = () => {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const { isLoading, isError, data } = useQuery("users", getUsers);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // Filter & Search logic
  const filteredData = data?.filter((user) => {
    const matchSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchRole =
      filterRole === "All" ? true : user.role === filterRole;

    return matchSearch && matchRole;
  });

  return (
    <div className="flex flex-col gap-4">

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">

        {/* Search by Name */}
        <div className="relative flex-1">
          <BiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari nama karyawan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Filter by Role */}
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border rounded-xl px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          <option value="All">Semua Role</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
          <option value="HR">HR</option>
          <option value="Intern">Intern</option>
        </select>

      </div>

      {/* Hasil pencarian */}
      <p className="text-sm text-gray-400">
        Menampilkan{" "}
        <span className="font-semibold text-indigo-500">
          {filteredData?.length}
        </span>{" "}
        karyawan
        {filterRole !== "All" && (
          <span> · Role: <span className="font-semibold text-indigo-500">{filterRole}</span></span>
        )}
        {search && (
          <span> · Pencarian: <span className="font-semibold text-indigo-500">"{search}"</span></span>
        )}
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl shadow-xl bg-white">
        <table className="w-full min-w-[1200px] table-auto">
          <thead>
            <tr className="bg-indigo-600 text-white text-lg">
              <th className="w-[22%] px-8 py-5 text-left">Employee</th>
              <th className="w-[22%] text-left">Email</th>
              <th className="w-[12%] text-right">Salary</th>
              <th className="w-[12%] text-center">Birthday</th>
              <th className="w-[10%] text-center">Status</th>
              <th className="w-[10%] text-center">Role</th>
              <th className="w-[12%] text-center">Manager</th>
              <th className="w-[8%] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-12 text-gray-400 text-lg"
                >
                  Tidak ada karyawan yang ditemukan
                </td>
              </tr>
            ) : (
              filteredData?.map((obj) => (
                <Tr key={obj._id} {...obj} />
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

function Tr({
  _id,
  name,
  email,
  salary,
  date,
  status,
  role,
  managerName
}) {
  const visible = useSelector(
    (state) => state.app.client.toggleForm
  );
  const dispatch = useDispatch();

  const onUpdate = () => {
    if (!visible) dispatch(toggleChangeAction());
    dispatch(updateAction(_id));
  };

  const onDelete = () => {
    dispatch(deleteAction(_id));
  };

  return (
    <tr className="border-b hover:bg-indigo-50 duration-200">

      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-xl">
            {name?.charAt(0)}
          </div>
          <div className="font-medium text-lg">{name}</div>
        </div>
      </td>

      <td className="text-gray-700">{email}</td>

      <td className="text-right font-medium pr-5">{salary}</td>

      <td className="text-center">{date}</td>

      <td className="text-center">
        <span className={`px-4 py-2 rounded-full text-white font-medium ${
          status === "Active" ? "bg-green-500" : "bg-red-500"
        }`}>
          {status}
        </span>
      </td>

      <td className="text-center">
        <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium">
          {role || "-"}
        </span>
      </td>

      <td className="text-center font-medium">
        {role === "Manager" ? "-" : managerName || "-"}
      </td>

      <td>
        <div className="flex justify-center gap-5">
          <button onClick={onUpdate}>
            <BiEdit size={24} color="#f59e0b" />
          </button>
          <button onClick={onDelete}>
            <BiTrashAlt size={24} color="#ef4444" />
          </button>
        </div>
      </td>

    </tr>
  );
}

export default Table;