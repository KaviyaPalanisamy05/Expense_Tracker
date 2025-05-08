let currentPage = 1;  // Start on page 1
const limit = 5; // Show 5 expenses per page

// Form submit event for adding a new expense
document.getElementById('expenseForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    title: document.getElementById('title').value,
    amount: parseFloat(document.getElementById('amount').value),
    category: document.getElementById('category').value,
    date: document.getElementById('date').value,
    notes: document.getElementById('notes').value,
  };

  try {
    const res = await fetch('/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadExpenses(currentPage); // Reload the current page after adding an expense
      e.target.reset(); // Clear the form fields
    } else {
      // Handle if POST request fails
      alert('Failed to add expense. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding expense. Please try again later.');
  }
});

// Load expenses for a specific page
async function loadExpenses(page) {
  try {
    const res = await fetch(`/expenses?page=${page}&limit=${limit}`);
    const data = await res.json();

    if (data && Array.isArray(data)) {
      const tbody = document.querySelector('#expensesTable tbody');
      tbody.innerHTML = ''; // Clear previous table rows

      // Populate the table with the new data
      data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.title}</td>
          <td>₹${item.amount}</td>
          <td>${item.category || '-'}</td>
          <td>${item.date ? item.date.slice(0,10) : '-'}</td>
          <td>${item.notes || '-'}</td>
          <td><button onclick="deleteExpense('${item._id}')">🗑️ Delete</button></td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (error) {
    console.error('Error loading expenses:', error);
    alert('Error loading expenses. Please try again later.');
  }
}

// Next page button functionality
document.getElementById('nextPageBtn').addEventListener('click', () => {
  currentPage += 1;  // Increment the page
  loadExpenses(currentPage);  // Load the new page
});

// Previous page button functionality
document.getElementById('prevPageBtn').addEventListener('click', () => {
  if (currentPage > 1) {  // Prevent going to page 0 or negative
    currentPage -= 1;  // Decrement the page
    loadExpenses(currentPage);  // Load the previous page
  }
});

// Initial page load
window.onload = () => {
  loadExpenses(currentPage);  // Load the first 5 expenses on page load
};

async function deleteExpense(id) {
    const confirmDelete = confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;
  
    const res = await fetch(`/expenses/${id}`, {
      method: 'DELETE'
    });
  
    if (res.ok) {
      alert('Expense deleted!');
      loadExpenses(currentPage); // Reload the current page
      updateBudgetStatus(); // Update budget info after deletion
    } else {
      alert('Failed to delete expense');
    }
  }
  


