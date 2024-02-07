import React from 'react';
import '../css/Loading.css';

const Loading = () => {
   return (
      <div className='Overlay opaco'>
         <div className="spinner"></div>
      </div>
   );
};

export default Loading;