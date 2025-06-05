document.addEventListener('DOMContentLoaded', function() {
    // Initialize transactions from localStorage or empty array
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // DOM Elements
    const transactionForm = document.getElementById('transactionForm');
    const transactionList = document.getElementById('transactionList');
    const totalBalance = document.getElementById('totalBalance');
    const totalIncome = document.getElementById('totalIncome');
    const totalExpense = document.getElementById('totalExpense');
    const filterAll = document.getElementById('filterAll');
    const filterIncome = document.getElementById('filterIncome');
    const filterExpense = document.getElementById('filterExpense');
    
    // Set default date to today
    document.getElementById('date').valueAsDate = new Date();
    
    // Initialize charts
    const balanceChart = new Chart(
        document.getElementById('balanceChart'),
        {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Saldo',
                        data: [],
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.1,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Perkembangan Saldo'
                    }
                }
            }
        }
    );
    
    const categoryChart = new Chart(
        document.getElementById('categoryChart'),
        {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Pengeluaran per Kategori',
                        data: [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Pengeluaran per Kategori'
                    }
                }
            }
        }
    );
    
    // Add transaction
    transactionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('type').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        
        if (amount <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Jumlah transaksi harus lebih dari 0!'
            });
            return;
        }
        
        const transaction = {
            id: generateID(),
            type,
            amount,
            category,
            date,
            description
        };
        
        transactions.push(transaction);
        updateLocalStorage();
        updateUI();
        updateCharts();
        
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Transaksi berhasil ditambahkan.',
            showConfirmButton: false,
            timer: 1500
        });
        
        transactionForm.reset();
        document.getElementById('date').valueAsDate = new Date();
    });
    
    // Filter transactions
    filterAll.addEventListener('click', () => filterTransactions('all'));
    filterIncome.addEventListener('click', () => filterTransactions('income'));
    filterExpense.addEventListener('click', () => filterTransactions('expense'));
    
    // Generate ID
    function generateID() {
        return Math.floor(Math.random() * 1000000000);
    }
    
    // Update localStorage
    function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    
    // Update UI
    function updateUI(filterType = 'all') {
        // Calculate totals
        const incomeTotal = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((total, transaction) => total + transaction.amount, 0);
        
        const expenseTotal = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((total, transaction) => total + transaction.amount, 0);
        
        const balance = incomeTotal - expenseTotal;
        
        // Update totals
        totalIncome.textContent = formatCurrency(incomeTotal);
        totalExpense.textContent = formatCurrency(expenseTotal);
        totalBalance.textContent = formatCurrency(balance);
        
        // Update transaction list
        transactionList.innerHTML = '';
        
        let filteredTransactions = transactions;
        if (filterType !== 'all') {
            filteredTransactions = transactions.filter(
                transaction => transaction.type === filterType
            );
        }
        
        // Sort by date (newest first)
        filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (filteredTransactions.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    Tidak ada transaksi
                </td>
            `;
            transactionList.appendChild(row);
        } else {
            filteredTransactions.forEach(transaction => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-50';
                
                const amountClass = transaction.type === 'income' ? 
                    'text-green-600 font-semibold' : 'text-red-600 font-semibold';
                const amountPrefix = transaction.type === 'income' ? '+' : '-';
                
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${formatDate(transaction.date)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${getCategoryName(transaction.category)}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                        ${transaction.description || '-'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm ${amountClass}">
                        ${amountPrefix}${formatCurrency(transaction.amount)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button data-id="${transaction.id}" class="text-red-600 hover:text-red-900 delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                transactionList.appendChild(row);
            });
            
            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    deleteTransaction(id);
                });
            });
        }
    }
    
    // Filter transactions
    function filterTransactions(type) {
        updateUI(type);
        
        // Update active filter button
        [filterAll, filterIncome, filterExpense].forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-blue-100', 'text-blue-600');
        });
        
        if (type === 'all') {
            filterAll.classList.remove('bg-blue-100', 'text-blue-600');
            filterAll.classList.add('bg-blue-600', 'text-white');
        } else if (type === 'income') {
            filterIncome.classList.remove('bg-green-100', 'text-green-600');
            filterIncome.classList.add('bg-green-600', 'text-white');
        } else if (type === 'expense') {
            filterExpense.classList.remove('bg-red-100', 'text-red-600');
            filterExpense.classList.add('bg-red-600', 'text-white');
        }
    }
    
    // Delete transaction
    function deleteTransaction(id) {
        Swal.fire({
            title: 'Hapus Transaksi?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                transactions = transactions.filter(transaction => transaction.id !== id);
                updateLocalStorage();
                updateUI();
                updateCharts();
                
                Swal.fire(
                    'Terhapus!',
                    'Transaksi telah dihapus.',
                    'success'
                );
            }
        });
    }
    
    // Update charts
    function updateCharts() {
        // Balance chart (last 7 days)
        const last7Days = getLastNDays(7);
        const balanceData = last7Days.map(date => {
            const income = transactions
                .filter(t => t.type === 'income' && t.date === date)
                .reduce((sum, t) => sum + t.amount, 0);
            
            const expense = transactions
                .filter(t => t.type === 'expense' && t.date === date)
                .reduce((sum, t) => sum + t.amount, 0);
            
            return income - expense;
        });
        
        // Calculate cumulative balance
        let cumulativeBalance = 0;
        const cumulativeData = balanceData.map(amount => {
            cumulativeBalance += amount;
            return cumulativeBalance;
        });
        
        balanceChart.data.labels = last7Days.map(date => formatDate(date, true));
        balanceChart.data.datasets[0].data = cumulativeData;
        balanceChart.update();
        
        // Category chart (expenses only)
        const expenses = transactions.filter(t => t.type === 'expense');
        const categories = [...new Set(expenses.map(t => t.category))];
        const categoryData = categories.map(cat => {
            return expenses
                .filter(t => t.category === cat)
                .reduce((sum, t) => sum + t.amount, 0);
        });
        
        categoryChart.data.labels = categories.map(getCategoryName);
        categoryChart.data.datasets[0].data = categoryData;
        categoryChart.update();
    }
    
    // Helper functions
    function formatCurrency(amount) {
        return 'Rp ' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    function formatDate(dateString, short = false) {
        const date = new Date(dateString);
        if (short) {
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        }
        return date.toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }
    
    function getCategoryName(category) {
        const names = {
            'gaji': 'Gaji',
            'investasi': 'Investasi',
            'hadiah': 'Hadiah',
            'lainnya': 'Lainnya'
        };
        return names[category] || category;
    }
    
    function getLastNDays(n) {
        const dates = [];
        for (let i = n - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    }
    
    // Initial UI update
    updateUI();
    updateCharts();
});