import {
  Box,
  Typography,
  Button,
  Toolbar,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useCart } from "./context/CartContext";
import Navbar from "./Navbar/Navbar";
import Footerdetails from "./FooterDetails/Footerdetails";
import CloseIcon from "@mui/icons-material/Close";
function Cart() {
  const { cartItems, removeFromCart,increaseQty,decreaseQty } = useCart();

  if (cartItems.length === 0) {
    return <Typography sx={{ p: 4 }}>Cart is empty</Typography>;
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // function handleclick() {
  //   console.log("item removed");
  // }

  return (
    <div>
      <Navbar />
      <Toolbar />
      <Box sx={{ p: 10 }}>
        <Typography variant="h4" textAlign="center">
          Your Cart
        </Typography>

        {/* Parent flex container: left = items, right = summary */}
        <Box display="flex" gap={4} mt={4}>
          {/* LEFT: Cart Items */}
          <Box flex={2}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  mt: 3,
                  gap: 2,
                  borderBottom: "1px solid #ccc",
                  pb: 2,
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={item.image}
                  alt={item.name}
                />
                <Box display="flex" justifyContent="space-between" gap={40}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography gutterBottom variant="h4">{item.name}</Typography>
                   
                    <Typography>Individual Price: ${item.price}</Typography>
                    <Typography>
                      Price: ${item.price * item.quantity}
                    </Typography>

                    <Typography gutterBottom>Change:</Typography>

                    <Box  display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "140px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
             
            }}>
                      <Button onClick={()=>{
                        decreaseQty(item.id)
                      }}
                        sx={{
                          minWidth: "40px",
                          fontSize: "20px",
                          borderRight: "1px solid #ccc",
                        }}
                      >
                        -
                      </Button>

                      <Typography>{item.quantity}</Typography>
                      <Button onClick={() => increaseQty(item.id)}
                        sx={{
                          minWidth: "40px",
                          fontSize: "20px",
                          borderLeft: "1px solid #ccc",
                          
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton onClick={() => removeFromCart(item.id)}>
                      {" "}
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* RIGHT: Order Summary */}
          <Box
            flex={1}
            sx={{
              p: 3,
              border: "1px solid #ccc",
              borderRadius: 2,
              height: "fit-content",
            }}
          >
            <Typography gutterBottom variant="h6">
              ORDER SUMMARY
            </Typography>
            <Typography gutterBottom>
              <strong>Subtotal:</strong> ${totalPrice}
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <Footerdetails />
    </div>
  );
}

export default Cart;
