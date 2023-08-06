import logo from '../../logo.svg';
import './header.css'

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="GitHub Search" />
            <div >
                <p className='title'>GitHub Search</p>
                <p className='description'>Search users or repositories below</p>
            </div>
        </div>
    );
}

export default Header