import React, { useContext } from "react";
import { useQuery } from "react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "../../../context/ThemeContext"; // Import theme context
import baseUrl from "../../../shared/baseURL";
import useFetch from "../../../hooks/useFetch";
import AuthContext from "../../../context/AuthProvider";

const ChartStat = () => {
  const { theme, toggleTheme } = useTheme(); // Get current theme
  const { auth } = useContext(AuthContext);
  const fetch = useFetch();
  const url = `${baseUrl}product`;

  const getProducts = async () => {
    const result = await fetch(url, auth.accessToken);
    return result.data;
  };

  const { data, isError, isLoading } = useQuery(["products"], getProducts, {
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  const products = data?.products || [];

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCounts).map((category) => ({
    name: category,
    value: categoryCounts[category],
  }));

  const COLORS = theme === "dark" 
    ? ["#d1d5db", "#6b7280", "#4b5563", "#374151", "#1f2937"] 
    : ["#8884d8", "#82ca9d", "#ffbb28", "#ff8042", "#a28ceb"];

  return (
    <div className={`w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg transition-all dark:bg-gray-800 dar:text-white bg-white text-gray-900`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-gray-300">Product Categories Analysis</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartStat;
