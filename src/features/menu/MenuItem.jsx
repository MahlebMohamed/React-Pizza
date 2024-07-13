import { useDispatch, useSelector } from 'react-redux';

import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { formatCurrency } from '../../utils/helpers';
// import {
//   addItem,
//   decreaseItemQuentity,
//   getItem,
//   increaseItemQuentity,
// } from '../cart/cartSlice';
// import Button from '../../ui/Button';

// function getObjectById(array, id) {
//   return array.find((element) => element.id === id);
// }

// function MenuItem({ pizza, cart }) {
//   const dispatch = useDispatch();
//   // const [isAddCart, setIsAddCart] = useState(false);
//   const pizzaCart = getObjectById(cart, pizza.id);
//   const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;
//   const [quantityPizza, setQuantityPizza] = useState(
//     pizzaCart === undefined ? 1 : pizzaCart.quantity
//   );

//   function handleAddToCart() {
//     dispatch(addItem(pizza));
//   }

//   function handleIncItem() {
//     setQuantityPizza((quantityPizza) => {
//       return quantityPizza + 1;
//     });
//     dispatch(increaseItemQuentity(id));
//   }

//   function handleDecItem() {
//     if (quantityPizza > 1) {
//       setQuantityPizza(quantityPizza - 1);
//       dispatch(decreaseItemQuentity(id));
//       dispatch(getItem(pizza.id));
//     }
//   }

//   function isAddCart2(array, obj) {
//     return array.some((element) => {
//       return JSON.stringify(element.id) === JSON.stringify(obj.id);
//     });
//   }

//   return (
//     <li className="flex gap-4 py-2">
//       <img
//         src={imageUrl}
//         alt={name}
//         className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
//       />
//       <div className="flex grow flex-col pt-0.5">
//         <p className="font-medium">{name}</p>
//         <p className="text-sm capitalize italic text-stone-500">
//           {ingredients.join(', ')}
//         </p>
//         <div className="mt-auto flex items-center justify-between">
//           {!soldOut ? (
//             <p className="text-sm">{formatCurrency(unitPrice)}</p>
//           ) : (
//             <p className="text-sm font-medium uppercase text-stone-500">
//               Sold out
//             </p>
//           )}

//           {isAddCart2(cart, pizza) ? (
//             <div className="flex items-center gap-3">
//               <span>{quantityPizza} x</span>
//               <Button type="small" onClick={handleIncItem}>
//                 +
//               </Button>
//               <Button type="small" onClick={handleDecItem}>
//                 -
//               </Button>
//             </div>
//           ) : (
//             <Button onClick={handleAddToCart} type="small">
//               Add to cart
//             </Button>
//           )}
//         </div>
//       </div>
//     </li>
//   );
// }

// export default MenuItem;
