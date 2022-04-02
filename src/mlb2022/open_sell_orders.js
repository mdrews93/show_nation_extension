const sellOrderTable = globalThis.getOpenOrdersTableFromDocument(document);

globalThis.addTopBidToTable(sellOrderTable, tableType.SellOrders);
