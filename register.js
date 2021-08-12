let registro = `
<div class="testbox">
  <h1>Registration</h1>

  <form action="/">
    <hr>
    <div class="accounttype">
      <input type="radio" value="None" id="radioOne" name="account" checked />
      <label for="radioOne" class="radio" chec>Personal</label>
      <input type="radio" value="None" id="radioTwo" name="account" />
      <label for="radioTwo" class="radio">Company</label>
    </div>
    <hr>
    <label id="icon" for="name"><i class="icon-envelope "></i></label>
    <input type="text" name="name" id="name" placeholder="Email" required />
    <label id="icon" for="name"><i class="icon-user"></i></label>
    <input type="text" name="name" id="name" placeholder="Name" required />
    <label id="icon" for="name"><i class="icon-shield"></i></label>
    <input type="password" name="name" id="name" placeholder="Password" required />
    <div class="gender">
      <input type="radio" value="None" id="male" name="gender" checked />
      <label for="male" class="radio" chec>Male</label>
      <input type="radio" value="None" id="female" name="gender" />
      <label for="female" class="radio">Female</label>
    </div>
    <p>By clicking Register, you agree on our <a href="#">terms and condition</a>.</p>
    <a href="#" class="button">Register</a>
  </form>
</div>
             
`

function register() {
    document.getElementById("body").innerHTML = registro;
}