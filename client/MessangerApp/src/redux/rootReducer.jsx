


const initialState = {

    // users: [
    //     { id: '1', fullName: 'orli aharonov', userName: 'orli', phoneNumber: '050-111-1111', password: '1234',
    //      chatsRelated: ['orliOrna', 'ortalOrli', 'groupChat'],
    //      contacts: [{name:'orna', Phone:'050-222-2222'}, {name:'ortal', Phone:'050-333-3333'}] },
    //     { id: '2', fullName: 'orna kazin', userName: 'orna', phoneNumber: '050-222-2222', password: '2345',
    //      chatsRelated: ['orliOrna', 'groupChat'],
    //      contacts: [{name:'orli', Phone:'050-111-1111'}, {name:'ortal', Phone:'050-333-3333'}] },
    //     { id: '3', fullName: 'ortal malca', userName: 'ortal', phoneNumber: '050-333-3333', password: '3456',
    //      chatsRelated: ['ortalOrli', 'groupChat'],
    //      contacts: [{name:'orna', Phone:'050-222-2222'}, {name:'orli', Phone:'050-111-1111'}] }
    // ],
    // chatList:
    //     [{
            
    //         chatId: 'orliOrna',
    //         chatMembers: [{ name: 'orli', Phone: '050-111-1111' }, { name: 'orna', Phone: '050-222-2222' }],
    //         MessagesRelated: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    //     },
    //     {
            
    //         chatId: 'ortalOrli',
    //         chatMembers: [{ name: 'orli', Phone: '050-111-1111' }, { name: 'ortal', Phone: '050-333-3333' }],
    //         MessagesRelated: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    //     },
    //     {
            
    //         chatId: 'groupChat',
    //         chatMembers: [{ name: 'orli', Phone: '050-111-1111' }, { name: 'orna', Phone: '050-222-2222' }, { name: 'ortal', Phone: '050-333-3333' }],
    //         MessagesRelated: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    //     }]
    // ,
    // Messages: [
    //     {
    //         _id: '66119caeb98511f91be73472',
    //         chatId: "orliOrna",
    //         fullName: "orli",
    //         users: ["050-222-2222"],
    //         MessagesRelated: [{
    //             messageId: '1',
    //             senderID: "orli",
    //             reciverID: "orna",
    //             time: "17:01",
    //             contant: "What's up?"
    //         },
    //         {
    //             messageId: '2',
    //             senderID: "orna",
    //             reciverID: "orli",
    //             time: "17:02",
    //             contant: "Nice. How are things?"
    //         },
    //         {
    //             messageId: '3',
    //             senderID: "orli",
    //             reciverID: "orna",
    //             time: "17:03",
    //             contant: "Things are OK"
    //         }]
    //     },
    //     {
    //         _id: '66119caeb98511f91be73473',
    //         chatId: "ortalOrli",
    //         fullName: "orli",
    //         users: ["050-333-3333"],
    //         MessagesRelated: [{
    //             messageId: '4',
    //             senderID: "ortal",
    //             reciverID: "orli",
    //             time: "19:35",
    //             contant: "What colour is the sky?"
    //         },
    //         {
    //             messageId: '5',
    //             senderID: "orli",
    //             reciverID: "ortal",
    //             time: "19:37",
    //             contant: "Blue?"
    //         },
    //         {
    //             messageId: '6',
    //             senderID: "ortal",
    //             reciverID: "orli",
    //             time: "19:38",
    //             contant: "True"
    //         }]
    //     },
    //     {
    //         _id: '66119caeb98511f91be73474',
    //         chatId: "groupChat",
    //         fullName: "orli",
    //         users: ["050-222-2222", "050-333-3333"],
    //         MessagesRelated: [{
    //             messageId: '7',
    //             senderID: "orli",
    //             reciverID: ["ortal", "orna"],
    //             time: "00:01",
    //             contant: "Knock Knock"
    //         },
    //         {
    //             messageId: '8',
    //             senderID: "orna",
    //             reciverID: ["orli", "ortal"],
    //             time: "19:37",
    //             contant: "who's there?"
    //         },
    //         {
    //             messageId: '9',
    //             senderID: "ortal",
    //             reciverID: ["orli", "orna"],
    //             time: "19:38",
    //             contant: "very funny"
    //         }]
    //     }
    // ],
    newMessage: "",
    Messages:[],
    chatList:[],
    loading: false,
    userDetails: [],
    loggedIn: {
        logged_in: false,
        userPhoneNumber: "0",
        token:''
    },
    currentmongo_Id: "mongo_Id",
    currentChatId: 'chatId',
    currentMessages:[],
    chatInfo:
    {
        chatId: '',
        chatMembers: [],
        MessagesRelated: []
    },
    chatContant:[],
    updatedMessages:[],
    newUser: {},
    error: ''
};

// Function to find an chat by chatId
const findDetailsByChatId = (chatList, chatId) => {
    return chatList.find(chat => chat.chatId === chatId);
};

// // Function to find an Messages object by chatId
// const findObjectByChatId = (Messages, chatId) => {
//     return Messages.find(message => message.chatId === chatId);
// };

// // Function to add a new message to the MessagesRelated array
// const addNewMessage = (Messages, chatId, newMessage) => {
//     const chatObject = findObjectByChatId(Messages, chatId);
//     if (chatObject) {
//         chatObject.MessagesRelated.push(newMessage);
//         console.log("New message added to chat:", chatId);
//         console.log("Updated chat object:", chatObject);
//         return chatObject}
// // } else {
// //     // Create a new chat object if not found
// //     chatObject = {
// //         chatId: state.currentChatId,
// //         fullName: "", // Add the necessary properties
// //         users: [],   // Add the necessary properties
// //         MessagesRelated: [],
// //     };
// //     Messages.push(chatObject); // Push the new chat object to the Messages array
// // }
// // };

 const messangerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETNEWMES":
            return {
                ...state, newMessage: state.newMessage = action.payload
            }
        case "SETCHATROOM":
            return {
                ...state, currentChatId: state.currentChatId = action.payload
            }
        case "SETMONGO_ID":
                return {
                    ...state, currentmongo_Id: state. currentmongo_Id = action.payload
                }
           
        case "SETCHATDETAILS":
            return {
                ...state, currentChatId: state.chatDetails = findDetailsByChatId(state.chatList, action.payload)
            }
        case "SETCHATCONTANT":
            return {
                ...state, currentMessages: state.currentMessages = action.payload
            }
        case "SETCHATLIST":
            return {
                ...state, chatList: state.chatList = action.payload
            }
        case "NEWUSER":
            return {
                ...state, newUser: state.userDetails = action.payload
            }
        case "LOGGEDIN":
            return {
                ...state, loggedIn: state.loggedIn = action.payload
            }
        case "ADD_MESSAGE":
            return{
             ...state, 
             currentMessages: [...state.currentMessages, action.payload],
             chatList: state.chatList.map(messageObj => {
                if (messageObj.chatId === state.currentChatId) {
                    return {
                        ...messageObj,
                        MessagesRelated: [...messageObj.MessagesRelated, action.payload]
                    }
                } else {
                    return messageObj;
                }
                })
            }
        default:
            return state;
    }
}


export default messangerReducer



