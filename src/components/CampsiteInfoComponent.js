import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderCampsite({campsite}) {
  // campsite passed through as a prop from render then destructured
  return(
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
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
  // props passed through CampsiteWithId component from MainComponent
  if(props.campsite) {
    return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
          </Breadcrumb>
          <h2>{props.campsite.name}</h2>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderCampsite campsite={props.campsite} />
        <RenderComments comments={props.comments} />
        {/* campsite and comments are then passed to render function and used to display cards & comments */}
      </div>
    </div>
    );  
  }
  return <></>;
}


export default CampsiteInfo;