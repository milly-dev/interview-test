import React from "react";
import PropTypes from 'prop-types';

/**
 * A square in the game of tic tac toe.   Can be clicked or the square can contain a value.
 */



const Square = ({onClick, value, highlight}) =>{

    //function to highlight the winning move with a background color. 
    const WinnerHighlight = () => {
        if (highlight === true){
            return '#157a0f'
        }
        return '#fff'
    }

    return  (
        <button className="square" onClick={onClick} style={{backgroundColor:WinnerHighlight()}}>
            {value}
        </button>
    );
}

Square.propTypes = {
    /**
     *  The handler for when a square is clicked
     */
    onClick: PropTypes.func,

    /**
     *  The value to put in the square
     */
    value: PropTypes.string
};

export default Square;