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

        $.ajax({
          url: link,
          this_row: row,
          success: function(data) {
            var topPrice = document.createElement("td");
            const widgets = $(data).find(".create-order-widget-aside");
            if (isBuyOrder) {
              topPrice.innerText = widgets[1].innerText.replace(",", "").match(/\d+/)[0];
            } else if (isSellOrder) {
              topPrice.innerText = widgets[0].innerText.replace(",", "").match(/\d+/)[0];
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
