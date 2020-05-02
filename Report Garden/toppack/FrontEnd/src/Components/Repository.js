import React,{Component} from 'react'
import axios from './axiosInstance'
import Modal from './Modal/Modal'
import backendAxios from './backendaxios'
import Spinner from '../Components/Spinner/Spinner'
class Repository extends Component
{
    state=
    {
        clicked:"",
        importing:false,
        error:false,
        color:'white'
    }
    componentDidMount()
    {
        backendAxios.post('/contains/',{'repid':this.props.json.id}).then(response=>{
            if(response.data.contains)
            {
                this.setState({color:'#A7A1AE'})
            }
        },
        rejected=>{}).catch(error=>{console.log(error)});
    }
    clickedHandler=()=>
    {
        this.setState({clicked:'active'})
    }
    importHandler=()=>
    {
        this.setState({importing:true})
        axios.get('repos/'.concat(this.props.json.full_name,'/contents/package.json')).then(response=>{
                var dependencies=JSON.parse(atob(response.data.content)).dependencies;
                var keys=[];
                for(var key in dependencies)
                    keys.push(key);
                backendAxios.post("addrep/",{'repid':this.props.json.id}).then(response=>{console.log(response)},
                rejected=>{console.log(rejected)}).catch(error=>{console.log(error)});
                backendAxios.post("addpackage/",{'packages':keys}).then(response=>{console.log(response)},
                rejected=>{console.log(rejected)}).catch(error=>{console.log(error)})
                this.setState({importing:false,color:'#A7A1AE'});
        },rejected=>{this.setState({error:true})}).catch(error=>{console.log('error'.concat(error));
        this.setState({importing:false})});
    }
    clickedHandler=()=>
    {
        if(this.state.error)
        this.setState({importing:false,error:false});
    }
    render()
    {
        var packageSearchResult=<div>
        <Spinner></Spinner>
        <h4>'Importing Packages...'</h4></div>
        if(this.state.error)
        packageSearchResult=<h4>'This repository does not contain package.json file'</h4>
        return(
            <div style={{height:'100%'}}>
            <Modal show={this.state.importing} clicked={this.clickedHandler}>{packageSearchResult}</Modal>
            <li className={'list-group-item '+this.state.clicked}style={{height:'100%',backgroundColor:this.state.color}}>
            <p className='float-left'>{this.props.json.name}</p>
            <button className='btn btn-primary float-right' disabled={this.state.color!=='white'} onClick={this.importHandler}>import</button>
            <span className="badge badge-primary badge-pill float-right" style={{marginRight:'20px'}}>{'forks '+this.props.json.forks_count}</span>
            <span className="badge badge-primary badge-pill float-right"style={{marginRight:'20px'}}>{'stars '+this.props.json.stargazers_count}</span>
            </li>
            </div>
        );
    }
}
export default Repository