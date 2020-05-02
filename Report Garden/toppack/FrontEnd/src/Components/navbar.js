import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from './backendaxios'
import Modal from './Modal/Modal'
import Spinner from './Spinner/Spinner'
class navbar extends Component
{
    state={
        deleting:false,
        error:false
    }
    deleteDB=()=>
    {
        this.setState({deleting:true})
        axios.get('/deletereps/').then(
            response=>{
                axios.get('deletepackages/').then(
                    response=>{this.setState({deleting:false})},
                    rejected=>{this.setState({error:true});console.log(rejected)}
                ).catch(error=>{
                    console.log(error);
                    this.setState({error:true})
                })},
                rejected=>{
                    this.setState({error:true});
                    console.log(rejected)
                }
        ).catch(error=>{console.log(error); this.setState({error:true})})
    }
    clickedHandler=()=>{
        if(this.state.error)
        {
            this.setState({deleting:false,error:false})
        }
    }
    render()
    {
        var spinnerText=<div>
        <Spinner></Spinner>
        <h4>Deleting all imported packages...</h4>
        </div>
        if(this.state.error)
        spinnerText=<h4>ERROR OCCURED!</h4>
        return(
            <div>
            <Modal show={this.state.deleting} clicked={this.clickedHandler}>{spinnerText}</Modal>
            <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#2C3446'}}>
            <a className="navbar-brand" href='/'><img src={this.props.image} width="30" height="30" alt=""></img></a>
            <ul className="navbar-nav">
            <li className="nav-item"><Link to='/' style={{marginRight:'20px'}}>Home</Link></li>
            <li className="nav-item"><Link to='/topten'>Top Packages</Link></li>
            </ul>
            <button className='btn btn-danger ml-auto' onClick={this.deleteDB}>Delete Imports</button>
            </nav>
            </div>
        );
    }
        
}
export default navbar;