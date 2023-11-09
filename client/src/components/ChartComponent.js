import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const ChartComponent = (props) => {

  const transactionData = props?.data?.transactions;

  const today = new Date();
  const [dailyPriceForThisYearExpense, setDailyPriceExpense] = useState(['10','20','30','40','50','60','20']);
  const [dailyPriceForThisYearIncome, setDailyPriceIncome] = useState(['10','20','30','40','50','60','20']);

  const [monthyPriceForThisYearExpense, setMonthyPriceExpense] = useState(['10','20','30','40','50','60','20','10','9','13','15','50']);
  const [monthyPriceForThisYearIncome, setMonthyPriceIncome] = useState(['10','20','30','40','50','60','20','10','9','13','15','50']);

  const [yearlyPriceExpense, setYearlyPriceExpense] = useState(['10','20','30','40','50','60','20','10','9','13']);
  const [yearlyPriceIncome, setYearlyPriceIncome] = useState(['10','20','30','40','50','60','20','10','9','13']);

  const [dateType,setDataType] = useState("Daily");

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(today);
  const [selectedYear, setSelectedYear] = useState(today);

  const generateYearLabels = () => {
    const currentYear = selectedYear.getFullYear();
    const labels = [];
    for (let i = 0; i < 10; i++) {
      labels.push((currentYear - i).toString());
    }
    return labels;
  };

  const [DailyData,setDailyData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Transactions per day',
        data: dailyPriceForThisYearExpense,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Savings per day',
        data: dailyPriceForThisYearIncome,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [MonthlyData,setMonthlyData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Transactions per month',
        data: monthyPriceForThisYearExpense,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Savings per month',
        data: monthyPriceForThisYearIncome,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [YearlyData,setYearlyData] = useState({
    labels: generateYearLabels(),
    datasets: [
      {
        label: 'Transactions per year',
        data: yearlyPriceExpense,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Savings per year',
        data: yearlyPriceIncome,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [data1, setData1] = useState({
    labels: DailyData.labels,
    datasets: [{
      ...DailyData.datasets[0],
      data: dailyPriceForThisYearExpense,
    }],
  });

  const [data2, setData2] = useState({
    labels: DailyData.labels,
    datasets: [{
      ...DailyData.datasets[1],
      data: dailyPriceForThisYearIncome,
    }],
  });

  useEffect(() => {
    if(dateType==="Daily"){
      getDailyDataForSelectedDate();
    }
    else if(dateType==="Monthly"){
      getMonthlyDataForThisYear();
    }
    else{
      getYearlyDataForLastTenYears();
    }
    
  }, [selectedDate,selectedMonth,selectedYear,transactionData,dateType]);
  

  const getDailyDataForSelectedDate = () => {
    if (!transactionData || !selectedDate) return;

    const startDate = new Date(selectedDate);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Get the start of the week for the selected date
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Get the end of the week

    const dailyPriceExpense = Array(7).fill(0); // Initialize an array with zeros for each day of the week.
    const dailyPriceIncome = Array(7).fill(0);

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
      }
      else if(
        transactionDate >= startDate &&
        transactionDate <= endDate &&
        transactionDate.getFullYear() === startDate.getFullYear() &&
        transaction.type === "Income"
      ){
        const dayOfWeek = transactionDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        dailyPriceIncome[dayOfWeek] += transaction.price;
      }
    }
    setDailyPriceExpense(dailyPriceExpense);
    setDailyPriceIncome(dailyPriceIncome);

    setDailyData({
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Transactions per day',
          data: dailyPriceExpense,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Savings per day',
          data: dailyPriceIncome,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });

    setData1({
      labels: DailyData.labels,
      datasets: [{
        ...DailyData.datasets[0],
        data: DailyData.datasets[0].data,
      }],
    });
    
    setData2({
      labels: DailyData.labels,
      datasets: [{
        ...DailyData.datasets[1],
        data: DailyData.datasets[1].data,
      }],
    });

  };

  const getMonthlyDataForThisYear = () => {
    if (!transactionData || !selectedMonth) return;
  
    const monthlyPriceExpense = Array(12).fill(0); // Initialize an array with zeros for each month.
    const monthlyPriceIncome = Array(12).fill(0);
  
    for (const transaction of transactionData) {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth(); // 0 (January) to 11 (December)
      if (
        transactionDate.getFullYear() === selectedMonth.getFullYear() &&
        transaction.type === "Expense"
      ) {
        monthlyPriceExpense[month] += transaction.price;
      } else if (
        transactionDate.getFullYear() === selectedMonth.getFullYear() &&
        transaction.type === "Income"
      ) {
        monthlyPriceIncome[month] += transaction.price;
      }
    }
    setMonthyPriceExpense(monthlyPriceExpense);
    setMonthyPriceIncome(monthlyPriceIncome);

    setMonthlyData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Transactions per month',
          data: monthlyPriceExpense,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Savings per month',
          data: monthlyPriceIncome,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    })

    const newData1 = {
      labels: MonthlyData.labels,
      datasets: [{
        ...MonthlyData.datasets[0],
        data: MonthlyData.datasets[0].data,
      }],
    };
    const newData2 = {
      labels: MonthlyData.labels,
      datasets: [{
        ...MonthlyData.datasets[1],
        data: MonthlyData.datasets[1].data,
      }],
    };

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

      if (transactionYear >= currentYear - 9 && transactionYear <= currentYear) {
        const yearIndex = currentYear - transactionYear;
        if (transaction.type === "Expense") {
          lastTenYearsDataExpense[yearIndex] += transaction.price;
        } else if (transaction.type === "Income") {
          lastTenYearsDataIncome[yearIndex] += transaction.price;
        }
      }
    }

    setYearlyPriceExpense(lastTenYearsDataExpense);
    setYearlyPriceIncome(lastTenYearsDataIncome);

    setYearlyData({
      labels: generateYearLabels(),
      datasets: [
        {
          label: 'Transactions per year',
          data: lastTenYearsDataExpense,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Savings per year',
          data: lastTenYearsDataIncome,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });

    const newData1 = {
      labels: YearlyData.labels,
      datasets: [{
        ...YearlyData.datasets[0],
        data: YearlyData.datasets[0].data,
      }],
    };

    const newData2 = {
      labels: YearlyData.labels,
      datasets: [{
        ...YearlyData.datasets[1],
        data: YearlyData.datasets[1].data,
      }],
    };

    setData1(newData1);
    setData2(newData2);
  };

  const changeDateType = (e) => {
    e.preventDefault();
    if(dateType==="Daily"){
      setDataType("Monthly");
    }
    else if(dateType==="Monthly"){
      setDataType("Yearly");
    }
    else{
      setDataType("Daily");
    }
  }

  const changeSelectedDate = () => {
    if (dateType === "Daily") {
      const selectedDateNow = new Date(selectedDate);
      selectedDateNow.setDate(selectedDateNow.getDate() - 7); // Subtract 7 days
      setSelectedDate(selectedDateNow);
  
      // Calculate and set new data for "Transactions per day" dataset
      const newData1 = {
        labels: DailyData.labels,
        datasets: [{
          ...DailyData.datasets[0],
          data: dailyPriceForThisYearExpense,
        }],
      };
      const newData2 = {
        labels: DailyData.labels,
        datasets: [{
          ...DailyData.datasets[1],
          data: dailyPriceForThisYearIncome,
        }],
      };
      setData1(newData1);
      setData2(newData2);

    } else if (dateType === "Monthly") {
      const selectedMonthNow = new Date(selectedMonth);
      selectedMonthNow.setMonth(selectedMonthNow.getMonth() - 12); // Subtract 12 months
      setSelectedMonth(selectedMonthNow);
  
      // Calculate and set new data for "Transactions per day" dataset
      const newData1 = {
        labels: MonthlyData.labels,
        datasets: [{
          ...MonthlyData.datasets[0],
          data: monthyPriceForThisYearExpense,
        }],
      };

      const newData2 = {
        labels: MonthlyData.labels,
        datasets: [{
          ...MonthlyData.datasets[1],
          data: monthyPriceForThisYearIncome,
        }],
      };

      setData1(newData1);
      setData2(newData2);

    } else {
      const selectedYearNow = new Date(selectedYear);
      selectedYearNow.setYear(selectedYearNow.getFullYear() - 10); // Subtract 10 years
      setSelectedYear(selectedYearNow);

      // Calculate and set new data for "Transactions per day" dataset
      const newData1 = {
        labels: YearlyData.labels,
        datasets: [{
          ...YearlyData.datasets[0],
          data: yearlyPriceExpense,
        }],
      };
      const newData2 = {
        labels: YearlyData.labels,
        datasets: [{
          ...YearlyData.datasets[1],
          data: yearlyPriceIncome,
        }],
      };
      setData1(newData1);
      setData2(newData2);

    }
  };

  const changeSelectedDateNext = () => {
    if (dateType === "Daily") {
      const selectedDateNow = new Date(selectedDate);
      selectedDateNow.setDate(selectedDateNow.getDate() + 7); // Add 7 days
      setSelectedDate(selectedDateNow);
  
      // Calculate and set new data for "Transactions per day" dataset
      const newData1 = {
        labels: DailyData.labels,
        datasets: [{
          ...DailyData.datasets[0],
          data: dailyPriceForThisYearExpense,
        }],
      };
      const newData2 = {
        labels: DailyData.labels,
        datasets: [{
          ...DailyData.datasets[1],
          data: dailyPriceForThisYearIncome,
        }],
      };
      setData1(newData1);
      setData2(newData2);
    } else if (dateType === "Monthly") {
      const selectedMonthNow = new Date(selectedMonth);
      selectedMonthNow.setMonth(selectedMonthNow.getMonth() + 12); // Subtract 12 months
      setSelectedMonth(selectedMonthNow);
  
      // Calculate and set new data for "Transactions per day" dataset
      const newData1 = {
        labels: MonthlyData.labels,
        datasets: [{
          ...MonthlyData.datasets[0],
          data: monthyPriceForThisYearExpense,
        }],
      };
      const newData2 = {
        labels: MonthlyData.labels,
        datasets: [{
          ...MonthlyData.datasets[1],
          data: monthyPriceForThisYearIncome,
        }],
      };
      setData1(newData1);
      setData2(newData2);
    } else {
      const selectedYearNow = new Date(selectedYear);
      selectedYearNow.setYear(selectedYearNow.getFullYear() + 10); // Subtract 10 years
      setSelectedYear(selectedYearNow);

      // Calculate and set new data for "Transactions per day" dataset
      const newData1 = {
        labels: YearlyData.labels,
        datasets: [{
          ...YearlyData.datasets[0],
          data: yearlyPriceExpense,
        }],
      };
      const newData2 = {
        labels: YearlyData.labels,
        datasets: [{
          ...YearlyData.datasets[1],
          data: yearlyPriceIncome,
        }],
      };
      setData1(newData1);
      setData2(newData2);

    }
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  const chartContainerStyles = {
    height: '300px',
    width: '20%',
    marginLeft: '150px',
  };

  return (
    <div>
      <button onClick={changeDateType}>Date Type</button>
      <div style={{ display: 'flex' }}>
        <div style={chartContainerStyles}>
          <Bar data={data1} options={chartOptions} />
        </div>
        <div style={chartContainerStyles}>
          <Bar data={data2} options={chartOptions} />
        </div>
        <button onClick={changeSelectedDate}>Prev</button>
      <button onClick={changeSelectedDateNext}>Next</button>
      </div>
    </div>
  );
}

export default ChartComponent;
