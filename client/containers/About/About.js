import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

// import { withStore } from '../../../hoc';

// --------------------------------------------------------------------------

// @withStore

class About extends Component {

  constructor(props) {
    super(props);
  }

  // static propTypes = {
  //   store: PropTypes.objectOf(PropTypes.any).isRequired
  // };

  state = {
    componentButtonState: false,
  };

  //  static contextTypes = {
  //    store: PropTypes.objectOf(PropTypes.any).isRequired
  //  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> ABOUT > componentDidMount() <<<<<<<<<<<<<<');
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> ABOUT > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  componentDidUpdate() {
    console.log('>>>>>>>>>>>>>>>> ABOUT > componentDidUpdate() <<<<<<<<<<<<<<');
    this._isMounted = false;
  }

  handleButtonState = () => this.setState({ componentButtonState: !this.state.componentButtonState });

  render() {

    console.log('>>>>>>>>>>>>>>>> ABOUT > render() <<<<<<<<<<<<<< !!STORE!!: ',this.props.store);

    const { componentButtonState } = this.state;

    const aboutImageMain = require('../../assets/images/about-750-450.png');
    const aboutImageOurCustomers = require('../../assets/images/about-500-300.png');
    const styles = require('./scss/About.scss');

    return (

      <div className="container">

        <Helmet title="About Us" />

        <h1 className={`mt-4 mb-3 ${styles.aboutUniqueColor}`}>About</h1>

        <div className="row">
          <div className="col-lg-6">
            <img className="img-fluid rounded mb-4" src={aboutImageMain} alt="" />
          </div>
          <div className="col-lg-6">
            <h2>About Modern Business</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem corporis eveniet. Odit, temporibus reprehenderit dolorum!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>
          </div>
        </div>

        <h2>Our Team</h2>

        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
        </div>

        <h2>Our Customers</h2>
        <div className="row">
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
        </div>

        <h2>This Component's State!!!</h2>
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <p className="color-crimson font-opensans-bold-webfont">'componentButtonState' store state is componentButtonState !!!!!!!!!!!!!!!!</p>
          </div>
        </div>

      </div>

    );
  }
}

export default About;
