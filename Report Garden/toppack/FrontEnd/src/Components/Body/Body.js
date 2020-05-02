import React,{Component} from 'react'
import Results from '../Results/resultsComponent'
class Body extends Component
{
    state={
        keyword:'',
        results:null
      }
      submitHandler=()=>
      {
        this.setState({results:<Results key={this.state.keyword} keyword={this.state.keyword}></Results>})
      }
      render()
      {
          return (
            <div  style={{height:"100vh",backgroundColor:'#1F2739',paddingLeft:'5%',paddingTop:'5%', paddingRight:'5%'}}>
            <form style={{height:'30%'}}>
            <div  className="form-group">
            <label  htmlFor="keywordTextBox" style={{color:'white'}}>Search Keyword:</label>
            <input type="text" className="form-control" id="keywordTextBox" style={{marginBottom:"20px", width:'30%'}} value={this.state.keyword} onChange={(event)=>{this.setState({keyword:event.target.value})}} placeholder="Enter keyword"></input>
            <button className="btn btn-primary" style={{width:"15%"}} onClick={this.submitHandler} type='button'>submit</button>
            </div>
            </form>
            {this.state.results}
            </div>
          );
      }
}
export default Body;