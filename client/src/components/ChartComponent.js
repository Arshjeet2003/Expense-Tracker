import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/chartComponent.css";
import themeContext from "../context/theme/themeContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ChartComponent = (props) => {
  const [counter, setCounter] = useState(1);

  const handleRadioClick = () => {
    setCounter((prevCounter) => (prevCounter % 2) + 1);
  };

  const transactionData = props?.data?.transactions;

  const today = new Date();
  const context1 = useContext(themeContext);
  const { theme } = context1;
  const [dateType, setDataType] = useState("Daily");

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(today);
  const [selectedYear, setSelectedYear] = useState(today);

  const backgroundColors = [
    "#003f5c",
    "#58508d",
    "#bc5090",
    "#ff6361",
    "#60a726",
    "#ffa600",
    "#15ab86",
    "#cb0083",
  ];

  const [PieData1, setPieData1] = useState({
    labels: ["One", "Two", "Three"],
    datasets: [
      {
        data: [3, 6, 9],
        backgroundColor: ["aqua", "orangered", "purple"],
      },
    ],
  });

  const generateYearLabels = () => {
    const currentYear = selectedYear.getFullYear();
    const labels = [];
    for (let i = 0; i < 10; i++) {
      labels.push((currentYear - i).toString());
    }
    return labels;
  };

  const [DailyData, setDailyData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Transactions per day",
        data: ["10", "20", "30", "40", "50", "60", "20"],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Savings per day",
        data: ["10", "20", "30", "40", "50", "60", "20"],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [MonthlyData, setMonthlyData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Transactions per month",
        data: [
          "10",
          "20",
          "30",
          "40",
          "50",
          "60",
          "20",
          "10",
          "9",
          "13",
          "15",
          "50",
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Savings per month",
        data: [
          "10",
          "20",
          "30",
          "40",
          "50",
          "60",
          "20",
          "10",
          "9",
          "13",
          "15",
          "50",
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [YearlyData, setYearlyData] = useState({
    labels: generateYearLabels(),
    datasets: [
      {
        label: "Transactions per year",
        data: [
          "10",
          "20",
          "30",
          "40",
          "50",
          "60",
          "20",
          "10",
          "9",
          "13",
          "15",
          "50",
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Savings per year",
        data: [
          "10",
          "20",
          "30",
          "40",
          "50",
          "60",
          "20",
          "10",
          "9",
          "13",
          "15",
          "50",
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [data1, setData1] = useState({
    labels: DailyData.labels,
    datasets: [
      {
        ...DailyData.datasets[0],
        data: ["10", "20", "30", "40", "50", "60", "20"],
      },
    ],
  });

  const [data2, setData2] = useState({
    labels: DailyData.labels,
    datasets: [
      {
        ...DailyData.datasets[1],
        data: ["10", "20", "30", "40", "50", "60", "20"],
      },
    ],
  });

  useEffect(() => {
    if (dateType === "Daily") {
      getDailyDataForSelectedDate();
    } else if (dateType === "Monthly") {
      getMonthlyDataForThisYear();
    } else {
      getYearlyDataForLastTenYears();
    }
  }, [selectedDate, selectedMonth, selectedYear, transactionData, dateType]);

  const getDailyDataForSelectedDate = () => {
    if (!transactionData || !selectedDate) return;

    const startDate = new Date(selectedDate);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Get the start of the week for the selected date
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Get the end of the week

    const dailyPriceExpense = Array(7).fill(0); // Initialize an array with zeros for each day of the week.
    const dailyPriceIncome = Array(7).fill(0);

    const weeklyCategoryDataExpenses = [
      { label: "Food", data: 0 },
      { label: "Groceries", data: 0 },
      { label: "Medal", data: 0 },
      { label: "Education", data: 0 },
      { label: "Travel", data: 0 },
      { label: "Bills", data: 0 },
      { label: "Shopping", data: 0 },
      { label: "Others", data: 0 },
    ];

    for (const transaction of transactionData) {
      const transactionDate = new Date(transaction.date);

      if (
        transactionDate >= startDate &&
        transactionDate <= endDate &&
        transactionDate.getFullYear() === startDate.getFullYear() &&
        transaction.type === "Expense"
      ) {
        const dayOfWeek = transactionDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        dailyPriceExpense[dayOfWeek] += transaction.price;

        const categoryToUpdate = weeklyCategoryDataExpenses.find(
          (item) => item.label === transaction.category
        );
        if (categoryToUpdate) {
          categoryToUpdate.data += transaction.price;
        }
      } else if (
        transactionDate >= startDate &&
        transactionDate <= endDate &&
        transactionDate.getFullYear() === startDate.getFullYear() &&
        transaction.type === "Income"
      ) {
        const dayOfWeek = transactionDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        dailyPriceIncome[dayOfWeek] += transaction.price;
      }
    }

    setDailyData({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
      datasets: [
        {
          label: "Transactions per day",
          data: dailyPriceExpense,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Savings per day",
          data: dailyPriceIncome,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });

    setData1({
      labels: DailyData.labels,
      datasets: [
        {
          ...DailyData.datasets[0],
          data: DailyData.datasets[0].data,
        },
      ],
    });

    setData2({
      labels: DailyData.labels,
      datasets: [
        {
          ...DailyData.datasets[1],
          data: DailyData.datasets[1].data,
        },
      ],
    });

    setPieData1({
      labels: weeklyCategoryDataExpenses.map((item) => item.label), // Extract labels from objects
      datasets: [
        {
          data: weeklyCategoryDataExpenses.map((item) => item.data), // Extract data from objects
          backgroundColor: backgroundColors,
        },
      ],
    });
  };

  const getMonthlyDataForThisYear = () => {
    if (!transactionData || !selectedMonth) return;

    const monthlyPriceExpense = Array(12).fill(0); // Initialize an array with zeros for each month.
    const monthlyPriceIncome = Array(12).fill(0);

    const weeklyCategoryDataExpenses = [
      { label: "Food", data: 0 },
      { label: "Groceries", data: 0 },
      { label: "Medal", data: 0 },
      { label: "Education", data: 0 },
      { label: "Travel", data: 0 },
      { label: "Bills", data: 0 },
      { label: "Shopping", data: 0 },
      { label: "Others", data: 0 },
    ];

    for (const transaction of transactionData) {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth(); // 0 (January) to 11 (December)
      if (
        transactionDate.getFullYear() === selectedMonth.getFullYear() &&
        transaction.type === "Expense"
      ) {
        monthlyPriceExpense[month] += transaction.price;
        const categoryToUpdate = weeklyCategoryDataExpenses.find(
          (item) => item.label === transaction.category
        );
        if (categoryToUpdate) {
          categoryToUpdate.data += transaction.price;
        }
      } else if (
        transactionDate.getFullYear() === selectedMonth.getFullYear() &&
        transaction.type === "Income"
      ) {
        monthlyPriceIncome[month] += transaction.price;
      }
    }

    setMonthlyData({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Transactions per month",
          data: monthlyPriceExpense,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Savings per month",
          data: monthlyPriceIncome,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });

    const newData1 = {
      labels: MonthlyData.labels,
      datasets: [
        {
          ...MonthlyData.datasets[0],
          data: MonthlyData.datasets[0].data,
        },
      ],
    };
    const newData2 = {
      labels: MonthlyData.labels,
      datasets: [
        {
          ...MonthlyData.datasets[1],
          data: MonthlyData.datasets[1].data,
        },
      ],
    };

    setPieData1({
      labels: weeklyCategoryDataExpenses.map((item) => item.label), // Extract labels from objects
      datasets: [
        {
          data: weeklyCategoryDataExpenses.map((item) => item.data), // Extract data from objects
          backgroundColor: backgroundColors,
        },
      ],
    });

    setData1(newData1);
    setData2(newData2);
  };

  const getYearlyDataForLastTenYears = () => {
    if (!transactionData) return;

    const currentYear = selectedYear.getFullYear();
    const lastTenYearsDataExpense = Array(10).fill(0);
    const lastTenYearsDataIncome = Array(10).fill(0);

    for (const transaction of transactionData) {
      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate.getFullYear();

      if (
        transactionYear >= currentYear - 9 &&
        transactionYear <= currentYear
      ) {
        const yearIndex = currentYear - transactionYear;
        if (transaction.type === "Expense") {
          lastTenYearsDataExpense[yearIndex] += transaction.price;
        } else if (transaction.type === "Income") {
          lastTenYearsDataIncome[yearIndex] += transaction.price;
        }
      }
    }

    setYearlyData({
      labels: generateYearLabels(),
      datasets: [
        {
          label: "Transactions per year",
          data: lastTenYearsDataExpense,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Savings per year",
          data: lastTenYearsDataIncome,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });

    const newData1 = {
      labels: YearlyData.labels,
      datasets: [
        {
          ...YearlyData.datasets[0],
          data: YearlyData.datasets[0].data,
        },
      ],
    };

    const newData2 = {
      labels: YearlyData.labels,
      datasets: [
        {
          ...YearlyData.datasets[1],
          data: YearlyData.datasets[1].data,
        },
      ],
    };

    setData1(newData1);
    setData2(newData2);
  };

  const changeDateType = (e) => {
    e.preventDefault();
    if (dateType === "Daily") {
      setDataType("Monthly");
    } else if (dateType === "Monthly") {
      setDataType("Yearly");
    } else {
      setDataType("Daily");
    }
  };

  const changeSelectedDate = () => {
    if (dateType === "Daily") {
      const selectedDateNow = new Date(selectedDate);
      selectedDateNow.setDate(selectedDateNow.getDate() - 7); // Subtract 7 days

      setSelectedDate(selectedDateNow);
    } else if (dateType === "Monthly") {
      const selectedMonthNow = new Date(selectedMonth);
      selectedMonthNow.setMonth(selectedMonthNow.getMonth() - 12); // Subtract 12 months
      setSelectedMonth(selectedMonthNow);
    } else {
      const selectedYearNow = new Date(selectedYear);
      selectedYearNow.setYear(selectedYearNow.getFullYear() - 10); // Subtract 10 years
      setSelectedYear(selectedYearNow);
    }
  };

  const changeSelectedDateNext = () => {
    if (dateType === "Daily") {
      const selectedDateNow = new Date(selectedDate);
      selectedDateNow.setDate(selectedDateNow.getDate() + 7); // Add 7 days
      setSelectedDate(selectedDateNow);
    } else if (dateType === "Monthly") {
      const selectedMonthNow = new Date(selectedMonth);
      selectedMonthNow.setMonth(selectedMonthNow.getMonth() + 12); // Subtract 12 months
      setSelectedMonth(selectedMonthNow);
    } else {
      const selectedYearNow = new Date(selectedYear);
      selectedYearNow.setYear(selectedYearNow.getFullYear() + 10); // Subtract 10 years
      setSelectedYear(selectedYearNow);
    }
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  const chartContainerStyles = {
    height: "225px",
    width: "275px",
    marginLeft: "20px",
    borderRadius: "30px",
    // border:"1px solid black",
    // boxShadow: "black",
  };

  const chartContainerStylesPie = {
    height: "400px",
    width: "640px",
    marginLeft: "150px",
    borderRadius: "30px",
    display: "flex",
  };

  const options = {};

  return (
    <div>
      <div className={`graphs ${theme === "light" ? "sliderl" : "sliderd"}`}>
        <div className="slides">
          <input
            type="radio"
            name="radio-btn"
            id="radio1"
            checked={counter === 1}
            onChange={handleRadioClick}
          />
          <input
            type="radio"
            name="radio-btn"
            id="radio2"
            checked={counter === 2}
            onChange={handleRadioClick}
          />
          <div
            className="slide first"
            style={{ display: "flex", top: "25%", position: "relative" }}
          >
            <div style={chartContainerStyles}>
              <Bar data={data1} options={chartOptions} />
            </div>
            <div style={chartContainerStyles}>
              <Bar data={data2} options={chartOptions} />
            </div>

            <div className="row btns">
              <div class="col-6 ghghg">
                <div className="buttons-for-graph">
                  <button
                    className={`single-button ${
                      theme === "light" ? "bchartl" : "bchartd"
                    }`}
                    onClick={changeDateType}
                  >
                    Type
                  </button>
                  <button
                    className={`single-button ${
                      theme === "light" ? "bchartl" : "bchartd"
                    }`}
                    onClick={changeSelectedDate}
                  >
                    Prev
                  </button>
                  <button
                    className={`single-button ${
                      theme === "light" ? "bchartl" : "bchartd"
                    }`}
                    onClick={changeSelectedDateNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div style={chartContainerStylesPie}>
              <Pie data={PieData1} options={options}></Pie>
              <div className="row btns">
                <div class="col-6 ghgh">
                  <div className="buttons-for-graph">
                    <button
                      className={`single-button ${
                        theme === "light" ? "bchartl" : "bchartd"
                      }`}
                      onClick={changeDateType}
                    >
                      Type
                    </button>
                    <button
                      className={`single-button ${
                        theme === "light" ? "bchartl" : "bchartd"
                      }`}
                      onClick={changeSelectedDate}
                    >
                      Prev
                    </button>
                    <button
                      className={`single-button ${
                        theme === "light" ? "bchartl" : "bchartd"
                      }`}
                      onClick={changeSelectedDateNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="navigation-auto">
            <div className="auto-btn1" />
            <div className="auto-btn2" />
          </div>
        </div>
        <div className="navigation-manual">
          <label
            htmlFor="radio1"
            className={`single-button ${
              theme === "light" ? "manual-btnl" : "manual-btnd"
            }`}
          >
            Bar
          </label>
          <label
            htmlFor="radio2"
            className={`single-button ${
              theme === "light" ? "manual-btnl" : "manual-btnd"
            }`}
          >
            Pie
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
