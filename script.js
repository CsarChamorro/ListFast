document.getElementById('product-form').addEventListener('submit', addProduct);
let total = 0;

function addProduct(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    total += price;

    const li = document.createElement('li');
    li.textContent = `${name} - $${price.toFixed(2)}`;

    // Crear botón de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => editProduct(li, name, price));

    li.appendChild(editButton);
    document.getElementById('list').appendChild(li);
    document.getElementById('total').textContent = total.toFixed(2);

    document.getElementById('product-form').reset();
}

function editProduct(li, name, price) {
    const newName = prompt('Nuevo nombre del producto:', name);
    const newPrice = parseFloat(prompt('Nuevo precio del producto:', price));

    if (newName && !isNaN(newPrice)) {
        total -= price;
        total += newPrice;

        li.textContent = `${newName} - $${newPrice.toFixed(2)}`;

        // Volver a agregar el botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editProduct(li, newName, newPrice));

        li.appendChild(editButton);
        document.getElementById('total').textContent = total.toFixed(2);
    }
}

function hideEditButtons() {
    document.querySelectorAll('.edit-button').forEach(button => button.style.display = 'none');
}

function showEditButtons() {
    document.querySelectorAll('.edit-button').forEach(button => button.style.display = 'inline');
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
        listText += item.textContent + "\n";
    });
    listText += "Total: $" + total.toFixed(2);
    return listText;
}

