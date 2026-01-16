import { createContext, useContext, useState } from "react";

// 1️⃣ Create a Context
const CartContext = createContext();

// 2️⃣ Create a Provider component
export const CartProvider = ({ children }) => {
  // State to hold all cart items
  const [cartItems, setCartItems] = useState([]);

  const decreaseQty=(id)=>{
    setCartItems((items)=>{
      return items.map((item)=>
        item.id===id && item.quantity>1?
             {...item,
              quantity:item.quantity-1
             }:item
        
      )
    })
  }
const increaseQty=(id)=>{
setCartItems((items)=>{
  return items.map((item)=>{
    if(item.id===id){
      return{
        ...item,
        quantity:item.quantity+1
      }
    }
      else{
        return item;
      }
    
  })
})
}


   const removeFromCart=(id)=>{
        setCartItems(cartItems.filter((item)=>item.id!==id))
      }

  // 3️⃣ Function to add a product to the cart
  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      // Check if product already exists
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        // If exists, increase the quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

    

      // If new product, add it
      return [...prev, { ...product, quantity }];
    });
     
  };

  // 4️⃣ Provide cartItems and addToCart to all components
  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart,increaseQty,decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
};

// 5️⃣ Custom hook to use cart anywhere
export const useCart = () => useContext(CartContext);
