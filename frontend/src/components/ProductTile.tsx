import { Card } from "react-bootstrap";

export default function ProductTile(props: {
  title: string,
  cost: string, 
  image: string
}) {
  return <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Img variant="top" src={props.image} />
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
        {props.cost}
      </Card.Text>     
    </Card.Body>
  </Card>
}