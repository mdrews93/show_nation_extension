var computeDifference = (row) => {
  console.log(table);
}

var table = document.getElementsByClassName("items-results-table")[0];
for (var i = 0, row; row = table.rows[i]; i++) {
  tags = row.getElementsByTagName("td");
  if (i===0) {
    var newHeaderDiff = document.createElement("th");
    newHeaderDiff.innerText = "Diff";
    row.appendChild(newHeaderDiff);

    var newHeaderPer = document.createElement("th");
    newHeaderPer.innerText = "Diff/SellNow";
    row.appendChild(newHeaderPer);
  } else {
    buyNow = parseInt(tags[3].innerText);
    sellNow = parseInt(tags[4].innerText);
    diff = buyNow - sellNow;
    percentage = diff / sellNow;

    var newDiff = document.createElement("td");
    newDiff.innerText = diff;
    row.appendChild(newDiff);

    var newPer = document.createElement("td");
    newPer.innerText = Math.round(percentage*100) + "%";
    row.appendChild(newPer);
  }
}
