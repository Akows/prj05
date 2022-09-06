import React from 'react';

import '../style/Pagination.css';
import '../style/GlobalStyle.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='paganation-outer'>
            {pageNumbers.map(number => (
                <div className='paganation-btu' key={number}>
                    <button className='paganation-button gifont' onClick={() => paginate(number)}>{number}</button>
                </div>
            ))}
        </div>
    );
};

export default Pagination;