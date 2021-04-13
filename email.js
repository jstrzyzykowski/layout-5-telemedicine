const form = document.getElementById('email-form');
const inputName = document.getElementById('user-name');
const inputEmail = document.getElementById('user-email');
const inputMessage = document.getElementById('user-message');
const sendButton = document.getElementById('send-message-btn');
const feedbackBoxes = document.querySelectorAll('.feedback');
const sendConfirmBox = document.querySelector('.contact__send-confirm-box');

const EMAIL_JS = {
  userid: 'YOUR_USER_ID',
  serviceid: 'YOUR_SERVICE_ID',
  templateid: 'YOUR_TEMPLATE_ID',
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  cleanFeedbackBoxes();
  const validateResult = validateForm();

  if(validateResult.valid) {
    initializeSender(EMAIL_JS);
    sendMessage(EMAIL_JS, form);
    cleanForm();
    sendConfirmBox.classList.add('active');
    setTimeout(() => {
      sendConfirmBox.classList.remove('active');
    }, 5000);
  } else {
    for(const errorName in validateResult.errors) {
      const feedbackBox = document.querySelector(`.user-${errorName}-feedback`);
      feedbackBox.innerText = validateResult.errors[`${errorName}`];
      feedbackBox.classList.add('active');
    }
  }
});

function isEmpty(inputValue) {
  if(inputValue.trim() === '') return true;
  else return false;
}

function isEmail(inputValue) {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(inputValue.match(emailRegEx)) return true;
  else return false;
}

function validateForm() {
  let errors = {};

  if(isEmpty(inputName.value)) errors.name = 'Must not be empty';
  if(isEmpty(inputEmail.value)) errors.email = 'Must not be empty';
  if(!isEmail(inputEmail.value)) errors.email = 'Email is not valid';
  if(isEmpty(inputMessage.value)) errors.message = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

function cleanFeedbackBoxes() {
  feedbackBoxes.forEach((box) => {
    if(box.classList.contains('active')) {
      box.innerText = '';
      box.classList.remove('active');
    }
  });
}

function cleanForm() {
  inputName.value = '';
  inputEmail.value = '';
  inputMessage.value = '';
}

function initializeSender({ userid }) {
  const id = userid;
  if(id.trim() === '') {
    console.log('Must not be empty');
    return false;
  }

  emailjs.init(id);
}

function sendMessage({serviceid, templateid}, form) {
  emailjs.sendForm(serviceid, templateid, form)
  .then(function() {
      console.log('SUCCESS!');
    }, function(error) {
      console.log('FAILED...', error);
    });
}


