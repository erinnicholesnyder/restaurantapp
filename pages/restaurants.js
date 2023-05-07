/* /pages/restaurants.js */
import { gql, useQuery } from '@apollo/client';
import { useRouter } from "next/router";
import { useContext } from "react";
import Cart from "../components/cart";
import CartContext from "../components/context";
import React, { useState } from "react";
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import { InputGroup, InputGroupAddon,Input} from "reactstrap";
import DishesList from '../components/dishesList';

function Restaurants(props) {
  const appContext = useContext(CartContext);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  console.log(`URL: ${API_URL}`)
  const [query, setQuery] = useState("");
  const link = new HttpLink({ uri: `${API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link,cache});
  const router = useRouter();

  return (
      <ApolloProvider client={client}>
        <div className="search">
              <InputGroup >
              <InputGroupAddon addonType="append"> Search Dishes</InputGroupAddon>
              <Input
                  onChange={(e) =>
                  setQuery(e.target.value.toLocaleLowerCase())
                  }
                  value={query}
              />
              </InputGroup><br></br>
          </div>
          <div>
          <DishesList search={query} />
          </div>
      </ApolloProvider>
  );
}
export default Restaurants;