import React, { Component } from 'react';

import CatInputs from './CatInputs';


class CatsForm extends Component {

  constructor(props) {
    super(props);

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.addCat = this.addCat.bind(this);

    this.state = {
      cats: [{name:'', age:''}],
      owner: '',
      description: ''
    }
  }

  handleChange = (e) => {
    if (['name', 'age'].includes(e.target.className) ) {
      console.log('>>>>>>>>>>>>>>>> CatsForm > handleChange > 111 > e.target.name: ', e.target.className);
      console.log('>>>>>>>>>>>>>>>> CatsForm > handleChange > 111 > e.target.value: ', e.target.value);
      let cats = [...this.state.cats]
      cats[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ cats }, () => console.log(this.state.cats))
    } else {
      console.log('>>>>>>>>>>>>>>>> CatsForm > handleChange > 222 > e.target.name: ', e.target.name);
      console.log('>>>>>>>>>>>>>>>> CatsForm > handleChange > 222 > e.target.value: ', e.target.value);
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }

  // A form element becomes 'controlled' if you set its value via a prop

  // ============================== State Updates May Be Asynchronous =====================================
  // * React may batch multiple 'setState()' calls into a single update for performance.
  // * Because 'this.props' and 'this.state' may be updated asynchronously, you should not rely on their values for calculating the next state.
  // * To fix it, use a second form of 'setState()' that accepts a function rather than an object. 
  //   That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument

  //  ============================= Correct ===============================================================
  //  this.setState((state, props) => ({
  //    counter: state.counter + props.increment
  //  }));

  addCat = (e) => {
    console.log('>>>>>>>>>>>>>>>> CatsForm > addCat >>>>>>>>>>>>>>>>>>>>>>>');
    this.setState((prevState) => ({
      cats: [...prevState.cats, {name:'', age:''}],
    }));
  }

  handleSubmit = (e) => {
    console.log('>>>>>>>>>>>>>>>> CatsForm > handleSubmit > this.state.cats: ', this.state.cats);
    console.log('>>>>>>>>>>>>>>>> CatsForm > handleSubmit > this.state.owner: ', this.state.owner);
    console.log('>>>>>>>>>>>>>>>> CatsForm > handleSubmit > this.state.description: ', this.state.description);
    e.preventDefault() 
  }

  render() {

    console.log('>>>>>>>>>>>>>>>> CatsForm > render() > this.state.cats:', this.state.cats);
    console.log('>>>>>>>>>>>>>>>> CatsForm > render() > this.state.owner:', this.state.owner);
    console.log('>>>>>>>>>>>>>>>> CatsForm > render() > this.state.description:', this.state.description);

    let {cats, owner, description} = this.state;

    // defaultValue={owner}

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="width-600">

                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

                  <div className="form-row mb-2">

                    <div className="form-group col-md-6">
                      <label htmlFor="owner">Owner</label>
                      <input type="text" className="form-control" name="owner" id="owner" defaultValue={owner} placeholder="Owner" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="description">Description</label>
                      <input type="text" className="form-control" name="description" id="description" defaultValue={description} placeholder="Description" />
                    </div>

                  </div>

                  <div className="form-group">
                    <CatInputs cats={cats} />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <button onClick={this.addCat} className="btn btn-primary">Add new cat</button>
                    </div>
                    <div className="form-group col-md-6">
                      <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                  </div>

                </form>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default CatsForm;
