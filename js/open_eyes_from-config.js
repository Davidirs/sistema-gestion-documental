const passwordInput = document.getElementById('password');
const passwordInput2 = document.getElementById('password2');
const togglePassword = document.getElementById('togglePassword');
const togglePassword2 = document.getElementById('togglePassword2');



togglePassword.addEventListener('click', function() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePassword.classList.add('fa-eye-slash');
    togglePassword.classList.remove('fa-eye');
  } else {
    passwordInput.type = 'password';
    togglePassword.classList.remove('fa-eye-slash');
    togglePassword.classList.add('fa-eye');
  }
});

togglePassword2.addEventListener('click', function() {
  if (passwordInput2.type === 'password') {
    passwordInput2.type = 'text';
   
  } else {
    passwordInput2.type = 'password';
  }
});




