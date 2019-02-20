validateForm = () => {
    let pass = document.forms["register"]["password"].value
    let confPass = document.forms["register"]["confPassword"].value
    if (pass !== confPass) {
      document.getElementById('alert').style.display = "block"
      return false
    }
}