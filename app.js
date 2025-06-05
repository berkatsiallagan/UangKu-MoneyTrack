document.addEventListener("DOMContentLoaded", function () {
    // Initialize transactions from localStorage or empty array
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
    // DOM Elements
    const transactionForm = document.getElementById("transactionForm");
    const transactionList = document.getElementById("transactionList");
    const totalBalance = document.getElementById("totalBalance");
    const totalIncome = document.getElementById("totalIncome");
    const totalExpense = document.getElementById("totalExpense");
    const filterAll = document.getElementById("filterAll");
    const filterIncome = document.getElementById("filterIncome");
    const filterExpense = document.getElementById("filterExpense");
    const refreshBtn = document.getElementById("refreshBtn");
    const clearFormBtn = document.getElementById("clearFormBtn");
    const chartWeek = document.getElementById("chartWeek");
    const chartMonth = document.getElementById("chartMonth");
    const chartYear = document.getElementById("chartYear");
    const exportBtn = document.getElementById("exportBtn");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const printBtn = document.getElementById("printBtn");
    const backToTopButton = document.getElementById("backToTop");
  
    // Set default date to today
    document.getElementById("date").valueAsDate = new Date();
  
    // Payment methods
    const paymentMethods = {
      cash: "Tunai",
      dana: "DANA",
      shopeepay: "ShopeePay",
      gopay: "GoPay",
      bni: "BNI Mobile",
      bca: "BCA Mobile",
      mandiri: "Mandiri Online",
      other: "Lainnya",
    };
  
    // Initialize charts
    const balanceChart = new Chart(document.getElementById("balanceChart"), {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Saldo",
            data: [],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Perkembangan Saldo",
          },
        },
      },
    });
  
    const categoryChart = new Chart(document.getElementById("categoryChart"), {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "Pengeluaran per Kategori",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Pengeluaran per Kategori",
          },
        },
      },
    });
  
    // Add payment method select to form
    const categorySelect = document.getElementById("category");
    const paymentMethodSelect = document.createElement("select");
    paymentMethodSelect.id = "paymentMethod";
    paymentMethodSelect.className =
      "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none";
  
    Object.entries(paymentMethods).forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      paymentMethodSelect.appendChild(option);
    });
  
    // Insert payment method select after category select
    categorySelect.parentNode.parentNode.insertBefore(
      document.createElement("div"),
      categorySelect.parentNode.nextSibling
    ).innerHTML = `
          <label class="block text-gray-700 mb-2" for="paymentMethod">Metode Pembayaran</label>
          <div class="relative">
              <select id="paymentMethod" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                  ${Object.entries(paymentMethods)
                    .map(
                      ([value, text]) =>
                        `<option value="${value}">${text}</option>`
                    )
                    .join("")}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i class="fas fa-chevron-down"></i>
              </div>
          </div>
      `;
  
    // Add transaction
    transactionForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const type = document.getElementById("type").value;
      const amount = parseFloat(document.getElementById("amount").value);
      const category = document.getElementById("category").value;
      const paymentMethod = document.getElementById("paymentMethod").value;
      const date = document.getElementById("date").value;
      const description = document.getElementById("description").value;
  
      if (amount <= 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Jumlah transaksi harus lebih dari 0!",
        });
        return;
      }
  
      const transaction = {
        id: generateID(),
        type,
        amount,
        category,
        paymentMethod,
        date,
        description,
      };
  
      transactions.push(transaction);
      updateLocalStorage();
      updateUI();
      updateCharts("week"); // Default to week view
  
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Transaksi berhasil ditambahkan.",
        showConfirmButton: false,
        timer: 1500,
      });
  
      transactionForm.reset();
      document.getElementById("date").valueAsDate = new Date();
    });
  
    // Filter transactions
    filterAll.addEventListener("click", () => filterTransactions("all"));
    filterIncome.addEventListener("click", () => filterTransactions("income"));
    filterExpense.addEventListener("click", () => filterTransactions("expense"));
  
    // Refresh button
    refreshBtn.addEventListener("click", function () {
      updateUI();
      updateCharts();
      Swal.fire({
        icon: "success",
        title: "Data diperbarui",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  
    // Clear form button
    clearFormBtn.addEventListener("click", function () {
      transactionForm.reset();
      document.getElementById("date").valueAsDate = new Date();
    });
  
    // Chart period buttons
    chartWeek.addEventListener("click", function () {
      updateCharts("week");
      setActiveChartButton(this);
    });
  
    chartMonth.addEventListener("click", function () {
      updateCharts("month");
      setActiveChartButton(this);
    });
  
    chartYear.addEventListener("click", function () {
      updateCharts("year");
      setActiveChartButton(this);
    });
  
    // Export button
    exportBtn.addEventListener("click", function () {
      exportData();
    });
  
    // Print button
    printBtn.addEventListener("click", function () {
      window.print();
    });
  
    // Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
      document.documentElement.classList.toggle("dark");
      const icon = this.querySelector("i");
      if (document.documentElement.classList.contains("dark")) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("darkMode", "enabled");
      } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("darkMode", "disabled");
      }
    });
  
    // Back to top button
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove("opacity-0", "invisible");
        backToTopButton.classList.add("opacity-100", "visible");
      } else {
        backToTopButton.classList.remove("opacity-100", "visible");
        backToTopButton.classList.add("opacity-0", "invisible");
      }
    });
    
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    // Set active chart button
    function setActiveChartButton(activeButton) {
      [chartWeek, chartMonth, chartYear].forEach((btn) => {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-gray-100", "text-gray-600");
      });
      activeButton.classList.remove("bg-gray-100", "text-gray-600");
      activeButton.classList.add("bg-blue-600", "text-white");
    }
  
    // Generate ID
    function generateID() {
      return Math.floor(Math.random() * 1000000000);
    }
  
    // Update localStorage
    function updateLocalStorage() {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  
    // Export data
    function exportData() {
      if (transactions.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Tidak ada data",
          text: "Tidak ada transaksi untuk diekspor",
        });
        return;
      }
  
      // Convert to CSV
      const headers = [
        "Tanggal",
        "Jenis",
        "Kategori",
        "Metode Pembayaran",
        "Jumlah",
        "Keterangan",
      ];
      const csvRows = [
        headers.join(","),
        ...transactions.map((t) =>
          [
            formatDate(t.date),
            t.type === "income" ? "Pemasukan" : "Pengeluaran",
            getCategoryName(t.category),
            paymentMethods[t.paymentMethod] || t.paymentMethod,
            t.amount,
            t.description || "",
          ]
            .map((field) => `"${field}"`)
            .join(",")
        ),
      ];
  
      const csv = csvRows.join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `moneytrack_export_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      Swal.fire({
        icon: "success",
        title: "Data berhasil diekspor",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  
    // Update UI
    function updateUI(filterType = "all") {
      // Calculate totals
      const incomeTotal = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);
  
      const expenseTotal = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);
  
      const balance = incomeTotal - expenseTotal;
  
      // Update totals
      totalIncome.textContent = formatCurrency(incomeTotal);
      totalExpense.textContent = formatCurrency(expenseTotal);
      totalBalance.textContent = formatCurrency(balance);
  
      // Update transaction list
      transactionList.innerHTML = "";
  
      let filteredTransactions = transactions;
      if (filterType !== "all") {
        filteredTransactions = transactions.filter(
          (transaction) => transaction.type === filterType
        );
      }
  
      // Sort by date (newest first)
      filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      if (filteredTransactions.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                      Tidak ada transaksi
                  </td>
              `;
        transactionList.appendChild(row);
      } else {
        filteredTransactions.forEach((transaction) => {
          const row = document.createElement("tr");
          row.className = "hover:bg-gray-50";
  
          const amountClass =
            transaction.type === "income"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold";
          const amountPrefix = transaction.type === "income" ? "+" : "-";
  
          row.innerHTML = `
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${formatDate(transaction.date)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${getCategoryName(transaction.category)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${
                            paymentMethods[transaction.paymentMethod] ||
                            transaction.paymentMethod
                          }
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-500">
                          ${transaction.description || "-"}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm ${amountClass}">
                          ${amountPrefix}${formatCurrency(transaction.amount)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button data-id="${
                            transaction.id
                          }" class="text-red-600 hover:text-red-900 delete-btn">
                              <i class="fas fa-trash"></i>
                          </button>
                      </td>
                  `;
          transactionList.appendChild(row);
        });
  
        // Add event listeners to delete buttons
        document.querySelectorAll(".delete-btn").forEach((button) => {
          button.addEventListener("click", function () {
            const id = parseInt(this.getAttribute("data-id"));
            deleteTransaction(id);
          });
        });
      }
    }
  
    // Filter transactions
    function filterTransactions(type) {
      updateUI(type);
  
      // Update active filter button
      [filterAll, filterIncome, filterExpense].forEach((btn) => {
        btn.classList.remove(
          "bg-blue-600",
          "text-white",
          "bg-green-600",
          "bg-red-600"
        );
      });
  
      if (type === "all") {
        filterAll.classList.add("bg-blue-600", "text-white");
        filterIncome.classList.add("bg-green-100", "text-green-600");
        filterExpense.classList.add("bg-red-100", "text-red-600");
      } else if (type === "income") {
        filterIncome.classList.add("bg-green-600", "text-white");
        filterAll.classList.add("bg-blue-100", "text-blue-600");
        filterExpense.classList.add("bg-red-100", "text-red-600");
      } else if (type === "expense") {
        filterExpense.classList.add("bg-red-600", "text-white");
        filterAll.classList.add("bg-blue-100", "text-blue-600");
        filterIncome.classList.add("bg-green-100", "text-green-600");
      }
    }
  
    // Delete transaction
    function deleteTransaction(id) {
      Swal.fire({
        title: "Hapus Transaksi?",
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          transactions = transactions.filter(
            (transaction) => transaction.id !== id
          );
          updateLocalStorage();
          updateUI();
          updateCharts();
  
          Swal.fire("Terhapus!", "Transaksi telah dihapus.", "success");
        }
      });
    }
  
    // Update charts
    function updateCharts(period = "week") {
      let dateRange = [];
      let labelFormat = {};
  
      switch (period) {
        case "month":
          dateRange = getLastNDays(30);
          labelFormat = { month: "short", day: "numeric" };
          break;
        case "year":
          dateRange = getLastNMonths(12);
          labelFormat = { year: "numeric", month: "short" };
          break;
        case "week":
        default:
          dateRange = getLastNDays(7);
          labelFormat = { weekday: "short", day: "numeric" };
          break;
      }
  
      // Balance chart
      const balanceData = dateRange.map((date) => {
        const income = transactions
          .filter(
            (t) => t.type === "income" && isDateInPeriod(t.date, date, period)
          )
          .reduce((sum, t) => sum + t.amount, 0);
  
        const expense = transactions
          .filter(
            (t) => t.type === "expense" && isDateInPeriod(t.date, date, period)
          )
          .reduce((sum, t) => sum + t.amount, 0);
  
        return income - expense;
      });
  
      // Calculate cumulative balance
      let cumulativeBalance = 0;
      const cumulativeData = balanceData.map((amount) => {
        cumulativeBalance += amount;
        return cumulativeBalance;
      });
  
      balanceChart.data.labels = dateRange.map((date) =>
        formatDate(date, labelFormat)
      );
      balanceChart.data.datasets[0].data = cumulativeData;
      balanceChart.options.plugins.title.text = `Perkembangan Saldo (${getPeriodTitle(
        period
      )})`;
      balanceChart.update();
  
      // Category chart (expenses only)
      const expenses = transactions.filter(
        (t) => t.type === "expense" && isDateInPeriod(t.date, null, period)
      );
      const categories = [...new Set(expenses.map((t) => t.category))];
      const categoryData = categories.map((cat) => {
        return expenses
          .filter((t) => t.category === cat)
          .reduce((sum, t) => sum + t.amount, 0);
      });
  
      categoryChart.data.labels = categories.map(getCategoryName);
      categoryChart.data.datasets[0].data = categoryData;
      categoryChart.options.plugins.title.text = `Pengeluaran per Kategori (${getPeriodTitle(
        period
      )})`;
      categoryChart.update();
    }
  
    // Helper functions
    function formatCurrency(amount) {
      return "Rp " + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
  
    function formatDate(dateString, options = false) {
      if (typeof options === "object") {
        return new Date(dateString).toLocaleDateString("id-ID", options);
      }
  
      const date = new Date(dateString);
      if (options === true) {
        return date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        });
      }
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  
    function getCategoryName(category) {
      const names = {
        gaji: "Gaji",
        investasi: "Investasi",
        hadiah: "Hadiah",
        makanan: "Makanan",
        transportasi: "Transportasi",
        hiburan: "Hiburan",
        lainnya: "Lainnya",
      };
      return names[category] || category;
    }
  
    function getLastNDays(n) {
      const dates = [];
      for (let i = n - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
      }
      return dates;
    }
  
    function getLastNMonths(n) {
      const months = [];
      const date = new Date();
      date.setDate(1); // Set to first day of month
  
      for (let i = n - 1; i >= 0; i--) {
        const tempDate = new Date(date);
        tempDate.setMonth(date.getMonth() - i);
        months.push(tempDate.toISOString().split("T")[0]);
      }
      return months;
    }
  
    function isDateInPeriod(transactionDate, periodDate, periodType) {
      const transDate = new Date(transactionDate);
      const compDate = periodDate ? new Date(periodDate) : new Date();
  
      if (periodType === "year") {
        return (
          transDate.getFullYear() === compDate.getFullYear() &&
          transDate.getMonth() === compDate.getMonth()
        );
      }
  
      if (periodType === "month") {
        return (
          transDate.getFullYear() === compDate.getFullYear() &&
          transDate.getMonth() === compDate.getMonth() &&
          transDate.getDate() === compDate.getDate()
        );
      }
  
      if (periodType === "week") {
          return (
            transDate.getDate() === compDate.getDate()
          );
        }
  
      // Default week comparison
      return transactionDate === periodDate;
    }
  
    function getPeriodTitle(period) {
      const titles = {
        week: "7 Hari Terakhir",
        month: "30 Hari Terakhir",
        year: "12 Bulan Terakhir",
      };
      return titles[period] || period;
    }
  
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      document.documentElement.classList.add("dark");
      document
        .getElementById("darkModeToggle")
        .querySelector("i")
        .classList.replace("fa-moon", "fa-sun");
    }
  
    // Initial UI update
    updateUI();
    updateCharts("week");
    setActiveChartButton(chartWeek);
    filterAll.classList.add("bg-blue-600", "text-white");
  });