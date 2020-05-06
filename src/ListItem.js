import React from 'react';

const ListItem = (props) => {
    return <tr>
        <td>
            {props.item.name}
        </td>
        <td>
            {props.item.price}
        </td>
        <td>
            {props.item.description}
        </td>
        <td>
            {props.item.quantity}
        </td>
        <td>
            <button className="btn-sm btn  ml-4 btn-info px-8 "
                onClick={props.editProduct}
            >Edit</button>
            <button className="btn-sm btn px-8 ml-4 btn-danger"
                onClick={props.deleteProduct}
            >Delete</button>
        </td>
    </tr>

}

export default ListItem;