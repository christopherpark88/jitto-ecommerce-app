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
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [checkoutLabel, setCheckoutLabel] = useState("Checkout");

  useEffect(() => {
    if (cart.length > 0) {
      setCheckoutLabel(checkoutLabel.slice(0, 8) + ` (${cart.length})`);
    } else {
      setCheckoutLabel(checkoutLabel.slice(0, 8));
    }
    console.log("current cart", cart);
  }, [cart]);

  // Cart Component
  function Cart({ cartItems }) {
    return (
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          Shopping Cart
        </Typography>
        <br />
        {cartItems.length ? (
          cartItems.map((product) => {
            return (
              <div>
                <Divider />
                <ListItem alignItems="center">
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
                <Divider />
              </div>
            );
          })
        ) : (
          <Typography variant="h6" component="h2">
            Cart Empty
          </Typography>
        )}
      </List>
    );
  }

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

  return (
    <div>
      <header>
        <NavBarHeader2
          checkoutLabel={checkoutLabel}
          overrides={{
            Button39493466: { onClick: () => setCheckoutOpen(true) },
          }}
        />
        <Modal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Cart cartItems={cart} />
            {/*  <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
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
