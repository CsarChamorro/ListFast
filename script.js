document.getElementById('product-form').addEventListener('submit', addProduct);
let total = 0;

function addProduct(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const priceInput = document.getElementById('product-price').value;
    const price = parseFloat(priceInput.replace(',', '.'));

    if (isNaN(price) || price <= 0) {
        alert('Introduce un precio válido.');
        return;
    }

    total += price;

    const li = document.createElement('li');
    li.textContent = `${name} - $${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Crear botón de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => editProduct(li, name, price));

    // Crear botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteProduct(li, price));

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    document.getElementById('list').appendChild(li);
    document.getElementById('total').textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    document.getElementById('product-form').reset();
}

function editProduct(li, name, price) {
    const newName = prompt('Nuevo nombre del producto:', name);
    const newPriceInput = prompt('Nuevo precio del producto:', price);
    const newPrice = parseFloat(newPriceInput.replace(',', '.'));

    if (newName && !isNaN(newPrice) && newPrice > 0) {
        total -= price;
        total += newPrice;

        li.textContent = `${newName} - $${newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // Volver a agregar los botones de editar y eliminar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editProduct(li, newName, newPrice));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteProduct(li, newPrice));

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        document.getElementById('total').textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        alert('Introduce un precio válido.');
    }
}

function deleteProduct(li, price) {
    total -= price;
    document.getElementById('list').removeChild(li);
    document.getElementById('total').textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function hideEditButtons() {
    document.querySelectorAll('.edit-button').forEach(button => button.style.display = 'none');
    document.querySelectorAll('.delete-button').forEach(button => button.style.display = 'none');
}

function showEditButtons() {
    document.querySelectorAll('.edit-button').forEach(button => button.style.display = 'inline');
    document.querySelectorAll('.delete-button').forEach(button => button.style.display = 'inline');
}

document.getElementById('export-pdf').addEventListener('click', () => {
    hideEditButtons();
    exportToPDF();
    showEditButtons();
});

document.getElementById('export-image').addEventListener('click', () => {
    hideEditButtons();
    exportToImage();
    showEditButtons();
});

document.getElementById('share-email').addEventListener('click', () => {
    hideEditButtons();
    shareByEmail();
    showEditButtons();
});

document.getElementById('share-whatsapp').addEventListener('click', () => {
    hideEditButtons();
    shareByWhatsApp();
    showEditButtons();
});

function exportToPDF() {
    html2canvas(document.querySelector('#product-list-container')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("lista_de_compras.pdf");
    });
}

function exportToImage() {
    html2canvas(document.querySelector('#product-list-container')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'lista_de_compras.png';
        link.click();
    });
}

function shareByEmail() {
    const email = "mailto:?subject=Lista de Compras&body=Te comparto mi lista de compras: \n" + getListText();
    window.location.href = email;
}

function shareByWhatsApp() {
    const whatsapp = "https://wa.me/?text=" + encodeURIComponent(getListText());
    window.open(whatsapp, '_blank');
}

function getListText() {
    let listText = "";
    const items = document.querySelectorAll('#list li');
    items.forEach(item => {
        const text = item.firstChild.textContent; // Obtener solo el texto del producto y el precio
        listText += text + "\n";
    });
    listText += "Total: $" + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return listText;
}
