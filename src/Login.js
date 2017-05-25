import React from 'react';


class Login extends React.Component{ 
  constructor(){
      super();
      this.state = {
          uName: "",
          password: "",
          message: ""
      }
  }
  

  handleUname(e){
        this.setState({uName:e.target.value})
    }
    handlePassword(e){
        this.setState({password:e.target.value})
    }
    validate(){
        let validUname = "krishnaveni";
        let validPassword = "krishnaveni";
        console.log(this.state.uName);
        console.log(this.state.password);
        if(this.state.uName == validUname && this.state.password == validPassword){
            this.setState({message: "Logged in Successfully"})
        }
        else{
            this.setState({message:"Invalid credentials"})
        }
    }
    
  
    render(){
      return(
        <div>
            <span>{this.state.message}</span>
            <legend>{this.props.uName}</legend>
            <input type="text" name="uName" onChange={this.handleUname.bind(this)} />
            <legend>{this.props.password}</legend>
            <input type="text" name="password" onChange={this.handlePassword.bind(this)} />
            <button onClick={this.validate.bind(this)}>Submit</button>
       
        </div>
      )
    }
}

export default Login;
