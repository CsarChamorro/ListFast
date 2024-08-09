document.getElementById('product-form').addEventListener('submit', addProduct);
let total = 0;

function addProduct(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    total += price;

    const li = document.createElement('li');
    li.textContent = `${name} - $${price.toFixed(2)}`;

    document.getElementById('list').appendChild(li);
    document.getElementById('total').textContent = total.toFixed(2);

    document.getElementById('product-form').reset();
}

document.getElementById('export-pdf').addEventListener('click', exportToPDF);
document.getElementById('export-image').addEventListener('click', exportToImage);
document.getElementById('share-email').addEventListener('click', shareByEmail);
document.getElementById('share-whatsapp').addEventListener('click', shareByWhatsApp);

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

