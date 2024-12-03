
export default function createTable(name, header, data, column, buttons, testata = "") {

    if (!document.getElementById(name)) {

        let headerHTML = `<tr class="table-primary">` + header.map((riga) => {
            return `<th class="toExcel" scope="col">${riga}</th>`;
        }).join("") + "<th></th></tr>";

        if (testata !== "") {
            headerHTML = `<tr class="table-info" ><th class="toExcel" scope="col" colSpan = "${(header.length + 1)}">${testata}</th></tr>` + headerHTML
        }
        const dataHtml = data.map((item) => {

            const rowHtml = column.map((cell) => {
                return `<td class="toExcel">${item[cell]}</td>`
            }).join("");

            const btnHtml = `<td><span>`+buttons.map((button) => {
                        return `
                            <i class="${button.btnClass}" ${button.btnId} = "${item[button.btnId]}"></i>`
                    }).join("")+`</td>`;

            return `
                    <tr>
                    ${rowHtml}
                    ${btnHtml}
                    </tr>
                `;
        }).join("");

        const tableHTML = `
                <div class="container-fluid mb-0 p-2">
                    <button type="button" class="btn btn-outline-danger" onclick="window.toPdf('${name}')"><i class="bi bi-filetype-pdf"></i> Export PDF</button>
                    <button type="button" class="btn btn-outline-success" onclick="window.toCsv('${name}')"><i class="bi bi-filetype-csv"></i> Export CSV</button>
                </div>
                <table class="table table-striped" id="${name}">
                    <thead>
                        ${headerHTML}
                    </thead>
                    <tbody>${dataHtml}</tbody>
                </table>
            `;

        return tableHTML;
    }
}

function toPdf(name){
    var element = document.getElementById(name);
    var opt = {
      margin:       1,
      filename:     name+'.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'cm', format: 'A4', orientation: 'landscape' }
    };
  
    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
    html2pdf(element, opt);
  }
  
  function toCsv(name) {
    const table = document.getElementById(name);
    const rows = table.querySelectorAll('tr');
  
    // Prepare CSV content
    let csvContent = '';
  
    rows.forEach(row => {
      const columns = row.querySelectorAll('.toExcel');
      const rowData = Array.from(columns).map(column => '"'+column.textContent.replace(/\n/g, ' ').replace(/\r/g, ' ')+'"').join(';');
      csvContent += rowData + '\n';
    });
  
    // Create a Blob
    const blob = new Blob([csvContent], { type: 'text/csv' });
  
    // Create a link element and trigger a click to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name+'.csv';
    link.click();
  }
  // Export the function
  window.toPdf = toPdf;
  window.toCsv = toCsv;