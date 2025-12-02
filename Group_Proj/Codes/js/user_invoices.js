function ShowUserInvoicesOnPage() {
    const currentUserTRN = JSON.parse(localStorage.getItem("currentUser"));
    const container = document.getElementById("invoices-list");
    const loadingMessage = document.getElementById("loading-message");
    
    if (loadingMessage) loadingMessage.remove(); 
    container.innerHTML = '';

    if (!currentUserTRN) {
        container.innerHTML = `
            <p style="text-align: center; color: red; font-size: 1.2rem;">User not logged in. Please sign in to view your invoices.</p>
            <p style="text-align: center;"><a href="signin.html">Click here to Sign In</a></p>
        `;
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userRecord = users.find(user => user.trn === currentUserTRN);
    const invoices = (userRecord && userRecord.invoices) ? userRecord.invoices : [];

    if (invoices.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; font-size: 1.2rem;">You have no past orders.</p>
            <p style="text-align: center;"><a href="catalog.html">Start Shopping Now</a></p>
        `;
        return;
    }
    
    // Sort invoices by date
    invoices.sort((a, b) => new Date(b.dateOfInvoice) - new Date(a.dateOfInvoice));
    
    const table = document.createElement('table');
    table.className = 'item-table invoice-summary-table'; 
    
    // Table Header
    table.innerHTML = `
        <thead>
            <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Item Count</th>
                <th>Subtotal</th>
                <th>Total Paid</th>
            </tr>
        </thead>
        <tbody id="invoice-summary-body">
        </tbody>
    `;
    
    // Populate Table Body
    const tbody = table.querySelector("#invoice-summary-body");
    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        // Calculating the total number of items purchased
        const itemCount = invoice.purchasedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        row.innerHTML = `
            <td>${invoice.invoiceNumber}</td>
            <td>${invoice.dateOfInvoice}</td>
            <td>${itemCount}</td>
            <td>$${invoice.subtotal.toFixed(2)}</td>
            <td><span style="font-weight: bold;">$${invoice.totalCost.toFixed(2)}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    container.appendChild(table);

    // Add a total count message
    const totalCount = document.createElement('p');
    totalCount.style.textAlign = 'center';
    totalCount.style.marginTop = '20px';
    totalCount.innerHTML = `Total number of invoices found: <b>${invoices.length}</b>`;
    container.appendChild(totalCount);
}

document.addEventListener("DOMContentLoaded", ShowUserInvoicesOnPage);