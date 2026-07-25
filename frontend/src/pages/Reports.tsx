import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../api/axios";

import {
  exportPDF,
  exportExcel,
} from "../utils/exportReport";

function Reports() {
  const [report, setReport] = useState<any>({});
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const analyticsRes = await API.get("/analytics");
      const salesRes = await API.get("/sales");
      const productRes = await API.get("/products");

      // Change this if your backend returns analytics differently
      setReport(
        analyticsRes.data.analytics ||
        analyticsRes.data.data ||
        analyticsRes.data
      );

      setSales(salesRes.data.sales || []);
      setProducts(productRes.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-2">
          Reports & Analytics
        </h1>

        <p className="text-gray-500 mb-8">
          Business performance overview
        </p>

        {/* Export Buttons */}

        <div className="flex flex-wrap gap-4 mb-8">

          <button
            onClick={() =>
              exportPDF(
                "Sales Report",
                ["Customer", "Product", "Quantity", "Amount"],
                sales.map((s) => [
                  s.customer?.name,
                  s.product?.name,
                  s.quantity,
                  s.totalPrice,
                ])
              )
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
          >
            Export Sales PDF
          </button>

          <button
            onClick={() =>
              exportExcel(
                "Inventory Report",
                products
              )
            }
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Export Inventory Excel
          </button>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500">
              Total Revenue
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-3">
              ₹{report.revenue || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500">
              Total Sales
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {report.sales || report.totalSales || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500">
              Total Customers
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {report.customers || report.totalCustomers || 0}
            </p>
          </div>

        </div>

        {/* Inventory + Invoice */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">
              Inventory Summary
            </h2>

            <p>
              Total Products:
              <b> {report.products || report.totalProducts || 0}</b>
            </p>

            <p className="mt-3">
              Low Stock Products:
              <b className="text-red-600">
                {" "}
                {report.lowStock?.length || 0}
              </b>
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">
              Invoice Summary
            </h2>

            <p>
              Total Invoices:
              <b> {report.invoices || report.totalInvoices || 0}</b>
            </p>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Reports;