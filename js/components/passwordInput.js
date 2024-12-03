export default function createPasswordInput(name, placeholder, text="") {
    return /* html */ `
          <div class="input-group mb-3">
            <button class="btn btn-outline-secondary passwordInput" passwordInput="password${name}" paswordIcon="passwordIcon${name}" type="button" id="btn${name}">${text} <i class="bi bi-eye-fill" id="passwordIcon${name}" ></i></button>
            <input type="password" class="form-control" id= "password${name}" placeholder="${$_(placeholder)}" >
        </div>
    `;
  
}
