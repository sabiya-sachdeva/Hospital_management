import { Toolbar, Typography, Box, Button } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import Footerdetails from "./FooterDetails/Footerdetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

function AddtoBag() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(
          `/api/medsupplies/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.log("error");
      }
    };
    data();
  }, [id]);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((pre) => (pre > 1 ? (pre = pre - 1) : 1));
  };

  const handleAddToBag = () => {
    addToCart(product, quantity); // add to cart
    navigate("/cart"); // go to cart page
  };

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <Navbar />
      <Toolbar />
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="flex-start"
        gap={4}
        alignItems={{ xs: "center", sm: "flex-start" }}
        sx={{
          marginTop: "60px",
          px: "270px",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <img
            src={`/${product.image}`}
            alt={product.name}
            style={{
              width: "300px",
              display: "block",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Typography variant="h4" gutterBottom sx={{ mb: 5, mt: 7, ml: 20 }}>
            {product.name}
          </Typography>
          <Typography
            variant="body 1"
            gutterBottom
            sx={{ mb: 2, mt: 2, ml: 20 }}
          >
            <strong>PRICE: </strong>${product.price *quantity}
          </Typography>
          <Typography variant="body 1" sx={{ mb: 2, ml: 20 }} gutterBottom>
            <strong>QUANTITY</strong>
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "140px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              ml: 20,
            }}
          >
            <Button
              onClick={decreaseQty}
              sx={{
                minWidth: "40px",
                fontSize: "20px",
                borderRight: "1px solid #ccc",
              }}
            >
              −
            </Button>
            <Typography variant="h6" sx={{ mx: 2 }}>
              {quantity}
            </Typography>
            <Button
              onClick={increaseQty}
              sx={{
                minWidth: "40px",
                fontSize: "20px",
                borderLeft: "1px solid #ccc",
              }}
            >
              +
            </Button>
          </Box>
          <Button
            variant="contained"
            sx={{ display: "block", mt: 6, mb: 9, ml: 20 }}
            onClick={handleAddToBag}
          >
            Add to bag
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width="100%"
          textAlign="left"
        >
          <Typography gutterBottom>
            <strong>DESCRIPTION</strong>
          </Typography>
          <Typography gutterBottom sx={{ mb: 10 }}>
            {product.Description}
          </Typography>
        </Box>
      </Box>

      <Footerdetails />
    </div>
  );
}

export default AddtoBag;
