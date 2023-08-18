import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";

// Material UI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

// Amplify UI Components
import { NavBarHeader2 } from "./ui-components";
import { NavBarHeader } from "./ui-components";
import { FormCheckout } from "./ui-components";
import { CheckoutPayment } from "./ui-components";

import { ActionCardCollection } from "./ui-components";

// Amplify Imports

import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

// Styles

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App({ signOut, user }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [checkoutLabel, setCheckoutLabel] = useState("Checkout");
  const [modalOpen, setModalOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(0.0);
  const [purchased, setPurchased] = useState(false);

  // In real world scenarios, this tax percent would have to be determined
  // by factors such as location of user, but for this scenario I hardcoded
  // the tax as if the user was in Ontario

  let taxPercent = 0.13;

  // Similar to the tax value, the shipping cost may change for a lot of reason
  // but for this project we will just assume it's $5 for now
  let shippingCost = 5.0;

  useEffect(() => {
    if (cart.length > 0) {
      setCheckoutLabel(checkoutLabel.slice(0, 8) + ` (${cart.length})`);
    } else {
      setCheckoutLabel(checkoutLabel.slice(0, 8));
    }
    console.log("current cart", cart);

    setSubTotal(totalCost(cart));
  }, [cart]);

  // Utilities
  let removeElement = (array, n) => {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== n) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  };

  let totalCost = (array) => {
    let total = 0.0;

    for (let i = 0; i < array.length; i++) {
      total = total + parseFloat(array[i][2]);
    }

    return total.toFixed(2);
  };

  // Handle Purchase
  function handlePurchase() {
    // Would need to verify payment and address information, but for now will assume
    // it is always valid
    let valid = true;

    if (valid) {
      setCart([]);
      setPurchased(true);
    } else {
      console.log("error when placing order, can add more details here later");
    }

    // Do whatever needs to be done to record purchase, depends on what API is being used
    // to handle purchase orders
  }

  // Cart Component
  function Cart({ cartItems }) {
    return (
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          Shopping Cart
        </Typography>
        <br />
        {cartItems.length ? (
          <div>
            {cartItems.map((product) => {
              return (
                <div>
                  <ListItem alignItems="center" divider={true}>
                    <ListItemText
                      id={product.id}
                      primary={`${product[1]}`}
                      secondary={`${product[3]}`}
                    />

                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h6"
                    >
                      {`$${product[2]}`}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        setCart(removeElement([...cartItems], product));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </div>
              );
            })}
            <ListItem
              alignItems="flex-start"
              sx={{ justifyContent: "space-between" }}
            >
              <Typography variant="h4" component="h4">
                Total
              </Typography>
              <Typography variant="h4" component="h4">
                ${totalCost(cartItems)}
              </Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "end" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#047b93", color: "white" }}
                onClick={() => {
                  setCheckoutOpen(true);
                  setCartOpen(false);
                }}
              >
                Checkout
              </Button>
            </ListItem>
          </div>
        ) : (
          <Typography variant="h6" component="h2">
            Cart Empty
          </Typography>
        )}
      </List>
    );
  }

  // Checkout Component
  function CheckoutPage({ cartItems, subTotal }) {
    console.log("purchased?", purchased);
    return purchased ? (
      <div>
        <Typography variant="h3" component="h3">
          Purchase Successful! You will get an email confirmation soon.
        </Typography>
        <br />
        <div style={{ display: "grid" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#047b93", color: "white" }}
            onClick={() => {
              setModalOpen(false);
              setCartOpen(false);
              setCheckoutOpen(false);
              setPurchased(false);
            }}
          >
            Okay!
          </Button>
        </div>
      </div>
    ) : (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 800,
          "& ul": { padding: 0 },
        }}
      >
        <ListItem alignItems="" divider={true}>
          <FormCheckout />
        </ListItem>
        <ListItem divider={true}>
          <CheckoutPayment
            subtotal={subTotal}
            shipping={shippingCost}
            taxes={(subTotal * taxPercent).toFixed(2)}
            total={(
              parseFloat(subTotal) +
              parseFloat(shippingCost) +
              parseFloat(subTotal * taxPercent)
            ).toFixed(2)}
            overrides={{
              Button: {
                onClick: handlePurchase,
              },
            }}
          />
        </ListItem>
      </List>
    );
  }

  return (
    <div>
      <header>
        <NavBarHeader2
          checkoutLabel={checkoutLabel}
          overrides={{
            Button39493466: {
              onClick: () => {
                setModalOpen(true);
                setCartOpen(true);
              },
            },
          }}
        />
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setCartOpen(false);
            setCheckoutOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {cartOpen ? (
              <Cart cartItems={cart} />
            ) : (
              <CheckoutPage cartItems={cart} subTotal={subTotal} />
            )}
          </Box>
        </Modal>
        <br />
        <ActionCardCollection
          overrideItems={({ item, index }) => {
            return {
              overrides: {
                Button: {
                  onClick: () =>
                    setCart((oldCart) => [
                      ...oldCart,
                      [
                        item.id,
                        item.title,
                        item.price,
                        item.description,
                        item.image,
                        item.rating,
                      ],
                    ]),
                },
              },
            };
          }}
        />
        ;
      </header>
    </div>
  );
}

export default withAuthenticator(App);
