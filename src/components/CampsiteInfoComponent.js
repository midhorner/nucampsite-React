/* eslint-disable react/jsx-pascal-case */
import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardImg, CardText, CardBody, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      rating: 5,
      author: '',
      text: '',
      touched: {
        author: false
      }
    }; 
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit = (values) => {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
  }

  render() {
    return(
      <>
        <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" /> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={values => this.handleSubmit(values)}>
                <div className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select className="form-control" model=".rating" name="rating" id="rating" defaultValue={this.state.rating}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option selected>5</option>
                  </Control.select>
                </div>
                <div className="form-group">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text className="form-control" model=".author" name="author" id="author" placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                    }} 
                  />
                  <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      component="div"
                      messages={{
                          required: 'Required',
                          minLength: 'Must be at least 2 characters',
                          maxLength: 'Must be 15 characters or less'
                      }}
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="text">Comment</Label>
                  <Control.textarea className="form-control" model=".text" name="text" id="text" rows="6" />
                </div>
                <Button type="submit" value="submit" color="primary">Submit</Button>
              </LocalForm>              
            </ModalBody>
        </Modal>
      </>
    );
  }
}


function RenderCampsite({campsite}) {
  // campsite passed through as a prop from render then destructured
  return(
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
  
function RenderComments({comments, postComment, campsiteId}) {
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
        <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  }
  return <></>;
}

function CampsiteInfo(props) {
  // props passed through CampsiteWithId component from MainComponent
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return(
      <div className="row">
        <div className="col">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
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
        <RenderComments 
          comments={props.comments} 
          postComment={props.postComment}
          campsiteId={props.campsite.id}
        />
        {/* campsite and comments are then passed to render function and used to display cards & comments */}
      </div>
    </div>
    );  
  }
  return <></>;
}


export default CampsiteInfo;