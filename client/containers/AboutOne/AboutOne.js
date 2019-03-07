import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// import { withStore } from '../../../hoc';

import IncorporationForm from '../../components/widgets/Shareholders/IncorporationForm';

import CatsForm from '../../components/widgets/CatsForm/CatsForm';

import Clock from '../../components/widgets/Clock/Clock';
import RandomBootstrapAlert from '../../components/widgets/RandomBootstrapAlert/RandomBootstrapAlert';

import Dropdown from '../../components/Dropdown/Dropdown';
import FilterableTable from '../../components/FilterableTable/FilterableTable';

import TemperatureCalculator from '../../components/widgets/LiftingStateUp/TemperatureCalculator';

// --------------------------------------------------------------------------

// @withStore

class AboutOne extends Component {

  constructor(props) {
    super(props);

    // thinking through react with next cool code change
    // --------------------------------------------------------------------------

    this.handleDropdownChange = this.handleDropdownChange.bind(this);

    this.state = {
      dropDownOptionSelected: '',
    };
  }

  // static propTypes = {
  //   store: PropTypes.objectOf(PropTypes.any).isRequired
  // };

  // static defaultProps = {};

  handleDropdownChange = (dropDownOptionSelected) => {
    this.setState( { dropDownOptionSelected } );
  }

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> AboutOne > componentDidMount() <<<<<<<<<<<<<<');
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> AboutOne > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  // static contextTypes = {
  //   store: PropTypes.objectOf(PropTypes.any).isRequired
  // };

  render() {

    const styles = require('./scss/AboutOne.scss');
    // const uri = encodeURI('/product-categories-small.json');
    // const uri = encodeURI('/product-categories.json');

    // const dropdownTiltle = 'Select Product Table';

    const dropDownOptions = [
      '/product-categories-small.json',
      '/product-categories.json',
      '/product-categories-small.json',
      '/product-categories.json',
      '/product-categories-small.json',
      '/product-categories.json',
      '/product-categories-small.json',
      '/product-categories.json'
    ];

    const dropDownOptions2 = [
      '/product-categories-small2.json',
      '/product-categories2.json'
    ];

    const dropDownOptionSelected = this.state.dropDownOptionSelected;
    let filterableTable;

    if (dropDownOptionSelected !== '') {
      filterableTable = <FilterableTable requestURL={ dropDownOptionSelected } />;
    }

    return (

      <div className="container">

        <Helmet title="About One" />

        <h1 className={styles.uniqueColor}>About One</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React Dynamics!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Making dynamic form inputs with React
                </h5>

                <div className={`${styles.cardBodyContainer}`}>

                  <div className={`${styles.cardBodyContent}`}>

                    <IncorporationForm />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Controlled Form 3
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className={`${styles.cardBodyContainer}`}>
                  <div className={`${styles.cardBodyContent}`}>

                    <CatsForm />

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Controlled Form 1
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className={`${styles.cardBodyContainer}`}>

                  <div className={`${styles.cardBodyContent}`}>

                    <CatsForm />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Controlled Form 2
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className={`${styles.cardBodyContainer}`}>

                  <div className={`${styles.cardBodyContent}`}>

                    <CatsForm />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Clock: state and lifecycle in a basic React component!
              </h2>

              <div className="card-body text-center">

                <div className="card-title">

                  <RandomBootstrapAlert />

                  <p>With supporting text below as a natural lead-in to additional content.</p>

                  <a href="#" className="btn btn-primary">Go somewhere</a>

                </div>
              </div>

              <div className="card-footer text-muted text-center">

                <Clock />

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React 1!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Filterable Product Table 1
                </h5>

                <div className={`${styles.cardBodyContainer}`}>

                  <div className={`${styles.cardBodyContent}`}>

                    <div className={`container-padding-border-radius-2`}>
                    
                      <div className="container-flex bg-color-ivory container-padding-border-radius-1">
                        <div className="width-400">
                    
                          <Dropdown
                            title={`Filterable Product Table 1`}
                            optionsArray={dropDownOptions}
                            dropDownOptionSelected={dropDownOptionSelected}
                            onDropdownChange={ this.handleDropdownChange }
                          />
                    
                        </div>
                      </div>
                    
                    </div>

                    <br/>

                    { filterableTable }

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React 2!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Filterable Product Table 2
                </h5>

                <div className={`${styles.cardBodyContainer}`}>

                  <div className={`${styles.cardBodyContent}`}>

                    <div className={`container-padding-border-radius-2`}>
                    
                      <div className="container-flex bg-color-ivory container-padding-border-radius-1">
                        <div className="width-400">
                    
                          <Dropdown
                            title={`Filterable Product Table 2`}
                            optionsArray={dropDownOptions2}
                            dropDownOptionSelected={dropDownOptionSelected}
                            onDropdownChange={ this.handleDropdownChange }
                          />
                    
                        </div>
                      </div>
                    
                    </div>

                    <br/>

                    { filterableTable }

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Lifting State Up 1
                </h5>

                <div className={`${styles.cardBodyContainer}`}>

                  <div className={`${styles.cardBodyContent}`}>

                    <TemperatureCalculator />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Lifting State Up 2
                </h5>

                <div className={`${styles.cardBodyContainer}`}>

                  <div className={`${styles.cardBodyContent}`}>

                    <TemperatureCalculator />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

      </div>
    );
  }
}

export default AboutOne;
