const validateUser = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
    );
    const user = await result.json();
    return user;
  } catch (error) {
    console.log({ error });
  }
};

const onClickLogin = async () => {
  const email = document.getElementById("auth-login-email").value;
  if (email.lenght < 5 || !email.includes("@")) {
    document.getElementById("email-error").style.visibility = "visible";
    document.getElementById("auth-login-email").style.borderColor = "red";
    return;
  }

  const result = await validateUser(email);
  if (result.error) {
    document.getElementById("email-error").style.visibility = "visible";
    document.getElementById("auth-login-email").style.borderColor = "red";
    return;
  }

  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("./pages/dashboard", "_self");
};
