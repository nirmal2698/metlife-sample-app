import React, { useState, useEffect } from 'react';

function UseToDo() {

    const[thing, setThing] = React.useState('');  //for storing the entered task
    const[tasks, setTasks] = React.useState([]);  //for showing all tasks
    const[button, setButton] = React.useState('all-btn');  //for storing the current button
    const[showbuttons, setShowButtons] = React.useState(false);  //for showing the button states
    const[items, setItems] = React.useState(false);  //for showing the button states
    
    const handleEnter = (event) => {              //handle function when user clicked enter
        console.log(event.target.value)
        setItems(thing)
        console.log(items)
    }
    
    useEffect(() => {
        if(items){
        fetch("http://localhost:3003/tasks/add_tasks", {      //api for posting a task
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                title: items
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setButton('all-btn');
            setShowButtons(true);
            fetch("http://localhost:3003/tasks/display_tasks", {     //api for reading all tasks
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response.tasks)
                let arr = response.tasks;
                let showJsx = <CardsDiv card={arr.map((item, k) => { return <Card key={`task${k}`} item={item} /> })} />
                setTasks(showJsx);
            })
        })
        }
    }, [items])
    
    return (
        <div style={{margin: '20px 40px', padding: '20px 40px', textAlign: 'center', fontSize: '1.1rem'}}>
            <h2>To Do List</h2>
            <input type="text" placeholder='To do?' value={thing} 
            onChange={(e) => setThing(e.target.value)}
            onKeyPress={event => { if(event.key === 'Enter') handleEnter(event) }}
            ></input>
            <br></br>
            { button == 'all-btn' ? tasks : ( button == 'active-btn' ? '' : '' ) }
            {/* active : completed ) } */}
            {
                showbuttons ? 
                <div className='button-lists'>
                    <button type='click' style={{marginRight: '5px'}} 
                    // onClick={handleAll}
                    >All</button>
                    <button type='click' style={{marginRight: '5px'}} 
                    // onClick={handleActive}
                    >Active</button>
                    <button type='click' style={{marginRight: '5px'}} 
                    // onClick={handleCompleted}
                    >Completed</button>
                </div> : ''
            }
        </div>
    )
}

function CardsDiv ({card}) {              //Parent div Component for the tasks
    return(
      <div style={{margin: '20px 10px'}}>
        <div style={{margin: '0 20px'}}>{card}</div>
      </div>
    )
}

function Card (props) {                  //Component for the showing all tasks
    let item = props.item;

    // function handleChecked() {
    //     fetch("http://localhost:3003/tasks/add_active-task", {         //api for posting active task
    //         "method": "POST",
    //         "headers": {
    //             "content-type": "application/json",
    //             "accept": "application/json"
    //         },
    //         "body": JSON.stringify({
    //             title: item.title,
    //             checkState: true
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log(response)
    //     })
    // }
    return(
        <div>
            <input type="checkbox" 
            // onChange={(e) => handleChecked(e)}
            ></input>
            <span style={{marginRight: '5px'}}>{item.title}</span>
            <button>Remove</button>
            <br />
        </div>
    )
}

export default UseToDo;