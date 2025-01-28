const balanceAmount = document.getElementById('balanceAmount');
    const incomeAmount = document.getElementById('incomeAmount');
    const expenseAmount = document.getElementById('expenseAmount');
    const transactionList = document.getElementById('transactionList');
    const transactionForm = document.getElementById('transactionForm');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const logoutBtn = document.getElementById('logoutBtn');
    const userDisplay = document.getElementById('userDisplay');

    let transactions = [];
    let currentUser = localStorage.getItem('loggedInUser'); // Get the logged-in user

    // If no user is logged in, redirect to login page
    if (!currentUser) {
      window.location.href = 'login.html';
    } else {
      document.getElementById('trackerContainer').style.display = 'block';
      userDisplay.textContent = currentUser; // Display the username
    }

    // Load transactions from localStorage based on user
    function loadTransactions() {
      const savedTransactions = JSON.parse(localStorage.getItem(`transactions_${currentUser}`)) || [];
      transactions = savedTransactions;
      renderTransactions();
      updateSummary();
    }

    // Save transactions in localStorage
    function saveTransactions() {
      localStorage.setItem(`transactions_${currentUser}`, JSON.stringify(transactions));
    }

    // Function to update balance, income, and expenses
    function updateSummary() {
      const income = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((total, transaction) => total + transaction.amount, 0);

      const expense = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((total, transaction) => total + transaction.amount, 0);

      const balance = income + expense;

      balanceAmount.innerText = balance.toFixed(2);
      incomeAmount.innerText = income.toFixed(2);
      expenseAmount.innerText = Math.abs(expense).toFixed(2);
    }

    // Function to add transaction to the list
    function addTransaction(transaction) {
      const listItem = document.createElement('li');
      listItem.classList.add(transaction.amount > 0 ? 'income' : 'expense');

      listItem.innerHTML = `
        ${transaction.description} <span>${transaction.amount > 0 ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">&times;</button>
      `;

      transactionList.appendChild(listItem);
    }

    // Function to remove transaction
    function removeTransaction(id) {
      transactions = transactions.filter(transaction => transaction.id !== id);
      renderTransactions();
      updateSummary();
      saveTransactions(); // Save updated transactions to localStorage
    }

    // Function to render all transactions
    function renderTransactions() {
      transactionList.innerHTML = '';
      transactions.forEach(addTransaction);
    }

    // Handle form submission for adding transactions
    transactionForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const description = descriptionInput.value;
      const amount = +amountInput.value;

      if (description.trim() === '' || isNaN(amount)) {
        alert('Please provide a valid description and amount');
        return;
      }

      const transaction = {
        id: Date.now(),
        description,
        amount
      };

      transactions.push(transaction);
      addTransaction(transaction);
      updateSummary();
      saveTransactions(); // Save the new transaction to localStorage

      descriptionInput.value = '';
      amountInput.value = '';
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('loggedInUser'); // Remove login session
      window.location.href = 'login.html'; // Redirect to login page
    });

    // Initial render and data load
    loadTransactions();