export default function json2html(data) {
    // Define the headers based on expected keys
    const headers = ["Name", "Age", "Gender"];
    
    // Start building the HTML table with the required data-user attribute
    let html = `<table data-user="zah82560@gmail.com">\n<thead>\n<tr>`;
    
    // Add each header to the table's header row
    headers.forEach(header => {
      html += `<th>${header}</th>`;
    });
    html += `</tr>\n</thead>\n<tbody>\n`;
  
    // Populate table rows based on provided data
    data.forEach(row => {
      html += `<tr>`;
      headers.forEach(header => {
        html += `<td>${row[header] !== undefined ? row[header] : ''}</td>`;
      });
      html += `</tr>\n`;
    });
    html += `</tbody>\n</table>`;
    
    return html;
  }
  