const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };

    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/users",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();
    return user;
  } catch (error) {
    console.log({ error });
  }
};

const onRegister = async () => {
  const email = document.getElementById("auth-register-email").value;
  const name = document.getElementById("auth-register-name").value;

  if (name.length < 3) {
    alert("Nome Inválido");
    return;
  }
  if (email.length < 5 || !email.includes("@")) {
    alert("Email Inválido");
    document.getElementById("auth-register-email").style.borderColor = "red";
    return;
  }

  const result = await onCallRegister(email, name);
  if (result.error) {
    document.getElementById("auth-register-email").style.borderColor = "red";
    document.getElementById("auth-register-name").style.borderColor = "red";
    return;
  }

  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("/pages/dashboard/index.html", "_self");
};

window.onload = () => {
  const form = document.getElementById("form-register");
  form.onsubmit = (e) => {
    e.preventDefault();
    onRegister();
  };
};
