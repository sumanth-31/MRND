import React,{Component} from 'react'
import axios from '../backendaxios'
import Modal from '../Modal/Modal'
import Spinner from '../Spinner/Spinner'
class TopTen extends Component
{
    state=
    {
        loading:false,
        topten:null,
        error:false
        
    }
    componentDidMount()
    {
        this.setState({loading:true})
        axios.get('topten/').then(
            response=>{console.log(response);this.setState({loading:false});this.setState({topten:response.data.packages})},
            reject=>{console.log(reject);this.setState({error:true})}
        ).catch(error=>{console.log(error);this.setState({error:true})});
    }
    clickedHandler=()=>
    {
        if(this.state.error)
        {
            this.setState({error:false,loading:false})
        }
    }
    rendertopten=null
    render()
    {
        var toptensearching=<div>
        <Spinner></Spinner>
        <h4>'Fetching Top Packages...'</h4></div>
        if(this.state.error)
        toptensearching=<h4>ERROR OCCURED!</h4>
        if(this.state.topten!=null)
        {
            this.rendertopten=this.state.topten.map((p,idx)=>{return <li className="list-group-item" key={idx}>{p}</li>})
        }
        return(
            <div  style={{height:"100vh",backgroundColor:'#1F2739',paddingLeft:'5%',paddingTop:'5%', paddingRight:'5%'}}>
            <Modal show={this.state.loading} clicked={this.clickedHandler}>{toptensearching}</Modal>
            <div className="card">
            <div className="card-header">Top Packages:</div>
            <div className="card-body">
            {this.rendertopten}
            </div>
            </div>
            </div>
        );
    }
}
export default TopTen