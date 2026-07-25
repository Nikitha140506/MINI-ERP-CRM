import React from "react";

interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  color,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;