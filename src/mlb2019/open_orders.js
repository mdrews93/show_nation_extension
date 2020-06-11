const buyOrderWidget = document.getElementsByClassName('widget-inner')[0];
const sellOrderWidget = document.getElementsByClassName('widget-inner')[1];

const analyzeOrders = (widget, isBuyOrder=false, isSellOrder=false) => {
  const table = widget.getElementsByTagName('table')[0];
  console.log(table);
  if (table) {
    for (let i = 0, row; row = table.rows[i]; i++) {
      console.log(row);
      if (i===0) {
        const newHeaderTop = document.createElement('th');
        newHeaderTop.innerText = 'Top Bid';
        row.appendChild(newHeaderTop);
      } else {
        link = row.children[0].getElementsByTagName('a')[0].href;

        const currentPrice = row.children[1].innerText.replace(',', '').match(/\d+/)[0];

        $.ajax({
          url: link,
          this_row: row,
          this_price: currentPrice,
          success: function(data) {
            const topPrice = document.createElement('td');
            let price;
            const widgets = $(data).find('.create-order-widget-aside');
            if (isBuyOrder) {
              price = widgets[1].innerText.replace(',', '').match(/\d+/)[0];
            } else if (isSellOrder) {
              price = widgets[0].innerText.replace(',', '').match(/\d+/)[0];
            }

            topPrice.innerText = price;
            if (currentPrice !== price) {
              topPrice.style.cssText = 'background-color:#ffb3b3';
            } else {
              topPrice.style.cssText = 'background-color:#b3ffb3';
            }
            this.this_row.appendChild(topPrice);
          },
        });
      }
    }
  }
};

analyzeOrders(buyOrderWidget, true, false);
analyzeOrders(sellOrderWidget, false, true);
