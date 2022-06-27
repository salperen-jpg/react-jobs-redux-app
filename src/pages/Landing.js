import React from 'react';
import { Logo } from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic animi
            est consequuntur fuga ducimus, ipsa ullam nihil itaque eos, ea
            minima cumque nemo fugiat doloremque laudantium rerum recusandae ex
            fugit.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register{' '}
          </Link>
        </div>
        <img src={main} alt='' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
