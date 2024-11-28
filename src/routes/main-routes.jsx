import React from "react";
import { Routes, Route } from "react-router-dom";

// Import form components
import AccountMasterForm from "../forms/master/account-master/account-master";
// import AccountGroupMaster from "../forms/account-group-master";
// import ItemMaster from "../forms/item-master";
// import ItemGroupMaster from "../forms/item-group-master";
// import BookMaster from "../forms/book-master";
// import PurchaseEntry from "../forms/purchase-entry";
// import SalesEntry from "../forms/sales-entry";
// import BankCashEntry from "../forms/bank-cash-entry";
// import JournalEntry from "../forms/journal-entry";
// import Reports from "../forms/reports";
// import Utilities from "../forms/utilities";
// import CompaniesMenu from "../forms/companies-menu";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/account-master" element={<AccountMasterForm />} />
      {/* <Route path="/account-group-master" element={<AccountGroupMaster />} />
      <Route path="/item-master" element={<ItemMaster />} />
      <Route path="/item-group-master" element={<ItemGroupMaster />} />
      <Route path="/book-master" element={<BookMaster />} />
      <Route path="/purchase-entry" element={<PurchaseEntry />} />
      <Route path="/sales-entry" element={<SalesEntry />} />
      <Route path="/bank-cash-entry" element={<BankCashEntry />} />
      <Route path="/journal-entry" element={<JournalEntry />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/utilities" element={<Utilities />} />
      <Route path="/companies-menu" element={<CompaniesMenu />} /> */}
    </Routes>
  );
};

export default MainRoutes;