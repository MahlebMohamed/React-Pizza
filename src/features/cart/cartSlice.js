import { createSlice } from "@reduxjs/toolkit";



// const initialState = {
//     cart: [],
//     isAddCart: false,
// }

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addItem(state, action) {
//             action.payload.quantity = 1;
//             state.isAddCart = true;
//             state.cart = [...state.cart, action.payload];
//         },
//         getItem(state, action) {
//             state.item = state.cart.filter((pizza) => pizza.id === action.payload);
//         },
//         deleteItem(state, action) {
//             state.cart = state.cart.filter((item) => item.id !== action.payload);
//         },
//         increaseItemQuentity(state, action) {
//             let index = state.cart.findIndex(u => u.id === action.payload);
//             if (index !== -1) {
//                 state.cart[index].quantity += 1;
//             }
//             else
//                 console.error('pizza non trouvé')
//         },
//         decreaseItemQuentity(state, action) {
//             let index = state.cart.findIndex(u => u.id === action.payload);
//             if (index !== -1) {
//                 state.cart[index].quantity -= 1;
//             }
//             else
//                 console.error('pizza non trouvé')
//         },
//         clearCart(state, action) {
//             state.cart = [];
//         },
//     }
// });


const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
        },
        increaseItemQuentity(state, action) {
            const item = state.cart.find((item) => item.pizzaId === action.payload);

            item.quantity++;
            item.totalPrice = item.unitPrice * item.quantity;
        },
        decreaseItemQuentity(state, action) {
            const item = state.cart.find((item) => item.pizzaId === action.payload);

            item.quantity--;
            item.totalPrice = item.unitPrice * item.quantity;

            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
        },
        clearCart(state, action) {
            state.cart = [];
        },
    }
});

export const {
    addItem,
    getItem,
    deleteItem,
    increaseItemQuentity,
    decreaseItemQuentity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce(
        (total, current) => total + current.totalPrice, 0
    );

export const getTotalCartQuantity = (state) =>
    state.cart.cart.reduce(
        (total, current) => total + current.quantity, 0
    );

export const getCurrentQuantityById = id => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
