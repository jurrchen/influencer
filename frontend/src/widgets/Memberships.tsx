import { Button } from "react-bootstrap";
import MembershipTile from "../components/MembershipTile";
import { MembershipTier } from "../lib/types";

export default function Memberships(props: {
  heading: string,
  ctaBackgroundColor: string,
  ctaColor: string,
  tiers: MembershipTier[]
}) {
  return <div style={{width: '900px', margin: 'auto'}}>
    <div style={{margin: 'auto', textAlign: 'center'}}>
      <h1>{props.heading}</h1>
    </div>
    <div style={{marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center'}}>
      {props.tiers.map((membership, index) => {
        return <MembershipTile key={index} {...membership} button={
          <Button style={{
            backgroundColor: props.ctaBackgroundColor,
            color: props.ctaColor,            
          }}>Join Now</Button>
        } />
      })}
    </div>
  </div> 
}

