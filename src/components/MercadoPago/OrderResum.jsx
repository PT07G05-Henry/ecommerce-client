import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./buttongeneratemplink.css"
import api, { endPoint } from "../../lib/api";
import { useState } from "react";

export default function OrderResum({totalPrice, data, orderId}) {

  return (
    <div>
        <table>
            <tr>
                <th>
                    Product Name
                </th>
                <th>
                    Price
                </th>
                <th>
                    Qty
                </th>
                <th>
                    Sumary
                </th>
            </tr>
            {data.length > 0 && data.map((d)=>{return(
                <tr>
                    <td>
                        {d.name}
                    </td>
                    <td>
                        {d.price}
                    </td>
                    <td>
                        {d.qty}
                    </td>
                    <td>
                    {(Number(d.qty) * Number(d.price)).toFixed(2)}
                    </td>
                </tr>
            )})}
            <tr>
                <td colSpan={3}>
                Total Price
                </td>
                <td>
                    {totalPrice}
                </td>
            </tr>
        </table>
    </div>
    
  );
}