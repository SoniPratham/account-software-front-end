import { Routes, Route } from "react-router-dom";

// Import form components
import AccountMasterForm from "../forms/master/account-master/account-master";
import AccountGroupMasterForm from "../forms/master/account-group-master/account-group-master";
import ItemMasterForm from "../forms/master/Item-Master/Item-Master";
import BookMasterForm from "../forms/master/book-master/book-master";
import ItemGroupMasterForm from "../forms/master/item-group-master/Item-Group-Master";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/account-master" element={<AccountMasterForm />} />
      <Route path="/account-group-master" element={<AccountGroupMasterForm />} />
      <Route path="/item-master" element={<ItemMasterForm />} />
      <Route path="/item-group-master" element={<ItemGroupMasterForm />} />
      <Route path="/book-master" element={<BookMasterForm />} />
      {/* <Route path="/purchase-entry" element={<PurchaseEntry />} />
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