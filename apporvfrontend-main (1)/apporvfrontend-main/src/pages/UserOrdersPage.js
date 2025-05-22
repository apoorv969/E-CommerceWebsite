
import Navbar from "../features/navbar/Navbar"
import UserOrders from "../features/user/components/UserOrders"

const UserOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-4xl">My Orders</h1>
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  )
}

export default UserOrdersPage
