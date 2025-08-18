import React, { useEffect, useState } from "react";
import { API_PATH } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const BudgetCard = ({ expenses }) => {
  const [budget, setBudget] = useState(null);
  const [amount, setAmount] = useState("");

  const fetchBudget = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.BUDGET.GET_BUDGET);
      setBudget(res.data);
    } catch {
      setBudget(null);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleSetBudget = async () => {
    try {
      await axiosInstance.post(API_PATH.BUDGET.ADD_BUDGET, { amount });
      toast.success("Budget set successfully");
      setAmount("");
      fetchBudget();
    } catch {
      toast.error("Error setting budget");
    }
  };

  const handleUpdateBudget = async () => {
    try {
      await axiosInstance.put(API_PATH.BUDGET.UPDATE_BUDGET, { amount });
      toast.success("Budget updated");
      setAmount("");
      fetchBudget();
    } catch {
      toast.error("Error updating budget");
    }
  };

  const handleDeleteBudget = async () => {
    try {
      await axiosInstance.delete(API_PATH.BUDGET.DELETE_BUDGET);
      toast.success("Budget deleted");
      setBudget(null);
    } catch {
      toast.error("Error deleting budget");
    }
  };

  return (
    <div className="card p-4">
      <h5 className="text-lg font-semibold">Monthly Budget</h5>
      {budget ? (
        <>
          <p className="text-sm text-gray-600 mt-2">
            Budget: ₹{budget.amount} | Spent: ₹{totalExpense}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 my-3">
            <div
              className={`h-3 rounded-full ${
                totalExpense > budget.amount ? "bg-red-500" : "bg-green-500"
              }`}
              style={{
                width: `${Math.min((totalExpense / budget.amount) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {Math.min((totalExpense / budget.amount) * 100, 100).toFixed(1)}% of budget used
          </p>

          {totalExpense > budget.amount && (
            <p className="mt-2 text-red-600 font-medium">
              ⚠️ You’ve exceeded your budget!
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter new budget"
              className="border p-2 rounded w-2/3"
            />
            <button
              disabled={!amount}
              onClick={handleUpdateBudget}
              className={`px-4 py-2 rounded-lg shadow ${
                amount ? "bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Update
            </button>
            <button
              onClick={handleDeleteBudget}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter budget"
            className="border p-2 rounded w-2/3"
          />
          <button
            disabled={!amount}
            onClick={handleSetBudget}
            className={`px-4 py-2 rounded-lg shadow ${
              amount ? "bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Set
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
