import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderCampsite({campsite}) {
  // campsite passed through as a prop from render then destructured
  return(
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardTitle>{campsite.name}</CardTitle>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
  
function RenderComments({comments}) {
  // comments passed through as a prop from render then destructured
  if(comments) {
    return(
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comment => (
          <div key={comment.id} className="m-2">
            <div>{comment.text}</div>
            <div>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
            {/* displays date in human readable way */}
          </div>
        ))}
      </div>
    );
  }
  return <></>;
}

function CampsiteInfo(props) {
  if(props.campsite) {
    return (
    <div className="container">
      <div className="row">
        <RenderCampsite campsite={props.campsite} />
        <RenderComments comments={props.campsite.comments} />
        {/* campsite and comments are then passed to render function and used to display cards & comments */}
      </div>
    </div>
    );  
  }
  return <></>;
}


export default CampsiteInfo;