import axios from '../axiosInstance'
import React,{Component} from 'react'
import Repository from '../Repository'
import Modal from '../Modal/Modal'
import Spinner from '../Spinner/Spinner'
class Results extends Component
{
    state=
    {
        jsondata:null,
        loading:false,
        error:false
    }
    componentDidMount()
    {
        this.setState({loading:true});
        axios.get('search/repositories?q={'.concat(this.props.keyword,'}')).then(
        response=>{this.setState({jsondata:response.data.items,loading:false})},
        rejected=>{this.setState({error:true})}).catch(error=>{console.log(error);this.setState({error:true})})
    }
    backdropClickHandler=()=>
    {
        if(this.state.error)
        {
            this.setState({error:false,loading:false})
        }
    }
    render()
    {
        var repos=null
        var spinnerText=<div>
        <Spinner></Spinner>
        <h4>'Searching GitHub...'</h4></div>
        if(this.state.error)
        spinnerText=<h4>ERROR OCCURED!</h4>
        if(this.state.jsondata!==null)
        repos=this.state.jsondata.map((listdata)=>{return <Repository key={listdata.id} json={listdata}></Repository>})
        return(
            <div style={{height:'70%',width:'100%'}}>
            <Modal show={this.state.loading} clicked={this.backdropClickHandler}>{spinnerText}</Modal>
            <div className="card" style={{ height:'100%',overflow:'scroll'}}>
            <div className='card-header' style={{backgroundColor:'#1F2739',color:'#A7A1AE'}}>GitHub search results: {this.state.keyword}</div>
            {repos}
            </div>
            </div>
        );
    }
}
export default Results