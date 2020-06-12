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
        addHeaderToRow(document, row, 'Profit');
        addHeaderToRow(document, row, 'Diff/SellNow');
      } else {
        addTopBidToRow(document, row, type);
        addRunnerUpToRow(document, row, type);
        addProfitInfoToRow(document, row);
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
      const price = table.rows[1].children[1].innerText.replace(",", "").match(/\d+/)[0];

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
      const runnerUpElt = document.createElement('td');
      let table;

      if (type === tableType.BuyOrders) {
        table = $(data).find('table#table-sell-now')[0];
      } else if (type === tableType.SellOrders) {
        table = $(data).find('table#table-buy-now')[0];
      }
      const price = table.rows[2].children[1].innerText.replace(",", "").match(/\d+/)[0];

      runnerUpElt.innerText = price;
      if (Math.abs(price - currentPrice) === 1) {
        runnerUpElt.style.cssText = 'background-color:#b3ffb3';
      } else {
        runnerUpElt.style.cssText = 'background-color:#ffb3b3';
      }
      this.this_row.appendChild(runnerUpElt);
    },
  });
};

const addProfitInfoToRow = (document, row) => {
  const link = getLinkFromRow(row);
  const currentPrice = getPriceFromRow(row);

  $.ajax({
    url: link,
    this_row: row,
    this_price: currentPrice,
    success: function(data) {
      const profitElt = document.createElement('td');
      const percentageElt = document.createElement('td');

      const sellNowTable = $(data).find('table#table-sell-now')[0];
      const buyNowTable = $(data).find('table#table-buy-now')[0];
    
      const buyNowprice = buyNowTable.rows[1].children[1].innerText.replace(",", "").match(/\d+/)[0];
      const sellNowprice = sellNowTable.rows[1].children[1].innerText.replace(",", "").match(/\d+/)[0];

      const profit = (buyNowprice*0.9) - sellNowprice;
      const percentage = profit / sellNowprice;
      profitElt.innerText = Math.round(profit);
      percentageElt.innerText = Math.round(percentage*100) + '%';

      this.this_row.appendChild(profitElt);
      this.this_row.appendChild(percentageElt);
    },
  });
};

const getLinkFromRow = (row) => row.getElementsByTagName('a')[0].href;

const getPriceFromRow = (row) => {
  return row.children[2].innerText.replace(",", "").match(/\d+/)[0];
};

