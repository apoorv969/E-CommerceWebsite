import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants';
import Pagination from '../../common/Pagination';
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../../order/orderSlice';

const AdminOrders = () => {

    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders)
    const totalOrders = useSelector(selectTotalOrders)
    const [editableOrderId, setEditableOrderId] = useState(-1)

      const handleEdit =(order)=>{
        setEditableOrderId(order.id)
      }

      const handleShow =()=>{
        
      }

      const handleUpdate =(e,order)=>{
        const updatedOrder = {...order, status:e.target.value}

        dispatch(updateOrderAsync(updatedOrder))
        setEditableOrderId(-1)
      }

      const handlePage =(page)=>{
        setPage(page)
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ pagination }));
      }
        useEffect(() => {
            const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ pagination }));

    }, [dispatch, page]);
    return (
        <>
            {/* component */}
            <div className="overflow-x-auto">
                <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">#Order</th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-center">Total Amount</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map(order => <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">

                                                </div>
                                                <span className="font-medium">{order.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.items.map(item => <div className="flex items-center">
                                                <div className="mr-2">
                                                    <img
                                                        className="w-6 h-6 rounded-full"
                                                        src={item.product.thumbnail}
                                                        alt={item.product.title}
                                                    />
                                                </div>
                                                <span>{item.product.title} - #{item.quantity} - ${discountedPrice(item.product)}</span>
                                            </div>)}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                ${order.totalAmount}
                                            </div>
                                        </td>
                                        {/* <td className="py-3 px-6 text-center">
                                            <div className="">
                                                <div><strong>{order.selectedAddress.name}</strong></div>
                                                <div>{order.selectedAddress.street}</div>
                                                <div>{order.selectedAddress.city}</div>
                                                <div>{order.selectedAddress.state}</div>
                                                <div>{order.selectedAddress.pinCode}</div>
                                                <div>{order.selectedAddress.phone}</div>
                                            </div>
                                        </td> */}
                                        <td className="py-3 px-6 text-center">
                                           {order.id === editableOrderId ? 
                                            <select onChange={e=>handleUpdate(e,order)}>
                                                <option value="pending">Pending</option>
                                                <option value="dispatched">Dispatched</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>

                                            </select>
                                            :
                                            (<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                {order.status}
                                            </span> )}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                                                    <EyeIcon className='w-8 h-8' onClick={(e)=>handleShow(order)}></EyeIcon>
                                                </div>
                                                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                                                    <PencilIcon className='w-8 h-8'  onClick={(e)=>handleEdit(order)}></PencilIcon>
                                                </div>
                                                
                                            </div>
                                        </td>
                                    </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination
                 page={page}
                setPage={setPage} 
                handlePage={handlePage}
                 totalItems={totalOrders}
                 ></Pagination>
            </div>
        </>

    )
}

export default AdminOrders
