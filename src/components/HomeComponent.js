import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

function RenderCard({item}) {
  // item passed through as a prop from home then destructured - destructuring makes it so we don't have to keep typing 'props.item'
  return(
    <Card>
      <CardImg src={item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props) {
  // props passed from main and used as props for display component RenderCard
  return (
    <div className="container">
      <div className="row">
        <div className="col-md m-1">
          <RenderCard item={props.campsite} />         
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.promotion} />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.partner} />
        </div>
      </div>
    </div>
  );
}

export default Home;