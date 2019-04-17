var computeDifference = (row) => {
  console.log(table);
}

var table = document.getElementsByClassName("items-results-table")[0];
if (table) {
  for (var i = 0, row; row = table.rows[i]; i++) {
    tags = row.getElementsByTagName("td");
    row.removeChild(row.childNodes[13]);
    row.removeChild(row.childNodes[13]);
    row.removeChild(row.childNodes[13]);
    row.removeChild(row.childNodes[13]);
    if (i===0) {
      var newHeaderDiff = document.createElement("th");
      newHeaderDiff.innerText = "Sell-Buy";
      row.appendChild(newHeaderDiff);

      var newHeaderPer = document.createElement("th");
      newHeaderPer.innerText = "Diff/SellNow";
      row.appendChild(newHeaderPer);

      var newHeaderSellDiff = document.createElement("th");
      newHeaderSellDiff.innerText = "BidDiffs";
      row.appendChild(newHeaderSellDiff);

      var newHeaderSellDiffPer = document.createElement("th");
      newHeaderSellDiffPer.innerText = "BidDiffsPer";
      row.appendChild(newHeaderSellDiffPer);
    } else {
      buyNow = parseInt(tags[4].innerText);
      sellNow = parseInt(tags[5].innerText);
      diff = buyNow - sellNow;
      percentage = diff / sellNow;

      var newDiff = document.createElement("td");
      newDiff.innerText = diff;
      row.appendChild(newDiff);

      var newPer = document.createElement("td");
      newPer.innerText = Math.round(percentage*100) + "%";
      row.appendChild(newPer);

      link = row.children[2].getElementsByTagName("a")[0].href;
      $.ajax({
        url: link,
        this_row: row,
        this_buy_now: buyNow,
        success: function(data) {
          const orders = $(data).find(".title-widget-main")[3].getElementsByTagName("tr");
          const top_order = orders[1].getElementsByTagName("td")[1].innerText.replace(",", "").match(/\d+/)[0];
          const runner_up_order = orders[2].getElementsByTagName("td")[1].innerText.replace(",", "").match(/\d+/)[0];

          var sellDiff = document.createElement("td");
          sellDiff.innerText = runner_up_order - top_order;
          this.this_row.appendChild(sellDiff);

          var sellDiffPer = document.createElement("td");
          sellDiffPer.innerText = Math.round(((runner_up_order - top_order) / this.this_buy_now)*100) + "%";
          this.this_row.appendChild(sellDiffPer);
        }
      });
    }
  }
}
