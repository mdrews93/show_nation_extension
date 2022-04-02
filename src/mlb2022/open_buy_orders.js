const buyOrderTable = globalThis.getOpenOrdersTableFromDocument(document);

globalThis.addTopBidToTable(buyOrderTable, tableType.BuyOrders);
