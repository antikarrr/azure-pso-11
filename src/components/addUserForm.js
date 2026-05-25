import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper";

export default function AddUserForm({ formData, setFormData }) {
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  const validate = () => {
    const newErrors = {};
    const { firstname, lastname, email, salary, role, managerName } = formData;

    // Nama tidak boleh kosong atau mengandung angka
    if (!firstname || firstname.trim() === "") {
      newErrors.firstname = "First name wajib diisi";
    } else if (/\d/.test(firstname)) {
      newErrors.firstname = "First name tidak boleh mengandung angka";
    }

    if (!lastname || lastname.trim() === "") {
      newErrors.lastname = "Last name wajib diisi";
    } else if (/\d/.test(lastname)) {
      newErrors.lastname = "Last name tidak boleh mengandung angka";
    }

    // Email harus format valid
    if (!email || email.trim() === "") {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Salary tidak boleh negatif atau kosong
    if (salary === "" || salary === undefined || salary === null) {
      newErrors.salary = "Salary wajib diisi";
    } else if (Number(salary) < 0) {
      newErrors.salary = "Salary tidak boleh negatif";
    }

    // Manager Name wajib diisi kalau bukan Manager
    const currentRole = role ?? "Staff";
    if (currentRole !== "Manager" && (!managerName || managerName.trim() === "" || managerName === "-")) {
      newErrors.managerName = "Manager Name wajib diisi untuk role ini";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    let { firstname, lastname, email, salary, date, status, role, managerName } = formData;

    const model = {
      name: `${firstname} ${lastname}`,
      email,
      salary,
      date,
      status: status ?? "Active",
      role: role ?? "Staff",
      managerName: role === "Manager" ? "-" : (managerName || "-"),
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading...</div>;
  if (addMutation.isError) return <Bug message={addMutation.error.message} />;
  if (addMutation.isSuccess) return <Success message="Added Successfully" />;

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5 w-full">

      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          onChange={setFormData}
          className="border rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={setFormData}
          className="border rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={setFormData}
          className="border rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          min="0"
          onChange={setFormData}
          className="border rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        {errors.salary && <span className="text-red-500 text-sm">{errors.salary}</span>}
      </div>

      <input
        type="date"
        name="date"
        onChange={setFormData}
        className="border rounded-xl p-4 shadow-sm outline-none"
      />

      <select
        name="role"
        onChange={setFormData}
        className="border rounded-xl p-4 shadow-sm outline-none"
      >
        <option>Staff</option>
        <option>Manager</option>
        <option>HR</option>
        <option>Intern</option>
      </select>

      <div className="flex flex-col gap-1">
        <input
          name="managerName"
          placeholder={formData.role === "Manager" ? "Manager doesn't need manager" : "Manager Name"}
          onChange={setFormData}
          disabled={formData.role === "Manager"}
          value={formData.role === "Manager" ? "-" : (formData.managerName || "")}
          className={`border rounded-xl p-4 shadow-sm outline-none ${
            formData.role === "Manager"
              ? "bg-gray-200 cursor-not-allowed"
              : "focus:ring-2 focus:ring-indigo-400"
          }`}
        />
        {errors.managerName && <span className="text-red-500 text-sm">{errors.managerName}</span>}
      </div>

      <div className="flex gap-6 items-center">
        <label>
          <input type="radio" name="status" value="Active" onChange={setFormData} />
          <span className="ml-2">Active</span>
        </label>
        <label>
          <input type="radio" name="status" value="Inactive" onChange={setFormData} />
          <span className="ml-2">Inactive</span>
        </label>
      </div>

      <button
        type="submit"
        className="md:col-span-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 font-semibold hover:scale-[1.02] duration-200 shadow-lg flex justify-center items-center gap-2"
      >
        Add Employee
        <BiPlus size={24} />
      </button>

    </form>
  );
}