import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";

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

  return (
    <div>
      <header>
        <NavBarHeader2
          overrides={{
            Button39493466: { onClick: () => setCheckoutOpen(true) },
          }}
        />
        {console.log("checkout check", checkoutOpen)}
        <br />
        <ActionCardCollection />;
      </header>
    </div>
  );
}

export default withAuthenticator(App);
