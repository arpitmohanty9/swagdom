  import React from "react";
  import StarRatingComponent from 'react-star-rating-component';

  import QuoteDisp from "./components/QuoteDisp" ;
  import $ from 'jquery';


  const ratingChanged = (newRating) => {
  }


  class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        selectedOption: "small",
        quote : undefined,
        rating: 0
      };
    }

   onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
      }


    handleOptionChange = changeEvent => {
      this.setState({
        selectedOption: changeEvent.target.value
      });
    };

    // handleFormSubmit = formSubmitEvent => {
    //   formSubmitEvent.preventDefault();

    //   console.log("You have submitted:", this.state.selectedOption);
    // };
    getarpit = async(e) =>{
      e.preventDefault();
      this.setState({
          text :""
      })

        // const api_call = await fetch(`https://arpit-test.herokuapp.com`);
        // const temp = await api_call.json();
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const url = "https://example.com"; // site that doesn’t send Access-Control-*
        // fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com


        const url = "https://arpit-test.herokuapp.com"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url)
        .then(response => response.text())
        .then(contents => console.log(contents))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))


    }

    writetoDB = async(event) =>{
        var obj = {'quote': {0:this.state.quote},
                    'rating':{0:this.state.rating},
                    'userip':{0:'arpit-test'}
                  }

        var jsonString = JSON.stringify(obj);
        console.log(jsonString);

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url1 = "https://arpit-test.herokuapp.com"; 
        var url = proxyurl + url1

        $.ajax({
        url: url +"/pushrating",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(jsonString),
        success: function(data){
          console.log("Success inside ajax")
          console.log(data);
          console.log(jsonString);
        },
        error: function(e) {
          console.log(e);
        }
       });
       event.preventDefault();
      }

     getQuote = async (e) => {
      e.preventDefault();

      this.setState({
            quote: "",
            rating: 0,
            error: ""
        });

      const count = 1
      // const api_call = await fetch(`https://ron-swanson-quotes.herokuapp.com/v2/quotes/${count}`);
      var qlenmin;
      var qlenmax ;

      var temp = ""

      if (this.state.selectedOption === "small"){
        qlenmin = 0;
        qlenmax = 4;
      }
      if (this.state.selectedOption === "medium"){
        qlenmin = 4;
        qlenmax = 12;
      }
      if (this.state.selectedOption === "large"){
        qlenmin = 12;
        qlenmax = Infinity;
      }
      
      // console.log(qlenmin)
      // console.log(qlenmax)
      var actlen = 0

      while(actlen <= qlenmin || actlen > qlenmax){
        const api_call = await fetch(`https://ron-swanson-quotes.herokuapp.com/v2/quotes/${count}`);
        const data = await api_call.json();
        temp = data[0]
        actlen = data[0].split(" ").length;
      }
    
        this.setState({
            quote: temp,
            error: ""
        });

        console.log(this.state.quote)


    }


    render() {
      return (
        <div className="container">
          <div className="row mt-5">
            <h3>How long of a quote ? </h3>
            <div className="col-sm-12">
              <form onSubmit={this.getQuote}>

              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="small"
                    checked={this.state.selectedOption === "small"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                   Small
                </label>
              </div>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="react-tips"
                  value="medium"
                  checked={this.state.selectedOption === "medium"}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                Medium (five to ten)
              </label>
            </div>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="react-tips"
                  value="large"
                  checked={this.state.selectedOption === "large"}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                Large
              </label>
            </div>

          <div className="form-group">
            <button className="btn btn-primary mt-2" type="submit">
              Get Quote(s)
            </button>
          </div>

        </form>
        <QuoteDisp 
          quote = {this.state.quote}
          error = {this.state.error}
        />
      </div>
       <div>
          <h2>Ratings for quote:</h2>
          <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
          </div>
      </div>
    <button onClick={this.writetoDB}>pushDB</button>
  </div>
      );
    }
  }

  export default App;