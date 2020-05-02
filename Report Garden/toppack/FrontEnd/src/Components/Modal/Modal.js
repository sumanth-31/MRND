import './Modal.css'
import React,{Component} from 'react'
import Backdrop from '../Backdrop/Backdrop'
class Modal extends Component
{
    render()
    {
        return(
            <div>
            {this.props.show?<Backdrop clicked ={this.props.clicked}></Backdrop>:null}
            <div className='Modal' style={{transform:this.props.show?'translateY(0)':'translateY(-1000vh)',
            opacity:this.props.show?'1':'0'}}>{this.props.children}</div>
            </div>
        );
    }
}
export default Modal;
