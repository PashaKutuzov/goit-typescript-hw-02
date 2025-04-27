import React from 'react';
 type LoadMoreBtn = {
        Page: number
        onClick: () => void
    }
    

export default function loadMoreBtn({ Page, onClick }: LoadMoreBtn) {
   


    return(
        <button onClick={onClick} type="button">load more {Page}</button>
    )
}