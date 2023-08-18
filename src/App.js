import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";

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
  }, [cart]);

  return (
    <div>
      <header>
        <NavBarHeader2
          checkoutLabel={checkoutLabel}
          overrides={{
            Button39493466: { onClick: () => setCheckoutOpen(true) },
          }}
        />
        {console.log("checkout check", checkoutOpen)}
        <br />
        <ActionCardCollection
          overrideItems={(item, index) => {
            return {
              overrides: {
                Button: {
                  onClick: () =>
                    setCart((oldCart) => [
                      ...oldCart,
                      [
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
