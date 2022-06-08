import React from 'react'

function Payment(props) {
  debugger
  const {orderDetails}=props
  return (
    <div>
      {console.log(props)}
      {console.log(typeof orderDetails)}
      {/* {props.orderDetails} */}
      <p>{orderDetails}</p>

      {/* <table>
        <tr>
          <td>{orderDetails}</td>
          <td></td>
        </tr>
      </table> */}
    </div>
  )
}

export default Payment