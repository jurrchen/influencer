import { Card } from "react-bootstrap";

export default function MembershipTile(props: {
  title: string,
  cost: string, 
  perks: string[],
  button?: React.ReactElement
}) {
  return <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
        ${props.cost} per month
      </Card.Text>
      { props.button && <Card.Footer>
        {props.button}
      </Card.Footer> }      
      <Card.Footer>
        <b>Perks</b>
        {props.perks.map((p) => {
          return <p>{p}</p>
        })}
      </Card.Footer>      
    </Card.Body>
  </Card>
}