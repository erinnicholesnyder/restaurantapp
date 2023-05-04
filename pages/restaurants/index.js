import React, { useState } from "react";
import Cart from "../../components/cart"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import RestaurantList from '../../components/restaurantList';
import RestaurantPage from './[restaurant]';
import Dishes from "../../components/dishes";
import { InputGroup, InputGroupAddon,Input} from "reactstrap";


function Restaurant() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    console.log(`URL: ${API_URL}`)
    const [query, setQuery] = useState("");
    const link = new HttpLink({ uri: `${API_URL}/graphql`})
    const cache = new InMemoryCache()
    const client = new ApolloClient({link,cache});
 
    return (
        <ApolloProvider client={client}>
          <div className="search">
              <h2> Available dishes</h2>
                <InputGroup >
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input
                    onChange={(e) =>
                    setQuery(e.target.value.toLocaleLowerCase())
                    }
                    value={query}
                />
                </InputGroup><br></br>
            </div>
            <RestaurantPage search={query} />
            <Cart> </Cart>
        </ApolloProvider>
    );
  }
  export default Restaurant;