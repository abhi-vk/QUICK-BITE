import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
          img: action.img,
        },
      ];
    }
    case "REMOVE": {
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    }
    case "UPDATE": {
      let arr = [...state];
      let itemIndex = arr.findIndex((food) => food.id === action.id);

      if (itemIndex !== -1) {
        arr[itemIndex] = {
          ...arr[itemIndex],
          qty: parseInt(action.qty) + arr[itemIndex].qty,
          price: (parseInt(action.qty) + arr[itemIndex].qty) * arr[itemIndex].price,
        };
      }

      return arr;
    }
    case "DROP": {
      return [];
    }
    default: {
      console.log("Error in reducer");
      return state;
    }
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
