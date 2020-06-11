const table = document.getElementsByTagName('table')[0];
if (table) {
  for (let i = 0, row; row = table.rows[i]; i++) {
    tags = row.getElementsByTagName('td');
    row.removeChild(row.childNodes[13]);
    row.removeChild(row.childNodes[13]);
    row.removeChild(row.childNodes[13]);
    row.removeChild(row.childNodes[13]);
    if (i===0) {
      const newHeaderDiff = document.createElement('th');
      newHeaderDiff.innerText = 'Sell-Buy';
      row.appendChild(newHeaderDiff);

      const newHeaderPer = document.createElement('th');
      newHeaderPer.innerText = 'Diff/SellNow';
      row.appendChild(newHeaderPer);

      const newHeaderSellDiff = document.createElement('th');
      newHeaderSellDiff.innerText = 'BidDiffs';
      row.appendChild(newHeaderSellDiff);
    } else {
      buyNow = parseInt(tags[4].innerText);
      sellNow = parseInt(tags[5].innerText);
      diff = (buyNow*0.9) - sellNow;
      percentage = diff / sellNow;

      const newDiff = document.createElement('td');
      newDiff.innerText = Math.round(diff);
      row.appendChild(newDiff);

      const newPer = document.createElement('td');
      newPer.innerText = Math.round(percentage*100) + '%';
      row.appendChild(newPer);

      link = row.children[2].getElementsByTagName('a')[0].href;
      $.ajax({
        url: link,
        this_row: row,
        this_buy_now: buyNow,
        success: function(data) {
          const table = $(data).find('table#table-buy-now')[0];
          const topOrder = table.rows[1].children[1].innerText.match(/\d+/)[0];
          const runnerUpOrder = table.rows[2].children[1].innerText.match(/\d+/)[0];

          const sellDiff = document.createElement('td');
          const profit = Math.round((runnerUpOrder*0.9) - topOrder);
          sellDiff.innerText = profit;
          if (profit > 0) {
            sellDiff.style.cssText = 'background-color:#b3ffb3';
          }
          this.this_row.appendChild(sellDiff);
        },
      });
    }
  }
}
