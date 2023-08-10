const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button'); // Get the "send" button element

const userNameInput = document.getElementById('user-name');
const saveNameBtn = document.getElementById('save-name-btn');
let userName = '';

// Add click event listener to the "send" button
sendButton.addEventListener('click', () => {
    const input = userInput.value.trim();
    if (input !== '') {
        processUserInput(input);
        userInput.value = '';
    }
});

// Event listener for the Save button
saveNameBtn.addEventListener('click', () => {
    const name = userNameInput.value.trim();
    if (name !== '') {
        userName = name;
        displayMessage(`I'll call you ${userName}!`, 'human');
        userNameInput.value = '';
    }
});

const botNameSelect = document.getElementById('bot-name');
const saveBotNameBtn = document.getElementById('save-bot-name-btn');

let botName = '';

// Event listener for the Save Bot's Name button
saveBotNameBtn.addEventListener('click', () => {
    const selectedBotName = botNameSelect.value;
    if (selectedBotName) {
        botName = selectedBotName;
        let selectedBot;
        switch (selectedBotName) {
            // case 'Bill':
            //     selectedBot = botBill;
            //     break;
            // case 'Sarah':
            //     selectedBot = botSarah;
            //     break;
            case 'Default':
                selectedBot = botDefault;
                break;
            // Add more cases for other bots if needed
            default:
                selectedBot = botDefault;
        }
        botInfo = selectedBot;
        displayMessage(`You're chatting with ${botName}! What can I help you with today?`, 'bot');
        currentChatbot = selectedBot;
        updateChatbotInfo(currentChatbot);
    }
});


function displayMessage(message, sender) {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message', sender);

    if (typeof message === 'string') {
        // If the message is a string, create a text node
        chatMessage.innerHTML = message; // Use innerHTML instead of textContent
    } else if (typeof message === 'object' && message.text) {
        // If the message is an object with a 'text' property, display the text message
        chatMessage.innerHTML = message.text; // Use innerHTML instead of textContent
    }

    chatDisplay.appendChild(chatMessage);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function displayImage(image) {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message', 'bot', 'image-message');

    // Check if the provided image is a video (assuming video URLs have .mp4 extension)
    const isVideo = image.toLowerCase().endsWith('.mp4');

    if (isVideo) {
        // Create a video element
        const videoElement = document.createElement('video');
        videoElement.setAttribute('src', image);
        videoElement.setAttribute('controls', 'controls'); // Add controls to the video element
        videoElement.classList.add('response-video'); // Add a custom class for styling (optional)
        chatMessage.appendChild(videoElement);
    } else {
        // Create an image element
        const thumbnailImage = document.createElement('img');
        thumbnailImage.setAttribute('src', image);
        thumbnailImage.setAttribute('alt', 'Thumbnail Image');
        thumbnailImage.classList.add('response-image');
        chatMessage.appendChild(thumbnailImage);

        // Add the click event listener to show the full-size image in the modal
        thumbnailImage.addEventListener('click', () => {
            const modal = document.getElementById('image-modal');
            const modalImage = document.getElementById('modal-image');
            modalImage.src = image; // Set the full-size image URL in the modal image element
            modal.style.display = 'block'; // Show the modal

            // Add the click event listener to close the modal when the close button is clicked
            const modalClose = document.getElementsByClassName('modal-close')[0];
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none'; // Hide the modal
            });
        });
    }

    chatDisplay.appendChild(chatMessage);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function processUserInput(input) {
    displayMessage(input, 'user');

    // Define regular expressions for trigger words
    const greetingsRegex = /\b(hello|hey|hi|yo|howdy|hiya|heya|heyy|heyo|yoo)\b/i;
    const swear = /\b(fuck|shit|cunt|bitch|ass|bastard)\b/i;
    const whatsup = /\b(sup|whats up|hows it going|how's it going|hows it goin|how are you|how you doin|wassup)\b/i;
    const bName = /\b(whats your name|what's your name|do you know your name|who are you|who is this|who's this|whos this|who dis)\b/i;
    const hat = /\b(hats|hat|a hat)\b/i;
    const shirt = /\b(shirts|shirt|a shirt)\b/i;
    const pants = /\b(pants|pant|a pant)\b/i;
    const shoes = /\b(shoes|shoe|a shoe)\b/i;
    const dress = /\b(dresses|dress|a dress)\b/i;
    const jacket = /\b(jackets|jacket|a jacket)\b/i;
    const toque = /\b(toque|toques|beanie|beanies|winter hats)\b/i;
    const skirt = /\b(skirts|skirt|a skirt)\b/i;
    const socks = /\b(socks|sock|a sock)\b/i;
    const shorts = /\b(shorts|short|a short)\b/i;
    const sweater = /\b(sweaters|sweater|a sweater|hoodie)\b/i;

    // removed prompts, these were used for general conversation - not needed for helpbot
    // const posResponse = /\b(good|great|decent|alright|not bad|not so bad|same)\b/i;
    // const medResponse = /\b(okay|meh|blah)\b/i;
    // const negResponse = /\b(bad|not good|not great)\b/i;
    // const gaming = /\b(gamin|gaming|video games|videogames|playing games)\b/i;
    // const name = /\b(whats my name|what's my name|do you know my name|who am i)\b/i;
    // const eyeColorQuestion = /\b(eye color|eye colour|what colour are your eyes|what color are your eyes)\b/i;
    // const video = /\b(send a video)\b/i;
    // const picture = /\b(send a picture)\b/i;
    // const joke = /\b(joke|tell me a joke|say something funny)\b/i;
    // const ageQuestion = /\b(age|how old are you|how many years old)\b/i;
    // const hairColorQuestion = /\b(hair color|what's your hair color|tell me your hair color|what color is your hair|hair colour|what's your hair colour|tell me your hair colour|what colour is your hair)\b/i;
    // const locationQuestion = /\b(where do you live|where are you from|where you from)\b/i;
    // const bioQuestion = /\b(bio|tell me about yourself|tell me about you)\b/i;
    // const picRandom = /\b(send a random picture)\b/i; // picture format in folders is 1 (1). to get this format, name all of the pictures 1
    // const vidRandom = /\b(send a random video)\b/i; // video format in folders is 2 (1). to get this format, name all of the videos 2
    // const time = /\b(time|current time|what time is it)\b/i;

   // Simulate bot's response 
let responseMessage;
let responseImage;
if (greetingsRegex.test(input)) {
    responseMessage = "Hello there, How can I help you today?";
    // responseMessage = `Hey ${userName || 'there, how can I help you today?'}`;
} else if (swear.test(input)) {
    responseMessage = "Please don't swear at me! Is there something you're looking for?";
} else if (whatsup.test(input)) {
    responseMessage = Math.random() < 0.5 ? "Just here to help you! Is there something you're looking for?" : "Ready to help, is there something I can help you find today?";
} else if (bName.test(input)) {
    responseMessage = `${botName || 'My name is Help Bot'}!`;
} else if (hat.test(input)) {
    responseMessage = `If you're searching for hats,&nbsp; <a href="C:/xampp/htdocs/cb/bot/botredirect.html">Click Here!</a>`;
} else if (shirt.test(input)) {
    responseMessage = "If you're searching for shirts,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (pants.test(input)) {
    responseMessage = "If you're searching for pants,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (shoes.test(input)) {
    responseMessage = "If you're searching for shoes,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (dress.test(input)) {
    responseMessage = "If you're searching for dresses,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (jacket.test(input)) {
    responseMessage = "If you're searching for jackets,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (toque.test(input)) {
    responseMessage = "If you're searching for toques,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (skirt.test(input)) {
    responseMessage = "If you're searching for skirts,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (socks.test(input)) {
    responseMessage = "If you're searching for socks,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (shorts.test(input)) {
    responseMessage = "If you're searching for shorts,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
} else if (sweater.test(input)) {
    responseMessage = "If you're searching for sweaters,&nbsp; <a href='C:/xampp/htdocs/cb/bot/botredirect.html'>Click Here!</a>";
}


  else {
    responseMessage = "I'm sorry, I didn't understand. How can I help you today?";
}


// removed responses, these were used for general conversation - not needed for helpbot
//  else if (video.test(input)) {
//     responseMessage = "Here's a random video";
//     responseImage = `photo/${botName}/2 (1).mp4`;
// } else if (picture.test(input)) {
//     responseMessage = "Here's a pic of me";
//     responseImage = `photo/${botName}/avatar.png`;
// } 
// else if (posResponse.test(input)) {
//     responseMessage = "That's good!";
// } else if (medResponse.test(input)) {
//     responseMessage = "Just okay?";
// } else if (negResponse.test(input)) {
//     responseMessage = "That's a bummer";
// } else if (gaming.test(input)) {
//     responseMessage = "What game?";
// } else if (name.test(input)) {
//     responseMessage = `${userName}!`;
// } 
// else if (input.toLowerCase().includes('pizza')) {
//     responseMessage = "Pizza is the best.";
// } else if (eyeColorQuestion.test(input)) {
//     responseMessage = `My eyes are ${botInfo.eyeColor}.`;
// } else if (ageQuestion.test(input)) {
//     responseMessage = `I'm ${botInfo.age}!`;
// } else if (hairColorQuestion.test(input)) {
//     responseMessage = `My hair is ${botInfo.hairColor}!`;
// } else if (locationQuestion.test(input)) {
//     responseMessage = `I'm from ${botInfo.location}!`;
// } else if (bioQuestion.test(input)) {
//     responseMessage = `${botInfo.bio}`;
// } 
// else if (joke.test(input)) {
//     responseMessage = "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!";
// } 
// else if (picRandom.test(input)) {
//     const randomNum = Math.floor(Math.random() * 2) + 1; // Generate a random number between 1 and 2
//     responseImage = `photo/${botName}/1 (${randomNum}).png`;
// } else if (vidRandom.test(input)) {
//     const randomNum = Math.floor(Math.random() * 2) + 1; // Generate a random number between 1 and 2
//     responseImage = `photo/${botName}/2 (${randomNum}).mp4`;
// } 
// else if (time.test(input)) {
//     responseMessage = `The current time is ${currentTime}.`;
// } 


    
    setTimeout(() => {
        displayMessage(responseMessage, 'bot');

        if (responseImage) {
            setTimeout(() => {
                displayImage(responseImage);
            }, 500);
        }
    }, 500);
}

userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const input = userInput.value.trim();
        if (input !== '') {
            processUserInput(input);
            userInput.value = '';
        }
    }
});

// Object for Bot Default
const botDefault = {
    name: 'Help Bot',
    age: 10000,
    hairColor: 'none',
    eyeColor: 'none',
    location: 'none',
    bio: 'Hello! I am the help bot, a friendly AI ready to chat with you!',
    avatar: 'botphoto/Bill/avatar.png',
};

// Object for Bot Bill
// const botBill = {
//     name: 'Bill',
//     age: 30,
//     hairColor: 'brown',
//     eyeColor: 'blue',
//     location: 'New York',
//     bio: 'I am Bot Bill, a friendly AI ready to chat with you!',
//     avatar: 'botphoto/Bill/avatar.png',
// };

// // Object for Bot Sarah
// const botSarah = {
//     name: 'Sarah',
//     age: 25,
//     hairColor: 'blonde',
//     eyeColor: 'blue',
//     location: 'Los Angeles',
//     bio: 'Hello! I am Sarah, a friendly AI ready to chat with you!',
//     avatar: 'botphoto/Sarah/avatar.png',
// };

// Function to update chatbot info
function updateChatbotInfo(bot) {
    const avatarElement = document.getElementById('avatar');
    const nameElement = document.getElementById('chatbot-name');

    avatarElement.src = bot.avatar;
    nameElement.textContent = bot.name;
}

// Set default chatbot (you can change this based on user selection)
let currentChatbot = botDefault;
updateChatbotInfo(currentChatbot);


// const chatContainer = document.querySelector('.chat-container');
// const toggleButton = document.getElementById('toggle-button');

// toggleButton.addEventListener('click', () => {
//     chatContainer.classList.toggle('minimized');
//     toggleButton.innerHTML = chatContainer.classList.contains('minimized') ? '&#10133;' : '&#10134;';
// });


const chatContainer = document.querySelector('.chat-container');
const toggleButton = document.getElementById('toggle-button');
const chatInfo = document.querySelector('.chatbot-info');
const chatDisplay2 = document.querySelector('.chat-display');
const userInputContainer = document.querySelector('.user-input-container');
const initialMessage = document.querySelector('.initial-message'); // Add this line

toggleButton.addEventListener('click', () => {
    chatContainer.classList.toggle('minimized');
    chatInfo.classList.toggle('chat-info-visible', !chatContainer.classList.contains('minimized'));
    chatDisplay2.classList.toggle('chat-display-visible', !chatContainer.classList.contains('minimized'));
    userInputContainer.classList.toggle('user-input-visible', !chatContainer.classList.contains('minimized'));
    initialMessage.classList.toggle('chat-display-visible', !chatContainer.classList.contains('minimized')); // Add this line
    toggleButton.innerHTML = chatContainer.classList.contains('minimized') ? '&#10133;' : '&#10134;';
});


