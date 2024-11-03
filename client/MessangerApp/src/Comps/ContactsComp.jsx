// import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
// import { useDispatch } from "react-redux"
import { GiMagnifyingGlass } from "react-icons/gi";

const ContactsComp = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch()
    const [contactList, setContactList] = useState([])
    const [searchInput, setSearchInput] = useState("");
    const [newChatMembers, setNewChatMembers] = useState([])
    const [chatName, setChatName] = useState('')
    const [newChatObj, setNewChatObj] = useState(null)





    useEffect(() => {
        const fetchContacts = async () => {
            try {

                // Make a GET request to the API endpoint using Axios
                let token = sessionStorage.getItem('token')
                const response = await axios.get('http://localhost:3030/users/myContacts', {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token
                    }
                })
                // Extract the data from the response
                if (response) {
                    console.log(response);
                    setContactList(response.data)
                }
                else { console.log('no contacts found') }

            } catch (error) {
                // Handle any errors that occur during the request
                console.error('Error fetching data:', error);

            }

        }
        fetchContacts();
        console.log(filteredContacts);
    }, []); // Empty dependency array ensures the effect runs only once

    const addContact = (memberName , phoneNumber) => {
        setNewChatMembers([...newChatMembers, {userName:memberName, phoneNumber: phoneNumber}])
    }

    const deleteMember= (phoneNumber) =>{ 
        console.log(phoneNumber);
        setNewChatMembers(
            newChatMembers.filter(member => member.phoneNumber !== phoneNumber)
        )
    }

    const createNewChat = (newChatMembers) => {
        console.log(newChatMembers);
        let userPhone = sessionStorage.getItem('userId');
        let userName = sessionStorage.getItem('userName');
        setNewChatObj({
            'chatId': chatName,
            'chatMembers': [...newChatMembers,{userName:userName, phoneNumber:userPhone}],
            'MessagesRelated': ['']
        })

    }

    const postNewChat = async (newChatObj) => {
        try {
            let token = sessionStorage.getItem('token')
            // Make a POST request to the API endpoint using Axios
            const response = await axios.post('http://localhost:3030/MessangerApp/new', newChatObj,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token
                    }
                })
            // Extract the data from the response
            if (response.status == 200) {
                alert(response.data);
                setNewChatMembers('');

            } else {
                // Handle login failure, maybe show an error message
                alert('Error accured saving new chat');
            }
        }
        catch (error) {
            // Handle any errors that occur during the request
            console.error('Error logging in:', error);

        }
    }

    useEffect(() => {

        if (newChatObj) {
            console.log(newChatObj);
            postNewChat(newChatObj)
        }
    }, [newChatObj])

    const filteredContacts = searchInput
        ? contactList.filter(contact =>
            contact.userName.toLowerCase().includes(searchInput.toLowerCase())
        )
        : contactList;




    return (
        <div className='container-fluid'>
            <h2 style={{ background: "bisque" }}>Contacts</h2>
            <div className="row">
                <div className="col-2">
                    <GiMagnifyingGlass style={{ fontSize: "30px", color: "skyblue" }} />
                </div>
                <div className="col-8">
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => { setSearchInput(e.target.value) }}></input>
                    </form>
                </div>
            </div>
            <br />
            <div className='row justify-content-center'>
                <div className='col-sm-4 md-2 lg-1'>
                    <div className="card" style={{ width: "18rem", margin: "2rem", background: "bisque" }}>
                        <div className="card-body">
                            <h5 className="card-title" >Stat A New Chat</h5>
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item" style={{ background: "bisque" }}>ChatName:
                                    <input type="text"
                                        onChange={(e) => { setChatName(e.target.value) }}
                                        required />
                                </li>
                                {newChatMembers && newChatMembers.map(item => (
                                    <li className="list-group-item"
                                        key={item.index}
                                        style={{ background: "bisque" }}>
                                        ChatMember:{item.userName}
                                        <button onClick={()=>deleteMember(item.phoneNumber)}>X</button>
                                    </li>
                                ))}
                                <li className="list-group-item" style={{ background: "bisque" }}>
                                    <button
                                        className="btn btn-primary"
                                        style={{}}
                                        onClick={() => createNewChat(newChatMembers)}>
                                        Create New Chat
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {filteredContacts && filteredContacts.map(item => (
                    <div key={item.index} className='col-sm-4 md-2 lg-1'>
                        <div className="card bg-info-subtle" style={{ width: "18rem", margin: "2rem" }} id={item.userPhone}>
                            <div className="card-body">
                                <h5 className="card-title">{item.userName}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">PhoneNumber: {item.phoneNumber}</li>
                                    <li className="list-group-item">
                                        <button
                                            className="btn btn-primary"
                                            style={{}}
                                            onClick={() => addContact(item.userName,item.phoneNumber)}>
                                            Add Contact
                                        </button>
                                    </li>
                                </ul>
                                <br />
                            </div>
                        </div>
                    </div>
                ))}
                {!contactList && <p>No contact list available.</p>}


            </div>
        </div>
    )
}


export default ContactsComp 
