function GetUserInvoices(trn) {
    if (!trn) {
        console.error("GetUserInvoices: TRN is required for user lookup.");
        return [];
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Normalize TRN for lookup 
    const normalizedTrn = trn.replace(/\D/g, "");

    // Find the user and return their invoices, or an empty array if not found
    const user = users.find(u => u.trn && u.trn.replace(/\D/g, "") === normalizedTrn);

    if (!user) {
        console.warn(`GetUserInvoices: No user found with TRN: ${trn}`);
        return [];
    }

    return user.invoices || [];
}


function ShowInvoices(searchTRN = null) {
    // Retrieve all invoices from the global storage key 'AllInvoices'
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices") || "[]");
    
    console.log("=========================================");
    console.log(`ShowInvoices() - Global Invoices Summary (${allInvoices.length} total)`);

    if (allInvoices.length === 0) {
        console.log("No invoices found in localStorage under key 'AllInvoices'.");
        console.log("=========================================");
        return;
    }
    
    let filteredInvoices = allInvoices;
    
    if (searchTRN) {
        const normalizedSearchTRN = searchTRN.replace(/\D/g, "");
        filteredInvoices = allInvoices.filter(invoice => 
            invoice.trn && invoice.trn.replace(/\D/g, "") === normalizedSearchTRN
        );
        console.log(`Filter applied for TRN: ${searchTRN} (${filteredInvoices.length} results)`);
    } else {
        console.log("Showing all invoices (no TRN filter applied).");
    }

    // Display the filtered results using console.log()
    filteredInvoices.forEach((invoice) => {
        console.log(`--- Invoice ${invoice.invoiceNumber} ---`);
        console.log(`  Date: ${invoice.dateOfInvoice}`);
        console.log(`  Customer: ${invoice.shippingInformation.name}`);
        console.log(`  TRN: ${invoice.trn}`);
        console.log(`  Total: $${invoice.totalCost.toFixed(2)}`);
    });

    console.log("=========================================");
    console.log(`To search, call ShowInvoices('TRN-NUMBER') in the console.`);
}

window.ShowInvoices = ShowInvoices; 
window.GetUserInvoices = GetUserInvoices;