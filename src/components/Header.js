import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
    render(){
        return (
            <>
                <header className="text-center border bg-dark text-white" >
                    <h1>City Explorer</h1>
                </header>
            </>
        );
    }
}

export default Header;