const onLoadUserInfo = () => {
  // add email element
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("user-avatar");

  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);

  navbarUserInfo.appendChild(emailElement);

  // logout element
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("Sair");
  logoutElement.appendChild(logoutText);

  navbarUserInfo.appendChild(logoutElement);

  // avatar user initial
  const navbarUserAvatarElement = document.createElement("h3");
  const navbarUserAvatarText = document.createTextNode(name.charAt(0));
  navbarUserAvatarElement.appendChild(navbarUserAvatarText);

  navbarUserAvatar.appendChild(navbarUserAvatarElement);
};

window.onload = () => {
  onLoadUserInfo();
};
