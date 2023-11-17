import { Navigate, Route, Routes } from "react-router-dom"
import {InventoryPage} from "../inventory/page/InventoryPage.jsx";
import {DeliveryPage} from "../delivery/page/DeliveryPage.jsx";
import {InvestmentsPage} from "../investments/page/InvestmentsPage.jsx";
import {OrdersPage} from "../orders/page/OrdersPage.jsx";
import {ProfitsPage} from "../profits/page/ProfitsPage.jsx";
import {SalesPage} from "../sales/page/SalesPage.jsx";


export const TierRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <InventoryPage/> }/>
            <Route path="/delivery" element={ <DeliveryPage/> } />
            <Route path="/investments" element={ <InvestmentsPage/>}/>
            <Route path="/orders" element={ <OrdersPage/>}/>
            <Route path="/profits" element={ <ProfitsPage/>}/>
            <Route path="/sales" element={ <SalesPage/>}/>
            <Route path="/*" element={ <Navigate to="/"/>} />
        </Routes>
    )
}
