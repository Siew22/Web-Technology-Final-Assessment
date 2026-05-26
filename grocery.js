let totalCartCost = 0;

const addBtn = document.getElementById('addBtn');
const cartBody = document.getElementById('cartBody');
const grandTotalDisplay = document.getElementById('grandTotal');

addBtn.addEventListener('click', function() {
    const nameInput = document.getElementById('itemName');
    const qtyInput = document.getElementById('itemQty');
    const priceInput = document.getElementById('itemPrice');

    const itemName = nameInput.value.trim();
    const itemQty = parseInt(qtyInput.value);
    const itemPrice = parseFloat(priceInput.value);

    if (itemName === '' || isNaN(itemQty) || itemQty <= 0 || isNaN(itemPrice) || itemPrice <= 0) {
        alert("Please enter valid Item Name, Quantity (>= 1), and Price.");
        return;
    }

    const itemTotalPrice = itemQty * itemPrice;

    totalCartCost += itemTotalPrice;

    const emptyRow = document.getElementById('emptyRow');
    if (emptyRow) {
        emptyRow.remove();
    }

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${itemQty}</td>
        <td>RM ${itemPrice.toFixed(2)}</td>
        <td>RM ${itemTotalPrice.toFixed(2)}</td>
        <td><button class="btn-remove">Remove</button></td>
    `;

    cartBody.appendChild(newRow);

    const removeBtn = newRow.querySelector('.btn-remove');
    removeBtn.addEventListener('click', function() {
        newRow.remove();

        totalCartCost -= itemTotalPrice;

        if (totalCartCost < 0) totalCartCost = 0;

        updateTotalDisplay();

        if (cartBody.children.length === 0) {
            cartBody.innerHTML = `
                <tr id="emptyRow">
                    <td colspan="5" class="empty-message">Your list is currently empty. Add items above.</td>
                </tr>
            `;
        }
    });

    updateTotalDisplay();

    nameInput.value = '';
    qtyInput.value = '';
    priceInput.value = '';
    
    nameInput.focus();
});

function updateTotalDisplay() {
    grandTotalDisplay.textContent = `RM ${totalCartCost.toFixed(2)}`;
}