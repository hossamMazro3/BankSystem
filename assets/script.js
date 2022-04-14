let myTable = document
  .getElementById("myTable")
  .getElementsByTagName("tbody")[0];

async function boot() {
  const records = await fetch("/api/customers").then((t) => t.json());
  for (const [i, v] of records.result.entries()) {
    let row = myTable.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = i;
    cell2.innerHTML = v.name;
    cell3.innerHTML = v.email;
    cell4.innerHTML = v.balance;
  }
}

boot();
