import React from "react";
import { BiGroup, BiCheckCircle, BiXCircle, BiMoney } from "react-icons/bi";

import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";

const SummaryStats = () => {
  const { isLoading, isError, data } = useQuery("users", getUsers);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const dataArray = Array.isArray(data) ? data : data?.data || data?.users || [];

  const total = dataArray.length;
  const activeCount = dataArray.filter((u) => u.status === "Active").length;
  const inactiveCount = dataArray.filter((u) => u.status === "Inactive").length;

  const avgSalary =
    total > 0
      ? Math.round(
          dataArray.reduce((sum, u) => sum + (Number(u.salary) || 0), 0) / total
        )
      : 0;

  const cards = [
    {
      label: "Total Karyawan",
      value: total,
      icon: <BiGroup size={28} />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      label: "Active",
      value: activeCount,
      icon: <BiCheckCircle size={28} />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Inactive",
      value: inactiveCount,
      icon: <BiXCircle size={28} />,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      label: "Rata-rata Salary",
      value: `Rp ${avgSalary.toLocaleString("id-ID")}`,
      icon: <BiMoney size={28} />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg duration-200"
        >
          <div className={`${card.iconBg} ${card.iconColor} p-3 rounded-xl`}>
            {card.icon}
          </div>
          <div>
            <p className="text-sm text-gray-400">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;