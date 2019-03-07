import React from 'react';

const CatInputs = (props) => {

  return (

    props.cats.map((val, idx)=> {

      let catId = `cat-${idx}`;
      let ageId = `age-${idx}`;

      return (

        <div className="form-row basic-border-black-1 mb-2" key={idx}>

          <div className="form-group col-md-6">

            <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>

            <input
              type="text"
              className="name"
              name={catId}
              data-id={idx}
              id={catId}
              defaultValue={props.cats[idx].name}
            />
          </div>

          <div className="form-group col-md-6">

            <label htmlFor={ageId}>Age</label>

            <input
              type="text"
              className="age"
              name={ageId}
              data-id={idx}
              id={ageId}
              defaultValue={props.cats[idx].age}
            />
          </div>
        </div>
      );
    })
  );
}

export default CatInputs
