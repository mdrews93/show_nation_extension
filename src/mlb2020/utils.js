globalThis.getBuyOrdersTableFromDocument = (document) => document.getElementsByClassName('section-block')[0].getElementsByTagName('table')[0];

globalThis.getSellOrdersTableFromDocument = (document) => document.getElementsByClassName('section-block')[1].getElementsByTagName('table')[0];

globalThis.tableType = {
  BuyOrders: 'BuyOrders',
  SellOrders: 'SellOders',
};

globalThis.addTopBidToTable = (table, type) => {
  if (table) {
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (i === 0) {
        addHeaderToRow(document, row, 'Top Bid');
        addHeaderToRow(document, row, 'Runner Up');
      } else {
        addTopBidToRow(document, row, type);
        addRunnerUpToRow(document, row, type);
      }
    };
  }
};

const addHeaderToRow = (document, row, headerName) => {
  row.appendChild(createHeader(document, headerName));
};

const createHeader = (document, headerName) => {
  const newHeader = document.createElement('th');
  newHeader.innerText = headerName;
  return newHeader;
};

const addTopBidToRow = (document, row, type) => {
  const link = getLinkFromRow(row);
  const currentPrice = getPriceFromRow(row);

  $.ajax({
    url: link,
    this_row: row,
    this_price: currentPrice,
    success: function(data) {
      const topPriceElt = document.createElement('td');
      let table;

      if (type === tableType.BuyOrders) {
        table = $(data).find('table#table-sell-now')[0];
      } else if (type === tableType.SellOrders) {
        table = $(data).find('table#table-buy-now')[0];
      }
      const price = table.rows[1].children[1].innerText.match(/\d+/)[0];

      topPriceElt.innerText = price;
      if (currentPrice !== price) {
        topPriceElt.style.cssText = 'background-color:#ffb3b3';
      } else {
        topPriceElt.style.cssText = 'background-color:#b3ffb3';
      }
      this.this_row.appendChild(topPriceElt);
    },
  });
};

const addRunnerUpToRow = (document, row, type) => {
  const link = getLinkFromRow(row);
  const currentPrice = getPriceFromRow(row);

  $.ajax({
    url: link,
    this_row: row,
    this_price: currentPrice,
    success: function(data) {
      const topPriceElt = document.createElement('td');
      let table;

      if (type === tableType.BuyOrders) {
        table = $(data).find('table#table-sell-now')[0];
      } else if (type === tableType.SellOrders) {
        table = $(data).find('table#table-buy-now')[0];
      }
      const price = table.rows[2].children[1].innerText.match(/\d+/)[0];

      topPriceElt.innerText = price;
      if (Math.abs(price - currentPrice) === 1) {
        topPriceElt.style.cssText = 'background-color:#b3ffb3';
      } else {
        topPriceElt.style.cssText = 'background-color:#ffb3b3';
      }
      this.this_row.appendChild(topPriceElt);
    },
  });
};

const getLinkFromRow = (row) => row.getElementsByTagName('a')[0].href;

const getPriceFromRow = (row) => {
  return row.children[2].innerText.match(/\d+/)[0];
};

