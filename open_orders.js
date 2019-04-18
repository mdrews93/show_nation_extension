var buy_order_widget = document.getElementsByClassName("widget-inner")[0];
var sell_order_widget = document.getElementsByClassName("widget-inner")[1];

const analyze_orders = (widget, isBuyOrder=false, isSellOrder=false) => {
  var table = widget.getElementsByTagName("table")[0];
  console.log(table);
  if (table) {
    for (var i = 0, row; row = table.rows[i]; i++) {
      console.log(row);
      if (i===0) {
        var newHeaderTop = document.createElement("th");
        newHeaderTop.innerText = "Top Bid";
        row.appendChild(newHeaderTop);
      } else {
        link = row.children[0].getElementsByTagName("a")[0].href;

        const current_price = row.children[1].innerText.replace(",", "").match(/\d+/)[0];

        $.ajax({
          url: link,
          this_row: row,
          this_price: current_price,
          success: function(data) {
            var topPrice = document.createElement("td");
            var price;
            const widgets = $(data).find(".create-order-widget-aside");
            if (isBuyOrder) {
              price = widgets[1].innerText.replace(",", "").match(/\d+/)[0];
            } else if (isSellOrder) {
              price = widgets[0].innerText.replace(",", "").match(/\d+/)[0];
            }

            topPrice.innerText = price;
            if (current_price !== price) {
              topPrice.style.cssText = "background-color:#ffb3b3";
            } else {
              topPrice.style.cssText = "background-color:#b3ffb3";
            }
            this.this_row.appendChild(topPrice);
          }
        });

      }
    }
  }
}

analyze_orders(buy_order_widget, true, false);
analyze_orders(sell_order_widget, false, true);
