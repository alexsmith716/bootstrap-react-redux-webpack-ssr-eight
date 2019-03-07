import React, { Component } from 'react';

import CatInputs from './CatInputs';


class CatsForm extends Component {

  constructor(props) {
    super(props);

    // this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addCat = this.addCat.bind(this);

    this.state = {
      cats: [{name:'', age:''}],
      owner: '',
      description: ''
    }
  }

  handleChange = (e) => {
    if (['name', 'age'].includes(e.target.className) ) {
      console.log('>>>>>>>>>>>>>>>> CatsForm > handleChange > 11111111111111');
      let cats = [...this.state.cats]
      cats[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ cats }, () => console.log(this.state.cats))
    } else {
      console.log('>>>>>>>>>>>>>>>> CatsForm > handleChange > 222222222222222');
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }

  // handleChangeX = (e) => {
  //   this.setState({ [e.target.name]: e.target.value.toUpperCase() })
  // }

  addCat = (e) => {
    console.log('>>>>>>>>>>>>>>>> CatsForm > addCat > 11111111111111');
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

    let {cats, owner, description} = this.state;

    console.log('>>>>>>>>>>>>>>>> CatsForm > render() > this.state.cats:', this.state.cats);
    console.log('>>>>>>>>>>>>>>>> CatsForm > render() > this.state.owner:', this.state.owner);
    console.log('>>>>>>>>>>>>>>>> CatsForm > render() > this.state.description:', this.state.description);

    // defaultValue={owner}

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex container-padding-border-radius-2">
            <div className="width-600">

              <form onSubmit={this.handleSubmit} onChange={this.handleChange} >

                <div className="form-row mb-2">

                  <div className="form-group col-md-6">
                    <label htmlFor="owner">Owner</label>
                    <input type="text" className="form-control" name="owner" id="owner" defaultValue={owner} onChange={this.handleChange} placeholder="Owner" />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" name="description" id="description" defaultValue={description} onChange={this.handleChange} placeholder="Description" />
                  </div>

                </div>

                <button onClick={this.addCat} className="btn btn-primary">Add new cat</button>

                <CatInputs cats={cats} />

                <button type="submit" className="btn btn-success">Submit</button>

              </form>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default CatsForm
