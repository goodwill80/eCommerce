import { Fragment, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.style';

function Navigation() {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    const signOutHandler = async ()=>{
        await signOutUser();
    }
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">Shop</NavLink>
                    { currentUser ? 
                        <NavLink as='span' onClick={signOutHandler}>Sign-out</NavLink>
                        :
                        <NavLink to="/auth">Sign-in</NavLink>
                    }
                    <CartIcon />
                </NavLinks>
                { isCartOpen ? <CartDropdown /> : "" }
               
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation
