const buyOrderTable = globalThis.getBuyOrdersTableFromDocument(document);
const sellOrderTable = globalThis.getSellOrdersTableFromDocument(document);

globalThis.addTopBidToTable(buyOrderTable, tableType.BuyOrders);
globalThis.addTopBidToTable(sellOrderTable, tableType.SellOrders);
