import { gql, useQuery } from '@apollo/client';
//import Dishes from "./dishes";
import Link from "next/link";
import { useContext, useState } from 'react';
import CartContext from "./context";
import UserContext from "./usercontext";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0)
  const { cart } = useContext(CartContext);
  const [state, setState] = useState(cart)
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`)


  let searchQuery = data.restaurants.filter((res) => {
    return res.name.toLowerCase().includes(props.search)
  }) || [];

  let restId = searchQuery[0] ? searchQuery[0].id : null;

//<CardImg top={true} style={{ height: 200 }} src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}/>

  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
        <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                />
          <CardBody>
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">
            <Link as={`/restaurants/${res.id}`} href={`/restaurants?id=${res.id}`}>
              <a className="btn btn-primary">{res.name}</a>
            </Link>
          </div>
        </Card>
      </Col>
    ))
    return (
      <Container>
        <Row xs='3'>
          {restList}
        </Row>
      </Container>
    )

  } else {
    return <h1> No Restaurants Found</h1>
  }
}
export default RestaurantList