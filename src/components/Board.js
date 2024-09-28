import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import Ball from "./Ball";

const n = 20;

const Board = (props) => {
    const [list, setList] = useState([]);
    const [current, setCurrent] = useState([0, 0]);
    const [direction, setDirection] = useState(1);
    const [isStarted, setIsStarted] = useState(false)
    const [n, setN] = useState(20)
    const [score, setScore] = useState(0)
    const [speed, setSpeed] = useState(200)

    const generateRandomCoordinate = () => {
        let x, y;
    
        do {
            x = Math.floor(Math.random() * n);
            y = Math.floor(Math.random() * n);
        } while (x === current[0] && y === current[1]);
    
        return [x, y];
    };

    const [item, setItem] = useState(generateRandomCoordinate())

    const handleKeyPress = (e) => {
        switch (e.key) {
            case "ArrowRight":
                setDirection(1);
                break;
            case "ArrowLeft":
                setDirection(2);
                break;
            case "ArrowUp":
                setDirection(3);
                break;
            case "ArrowDown":
                setDirection(4);
                break;
            case "Enter":
                setIsStarted(true)
                break;
            default:
                break;
        }
    };

    const resetGame = () => {
        setCurrent([0, 0]);
        setDirection(1);
        setIsStarted(false)
        setScore(0)
        setSpeed(200)
    };

    useEffect(() => {
        const moveBall = () => {
            setCurrent((prev) => {
                let [row, col] = prev;
                let nextRow = row;
                let nextCol = col;

                if (direction === 1) nextCol += 1;
                else if (direction === 2) nextCol -= 1;
                else if (direction === 3) nextRow -= 1;
                else if (direction === 4) nextRow += 1;

                if (nextCol < 0 || nextCol >= n || nextRow < 0 || nextRow >= n) {
                    alert('Ball hit the wall! Your total score' + score+1);
                    resetGame();
                    return prev;
                }

                return [nextRow, nextCol];
            });
        };
        if(isStarted){
            let intervalId = setInterval(moveBall, speed);
            return () => clearInterval(intervalId);
        }
    }, [direction,isStarted]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [direction]);

    useEffect(()=>{
        if(score>0){
            setSpeed(prev => prev-10)
        }
    },[score])

    useEffect(() => {
        let list = [];
        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j = 0; j < n; j++) {
                if (i === current[0] && j === current[1]) {
                    row.push(<Cell key={i * j}><Ball color="blue"/></Cell>);
                } 
                else if(i===item[0] && j===item[1]){
                    row.push(<Cell key={i * j}><Ball color="green"/></Cell>);
                }
                else {
                    row.push(<Cell key={i * j}/>);
                }
            }
            list.push(<div className="row" key={i}>{row}</div>);
        }
        setList(list);
    }, [current, n, item]);

    useEffect(()=>{
        if(current[0]===item[0] && current[1]===item[1]){
            setScore(prev => prev+1)
            setItem(generateRandomCoordinate())
        }
    },[current])

    return (
        <div className="wrapper">
            {!isStarted ?
            <>
                <label htmlFor="dropdown">Select Box Size: </label>
                <select id="dropdown" value={n} onChange={(e)=>setN(e.target.value)}>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </select>
            </>
            :
            <div>Score: {score}</div>
            }
            <div className="board">
                {list}
            </div>
            {!isStarted && <div style={{color:"Blue"}}>Press enter to start the game</div>}
        </div>
    );
};

export default Board;
