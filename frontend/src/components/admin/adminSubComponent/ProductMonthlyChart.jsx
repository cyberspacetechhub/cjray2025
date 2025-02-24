import React, { useContext } from "react";
import { useQuery } from "react-query";
import AuthContext from "../../../context/AuthProvider";
import useFetch from "../../../hooks/useFetch";
import baseUrl from "../../../shared/baseURL";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

const ProductMonthlyChart = () => {
  const { auth } = useContext(AuthContext);
  const fetch = useFetch();
  const url = `${baseUrl}product`;

  // Fetch products
  const getProducts = async () => {
    const result = await fetch(url, auth.accessToken);
    return result.data;
  };

  const { data, isError, isLoading } = useQuery(["products"], getProducts, {
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  // Handle loading and error state
  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error fetching data.</p>;

  const products = data?.products || [];

  // Group products by month
  const monthlyCounts = products.reduce((acc, product) => {
    if (product.createdAt) {
      const month = dayjs(product.createdAt).format("MMM YYYY"); // Example: "Feb 2025"
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert grouped data into an array for the chart
  const chartData = Object.keys(monthlyCounts).map((month) => ({
    month,
    count: monthlyCounts[month],
  }));

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 dark:text-white text-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-center mb-4 dark:text-gray-300">Products Added Per Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductMonthlyChart;
