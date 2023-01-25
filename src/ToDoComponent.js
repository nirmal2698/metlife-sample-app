import React from 'react';
import useFetch from "./useFetch";

// let arr = [];
// let check = [];
// let completed = [];

function ToDoComponent () {
    const[thing, setThing] = React.useState('');  //for storing the entered task
    const[tasks, setTasks] = React.useState([]);  //for showing all tasks
    const[active, setActive] = React.useState([]);  //for showing active tasks
    const[completed, setCompleted] = React.useState([]);  //for showing completed tasks
    const[button, setButton] = React.useState('all-btn');  //for storing the current button
    const[showbuttons, setShowButtons] = React.useState(false);  //for showing the button states

    // const msg = {     //api for reading all tasks
    //     "method": "GET",
    //     "headers": {
    //         "content-type": "application/json",
    //         "accept": "application/json"
    //     }
    // }
    // const [data] = useFetch("http://localhost:3003/tasks/display_tasks", msg)
    
    const handleEnter = (event) => {              //handle function when user clicked enter
        console.log(event.target.value)
        fetch("http://localhost:3003/tasks/add_tasks", {      //api for posting a task
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                title: thing
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setButton('all-btn');
            setShowButtons(true);
            if(response.message == 'Already present') alert('Already present')
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
                let showJsx = <CardsDiv card={arr.map((item, k) => { return <Card key={`task${k}`} item={item}/> })} />
                setTasks(showJsx);
            })
        })
    }

    const handleAll = () => {                   //for handling the all button
        setButton('all-btn'); 
    }

    const handleActive = () => {                //for handling the active button
        setButton('active-btn');
        fetch("http://localhost:3003/tasks/display_active-tasks", {          //api for reading active tasks
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
            let showJsx = <CardsDiv card={arr.map((item, k) => { return <ActiveCard key={`task${k}`} item={item} /> })} />
            setActive(showJsx);
        })
    }

    const handleCompleted = () => {             //for handling the completed button
        setButton('completed-btn');
        fetch("http://localhost:3003/tasks/display_completed-tasks", {           //api for reading completed tasks
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
            let showJsx = <CardsDiv card={arr.map((item, k) => { return <CompletedCard key={`task${k}`} item={item} /> })} />
            setCompleted(showJsx);
        })
    }

    return(
        <div style={{margin: '20px 40px', padding: '20px 40px', textAlign: 'center', fontSize: '1.1rem'}}>
            <h2>To Do List</h2>
            <input type="text" placeholder='To do?' value={thing} 
            onChange={(e) => setThing(e.target.value)}
            onKeyPress={event => { if(event.key === 'Enter') handleEnter(event) }}></input>
            <br></br>
            { button == 'all-btn' ? tasks : ( button == 'active-btn' ? active : completed ) }
            {
                showbuttons ? 
                <div className='button-lists'>
                    <button type='click' style={{marginRight: '5px'}} onClick={handleAll}>All</button>
                    <button type='click' style={{marginRight: '5px'}} onClick={handleActive}>Active</button>
                    <button type='click' style={{marginRight: '5px'}} onClick={handleCompleted}>Completed</button>
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
    const [checkedState, setCheckedState] = React.useState(false);

    function handleChecked() {
        setCheckedState(!checkedState);
        fetch("http://localhost:3003/tasks/add_active-task", {         //api for posting active task
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                title: item.title,
                checkState: !checkedState
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.message == 'Already active/completed') alert('Already active/completed')
        })
    }
    return(
        <div>
            <input type="checkbox" onChange={(e) => handleChecked(e)} checked={checkedState}></input>
            <span style={{marginRight: '5px'}}>{item.title}</span>
            <button>Remove</button>
            <br />
        </div>
    )
}

function ActiveCard (props) {               //Component for the showing active tasks
    let item = props.item;

    function handleRemove() {
        if(item.checkState){
            fetch(`http://localhost:3003/tasks/delete_active-tasks/${item._id}`, {     //api for deleting a specific task
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            fetch("http://localhost:3003/tasks/add_completed-task", {          //api for posting completed task
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                "body": JSON.stringify({
                    title: item.title,
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                // if(response.message == 'Already present') alert('Already present')
            })
        }
        else{
            alert('task not checked yet!')
        }
    }

    return(
        <div>
            <input type="checkbox" checked={item.checkState}></input>
            <span style={{marginRight: '5px', color: item.checkState ? 'green' : '#000'}}>{item.title}</span>
            <button onClick={handleRemove}>Remove</button>
            <br />
        </div>
    )
}

function CompletedCard (props) {                   //Component for the showing completed tasks
    let item = props.item;
    return (
        <div>
            <span style={{marginRight: '5px'}}>{item.title}</span>
            <br />
        </div>
    )
}

export default ToDoComponent;